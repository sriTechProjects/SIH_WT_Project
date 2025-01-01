const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobId: {
    type: String, // Fixed typo here (changed string to String)
  },
  jobRole: {
    type: String, // Fixed typo here (changed string to String)
  },
  domainDepartment: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  keyResponsibilities: {
    type: [String], // Optional: Array of responsibilities
  },
  boardOfSubjectDocument: {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
  },
  minimumQualifications: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  preferredSkills: {
    type: [String], // Array of skills
  },
  noOfPanels: {
    type: Number,
    required: false, // Optional field
  },
  noOfExperts: {
    type: Number,
    required: false, // Optional field
  },
  interviewDate: {
    type: Date,
    required: false, // Optional field
  },
  SKILL_WEIGHT: {
    type: Number,
    required: false, // Optional field
  },
  EXPERIENCE_WEIGHT: {
    type: Number,
    required: false, // Optional field
  },
  QUALIFICATION_WEIGHT: {
    type: Number,
    required: false, // Optional field
  },
  RESEARCH_WEIGHT: {
    type: Number,
    required: false, // Optional field
  },
  PROJECT_WEIGHT: {
    type: Number,
    required: false, // Optional field
  },
});

module.exports = mongoose.model("Job", JobSchema);
