from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Flask ML-Server is running successfully!'})

@app.route('/experts', methods=['GET'])
def get_experts():
    try:
        response = requests.get('http://localhost:8000/api/expert/all') 
        if response.status_code == 200:
            # print(response.json())
            return response.json()  
        else:
            return {'error': 'Failed to fetch data from Node.js server'}, 500
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/candidates', methods=['GET'])
def get_candidates():  # Renamed function
    try:
        response = requests.get('http://localhost:8000/api/candidate/all') 
        if response.status_code == 200:
            # print(response.json())
            return response.json()  
        else:
            return {'error': 'Failed to fetch data from Node.js server'}, 500
    except Exception as e:
        return {'error': str(e)}, 500
    
    
@app.route('/jobs', methods=['GET'])
def get_jobs():  # Renamed function
    try:
        response = requests.get('http://localhost:8000/api/job/all') 
        if response.status_code == 200:
            # print(response.json())
            return response.json()  
        else:
            return {'error': 'Failed to fetch data from Node.js server'}, 500
    except Exception as e:
        return {'error': str(e)}, 500

def run_both_scripts():
    try:
        # Run candidateScore.py script
        subprocess.run(["python", "candidateScore.py"], check=True)

        # Run expertSelectionAndScore.py script
        subprocess.run(["python", "expertSelectionAndScore.py"], check=True)

    except subprocess.CalledProcessError as e:
        print(f"Error running script: {e}")



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
