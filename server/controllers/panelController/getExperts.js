const mongoose = require("mongoose");
// const tp = "Naval";
const externalExperts = require("../../model/externalExperts");
const Application = require("../../model/application");
const Jobs = require("../../model/jobRole");
const Panel = require("../../model/panel");
const asyncHandler = require("express-async-handler");
const stringSimilarity = require("string-similarity");

const getExperts = asyncHandler(async (req, res) => {
    try {
        const jobDomain = req.query.jobDomain;
        console.log(jobDomain);
        const experts = await externalExperts.find();

        const similarExperts = experts.filter(expert => {
            const similarity = stringSimilarity.compareTwoStrings(expert.fieldOfExpertise.domain, jobDomain);
            return similarity > 0.5;
        });
        const data = [];
        similarExperts.forEach((expert) => {
            const name = expert.personalDetails.name.firstName + " " + expert.personalDetails.name.lastName;

            // Check if the name already exists in the data array
            const isNamePresent = data.some((entry) => entry.fullName === name);

            // Add to the data array only if the name is not present
            if (!isNamePresent) {
                data.push({
                    profilePic: name,
                    fullName: name,
                    designation: expert.fieldOfExpertise.designation,
                    email: "",
                    domain: expert.fieldOfExpertise.domain,
                    department: "",
                });
            }
        });

        // console.log(data);

        // Send the response
        res.status(200).json({
            success: true,
            // similarExperts,
            data, // Send the structured data
        });
    } catch (error) {
        console.error("Error fetching experts:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch experts",
            error: error.message,
        });
    }
});





const createExpert = async (req, res) => {
    try {
        // Extract data from the request body
        const expertData = req.body;
        console.log(expertData);
        // Create a new expert document
        const newExpert = new externalExperts(expertData);

        // Save the document to the database
        await newExpert.save();

        // Respond with the created expert
        res.status(201).json({
            success: true,
            message: "Expert created successfully",
            data: newExpert,
        });
    } catch (error) {
        console.error("Error creating expert:", error);

        // Handle validation errors or other issues
        res.status(400).json({
            success: false,
            message: "Failed to create expert",
            error: error.message,
        });
    }
};

module.exports = { getExperts, createExpert };