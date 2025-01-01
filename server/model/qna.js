const mongoose = require("mongoose");

const category = [
  "problemSolving",
  "collaboration",
  "decisionMaking",
  "creativity",
  "analyticalDepth",
];

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, enum: category, required: true },
  isSelected: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [optionSchema],
    required: true,
  },
});

module.exports = mongoose.model("Qna", questionSchema);
