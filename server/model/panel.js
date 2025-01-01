const mongoose = require("mongoose");

// Candidate Schema for Assigned Candidates
const candidateSchema = new mongoose.Schema({
  candidateID: { type: String, required: true },
  candidateName: { type: String, required: true },
  candidate_experience: {type:String, required: true},
  skillsScore: { type: Number, required: true },
  experienceScore: { type: Number, required: true },
  qualificationScore: { type: Number, required: true },
  researchScore: { type: Number, required: true },
  projectScore: { type: Number, required: true },
  finalSkillScoreOutOf70: { type: Number, required: true },
  approachRelevancyScoreOutOf30: { type: Number, required: true },
  finalCombinedScoreOutOf100: { type: Number, required: true },
});

const panelSchema = new mongoose.Schema({
  panelID: { type: String, required: true, unique: true },
  jobID: { type: String, required: true },
  panelInfo: {
    panelExperts: [
      {
        expertID: { type: String, required: true },
        expertName: { type: String, required: true },
        domain: {type:String, required:true}
      },
    ],
  },
  candidates: [
    {
      candidateID: { type: String },
      candidateName: { type: String },
      skillsScore: { type: Number },
      experienceScore: { type: Number },
      qualificationScore: { type: Number },
      researchScore: { type: Number },
      projectScore: { type: Number },
      finalSkillScoreOutOf70: { type: Number },
      approachRelevancyScoreOutOf30: { type: Number },
      finalCombinedScoreOutOf100: { type: Number },
    },
  ],
  finalSkillScore: { type: Number, min: 0 },
  finalApproachScore: { type: Number, min: 0 },
  finalScore: { type: Number, min: 0 },
  createdOn: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Panel", panelSchema);
