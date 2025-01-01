const express = require("express");
const {
  getAllQuestion,
  createQuestion,
  getQuestion,
  delQuestion,
  updQuestion,
} = require("../controllers/qnaController/qna_Crud");
const router = express.Router();

router.get("/all", getAllQuestion);
router.post("/create", createQuestion);
router.get("/:id", getQuestion);
router.delete("/:id", delQuestion);
router.post("/upd/:id", updQuestion);

module.exports = router;
