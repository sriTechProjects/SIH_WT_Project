const mongoose = require("mongoose");
const Expert = require("../../model/expert");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const eExpert = require("../../model/externalExperts");

// PRIVATE ROUTE
// http://localhost:8000/api/expert/all
const allExperts = asyncHandler(async (req, res) => {
  try {
    const experts = await Expert.find(
      {},
      {
        password: 0,
        expertProfile: {
          additionalInputs: {
            // removed the publications {as per shivam suggestions}
            publications: 0,
          },
        },
      }
    );
    if (!experts.length) {
      return res.status(404).json({
        message: "No experts data is available",
        success: false,
      });
    }
    res.status(200).json(experts);
  } catch (error) {
    console.log("Error fetching all experts :-: ", error);
    res.status(500).json({ message: "Error fetching all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/update
const updateExperts = asyncHandler(async (req, res) => {
  const expertId = req.params.id;
  const expertData = req.body;
  try {
    if (expertData.password) {
      delete expertData.password;
    }

    const expert = await Expert.findByIdAndUpdate(
      expertId,
      { $set: expertData },
      { new: true }
    );
    if (!expert) {
      return res.status(404).json({
        message: "Expert not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Expert updated successfully",
      success: true,
      data: expert,
    });
  } catch (error) {
    console.log(`Error Updating experts with ${expertId} :-: \n\n `, error);
    res.status(500).json({ message: "Error Updating all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/find
const findExpert = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(typeof id);
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing Expert ID",
        success: false,
      });
    }
    const expert = await Expert.findById(id, {
      password: 0,
    });

    if (!expert) {
      return res.status(404).json({
        message: `Unable to fetch the expert with id :-: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Expert fetched successfully",
      success: true,
      data: expert,
    });
  } catch (error) {
    console.log(`Error fetching experts with ${id} :-:\n\n `, error);
    res.status(500).json({ message: "Error fetching all experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/find/:email
const findExpertByEmail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        message: "Invalid or missing Expert ID",
        success: false,
      });
    }
    const expert = await Expert.findOne(
      {
        "personalDetails.contact.email": id,
      },
      {
        "personalDetails.password": 0,
        "personalDetails.idProof": 0,
      }
    );

    if (!expert) {
      return res.status(404).json({
        message: `Unable to fetch the expert with email :-: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Expert fetched successfully",
      success: true,
      data: expert,
    });
  } catch (error) {
    console.log(`Error fetching experts with ${id} :-:\n\n `, error);
    res.status(500).json({ message: "Error fetching experts" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/expert/del/:id
const delExpert = asyncHandler(async (req, res) => {
  const expertId = req.params.id;
  try {
    const result = await Expert.findByIdAndDelete({
      _id: expertId,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Expert not found", sucess: false });
    }

    res.status(200).json({ message: "Expert deleted successfully" });
  } catch (error) {
    console.error(`Error deleting expert with email ${expertId}:`, error);
    res.status(500).json({ message: "Error deleting expert", sucess: true });
  }
});

const uniqueJobDomain = asyncHandler(async (req, res) => {
  try {
    const uniqueDomains = await eExpert.distinct("fieldOfExpertise.domain");
    res.status(200).json({
      message: "Unique job domains retrieved successfully",
      success: true,
      data: uniqueDomains,
    });
  } catch (error) {
    console.error("Error retrieving unique domains:", error);
    res.status(500).json({
      message: "Error retrieving unique domains",
      success: false,
    });
  }
});

module.exports = {
  uniqueJobDomain,
  allExperts,
  findExpert,
  updateExperts,
  delExpert,
  findExpertByEmail,
};
