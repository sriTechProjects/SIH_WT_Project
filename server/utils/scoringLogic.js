export const calculateScores = (answers) => {
    const mainScores = {
      problemSolving: 0,
      decisionMaking: 0,
      creativity: 0,
      analyticalDepth: 0,
      collaboration: 0,
    };
  
    // Map question categories to main score variables
    const categoryMapping = {
      problemSolving: "problemSolving",
      decisionMaking: "decisionMaking",
      creativity: "creativity",
      analyticalDepth: "analyticalDepth",
      collaboration: "collaboration",
    };
  
    // Tally the scores based on user's answers
    answers.forEach((answer) => {
      const parentCategory = categoryMapping[answer.category];
      if (parentCategory) {
        mainScores[parentCategory] += answer.score;
      }
    });
  
    // Define weights for each main category (total weight = 30)
    const weights = {
      problemSolving: 9.0, // Problem-Solving
      decisionMaking: 7.5, // Decision-Making
      creativity: 4.5, // Creativity
      analyticalDepth: 6.0, // Analytical Depth
      collaboration: 3.0, // Collaboration
    };
  
    // Normalize scores (scale each category's score to its weight)
    const normalizedScores = {};
    let overallScore = 0;
  
    for (const [category, weight] of Object.entries(weights)) {
      const rawScore = mainScores[category]; // Total raw score for this category
      const maxPossibleScore = 25; // 5 questions × 5 max points
      const weightedScore = (rawScore / maxPossibleScore) * weight; // Normalize and scale by weight
      normalizedScores[category] = parseFloat(weightedScore.toFixed(2)); // Round to 2 decimals
      overallScore += weightedScore; // Accumulate into overall score
    }
  
    return {
      normalizedScores, // Detailed breakdown of scores for each category
      overallScore: parseFloat(overallScore.toFixed(2)), // Total overall score (out of 30)
    };
  };
  