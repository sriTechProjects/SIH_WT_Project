import json
import requests
import argparse
from sentence_transformers import SentenceTransformer, util
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk

# Initialize NLTK resources
nltk.download("wordnet")
nltk.download("stopwords")

# Load SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize lemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))

# Preprocessing for phrase similarity
def preprocess_phrases(phrases):
    def preprocess(phrase):
        words = re.sub(r"[^\w\s]", "", phrase.lower()).split()
        return " ".join(lemmatizer.lemmatize(word) for word in words if word not in stop_words)
    return [preprocess(phrase) for phrase in phrases]

# Sentence embedding similarity
def compute_mean_embedding(vector):
    embeddings = model.encode(vector, convert_to_tensor=True)
    return embeddings.mean(dim=0)

# Cosine similarity between two vectors
def aggregate_similarity(vector1, vector2):
    if not vector1 or not vector2:
        return 0.0
    vector1 = preprocess_phrases(vector1)
    vector2 = preprocess_phrases(vector2)
    embedding1 = compute_mean_embedding(vector1)
    embedding2 = compute_mean_embedding(vector2)
    similarity = util.cos_sim(embedding1, embedding2).item() * 10
    return round(similarity, 2)

# Experience score calculation
def calculate_experience_score(expert_experience, max_experience):
    if max_experience == 0:
        return 0.0
    return round((expert_experience / max_experience) * 10, 2)

# Flatten nested skills lists
def flatten_skills(nested_list):
    return [skill for sublist in nested_list for skill in sublist]

def fetch_job_by_id(job_url, job_id):
    """
    Fetch a specific job by its ID from the job database.
    
    Args:
    - job_url (str): The API endpoint for fetching job data.
    - job_id (str): The ID of the job to fetch.
    
    Returns:
    - dict: The job data if found.
    """
    try:
        response = requests.get(f"{job_url}/{job_id}")
        response.raise_for_status()
        job = response.json().get('data')
        if not job:
            raise ValueError(f"No job found with ID: {job_id}")
        return job
    except Exception as e:
        print(f"Error fetching job: {e}")
        return None

# Calculate approach relevancy
def calculate_approach_relevancy(approach_scores):
    return round(
        (approach_scores["problemSolving"] * 0.3) +
        (approach_scores["collaboration"] * 0.1) +
        (approach_scores["decisionMaking"] * 0.25) +
        (approach_scores["creativity"] * 0.15) +
        (approach_scores["analyticalDepth"] * 0.2),
        2
    ) * 3
# Select candidates by job ID
def select_candidates_by_job(job, candidates):
    print("Inside seelcct_candidate function")
    """
    Select candidates whose job ID matches the provided job.
    
    Args:
    - job (dict): The job object containing the job ID and requirements.
    - candidates (list): List of candidate objects.

    Returns:
    - list: Filtered list of candidates matching the job ID.
    """

    selected_candidates = [
        candidate for candidate in candidates
        if candidate.get("jobId") == job
    ]
    
    print("End of select_candidate function")
    return selected_candidates

