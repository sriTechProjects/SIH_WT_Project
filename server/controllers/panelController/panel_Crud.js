const asyncHandler = require("express-async-handler");
const Panel = require("../../model/panel");
const candidate = require("../../model/candidate");
const expert = require("../../model/expert");
const { writeFunctionality } = require("../../bc");

// PRIVATE ROUTE
// http://localhost:8000/api/panel/create
// PRIVATE ROUTE
// http://localhost:8000/api/panel/create
const createPanel = asyncHandler(async (req, res) => {
  const {
    panelID,
    jobID,
    panelInfo,
    finalSkillScore,
    finalApproachScore,
    finalScore,
  } = req.body;
  console.log("Panel model loaded:", Panel); // Debug panel model
  console.log(panelID);

  try {
    // Validate panelExperts structure
    for (const expert of panelInfo.panelExperts) {
      if (!expert.expertID || !expert.expertName) {
        return res.status(400).json({
          message: "Each panel expert must have an expertID and expertName",
        });
      }
    }

    // Check if panelID already exists
    const existingPanel = await Panel.findOne({ panelID });
    if (existingPanel) {
      return res
        .status(200)
        .json({ message: `Panel with ID ${panelID} already Created. `});
    }

    // Create a new panel
    const newPanel = new Panel({
      panelID,
      jobID,
      panelInfo: {
        panelExperts: panelInfo.panelExperts,
      },
      finalSkillScore: finalSkillScore,
      finalApproachScore: finalApproachScore,
      finalScore: finalScore,
    });

    const savedPanel = await newPanel.save();
    console.log("Panel saved successfully");

    const expertIds = newPanel.panelInfo.panelExperts.map(
      (expert) => expert.expertID
    );

    await writeFunctionality(savedPanel._id.toString(), expertIds);

    return res.status(201).json(savedPanel);
  } catch (error) {
    console.error("Error adding panel:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/update/:id
const updatePanel = asyncHandler(async (req, res) => {
  const {
    panelID,
    jobID,
    panelInfo,
    finalSkillScore,
    finalApproachScore,
    finalScore,
    candidates,
  } = req.body;
  try {
    console.log(candidates);
    if (!panelID) {
      return res.status(400).json({ message: "Panel ID is required." });
    }

    const panel = await Panel.findOne({ panelID });

    if (!panel) {
      return res
        .status(404)
        .json({ message: `Panel with ID ${panelID} not found.` });
    }

    // Update panel information
    panel.panelInfo = panelInfo;
    panel.finalSkillScore = finalSkillScore;
    panel.jobID = jobID;
    panel.finalApproachScore = finalApproachScore;
    panel.finalScore = finalScore;

    if (candidates) {
      panel.candidates = candidates;
    }

    await panel.save();

    res.status(200).json({ message: "Panel updated successfully.", panel });
  } catch (error) {
    console.error("Error updating panel:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/del/:id
const deletePanel = asyncHandler(async (req, res) => {
  const panelId = req.params.id;
  try {
    const deletedPanel = await Panel.findByIdAndDelete(panelId);
    if (!deletedPanel) {
      return res.status(404).json({
        message: "Panel not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Panel deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error Deleting The Panel", error);
    res.status(500).json({ message: "Error deleting the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/get/:id
const getPanel = asyncHandler(async (req, res) => {
  const panelId = req.params.id;
  try {
    const foundPanel = await Panel.findById(panelId);
    if (!foundPanel) {
      return res.status(404).json({
        message: "Panel not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Panel retrieved successfully",
      success: true,
      data: foundPanel,
    });
  } catch (error) {
    console.log("Error Getting The Panel", error);
    res.status(500).json({ message: "Error fetching the panel" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/panel/all
const getAllPanel = asyncHandler(async (req, res) => {
  try {
    const allPanels = await Panel.find();
    if (!allPanels.length) {
      return res.status(404).json({
        message: "No Panel data is available",
        success: false,
      });
    }
    res.status(200).json(allPanels);
  } catch (error) {
    console.log("Error Fetching All Panels", error);
    res.status(500).json({ message: "Error fetching all panels" });
  }
});

module.exports = {
  createPanel,
  updatePanel,
  getPanel,
  deletePanel,
  getAllPanel,
};
