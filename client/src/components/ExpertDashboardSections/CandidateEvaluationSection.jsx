import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { IoIosInformationCircleOutline } from "react-icons/io";

function CandidateEvaluationSection({ sectionTitle, evaluationCriteria }) {
    // Initialize scores and suggestions state
    const [scores, setScores] = useState({});
    const [suggestions, setSuggestions] = useState(evaluationCriteria.suggestions || "");

    // Handle score change
    const handleChange = (key) => (e) => {
        setScores({
            ...scores,
            [key]: e.target.value,
        });
    };

    // Handle suggestions change
    const handleSuggestionsChange = (e) => {
        setSuggestions(e.target.value);
    };

    // Map through the evaluationCriteria object
    const criteriaArray = Object.entries(evaluationCriteria)
        .filter(([key]) => key !== "totalScore" && key !== "suggestions")  // Exclude totalScore and suggestions
        .map(([key, value]) => ({
            key,
            label: value.question,  // Use the question as the label
        }));

    return (
        <div
            className="bg-white w-[60vw] h-fit rounded-lg p-7 relative"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
        >
            <div className="flex gap-x-4">
                <div className="bg-gradient-to-r from-sky-600 to-cyan-400 text-transparent bg-clip-text font-bold text-2xl mb-6">
                    {sectionTitle}
                </div>
                <div className="text-xl text-gray-500 cursor-pointer">
                    <IoIosInformationCircleOutline />
                </div>
            </div>

            <div className="grid grid-cols-[auto_2fr_1fr] gap-4">
                <div className="flex flex-col gap-y-8 ml-5 col-span-2">
                    {criteriaArray.map((criterion) => (
                        <div key={criterion.key} className="flex flex-col gap-y-5">
                            <div className="text-gray-700">{criterion.label}</div>
                            <TextField
                                id={`outlined-score-input-${criterion.key}`}
                                label="Score(0-10)"
                                type="number"
                                value={scores[criterion.key] || 0}  // Handle default value
                                onChange={handleChange(criterion.key)}
                                sx={{ width: "150px", marginLeft: "20px" }}
                                variant="outlined"
                                inputProps={{
                                    max: 10,
                                    min: 0,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="col-span-1 flex flex-col">
                    <div className="text-gray-700 pb-2">Suggestions</div>
                    <TextField
                        id="outlined-suggestions-input"
                        label="Enter Suggestions"
                        multiline
                        rows={6}
                        value={suggestions}
                        onChange={handleSuggestionsChange}
                        sx={{ width: 250 }}
                    />
                    <div className="flex absolute bottom-7 right-34 items-center gap-x-1">
                        <div className="bg-gradient-to-r from-sky-600 to-cyan-400 text-transparent bg-clip-text text-xl font-bold">
                            Total
                        </div>
                        <div>
                            <TextField
                                id="outlined-score-input-total"
                                label=""
                                type="number"
                                value={Object.values(scores).reduce((acc, score) => acc + score, 0)}  // Calculate total score
                                onChange={() => {}}
                                sx={{ width: "100px", marginRight: "10px" }}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                        <div className="text-gray-500">max score: {criteriaArray.length * 10}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateEvaluationSection;
