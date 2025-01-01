const express = require("express");
// const testPDFGeneration = require("../controllers/expertController/reportGen")
const expertDetails = require("../controllers/expertController/getDataE");
const router = express.Router();
const {
  allExperts,
  findExpert,
  updateExperts,
  delExpert,
  findExpertByEmail,
  uniqueJobDomain,
} = require("../controllers/expertController/expert_Crud");
const authenticate = require("../middleware/authenticate");
const {
  createExpert,
  loginExpert,
  signoutExpert,
} = require("../controllers/expertController/logSign");
const apiLimiter = require("../middleware/apiLimiter");
const multiRoleAccess = require("../middleware/roleBasedAccess");

//  protected..Routes>
router.get("/all", apiLimiter, allExperts); // here i have removed the authenticate middlware
router.get("/get/:id", apiLimiter, findExpert);
router.get("/get/email/:id", apiLimiter, findExpertByEmail);
router.get("/uniqueDomain", uniqueJobDomain);
router.get("/dashboard",apiLimiter,expertDetails);

router.put(
  "/update/:id",
  apiLimiter,
  // authenticate,
  // multiRoleAccess(["Expert", "Admin"]),
  updateExperts
);
router.delete(
  "/del/:id",
  apiLimiter,
  authenticate,
  multiRoleAccess(["Expert", "Admin"]),
  delExpert
);
// router.get("/test-pdf", testPDFGeneration);

// login and signup routes public..Routes>
router.post("/signup", apiLimiter, createExpert);
router.post("/signin", apiLimiter, loginExpert);
router.post("/signout", apiLimiter, signoutExpert);

module.exports = router;