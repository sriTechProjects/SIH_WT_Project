import json
import requests
import argparse

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

# Select experts by domain and availability
def select_experts_by_domain(job, experts):
    job_domain = job["domainDepartment"]
    selected_experts = [
        expert for expert in experts
        if job_domain.lower() in expert["fieldOfExpertise"]["domain"].lower() and expert["availability"]
    ]
    if not selected_experts:
        print("")
    return selected_experts


# Main function

def main():
    parser = argparse.ArgumentParser(description="Expert Selection and Panel Creation")
    parser.add_argument('--job_id', type=str, required=True, help='ID of the job to process')

    args = parser.parse_args()

    job_id = args.job_id

    job_url = "http://localhost:8000/api/job/get"
    experts_url = "http://localhost:8000/api/expert/all"

    # Fetch the specific job by ID
    job = fetch_job_by_id(job_url, job_id)
    if not job:
        print("No valid job found. Exiting.")
        return

    # Fetch all experts
    experts_response = requests.get(experts_url)
    experts = experts_response.json()

    # Select experts based on domain and availability
    selected_experts = select_experts_by_domain(job, experts)

    print(f"{len(selected_experts)}")

if __name__ == "__main__":
    main()