# Calculate scores for candidates
def calculate_candidate_scores(job, candidates):
    if not candidates:
        print("No candidates to calculate scores for.")

    job_skills = job['preferredSkills']
    job_qualification = job['minimumQualifications']
    max_experience = max(candidate['yearsOfExperience'] for candidate in candidates)

    scores = []
    for candidate in candidates:
        candidate_skills = candidate['skills']
        candidate_experience = candidate['yearsOfExperience']
        candidate_qualification = candidate['qualifications']
        candidate_projects = flatten_skills([p['skillsGained'] for p in candidate['projects']])
        candidate_publications = flatten_skills([p['skills'] for p in candidate['researchPapers']])
        approach_scores = candidate.get("approachRelevancyScore", {})

        skills_score = aggregate_similarity(job_skills, candidate_skills)
        experience_score = calculate_experience_score(candidate_experience, max_experience)
        qualification_score = 10
        research_score = aggregate_similarity(job_skills, candidate_publications)
        project_score = aggregate_similarity(job_skills, candidate_projects)

        final_skill_score = round(
            (skills_score * SKILL_WEIGHT) +
            (experience_score * EXPERIENCE_WEIGHT) +
            (qualification_score * QUALIFICATION_WEIGHT) +
            (research_score * RESEARCH_WEIGHT) +
            (project_score * PROJECT_WEIGHT),
            2
        ) * 7

        total_approach_relevancy = calculate_approach_relevancy(approach_scores)
        final_combined_score = round(final_skill_score + total_approach_relevancy, 2)

        scores.append({
            "_id": candidate['_id'],
            "skillRelevancyScore": {
                "skills": skills_score,
                "yearsOfExperience": round(experience_score, 2),
                "qualifications": qualification_score,
                "researchPapers": research_score,
                "projects": project_score,
                "totalSkillRelevancyScore": final_skill_score
            },
            "approachRelevancyScore": {
                "problemSolving": approach_scores.get("problemSolving", 0),
                "collaboration": approach_scores.get("collaboration", 0),
                "decisionMaking": approach_scores.get("decisionMaking", 0),
                "creativity": approach_scores.get("creativity", 0),
                "analyticalDepth": approach_scores.get("analyticalDepth", 0),
                "totalApproachRelevancyScore": total_approach_relevancy
            },
            "finalScore": final_combined_score
        })

    return scores

# Update candidate scores in the database
def update_candidate_scores(api_url, scores):
    headers = {"Content-Type": "application/json"}
    for score in scores:
        try:
            candidate_id = score['_id']
            response = requests.put(f"{api_url}/{candidate_id}", json=score, headers=headers)
            if response.status_code == 200:
                print("this is candidate update ")
                # print(f"Updated scores for candidate {candidate_id}.")
            else:
                print(f"Failed to update candidate {candidate_id}: {response.status_code}, {response.json()}")
        except Exception as e:
            print(f"Error updating candidate {candidate_id}: {e}")

# Select experts by domain and availability
def select_experts_by_domain(job, experts):
    job_domain = job["domainDepartment"]
    selected_experts = [
        expert for expert in experts
        if job_domain.lower() in expert["fieldOfExpertise"]["domain"].lower() and expert["availability"]
    ]
    if not selected_experts:
        print("No experts found matching the domain and availability criteria.")
    return selected_experts

# Calculate scores for selected experts
def calculate_expert_scores(job, selected_experts, maxi):
    job_skills = job['preferredSkills']
    job_qualification = job['minimumQualifications']
    max_experience = max(expert['fieldOfExpertise']['yearsOfExperience'] for expert in selected_experts)

    # Limit selected experts to the first 'maxi' elements
    limited_experts = selected_experts[:maxi]

    scores = []
    for expert in limited_experts:
        expert_skills = expert['fieldOfExpertise']['skills']
        expert_experience = expert['fieldOfExpertise']['yearsOfExperience']
        expert_qualification = expert['fieldOfExpertise']['qualifications']
        expert_projects = flatten_skills([p['skillsGained'] for p in expert['fieldOfExpertise']['projects']])
        expert_publications = flatten_skills([p['skills'] for p in expert['fieldOfExpertise']['publications']])
        approach_scores = expert.get("approachRelevancyScore", {})

        # Calculate individual scores
        skills_score = aggregate_similarity(job_skills, expert_skills)
        experience_score = calculate_experience_score(expert_experience, max_experience)
        qualification_score = 10 
        research_score = aggregate_similarity(job_skills, expert_publications)
        project_score = aggregate_similarity(job_skills, expert_projects)

        # Calculate total skill relevancy score
        final_skill_score = round(
            (skills_score * SKILL_WEIGHT) +
            (experience_score * EXPERIENCE_WEIGHT) +
            (qualification_score * QUALIFICATION_WEIGHT) +
            (research_score * RESEARCH_WEIGHT) +
            (project_score * PROJECT_WEIGHT),
            2
        ) * 7

        # Calculate total approach relevancy score
        total_approach_relevancy = calculate_approach_relevancy(approach_scores)

        # Calculate final combined score
        final_combined_score = round(final_skill_score + total_approach_relevancy, 2)

        # Append detailed scores to the results
        scores.append({
            "expertID": expert['_id'],
            "expertName": f"{expert['personalDetails']['name']['firstName']} {expert['personalDetails']['name']['lastName']}",
            "domain": expert['personalDetails']['domain'],
            "skillRelevancyScore": {
                "skills": skills_score,
                "yearsOfExperience": round(experience_score, 2),
                "qualifications": qualification_score,
                "researchPapers": research_score,
                "projects": project_score,
                "totalSkillRelevancyScore": final_skill_score
            },
            "approachRelevancyScore": {
                "problemSolving": approach_scores.get("problemSolving", 0),
                "collaboration": approach_scores.get("collaboration", 0),
                "decisionMaking": approach_scores.get("decisionMaking", 0),
                "creativity": approach_scores.get("creativity", 0),
                "analyticalDepth": approach_scores.get("analyticalDepth", 0),
                "totalApproachRelevancyScore": total_approach_relevancy
            },
            "finalScore": final_combined_score
        })
    return scores

    
