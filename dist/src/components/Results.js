import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "flowbite-react";
import { getEmoji, getMotivation, getScore } from "../lib/getGrade";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
const Results = ({ quizName, numberCorrect, totalQuestions, }) => {
    const navigate = useNavigate();
    const percentageScore = (numberCorrect / totalQuestions) * 100;
    const grade = getScore(percentageScore);
    const emoji = getEmoji(grade);
    const motivation = getMotivation(grade);
    function handleOnSubmit() {
        navigate("/");
    }
    return (_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold text-center", children: motivation }), _jsxs("p", { className: "text-lg font-bold text-center mt-2", children: ["You got ", numberCorrect, " of ", totalQuestions, " correct in the ", quizName, " ", "quiz"] }), _jsx("div", { className: "mt-10 mb-10 flex flex-row items-center justify-center", children: _jsx("div", { className: "text-2xl w-[150px]", children: _jsx(CircularProgressbar, { value: percentageScore, text: `${emoji}`, styles: buildStyles({
                            textColor: "#00cc99",
                            trailColor: "#d6d6d6",
                            pathColor: "#00cc99",
                            backgroundColor: "#3e98c7",
                            textSize: "40px",
                        }) }) }) }), _jsx("div", { className: "flex flex-row mt-5 gap-3 items-center justify-center", children: _jsx("a", { children: _jsx("form", { onSubmit: handleOnSubmit, children: _jsx(Button, { type: "submit", className: "rounded-lg border-4 border-blue-700 p-2 font-bold text-gray bg-blue-500 text-white", autoFocus: true, children: "Main menu" }) }) }) })] }));
};
export default Results;
