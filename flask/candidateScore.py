import json
import requests
from sentence_transformers import SentenceTransformer, util
import spacy

# Load lightweight NLP model for lemmatization
nlp = spacy.load("en_core_web_sm", disable=["parser", "ner"])

# Load SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Weights for score components
SKILL_WEIGHT = 0.4
EXPERIENCE_WEIGHT = 0.2
QUALIFICATION_WEIGHT = 0.2
RESEARCH_WEIGHT = 0.1
PROJECT_WEIGHT = 0.1

# Preprocessing for phrase similarity
def preprocess_phrases(phrases):
    def preprocess(phrase):
        doc = nlp(phrase.lower())
        return " ".join(token.lemma_ for token in doc)
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
def calculate_experience_score(candidate_experience, max_experience):
    if max_experience == 0:
        return 0.0
    return round((candidate_experience / max_experience) * 10, 2)

# Flatten nested skills lists
def flatten_skills(nested_list):
    return [skill for sublist in nested_list for skill in sublist]

# Calculate approach relevancy
def calculate_approach_relevancy(approach_scores):
    return round(
        (approach_scores.get("problemSolving", 0) * 0.3) +
        (approach_scores.get("collaboration", 0) * 0.1) +
        (approach_scores.get("decisionMaking", 0) * 0.25) +
        (approach_scores.get("creativity", 0) * 0.15) +
        (approach_scores.get("analyticalDepth", 0) * 0.2),
        2
    ) * 3

# Calculate scores for candidates
def calculate_candidate_scores(job, candidates):
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
        qualification_score = 10 if any(q['degree'] in job_qualification for q in candidate_qualification) else 0
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
                print(f"Updated scores for candidate {candidate_id}.")
            else:
                print(f"Failed to update candidate {candidate_id}: {response.status_code}, {response.json()}")
        except Exception as e:
            print(f"Error updating candidate {candidate_id}: {e}")

# Main function
def main():
    job_url = "http://localhost:8000/api/job/all"  # Job API URL
    candidates_url = "http://localhost:8000/api/candidate/all"  # Candidates API URL
    update_url = "http://localhost:8000/api/candidate/update"  # Candidate update API URL

    # Fetch job data
    job_response = requests.get(job_url)
    job = job_response.json()['data'][0]

    # Fetch candidate data
    candidates_response = requests.get(candidates_url)
    # print("Candidates Response:", candidates_response.json())  # Debugging
    
    if isinstance(candidates_response.json(), list):
        candidates = candidates_response.json()
    elif 'data' in candidates_response.json():
        candidates = candidates_response.json()['data']
    else:
        print("Unexpected response format:", candidates_response.json())
        return

    # Calculate scores
    scores = calculate_candidate_scores(job, candidates)

    # Update scores in the database
    update_candidate_scores(update_url, scores)

if __name__ == "__main__":
    main()