def create_balanced_panels(scores, num_panels, experts_per_panel, job_id):
    print("this is the scores :\n\n")
    print(scores)
    # Sort scores by 'finalScore' in descending order
    sorted_scores = sorted(scores, key=lambda x: x['finalScore'], reverse=True)
    
    total_experts_needed = num_panels * experts_per_panel
    available_experts = len(scores)

    # Ensure enough experts are available
    if total_experts_needed > available_experts:
        raise ValueError(f"Not enough experts to create {num_panels} panels with {experts_per_panel} experts each.")

    # Initialize empty panels
    panels = [[] for _ in range(num_panels)]

    # Distribute experts across panels in a round-robin fashion
    for i, expert in enumerate(sorted_scores):
        panel_index = i % num_panels  # Cycle through panels
        panels[panel_index].append(expert)

    # Calculate panel scores
    panel_scores = []
    for i, panel in enumerate(panels):
        avg_skill_score = round(
            sum(float(e['skillRelevancyScore']['totalSkillRelevancyScore']) for e in panel) / len(panel),
            2
        ) if panel else 0.0
        avg_approach_score = round(
            sum(float(e['approachRelevancyScore']['totalApproachRelevancyScore']) for e in panel) / len(panel),
            2
        ) if panel else 0.0
        avg_final_score = round(
            sum(float(e['finalScore']) for e in panel) / len(panel),
            2
        ) if panel else 0.0

        panel_scores.append({
            "panelID": f"Panel_{i+1}",
            "jobID": job_id,
            "panelInfo": {
                "panelExperts": [{"expertID": e['expertID'], "expertName": e['expertName'], "domain": e['domain']} for e in panel],
            },
            "totalSkillRelevancyScore": avg_skill_score,
            "totalApproachRelevancyScore": avg_approach_score,
            "finalScore": avg_final_score
        })

    return panel_scores

# Update expert scores in the database
def update_expert_scores(api_url, scores):
    for score in scores:
        print(score)
        # print(score['_id'])
        try:
            expert_id = score['expertID']
            del score['expertID']  
            del score['expertName']

            response = requests.put(f"{api_url}/{expert_id}", json=score)
            if response.status_code == 200:
                print(f"Updated scores for expert {expert_id}.")
            else:
                print(f"Failed to update - expert {expert_id}: {response.status_code}, {response.text}")
        except Exception as e:
            print(score)
            print(f"Error updating expert {expert_id}: {e}")


