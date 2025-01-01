const mongoose = require("mongoose");
const Job = require("../../model/jobRole");
const upload = require("../../config/uploadconfig");
const asyncHandler = require("express-async-handler");

// PRIVATE ROUTE
// POST http://localhost:8000/api/job/create
const createJob = asyncHandler(async (req, res) => {
  try {
    const jobData = req.body;
    console.log(req.file);
    // Validate required fields
    if (!jobData) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const newJob = new Job({
      jobTitle: jobData.title,
      jobDescription: jobData.description,
      domainDepartment: jobData.domain,
      boardOfSubjectDocument: {
        fileName: req.file.filename,
        fileType: req.file.mimetype,
      },
      keyResponsibilities: "default",
      minimumQualifications: "default",
      yearsOfExperience: 0,
      preferredSkills: "default",
    });
    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      success: true,
      data: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job", success: false });
  }
});

// PRIVATE ROUTE
// GET http://localhost:8000/api/job/all
const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs.length) {
      return res.status(200).json({
        message: "No jobs available",
        success: false,
      });
    }

    res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res
      .status(500)
      .json({ message: "Error fetching all jobs", success: false });
  }
});

// PRIVATE ROUTE
// DELETE http://localhost:8000/api/job/delete/:id
const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  // Validate jobId
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job ID",
      success: false,
    });
  }

  try {
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(`Error deleting job with ID ${jobId}:`, error);
    res.status(500).json({ message: "Error deleting job", success: false });
  }
});

const getJobByID = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job ID",
      success: false,
    });
  }
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: `Unable to fetch the job with ID: ${jobId}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    res.status(500).json({ message: "Error fetching job", success: false });
  }
});

const jobUpdate = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const { data } = req.body;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      message: "Invalid job ID",
      success: false,
    });
  }
  try {
    const job = await Job.findByIdAndUpdate(jobId, data);
    if (!job) {
      return res.status(404).json({
        message: `Unable to Update the job with ID: ${jobId}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Updated Job successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    res.status(500).json({ message: "Error fetching job", success: false });
  }
});

module.exports = {
  createJob,
  getAllJobs,
  upload,
  deleteJob,
  getJobByID,
  jobUpdate,
};
