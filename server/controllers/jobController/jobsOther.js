const asyncHandler = require("express-async-handler");
const Job = require("../../model/jobRole");
const panels = require("../../model/panel");

const fetchDomainDepartments = asyncHandler(async (req, res) => {
  try {
    const domainDepartments = await Job.distinct("domainDepartment");

    if (!domainDepartments.length) {
      return res.status(404).json({
        message: "No domainDepartments available",
        success: false,
      });
    }

    res.status(200).json({
      message: "domainDepartments fetched successfully",
      success: true,
      data: domainDepartments,
    });
  } catch (error) {
    console.error("Error fetching all domainDepartments:", error);
    res.status(500).json({
      message: "Error fetching all domainDepartments",
      success: false,
    });
  }
});

const fetchJobRoles = asyncHandler(async (req, res) => {
  const domain = req.params.domain;
  console.log("this is the domain : ", domain);
  try {
    const fetchJobRole = await Job.find({
      domainDepartment: domain,
    });

    if (!fetchJobRole) {
      return res.status(404).json({
        message: "No fetchJobRole available",
        success: false,
      });
    }

    res.status(200).json({
      message: "fetchJobRole fetched successfully",
      success: true,
      data: fetchJobRole,
    });
  } catch (error) {
    console.error("Error fetching all fetchJobRole:", error);
    res.status(500).json({
      message: "Error fetching all fetchJobRole",
      success: false,
    });
  }
});

const fetchPanelsUsingJobId = asyncHandler(async (req, res) => {
  const jobID = req.params.jobID;
  console.log(jobID);
  console.log("this is the domain : ", jobID);
  try {
    const fetchPanelsUsingJobId = await panels.find({
      jobID,
    });

    if (!fetchPanelsUsingJobId) {
      return res.status(404).json({
        message: "No fetchJobRole available",
        success: false,
      });
    }

    res.status(200).json({
      message: "Panels fetched successfully",
      success: true,
      data: fetchPanelsUsingJobId,
    });
  } catch (error) {
    console.error("Error fetching Panels Using the jobId:", error);
    res.status(500).json({
      message: "Error fetching Panels Using the jobId",
      success: false,
    });
  }
});

module.exports = {
  fetchDomainDepartments,
  fetchJobRoles,
  fetchPanelsUsingJobId,
};
