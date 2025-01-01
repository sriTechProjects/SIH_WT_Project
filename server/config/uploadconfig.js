const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir;
        const role = JSON.parse(req.body.personalInfo)?.role;
        // console.log(role);
        if (role == "candidate") {
            uploadDir = path.join(__dirname, "../uploads/Candidate/Resume");
            console.log(req.body.role);
        } else if (role == "expert") {
            uploadDir = path.join(__dirname, "../uploads/Expert/Resume");
            console.log(req.body.role);
        } else {
            uploadDir = path.join(__dirname, "../uploads/");
        }

        // Ensure the directory exists
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                return cb(err); // Handle directory creation errors
            }
            cb(null, uploadDir);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    // Accept only specific file types (e.g., PDF, DOCX)
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype.toLowerCase());
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
    }

};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter,
});

module.exports = upload;
