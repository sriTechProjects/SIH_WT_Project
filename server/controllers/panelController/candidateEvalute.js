const InterviewScore = require("../../model/interviewScore"); // Adjust path as needed

// Function to add scores for a candidate
const addInterviewScores = async (req, res) => {
    try {
        const {
            panelId,
            candidateId,
            scores
        } = req.body;

        // Validate required fields
        if (!panelId || !candidateId || !scores) {
            return res.status(400).json({
                message: "panelId, candidateId, and scores are required."
            });
        }

        // Calculate total scores for each section
        const s1totalScore = scores.technicalKnowledge.fundamentalKnowledge.score + 
                              scores.technicalKnowledge.applicationKnowledge.score + 
                              scores.technicalKnowledge.currentTrends.score + 
                              scores.technicalKnowledge.defenceTechnologies.score;

        const s2totalScore = scores.problemSolving.problemSolvingApproach.score + 
                              scores.problemSolving.logicalReasoning.score + 
                              scores.problemSolving.abilityToSolveComplexIssues.score;

        const s3totalScore = scores.researchAndProjectExperience.qualityOfResearchWork.score + 
                              scores.researchAndProjectExperience.practicalExperience.score + 
                              scores.researchAndProjectExperience.handsOnExperience.score;

        const s4totalScore = scores.communicationSkills.qualityOfSpeaking.score + 
                              scores.communicationSkills.abilityToExplain.score + 
                              scores.communicationSkills.listeningSkills.score;

        const s5totalScore = scores.leadershipAndTeamworkAbilities.collaborativeWork.score + 
                              scores.leadershipAndTeamworkAbilities.leadershipPotential.score + 
                              scores.leadershipAndTeamworkAbilities.collaborativeThinking.score;

        const s6totalScore = scores.generalAptitude.willingnessToLearn.score + 
                              scores.generalAptitude.stressHandling.score + 
                              scores.generalAptitude.generalDemeanor.score;

        // Prepare the interview score data without the questions
        const interviewScoresData = {
            panelId,
            scores: [{
                candidateId,
                technicalKnowledge: {
                    fundamentalKnowledge: { score: scores.technicalKnowledge.fundamentalKnowledge.score },
                    applicationKnowledge: { score: scores.technicalKnowledge.applicationKnowledge.score },
                    currentTrends: { score: scores.technicalKnowledge.currentTrends.score },
                    defenceTechnologies: { score: scores.technicalKnowledge.defenceTechnologies.score },
                    totalScore: s1totalScore,  // Add total score for technical knowledge section
                },
                problemSolving: {
                    problemSolvingApproach: { score: scores.problemSolving.problemSolvingApproach.score },
                    logicalReasoning: { score: scores.problemSolving.logicalReasoning.score },
                    abilityToSolveComplexIssues: { score: scores.problemSolving.abilityToSolveComplexIssues.score },
                    totalScore: s2totalScore,  // Add total score for problem-solving section
                },
                researchAndProjectExperience: {
                    qualityOfResearchWork: { score: scores.researchAndProjectExperience.qualityOfResearchWork.score },
                    practicalExperience: { score: scores.researchAndProjectExperience.practicalExperience.score },
                    handsOnExperience: { score: scores.researchAndProjectExperience.handsOnExperience.score },
                    totalScore: s3totalScore,  // Add total score for research and project experience section
                },
                communicationSkills: {
                    qualityOfSpeaking: { score: scores.communicationSkills.qualityOfSpeaking.score },
                    abilityToExplain: { score: scores.communicationSkills.abilityToExplain.score },
                    listeningSkills: { score: scores.communicationSkills.listeningSkills.score },
                    totalScore: s4totalScore,  // Add total score for communication skills section
                },
                leadershipAndTeamworkAbilities: {
                    collaborativeWork: { score: scores.leadershipAndTeamworkAbilities.collaborativeWork.score },
                    leadershipPotential: { score: scores.leadershipAndTeamworkAbilities.leadershipPotential.score },
                    collaborativeThinking: { score: scores.leadershipAndTeamworkAbilities.collaborativeThinking.score },
                    totalScore: s5totalScore,  // Add total score for leadership and teamwork abilities section
                },
                generalAptitude: {
                    willingnessToLearn: { score: scores.generalAptitude.willingnessToLearn.score },
                    stressHandling: { score: scores.generalAptitude.stressHandling.score },
                    generalDemeanor: { score: scores.generalAptitude.generalDemeanor.score },
                    totalScore: s6totalScore,  // Add total score for general aptitude section
                },
                overallScore: scores.overallScore,  // Assuming you have an overall score
            }]
        };

        console.log(interviewScoresData);

        // Create a new InterviewScores document
        const newInterviewScore = new InterviewScore(interviewScoresData);

        // Save to the database
        await newInterviewScore.save();

        return res.status(201).json({
            message: "Interview scores added successfully!",
            data: newInterviewScore
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while saving interview scores.",
            error: error.message
        });
    }
};

module.exports = addInterviewScores;
