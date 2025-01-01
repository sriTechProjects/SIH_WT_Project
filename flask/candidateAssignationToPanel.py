import json
from sentence_transformers import SentenceTransformer, util
import torch
import re
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk

nltk.download("wordnet")
nltk.download("stopwords")

model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize lemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))

SKILL_WEIGHT = 0.4
EXPERIENCE_WEIGHT = 0.2
QUALIFICATION_WEIGHT = 0.2
RESEARCH_WEIGHT = 0.1
PROJECT_WEIGHT = 0.1

def preprocess_phrases(phrases):
    def preprocess(phrase):
        words = re.sub(r"[^\w\s]", "", phrase.lower()).split()
        return " ".join(lemmatizer.lemmatize(word) for word in words if word not in stop_words)
    return [preprocess(phrase) for phrase in phrases]

def compute_mean_embedding(vector):
    embeddings = model.encode(vector, convert_to_tensor=True)
    return embeddings.mean(dim=0)

def aggregate_similarity(vector1, vector2):
    if not vector1 or not vector2:
        return 0.0
    vector1 = preprocess_phrases(vector1)
    vector2 = preprocess_phrases(vector2)
    embedding1 = compute_mean_embedding(vector1)
    embedding2 = compute_mean_embedding(vector2)
    similarity = util.cos_sim(embedding1, embedding2).item() * 10
    return round(similarity, 2)

def calculate_experience_score(expert_experience, max_experience):
    if max_experience == 0:
        return 0.0
    return round((expert_experience / max_experience) * 10, 2)

def flatten_skills(nested_list):
    return [skill for sublist in nested_list for skill in sublist]

def calculate_approach_relevancy(approach_scores):
    return round(
        (approach_scores["problemSolving"] * 0.3) +
        (approach_scores["collaboration"] * 0.1) +
        (approach_scores["decisionMaking"] * 0.25) +
        (approach_scores["creativity"] * 0.15) +
        (approach_scores["analyticalDepth"] * 0.2),
        2
    ) * 3

def calculate_scores(job, candidates):
    job_skills = job['skills']
    job_qualification = job['qualification']
    max_experience = max(candidate['yearsOfExperience'] for candidate in candidates)

    scores = []
    for candidate in candidates:
        candidate_skills = candidate['skills']
        candidate_experience = candidate['yearsOfExperience']
        candidate_qualification = candidate['qualifications'][0]['degree']
        candidate_projects = flatten_skills([p['skillsGained'] for p in candidate['projects']])
        candidate_publications = flatten_skills([p['skills'] for p in candidate['researchPapers']])
        approach_scores = candidate.get("approachRelevancy", {})

        skills_score = aggregate_similarity(job_skills, candidate_skills)
        experience_score = calculate_experience_score(candidate_experience, max_experience)
        qualification_score = 10 if job_qualification in candidate_qualification else 0
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

        final_approach_relevancy = calculate_approach_relevancy(approach_scores)

        final_combined_score = round(final_skill_score + final_approach_relevancy, 2)

        scores.append({
            "candidate_name": f"{candidate['personalDetails']['name']['firstName']} {candidate['personalDetails']['name']['lastName']}",
            "skills_score": skills_score,
            "experience_score": round(experience_score, 2),
            "qualification_score": qualification_score,
            "research_score": research_score,
            "project_score": project_score,
            "final_skill_score_out_of_70": final_skill_score,
            "approach_relevancy_score_out_of_30": final_approach_relevancy,
            "final_combined_score_out_of_100": final_combined_score
        })

    return scores

def assign_candidates_to_panels(panels, candidates, max_candidates_per_panel):
    """
    Assign candidates to panels based on the closest match of final combined scores,
    ensuring balanced distribution.

    Args:
    - panels (list): List of panel dictionaries with final scores.
    - candidates (list): List of candidate dictionaries with final combined scores.
    - max_candidates_per_panel (int): Maximum number of candidates per panel.

    Returns:
    - dict: Mapping of panels to assigned candidates.
    """
    # Sort candidates by their final combined scores
    sorted_candidates = sorted(candidates, key=lambda x: x['final_combined_score_out_of_100'], reverse=True)

    # Prepare panel structure with assigned candidates
    panel_assignments = {f"Panel {i+1}": {"panel_info": panel, "assigned_candidates": []} for i, panel in enumerate(panels)}

    for candidate in sorted_candidates:
        nearest_panel = None
        smallest_difference = float('inf')

        # Find the nearest panel that has not reached the limit
        for panel_name, panel_data in panel_assignments.items():
            if len(panel_data["assigned_candidates"]) < max_candidates_per_panel:
                panel_score = panel_data["panel_info"]["final_score"]
                difference = abs(candidate['final_combined_score_out_of_100'] - panel_score)

                if difference < smallest_difference:
                    smallest_difference = difference
                    nearest_panel = panel_name

        # Assign the candidate to the selected panel
        if nearest_panel:
            panel_assignments[nearest_panel]["assigned_candidates"].append(candidate)
        else:
            print(f"Warning: Unable to assign candidate {candidate['candidate_name']} due to panel capacity limits.")

    return panel_assignments

def display_panel_assignments(panel_assignments):
    """
    Display the panel assignments in a structured format.

    Args:
    - panel_assignments (dict): Mapping of panels to assigned candidates.
    """
    for panel_name, data in panel_assignments.items():
        print(f"\n{panel_name}:")
        print(f"  Panel Final Score: {data['panel_info']['final_score']}")
        print(f"  Assigned Candidates (Total: {len(data['assigned_candidates'])}):")
        for candidate in data["assigned_candidates"]:
            print(f"    - {candidate['candidate_name']} (Final Combined Score: {candidate['final_combined_score_out_of_100']})")

def main():
    with open("panels.json", "r") as panels_file:
        panels = json.load(panels_file)

    with open("candidates.json", "r") as candidates_file:
        candidates = json.load(candidates_file)

    with open("job.json", "r") as job_file:
        job = json.load(job_file)

    # Calculate scores for candidates
    processed_candidates = calculate_scores(job, candidates)

    max_candidates_per_panel = len(candidates)/len(panels)

    panel_assignments = assign_candidates_to_panels(panels, processed_candidates, max_candidates_per_panel)

    # Display
    display_panel_assignments(panel_assignments)

if _name_ == "_main_":
    main()