const asyncHandler = require("express-async-handler");

const createScore = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log("Error Creating The Score", error);
    res.status(500).json({ message: "Error updating the panel" });
  }
});
