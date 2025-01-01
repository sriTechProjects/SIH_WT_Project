const express = require("express");
const apiLimiter = require("../middleware/apiLimiter");
const authenticate = require("../middleware/authenticate");
const {
  fetchPanelsUsingJobId,
} = require("../controllers/jobController/jobsOther");
const {
  getAllPanel,
  getPanel,
  updatePanel,
  deletePanel,
  createPanel,
} = require("../controllers/panelController/panel_Crud");
const { getExperts } = require("../controllers/panelController/getExperts");
const router = express.Router();

// const {getExperts} = require("../controllers/panelController/getExperts")

//  protected..Routes>
router.post(
  "/add",
  apiLimiter,
  //   multiRoleAccess(["Admin"]),
  // authenticate,
  createPanel
);
router.get("/all", apiLimiter, authenticate, getAllPanel);
router.get("/get/:id", getPanel); 
router.delete(
  "/del/:id",
  apiLimiter,
  //   multiRoleAccess(["Admin"]),
  authenticate,
  deletePanel
);
router.put(
  "/update",
  apiLimiter,
  // authenticate,
  //   multiRoleAccess(["Admin"]),
  updatePanel
);

// fetching the panels using the jobId
router.get("/job/:jobID", fetchPanelsUsingJobId);

router.get("/getExperts",getExperts);

module.exports = router;
