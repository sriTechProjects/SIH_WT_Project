const express = require("express");
const { flaskFlag } = require("../config/flaskConnect");
const {
  insertManyExperts,
  insertManyCandidates,
} = require("../controllers/ML_Controller/manyExperts");
const {
  flaskOperations,
  expertSelectionRoute,
  totalSelectedExperts,
} = require("../controllers/ML_Controller/flaskOperations");
const router = express.Router();

(async () => {
  try {
    const result = await flaskFlag();
    console.log("Result from Flask API:", result);
  } catch (error) {
    console.error("Error during test:");
  }
})();

// for mass Inserting of the experts
router.post("/e_bulk", insertManyExperts);
router.post("/c_bulk", insertManyCandidates);

// calling the candidate and expert score calculating api from flask
// run_expert_candidate_score_updator
router.get("/recsu", flaskOperations);
router.post("/expertSelection", expertSelectionRoute);
router.post("/totalSelectedExperts", totalSelectedExperts);

module.exports = router;
