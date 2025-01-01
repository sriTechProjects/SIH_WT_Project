const File = require('../model/fileModel');

const uploadFile = async (req, res) => {
    try {
        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "Please upload a file" });
        }

        // Create a new file object to store in the database
        const file = new File({
            filename: req.file.originalname,  // Use originalname for filename
            fileType: req.file.mimetype,      // Use mimetype for file type
            data: req.file.buffer
        });

        // Save the file in the database
        await file.save();

        res.status(201).json({
            message: "File uploaded successfully",
            success: true,
            fileId: file._id,  // Correct reference to file object
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            message: "Error uploading file",
            success: false,
            error: error.message,
        });
    }
};

const getFile = async (req, res) => {
    try { 
        const fileId = req.params.id;  // Correct reference to fileId parameter
        if (!fileId) {
            return res.status(400).json({ msg: "File ID is required" });
        }

        // Find the file from the database by fileId
        const file = await File.findById(fileId);
        
        // If file not found, return an error
        if (!file) {
            return res.status(404).json({ msg: "File not found" });
        }

        // Send the file as a response
        res.set("Content-Type", file.fileType);
        res.set("Content-Disposition", `attachment; filename="${file.filename}"`);
        res.send(file.data);  // Send the file buffer to the client
    } catch (error) {
        console.error("Error getting file:", error);
        res.status(500).json({ message: "Error retrieving file", success: false });
    }
}

module.exports = { uploadFile, getFile };