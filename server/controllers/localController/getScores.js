const Candidate = require("../../model/candidate");
const Expert = require("../../model/expert");
const asyncHandler = require("express-async-handler");

const setScores = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query; // Get the ID from query parameters
        const { problemSolving, collaboration, decisionMaking, creativity, analyticalDepth } = req.body; // Get individual scores from the request body

        console.log("Body:", req.body);
        console.log("Query:", req.query);

        // Validate input
        if (!id || !problemSolving || !collaboration || !decisionMaking || !creativity || !analyticalDepth) {
            return res.status(400).json({ message: "ID and all scores are required" });
        }

        // Calculate the sum of scores
        const totalApproachRelevancyScore = problemSolving + collaboration + decisionMaking + creativity + analyticalDepth;

        // Try finding the user as a Candidate
        let user = await Candidate.findById(id);
        let role = "Candidate";

        // If not found as a Candidate, try finding as an Expert
        if (!user) {
            user = await Expert.findById(id);
            role = "Expert";
        }

        // If neither Candidate nor Expert is found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user with the calculated total score (you can save it if needed)
        user.approachRelevancyScore = { problemSolving, collaboration, decisionMaking, creativity, analyticalDepth, totalApproachRelevancyScore};

        // Save the updated user (optional)
        await user.save();

        // Respond with success
        // res.status(200).json({ message: ${role} scores updated successfully, totalScore, user });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = setScores;