const express = require("express");
// const upload = require("../db/uploadconfig")
const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  upload,
  getJobByID,
  jobUpdate,
} = require("../controllers/jobController/job_crud");
const authenticate = require("../middleware/authenticate");
const apiLimiter = require("../middleware/apiLimiter");
const multiRoleAccess = require("../middleware/roleBasedAccess");
const {
  fetchDomainDepartments,
  fetchJobRoles,
  fetchPanelsUsingJobId,
} = require("../controllers/jobController/jobsOther");

// Routes for job operations (protected routes)
router.post(
  "/create",
  apiLimiter,
  authenticate,
  multiRoleAccess(["Admin", "Recruiter"]),
  upload.single("jobDoc"),
  createJob
); // Only Admin and Recruiter roles can create jobs

router.delete(
  "/delete/:id",
  apiLimiter,
  // authenticate,
  // multiRoleAccess(["Admin"]),
  deleteJob
); // Only Admin can delete jobs

router.get("/all" /* ,authenticate*/, getAllJobs); // Protected route for fetching all jobs
router.get("/get/:id" /* ,authenticate*/, getJobByID); // Protected route for fetching a job by ID

router.get(
  "/domainDepartment",
  // apiLimiter /* ,authenticate*/,
  fetchDomainDepartments
);

router.get("/jobRole/:domain", /* ,authenticate*/ fetchJobRoles);
router.post("/update/:jobId", jobUpdate);

module.exports = router;
