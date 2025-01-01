const asyncHandler = require("express-async-handler");
const qna = require("../../model/qna");

// PRIVATE ROUTE
// http://localhost:8000/api/qna/create
const createQuestion = asyncHandler(async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options) {
      return res.status(400).json({
        message: "All fields are mandatory",
        success: false,
      });
    }
    const createQuestion = await qna.create({
      question,
      options,
    });
    await createQuestion.save();
    if (!createQuestion) {
      return res.status(403).json({
        message: "Unable To Create the Question",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Question Creation Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error creating the Question", error);
    res.status(500).json({ message: "Error creating the Question" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna
const getAllQuestion = asyncHandler(async (req, res) => {
  try {
    const fetchAllQuestion = await qna
      .find(
        {},
        {
          options: {
            score: 0,
            category: 0,
          },
        }
      )
      .lean();
    if (!fetchAllQuestion) {
      return res.status(400).json({
        message: "No Question Data found!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All Question Fetched Successfully",
      success: true,
      question: fetchAllQuestion,
    });
  } catch (error) {
    console.log("Error fetching all the Question", error);
    res.status(500).json({ message: "Error fetching all the Question" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/:id
const getQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Please Provide Question Id",
      success: false,
    });
  }
  try {
    const findQuestion = await qna.findById(id);
    if (!findQuestion) {
      return res.status(400).json({
        message: `Unable to fetch the Question - Id :-: ${id}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: `Successfully fetched the Question Id :-: ${id}`,
      success: true,
      question: findQuestion,
    });
  } catch (error) {
    console.log("Error creating the Question", error);
    res
      .status(500)
      .json({ message: `Error fetching the Question with id : ${id}` });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/del/:id
const delQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Please Provide Question Id",
      success: false,
    });
  }
  try {
    const findQuestion = await qna.findById(id);
    if (!findQuestion) {
      return res.status(400).json({
        message: `Unable to fetch the Question - Id :-: ${id}`,
        success: false,
      });
    }

    const delQuestion = await qna.deleteOne({ id });
    if (delQuestion) {
      return res.status(200).json({
        message: `Successfully deleted Question - Id :-: ${id}`,
        success: true,
        question: findQuestion,
      });
    }
  } catch (error) {
    console.log("Error deleting the Question", error);
    res
      .status(500)
      .json({ message: `Error deleting the Question with id : ${id}` });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/qna/upd/:id
const updQuestion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Please Provide Question Id",
      success: false,
    });
  }
  try {
    const findQuestion = await qna.findById(id);
    if (!findQuestion) {
      return res.status(400).json({
        message: `Unable to fetch the Question - Id :-: ${id}`,
        success: false,
      });
    }
    const updQuestion = await Expert.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (updQuestion) {
      return res.status(200).json({
        message: `Successfully Updated Question - Id :-: ${id}`,
        success: true,
        question: findQuestion,
      });
    }
  } catch (error) {
    console.log("Error updating the Question", error);
    res
      .status(500)
      .json({ message: `Error updating the Question with id : ${id}` });
  }
});

module.exports = {
  createQuestion,
  getAllQuestion,
  getQuestion,
  delQuestion,
  updQuestion,
};
