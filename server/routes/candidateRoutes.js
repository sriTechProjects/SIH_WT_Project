const express = require("express");
const router = express.Router();

const {
  allCandidates,
  findCandidate,
  updateCandidate,
  completeDetails,
} = require("../controllers/candidateController/candidate_crud");

const {
  addCandidate,
  loginCandidate,
  signoutCandidate,
} = require("../controllers/candidateController/login");

const {
  forgotPassword_email_sender,
  otpVerification,
  newPasswordMaking,
} = require("../controllers/localController/forgotPassword");

const {
  dashboardDetails,
  jobData,
} = require("../controllers/candidateController/getData");

const authenticate = require("../middleware/authenticate");
const apiLimiter = require("../middleware/apiLimiter");
const multiRoleAccess = require("../middleware/roleBasedAccess");
const upload = require("../config/uploadconfig");

router.get("/all", apiLimiter, allCandidates);
router.get("/find/:id", apiLimiter, authenticate, findCandidate);
router.put(
  "/update/:id",
  // authenticate,
  // multiRoleAccess(["Candidate", "Admin"]),
  updateCandidate
);

// Use upload middleware for resume file uploads
router.post("/signup", apiLimiter, addCandidate);
router.post("/signin", apiLimiter, loginCandidate);
router.post("/signout", apiLimiter, signoutCandidate);

router.get("/all", apiLimiter, authenticate, allCandidates);
router.post("/forgotpass", forgotPassword_email_sender);
router.post("/otpVerify/:email", otpVerification);
router.post("/newPassword/:email", newPasswordMaking);
router.post("/completeDetails", upload.single("resume"), completeDetails);

router.get("/dashboard", dashboardDetails);
router.get("/jobs", jobData);

module.exports = router;
