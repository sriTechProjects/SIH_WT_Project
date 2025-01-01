const express = require("express");
const router = express.Router();
const { handleQuery } = require("../controllers/chatbotController/chatbotController");

// POST route for chatbot queries
router.post("/query", handleQuery);

module.exports = router;