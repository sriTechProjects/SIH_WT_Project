const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel");
const asyncHandler = require("express-async-handler");

//http://localhost:8000/api/candidate/dashboard
const dashboardDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;

        // Validate if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid candidate ID format",
            });
        }

        console.log("CandID: ", id);

        // Fetch the candidate details
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        // Fetch all panels where this candidate exists
        const panels = await Panel.find(
            { "candidates.candidateID": id },
            { jobID: 1, _id: 0 } // Only return the jobID field (exclude _id)
        );

        // if (panels.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No panels found for the candidate",
        //     });
        // }

        const plainPanels = panels.map(panel => panel.toObject());
        const jobIDs = plainPanels
            .filter(panel => panel.jobID) // Exclude panels with missing jobID
            .map(panel => panel.jobID);



        const [jobs, panelDetails] = await Promise.all([
            Jobs.find({ _id: { $in: jobIDs } }, { jobTitle: 1, jobDescription: 1, domainDepartment: 1 }),
            Panel.find({ jobID: { $in: jobIDs } }) // Fetch full panel details if needed
        ]);

        // Log missing jobs for debugging
        const missingJobs = jobIDs.filter(id => !jobs.some(job => job._id.toString() === id.toString()));
        if (missingJobs.length > 0) {
            console.warn("Missing Jobs for jobIDs: ", missingJobs);
        }

        // Combine or format data as needed
        const combinedData = jobs.map(job => {
            const panel = panelDetails.find(p => p.jobID?.toString() === job._id.toString());
            return {
                jobID: job._id,
                jobTitle: job.jobTitle,
                jobDescription: job.jobDescription,
                domainDepartment: job.domainDepartment,
                panelDetails: panel || null, // Use null if no matching panel
            };
        });

        // Fetch applications for the candidate
        const applications = await Application.find({
            "applicationStatus.candidateId": id,
        }).select("jobId applicationStatus.jobStatus");

        const plainApplications = applications.map(application=>application.toObject());
        console.log(plainApplications);
        const appliedJobIDs = plainApplications.map(application => application.jobId);

        console.log("Job IDs: ", appliedJobIDs);

        // Fetch job details for applied jobs
        const appliedJobs = await Jobs.find({ _id: { $in: appliedJobIDs } }).select(
            "jobTitle jobDescription domainDepartment"
        );


        // Format the response
        const formattedApplications = applications.map(application => ({
            jobStatus: application.applicationStatus.jobStatus,
            jobId: application.jobId,
        }));

        res.status(200).json({
            success: true,
            candidate,
            panelJobs: jobs, // Jobs associated with panels
            appliedJobs: appliedJobs, // Jobs that the candidate applied for
            applicationDetails: formattedApplications, // Application details with jobStatus
            combinedData,
        });
    } catch (error) {
        console.error("Error fetching dashboard details: ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});






//http://localhost:8000/api/candidate/getJobs
const jobData = asyncHandler(async (req, res) => {
    try {
        const jobs = await Jobs.find();
        res.status(200).json({
            success: true,
            jobs: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
})

module.exports = { dashboardDetails, jobData };