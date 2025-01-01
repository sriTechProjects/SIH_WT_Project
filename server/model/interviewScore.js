const mongoose = require("mongoose");

const interviewScoresSchema = new mongoose.Schema({
    panelId: { type: String, required: true, ref: "Panel" },
    scores: [{
        candidateId: { type: String, required: true, ref: "Candidate" },
        technicalKnowledge: {
            fundamentalKnowledge: { score: { type: Number, default: 0 } },
            applicationKnowledge: { score: { type: Number, default: 0 } },
            currentTrends: { score: { type: Number, default: 0 } },
            defenceTechnologies: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        problemSolving: {
            problemSolvingApproach: { score: { type: Number, default: 0 } },
            logicalReasoning: { score: { type: Number, default: 0 } },
            abilityToSolveComplexIssues: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        researchAndProjectExperience: {
            qualityOfResearchWork: { score: { type: Number, default: 0 } },
            practicalExperience: { score: { type: Number, default: 0 } },
            handsOnExperience: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        communicationSkills: {
            qualityOfSpeaking: { score: { type: Number, default: 0 } },
            abilityToExplain: { score: { type: Number, default: 0 } },
            listeningSkills: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        leadershipAndTeamworkAbilities: {
            collaborativeWork: { score: { type: Number, default: 0 } },
            leadershipPotential: { score: { type: Number, default: 0 } },
            collaborativeThinking: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        generalAptitude: {
            willingnessToLearn: { score: { type: Number, default: 0 } },
            stressHandling: { score: { type: Number, default: 0 } },
            generalDemeanor: { score: { type: Number, default: 0 } },
            suggestion:{type:String, default:""},
            totalScore: { type: Number, default: 0 },
        },
        overallScore: { type: Number, default: 0 },
    }],
});

module.exports = mongoose.model("InterviewScore", interviewScoresSchema);
