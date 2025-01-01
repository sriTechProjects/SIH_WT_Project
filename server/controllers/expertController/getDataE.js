const mongoose = require("mongoose");
const Expert = require("../../model/expert");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel")
const asyncHandler = require("express-async-handler");


const dashboardDetailsForExpert = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expert ID format",
            });
        }

        const expert = await Expert.findById(id);
        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        const panels = await Panel.find({ "panelInfo.panelExperts.expertID": id });
        const plainPanels = panels.map(panel => panel.toObject());

        // Extract jobIDs from the panels
        const jobIDs = plainPanels.map(panel => panel.jobID);

        // if (jobIDs.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No valid jobIDs found for the expert",
        //     });
        // }

        // Fetch job details for the extracted jobIDs
        const jobs = await Jobs.find({ _id: { $in: jobIDs } });

        // Group candidates job-wise
        const jobCandidates = {};
        plainPanels.forEach(panel => {
            const jobID = panel.jobID;

            // If this jobID is not already in the result object, initialize it
            if (!jobCandidates[jobID]) {
                jobCandidates[jobID] = [];
            }

            // Add the candidates for this jobID
            jobCandidates[jobID].push(...panel.candidates);
        });
        const responseArray = plainPanels.map(panel => {
            const job = jobs.find(job => job._id.toString() === panel.jobID);

            return {
                panelName: panel.panelID, // Panel name
                departmentName: job ? job.domainDepartment : "Unknown", // Department name
                candidateCount: panel.candidates.length // Candidate count for the job role
            };
        });

        res.status(200).json({
            success: true,
            expert,
            panels,
            jobs,
            jobCandidates,
            responseArray,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});



module.exports = dashboardDetailsForExpert;