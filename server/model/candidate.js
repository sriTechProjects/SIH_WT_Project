const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  jobId: {
    type: String,
  },
  personalDetails: {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false },
      lastName: { type: String, required: true },
    },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    contact: {
      email: { type: String, required: true },
      phoneNo: { type: String, required: true },
      recoveryEmail: { type: String, required: false },
    },
    password: { type: String, required: true },
    idProof: {
      type: { type: String, required: true },
      number: { type: String, required: true },
    },
    permanentAddress: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
    },
    role: {
      type: String,
      default: "Candidate",
    },
  },
  twoFactorAuth: {
    enabled: { type: Boolean },
    method: { type: String },
  },
  skills: [{ type: String, required: true }],
  areaOfExpertise: [{ type: String, required: true }],
  resume: {
    filename: { type: String, required: true },
    fileType: { type: String, required: true },
  },
  yearsOfExperience: { type: Number, required: true },
  qualifications: [
    {
      degree: { type: String, required: true },
      institute: { type: String, required: true },
      yearOfAdmission: { type: Number, required: true },
      yearOfCompletion: { type: Number, required: true },
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      skills: [{ type: String, required: true }],
    },
  ],
  researchPapers: [
    {
      title: { type: String, required: true },
      year: { type: Number, required: true },
      skills: [{ type: String, required: true }],
      link: { type: String, required: false },
    },
  ],
  skillRelevancyScore: {
    skills: { type: Number, required: false },
    yearsOfExperience: { type: Number, required: false },
    qualification: { type: Number, required: false },
    researchPapers: { type: Number, required: false },
    projects: { type: Number, required: false },
    totalSkillRelevancyScore: { type: Number, required: false },
  },
  approachRelevancyScore: {
    problemSolving: { type: Number, required: false },
    collaboration: { type: Number, required: false },
    decisionMaking: { type: Number, required: false },
    creativity: { type: Number, required: false },
    analyticalDepth: { type: Number, required: false },
    totalApproachRelevancyScore: { type: Number, required: false },
  },
  finalScore: { type: Number, required: false },
});

module.exports = mongoose.model("Candidate", candidateSchema);
