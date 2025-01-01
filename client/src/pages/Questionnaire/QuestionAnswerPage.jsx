import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Avatar from "react-avatar";
import { LuAlarmClock } from "react-icons/lu";
import { questions } from "../../utils/QuestionBank";
import { useNavigate } from "react-router-dom";

const QuestionAnswerPage = ({ totalScore, setTotalScore }) => {
  const location = useLocation();
  const { state } = location;

  const { title, expertData } = state || {};
  if (!title || !expertData) {
    console.log("Title or expertData is missing");
  }

  console.log("Yaha: ", expertData);
  const selectedQuestion = questions[state?.title].slice(0, 5);

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(1500); // 1500 seconds = 25 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // State for tracking user's responses and current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [questionStatus, setQuestionStatus] = useState(
    selectedQuestion.map(() => "not_visited")
  ); // Initialize all questions as not visited
  const [score, setScore] = useState(0);

  // Effect to track question status changes
  useEffect(() => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];

      // If the question is visited for the first time, change its state to "visited"
      if (newStatus[currentQuestionIndex] === "not_visited") {
        newStatus[currentQuestionIndex] = "visited";
      }

      // If moving to the next question and the previous one was visited but not answered,
      // set its status as "visited_and_not_answered"
      if (currentQuestionIndex > 0 && !responses[currentQuestionIndex - 1]) {
        if (prevStatus[currentQuestionIndex - 1] === "visited") {
          newStatus[currentQuestionIndex - 1] = "visited_and_not_answered";
        }
      }

      return newStatus;
    });
  }, [currentQuestionIndex, responses]);

  const handleOptionChange = (event) => {
    const selectedOption = selectedQuestion[currentQuestionIndex].options.find(
      (option) => option.text === event.target.value
    );

    // Update responses and recalculate score
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionIndex]: selectedOption,
    }));

    const updatedScore = Object.values({
      ...responses,
      [currentQuestionIndex]: selectedOption,
    }).reduce((acc, response) => acc + (response?.score || 0), 0);

    setScore(updatedScore);

    // Update question status to 'answered'
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[currentQuestionIndex] = "answered";
      return newStatus;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestion.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleMarkForReview = () => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      // Check if the question has been answered
      if (responses[currentQuestionIndex]) {
        newStatus[currentQuestionIndex] = "answered_and_marked_for_review";
      } else {
        newStatus[currentQuestionIndex] = "marked_for_review";
      }
      return newStatus;
    });
  };

  const handleClearResponse = () => {
    setResponses((prevResponses) => {
      const newResponses = { ...prevResponses };
      delete newResponses[currentQuestionIndex];
      return newResponses;
    });

    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[currentQuestionIndex] = "not_answered";
      return newStatus;
    });
  };

  const handleSubmit = () => {
    // Submit the section
    // here i want to set the score of "Problem Solving" section only which will be equal to 'score'
    setTotalScore((prevScore) => ({
      ...prevScore,
      [title]: prevScore[title] + score,
    }));
    navigate("/questionnaire/questionsections",{ state: { expertData } });
  };

  const currentQuestion = selectedQuestion[currentQuestionIndex];

  return (
    <main className="min-h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="main-container w-[90%] flex gap-5">
        {/* Main Content */}
        <div className="flex flex-col gap-y-5 w-full min-h-[80%]">
          <div className="bg-white px-8 py-4 rounded-md w-full flex justify-between items-center">
            {/* Dynamic Content Goes Here */}
            <h1 className="text-[#0E8CCA] text-xl font-semibold">{title}</h1>
            <div className="flex justify-center items-center gap-x-2 bg-[#f4f4f4] px-3 py-2 rounded-2xl shadow-sm">
              <LuAlarmClock size={"1.2rem"} />
              <p>{formatTime(timeLeft)}</p>
            </div>
          </div>

          {/* Question area */}
          <div className="question-box bg-white w-full rounded-md p-6">
            <p className="text-md font-medium">{currentQuestion.question}</p>

            <RadioGroup
              className="mt-8 text-[#464646]"
              value={responses[currentQuestionIndex]?.text || ""}
              onChange={handleOptionChange}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.text}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>

            {/* buttons group start */}
            <div className="flex justify-between items-center gap-x-5 mt-16">
              <span className="flex gap-x-3">
                <button
                  className="py-3 px-6 bg-[#f4f4f4] text-[#464646] font-medium rounded-lg"
                  onClick={handleMarkForReview}
                >
                  Mark For Review
                </button>
                <button
                  className="py-3 px-6 bg-[#f4f4f4] text-[#464646] font-medium rounded-lg"
                  onClick={handleClearResponse}
                >
                  Clear Response
                </button>
              </span>

              <button
                className="py-3 px-6 bg-[#464646] text-[#fff] font-medium rounded-lg"
                onClick={handleNext}
              >
                Save & Next
              </button>
            </div>
            {/* buttons group ends */}
          </div>
          {/* Question area ends */}
        </div>

        {/* Sidebar */}
        <aside className="w-[35%] bg-white p-6 rounded-md">
          {/* Sidebar Content */}
          <div className="w-full flex justify-between items-center pb-6">
            <span className="flex items-center gap-x-2">
              <Avatar name={expertData.avatar} round="true" size="3rem" />
              <h1 className="text-lg font-semibold">{expertData.name}</h1>
            </span>

            <div>
              <p className="text-[#464646]">
                Attempted:{" "}
                <span className="font-semibold text-[#0e8cca]">
                  {Object.keys(responses).length}
                </span>
              </p>
              <p className="text-[#464646]">
                Remaining:{" "}
                <span className="font-semibold text-[#0e8cca]">
                  {selectedQuestion.length - Object.keys(responses).length}
                </span>
              </p>
            </div>
          </div>
          <hr className="border border-b-[#ececec]" />

          {/* option type */}
          <div className="py-4 px-3 flex justify-between flex-wrap gap-y-4">
            {/* Answered */}
            <span className="flex items-center gap-x-1">
              <span className="rounded-md bg-[#00B65E] p-1 text-white font-normal text-sm">
                23
              </span>
              <p className="font-normal text-sm">Answered</p>
            </span>

            {/* unanswered */}
            <span className="flex items-center gap-x-1">
              <span className="rounded-md bg-[#E80505] p-1 text-white font-normal text-sm">
                23
              </span>
              <p className="font-normal text-sm">Not Answered</p>
            </span>

            {/* not marked and not answered */}
            <span className="flex items-center gap-x-1">
              <span className="rounded-full bg-[#4D44CC] h-[28px] w-[28px] p-1 text-white font-normal text-sm flex justify-center items-center">
                <p>23</p>
              </span>
              <p className="font-normal text-sm">Not Answered & Marked</p>
            </span>

            {/* answered and marked */}
            <span className="flex items-center gap-x-1">
              <span className="rounded-full bg-[#D939CD] h-[28px] w-[28px] p-1 text-white font-normal text-sm flex justify-center items-center">
                <p>23</p>
              </span>
              <p className="font-normal text-sm">Answered & Marked</p>
            </span>

            {/* not visited */}
            <span className="flex items-center gap-x-1">
              <span className="rounded-md bg-[#eee] p-1 text-[#333] font-normal text-sm">
                23
              </span>
              <p className="font-normal text-sm">Not Visited Yet</p>
            </span>
          </div>
          <hr className="border border-b-[#ececec]" />

          {/* question number box */}
          <div className="py-4 px-3 flex flex-col gap-y-3">
            <h1 className="text-[#0E8CCA] font-medium text-lg">Questions</h1>
            <span className="flex gap-x-5">
              {selectedQuestion.map((_, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg ${
                    questionStatus[index] === "answered"
                      ? "bg-green-500 text-white"
                      : questionStatus[index] === "marked_for_review"
                      ? "bg-[#4D44CC] text-white rounded-[1000px]"
                      : questionStatus[index] ===
                        "answered_and_marked_for_review"
                      ? "bg-[#D939CD] text-white rounded-[1000px]"
                      : questionStatus[index] === "visited_and_not_answered"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </span>
          </div>

          {/* submit option */}
          <div className="pt-4 px-3 w-full">
            <button
              className="py-3 px-6 bg-[#0E8CCA] text-[#fff] font-medium rounded-lg w-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default QuestionAnswerPage;