# Update panels in the database
def update_panels_in_db(api_url, panels):
    for panel in panels:
        try:
            # print("Sending payload:", json.dumps(panel, indent=4))
            response = requests.post(api_url, json=panel)
            # print(response.request.body)
            print(panel)
            response = requests.post(api_url, json=panel)
            if response.status_code == 200 or response.status_code == 201:
                print(f"Panel {panel['panelID']} added to the database.")
            else:
                print(f"Failed to add panel {panel['panelID']}: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"Error adding panel {panel['panelID']}: {e}")
            

def assign_candidates_to_panels(panels, candidates, max_candidates_per_panel):
    """
    Assign candidates to panels based on the closest match of final combined scores.
    """
    # Ensure all candidates have 'finalCombinedScoreOutOf100'
    for candidate in candidates:
        if 'finalCombinedScoreOutOf100' not in candidate:
            candidate['finalCombinedScoreOutOf100'] = (
                candidate.get('skillRelevancyScore', {}).get('totalSkillRelevancyScore', 0) +
                candidate.get('approachRelevancyScore', {}).get('totalApproachRelevancyScore', 0)
            )

    # Sort candidates by finalCombinedScoreOutOf100
    sorted_candidates = sorted(
        candidates, key=lambda x: x['finalCombinedScoreOutOf100'], reverse=True
    )

    # Initialize candidates field for all panels if not already present
    for panel in panels:
        if 'candidates' not in panel:
            panel['candidates'] = []

    # Assign candidates to panels
    for candidate in sorted_candidates:
        nearest_panel = None
        smallest_difference = float('inf')

        # Find the panel with the closest finalScore and capacity
        for panel in panels:
            if len(panel['candidates']) < max_candidates_per_panel:
                difference = abs(candidate['finalCombinedScoreOutOf100'] - panel['finalScore'])
                if difference < smallest_difference:
                    smallest_difference = difference
                    nearest_panel = panel

      # Safely retrieve personal details
        personal_details = candidate.get('personalDetails', {})
        name = personal_details.get('name', {})
        first_name = name.get('firstName', '').strip()
        last_name = name.get('lastName', '').strip()

        # Fallback if both names are missing
        candidate_name = f"{first_name} {last_name}".strip() or f"Candidate_{candidate.get('_id', '')}"
        if nearest_panel:
            nearest_panel['candidates'].append({
                'candidateID': candidate.get('_id', ''),
                'candidateName': candidate_name,
                'candidate_experience': candidate.get('yearsOfExperience', 0),
                'skillsScore': candidate.get('skillRelevancyScore', {}).get('skills', 0),
                'experienceScore': candidate.get('skillRelevancyScore', {}).get('yearsOfExperience', 0),
                'qualificationScore': candidate.get('skillRelevancyScore', {}).get('qualification', 10),
                'researchScore': candidate.get('skillRelevancyScore', {}).get('researchPapers', 0),
                'projectScore': candidate.get('skillRelevancyScore', {}).get('projects', 0),
                'finalSkillScoreOutOf70': candidate.get('skillRelevancyScore', {}).get('totalSkillRelevancyScore', 0),
                'approachRelevancyScoreOutOf30': candidate.get('approachRelevancyScore', {}).get('totalApproachRelevancyScore', 0),
                'finalCombinedScoreOutOf100': candidate['finalCombinedScoreOutOf100']
            })

    return panels

def select_candidates_by_job_id(job_id, candidates):
    # Filter candidates where the jobID matches
    selected_candidates = [candidate for candidate in candidates if candidate.get("jobId") == job_id]
    return selected_candidates


def update_candidates_in_panels(api_url, panels):
    """
    Update panels with assigned candidates in the database.

    Args:
    - api_url (str): API endpoint for updating panel assignments.
    - panels (list): Updated panels with assigned candidates.
    """
    for panel in panels:
        try:
            response = requests.put(api_url, json=panel)
            # print("Raw Payload Sent:", json.dumps(panel, indent=4))
            print(panel)
            if response.status_code == 200 or response.status_code == 201:
                print(f"Panel {panel['panelID']} updated successfully.")
            else:
                print(f"Failed to update panel {panel['panelID']}: {response.status_code}, {response.text}")
        except Exception as e:
            print(f"Error updating panel {panel['panelID']}: {e}")

# Main function

def main():
    parser = argparse.ArgumentParser(description="Expert Selection and Panel Creation")
    parser.add_argument('--job_id', type=str, required=True, help='ID of the job to process')

    args = parser.parse_args()

    job_id = args.job_id
    print("this is the job_id : ->",job_id)

    job_url = "http://localhost:8000/api/job/get"
    experts_url = "http://localhost:8000/api/expert/all"
    expert_score_url = "http://localhost:8000/api/expert/update"
    add_panels_url = "http://localhost:8000/api/panel/add"
    update_panel_url = "http://localhost:8000/api/panel/update"
    candidates_url = "http://localhost:8000/api/candidate/all"  # Candidates API URL
    update_url = "http://localhost:8000/api/candidate/update"  # Candidate update API URL

    # Fetch the specific job by ID
    job = fetch_job_by_id(job_url, job_id)
    if not job:
        print("No valid job found. Exiting.")
        return

    # Extract job-specific fields
    num_panels = job.get('noOfPanels', 3)  # Default to 3 if not found
    experts_per_panel = job.get('noOfExperts', 2)  # Default to 2 if not found
    skill_weight = job.get('SKILL_WEIGHT', 40) / 100  # Normalize weight
    experience_weight = job.get('EXPERIENCE_WEIGHT', 20) / 100
    qualification_weight = job.get('QUALIFICATION_WEIGHT', 20) / 100
    research_weight = job.get('RESEARCH_WEIGHT', 10) / 100
    project_weight = job.get('PROJECT_WEIGHT', 10) / 100

    print(f"Job Title: {job.get('jobTitle')}")
    print(f"Domain Department: {job.get('domainDepartment')}")
    print(f"Number of Panels: {num_panels}")
    print(f"Experts per Panel: {experts_per_panel}")
    print(f"Weights: SKILL={skill_weight}, EXPERIENCE={experience_weight}, "
          f"QUALIFICATION={qualification_weight}, RESEARCH={research_weight}, PROJECT={project_weight}")

    global SKILL_WEIGHT, EXPERIENCE_WEIGHT, QUALIFICATION_WEIGHT, RESEARCH_WEIGHT, PROJECT_WEIGHT
    SKILL_WEIGHT = skill_weight
    EXPERIENCE_WEIGHT = experience_weight
    QUALIFICATION_WEIGHT = qualification_weight
    RESEARCH_WEIGHT = research_weight
    PROJECT_WEIGHT = project_weight 

    # Fetch all experts
    experts_response = requests.get(experts_url)
    experts = experts_response.json()

    # Fetch all candidates
    candidates_response = requests.get(candidates_url)
    candidates = candidates_response.json()

    # Select experts based on domain and availability
    selected_experts = select_experts_by_domain(job, experts)

    # Handle case where no experts are selected
    if not selected_experts:
        print("No experts available for panel creation. Exiting.")
        return
    maxi = num_panels*experts_per_panel
    # Calculate scores for selected experts
    scores = calculate_expert_scores(job, selected_experts,maxi)
    scores1 = calculate_expert_scores(job, selected_experts,maxi)

    # Update scores in the database
    update_expert_scores(expert_score_url, scores)
    
    print("Expert updation completed")

   # selected candidates
    selected_candidates = select_candidates_by_job(job_id, candidates)
    
    print("After selected_candidate function")
    
    if not selected_candidates:
        print(f"No candidates matched the job ID: {job_id}")
        return
    else:
        print(selected_candidates)
    
    # Calculate scores for candidates
    candi_scores = calculate_candidate_scores(job, selected_candidates)
    
    print("After candi_score function")
    
    # print(candi_scores)

    # Update scores in the database for candidates
    update_candidate_scores(update_url, candi_scores)

    # print(scores)
    # Create balanced panels
    panels = create_balanced_panels(scores1, num_panels, experts_per_panel,job_id)
    
    print("After create panel function")

    # Update panels in the database
    update_panels_in_db(add_panels_url, panels)

    # Assign candidates to panels
    max_candidates_per_panel = len(selected_candidates)/len(panels)
    panels_with_candidates = assign_candidates_to_panels(panels, selected_candidates, max_candidates_per_panel)

    # Update panels in the database
    update_candidates_in_panels(update_panel_url, panels_with_candidates)


if __name__ == "__main__":
    main()