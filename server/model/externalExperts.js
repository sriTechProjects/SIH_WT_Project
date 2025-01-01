const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  personalDetails: {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, default: "" },
      lastName: { type: String, required: true },
    },
  },
  fieldOfExpertise: {
    domain: { type: String, required: true },
    designation: { type: String, required: true },
    skills: [{ type: String }],
    yearsOfExperience: { type: String, required: true },
    qualifications: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        yearOfCompletion: { type: String, required: true },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        skillsGained: [{ type: String }],
      },
    ],
    publications: [
      {
        title: { type: String, required: true },
        link: { type: String },
        year: { type: String },
        skills: [{ type: String }],
      },
    ],
  },
});

const eExpert = mongoose.model("externalExperts", expertSchema);

module.exports = eExpert;