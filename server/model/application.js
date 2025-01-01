const mongoose = require("mongoose");

const applications = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    jobStatus: {
        type: String,
        required: true
    },
    applicationStatus: [
        {
            candidateId: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model("Applications", applications);
