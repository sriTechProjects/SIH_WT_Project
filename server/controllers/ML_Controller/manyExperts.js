const asyncHandler = require("express-async-handler");
const Expert = require("../../model/expert");
const candidate = require("../../model/candidate");

const insertManyExperts = asyncHandler(async (req, res) => {
  try {
    const { experts } = req.body;

    if (!experts || !Array.isArray(experts) || experts.length === 0) {
      return res.status(400).json({
        message: "No experts data provided or the data is not an array",
        success: false,
      });
    }

    const manyExperts = await Expert.insertMany(experts);

    return res.status(200).json({
      message: "Experts Created Successfully",
      success: true,
      data: manyExperts,
    });
  } catch (error) {
    console.log("Error Inserting Many Experts: ", error);
    res.status(500).json({
      message: `Error Inserting Many Experts: ${error.message}`,
      success: false,
    });
  }
});
const insertManyCandidates = asyncHandler(async (req, res) => {
  try {
    const { candidates } = req.body;

    if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
      return res.status(400).json({
        message: "No experts data provided or the data is not an array",
        success: false,
      });
    }

    const manyCandidates = await candidate.insertMany(candidates);

    return res.status(200).json({
      message: "Candidates Created Successfully",
      success: true,
      data: manyCandidates,
    });
  } catch (error) {
    console.log("Error Inserting Many manyCandidates: ", error);
    res.status(500).json({
      message: `Error Inserting Many manyCandidates: ${error.message}`,
      success: false,
    });
  }
});

module.exports = { insertManyExperts, insertManyCandidates };
