const { default: ollama } = require('ollama');

/**
 * Extract JSON from the response string using multiple strategies
 * @param {string} responseText - The raw response text from the model
 * @returns {string} - Extracted JSON string
 */
function extractJsonWithDelimiters(responseText) {
  // Strategy 1: Look for content between $$$ delimiters
  const delimiterRegex = /\$\$\$(.*?)\$\$\$/s;
  const delimiterMatch = responseText.match(delimiterRegex);
  if (delimiterMatch) {
    return delimiterMatch[1].trim();
  }

  // Strategy 2: Try to find the first valid JSON in the response
  const jsonRegex = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\})*)*\}))*\}/s;
  const jsonMatch = responseText.match(jsonRegex);
  if (jsonMatch) {
    return jsonMatch[0].trim();
  }

  // Strategy 3: Clean and attempt to extract JSON
  const cleanedResponse = responseText
    .replace(/^[^\{]*/, '')  // Remove any text before the first {
    .replace(/[^\}]*$/, ''); // Remove any text after the last }

  if (cleanedResponse) {
    return cleanedResponse.trim();
  }

  throw new Error('No valid JSON found in the response.');
}

/**
 * Validate and clean the extracted JSON
 * @param {string} jsonString - JSON string to validate
 * @returns {Object} Parsed and validated JSON object
 */
function validateAndCleanJson(jsonString) {
  try {
    // Remove any trailing commas (which make JSON invalid)
    const cleanedJsonString = jsonString
      .replace(/,\s*}/g, '}')
      .replace(/,\s*\]/g, ']');

    // Attempt to parse the JSON
    const parsedJson = JSON.parse(cleanedJsonString);

    // Additional validation for specific fields
    const validDegrees = ['B.Tech', 'M.Tech', 'PhD'];
    
    if (parsedJson.fieldOfExpertise && parsedJson.fieldOfExpertise.qualifications) {
      parsedJson.fieldOfExpertise.qualifications = parsedJson.fieldOfExpertise.qualifications.map(qual => {
        // Standardize degree
        if (qual.degree) {
          const normalizedDegree = qual.degree.trim().toUpperCase();
          qual.degree = validDegrees.find(validDegree => 
            normalizedDegree.includes(validDegree)
          ) || qual.degree;
        }
        return qual;
      });
    }

    return parsedJson;
  } catch (error) {
    console.error('JSON Validation Error:', error.message);
    throw new Error('Invalid JSON structure');
  }
}

/**
 * Generate structured faculty details using the Ollama model
 * @param {string} fileContent - Text content extracted from the document
 * @returns {Object} Parsed structured data
 */
async function generateFacultyDetails(fileContent) {
  try {
    const prompt = `
You are an expert data extractor tasked with converting unstructured faculty information into a precise, structured JSON format.

EXTRACTION GUIDELINES:
1. Parse the input text meticulously, extracting all relevant faculty information
2. Strictly adhere to the provided JSON schema
3. Be extremely precise in mapping information to the correct fields
4. Handle variations in degree names intelligently
5. Provide empty strings '' if no information is available for a field

IMPORTANT PARSING RULES:
- Name: Split into firstName, middleName, lastName
- Degrees: Map to "B.Tech", "M.Tech", or "PhD" only
- Experience: Convert to numeric years if possible
- Skills: Extract as array of distinct skills
- Projects & Publications: Include even if details are minimal

JSON SCHEMA REQUIREMENTS:
{
  "personalDetails": {
    "name": {
      "firstName": "",
      "middleName": "",
      "lastName": ""
    }
  },
  "fieldOfExpertise": {
    "domain": "",
    "designation": "",
    "skills": [],
    "yearsOfExperience": "",
    "qualifications": [
      {
        "degree": "",
        "institution": "",
        "yearOfCompletion": ""
      }
    ],
    "projects": [
      {
        "title": "",
        "description": "",
        "skillsGained": []
      }
    ],
    "publications": [
      {
        "title": "",
        "link": "",
        "year": "",
        "skills": []
      }
    ]
  }
}

RESPONSE FORMAT:
- Wrap ONLY the complete JSON within triple dollar signs $$$
- Ensure NO additional text outside the delimiters
- Provide complete, meaningful data

INPUT TEXT:
${fileContent}

BEGIN EXTRACTION:`;

    // Send the prompt to the model
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawResponse = response.message.content;
    console.log('Raw Response:', rawResponse); // Debugging log

    // Extract JSON
    const jsonString = extractJsonWithDelimiters(rawResponse);
    console.log('Extracted JSON String:', jsonString); // Debugging log

    // Validate and clean the JSON
    return validateAndCleanJson(jsonString);
  } catch (error) {
    console.error('Comprehensive Error in generateFacultyDetails:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}

module.exports = { generateFacultyDetails };