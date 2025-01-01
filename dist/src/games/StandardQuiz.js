import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import Results from "../components/Results";
import Layout from "../components/Layout";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import cx from "classnames";
import { useFetchQuizQuestions } from "../hooks/data-fetch/useFetchQuizQuestions";
const StandardQuiz = ({ quizName }) => {
    const [answers, setAnswers] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const [key, setKey] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(true);
    const { quizQuestions, isPending, error } = useFetchQuizQuestions("Numerical reasoning", 10);
    useEffect(() => {
        if (shouldFetch && quizQuestions) {
            setQuestions(quizQuestions);
            setShouldFetch(false);
        }
    }, [quizQuestions]);
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            if (!answers[questionNumber - 1]) {
                let newAnswers = [...answers];
                newAnswers[questionNumber - 1] = {
                    ...newAnswers[questionNumber - 1],
                    question: questionNumber,
                    isCorrect: false,
                };
                setAnswers(newAnswers);
            }
            return _jsx("div", { className: "font-bold", children: "Time's up!" });
        }
        return remainingTime;
    };
    if (isPending) {
        return _jsx("p", {});
    }
    if (error) {
        return _jsxs("p", { children: ["Error ... ", error.message] });
    }
    if (questions.length > 0) {
        const handleNextQuestion = () => {
            if (questionNumber < questions.length) {
                setQuestionNumber(questionNumber + 1);
            }
            else {
                setQuizFinished(true);
            }
            setKey(key + 1);
        };
        const handleClickAnswer = (answer) => {
            if (answers) {
                if (!answers[questionNumber - 1]) {
                    let newAnswers = [...answers];
                    newAnswers[questionNumber - 1] = {
                        ...newAnswers[questionNumber - 1],
                        guess: answer,
                        question: questionNumber,
                        isCorrect: answer == questions[questionNumber - 1].correctAnswer,
                    };
                    setAnswers(newAnswers);
                }
            }
            else {
                const firstAnswer = [
                    {
                        question: questionNumber,
                        guess: answer,
                    },
                ];
                setAnswers(firstAnswer);
            }
        };
        const correctAnswer = questions[questionNumber - 1].correctAnswer;
        let hasAnswered = false;
        const answer = answers[questionNumber - 1];
        if (answers && !quizFinished) {
            hasAnswered = !!answers[questionNumber - 1];
        }
        if (!quizFinished) {
            return (_jsxs(Layout, { children: [_jsxs("div", { className: "mt-3 mb-3 flex flex-row gap-x-2 justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl bold mb-3", children: quizName }), _jsxs("h1", { className: "text-xl bold mb-3", children: [questionNumber, " of ", questions.length] })] }), _jsx(CountdownCircleTimer, { size: 85, isPlaying: !hasAnswered, duration: 10, colors: ["#F7B801", "#A30000", "#A30000"], colorsTime: [10, 5, 0], children: renderTime }, key)] }), questions.length > 0 && (_jsxs("div", { className: "border-4 rounded-lg p-4 border-blue-300", children: [_jsx("div", { className: "mt-3 flex flex-row gap-x-2", children: _jsx("h3", { className: "flex-auto", children: questions[questionNumber - 1].question }) }), _jsxs("div", { className: "mt-3 flex flex-row gap-x-2", children: [_jsx(Button, { className: `basis-1/2 bg-white text-gray-900 rounded-lg border-4 border-blue-300 ${cx({
                                            "hover:border-blue-500": !hasAnswered,
                                            "border-red-500": !answer?.isCorrect && answer?.guess == 1,
                                            "border-gray-200 text-gray-300": hasAnswered && answer?.guess != 1,
                                            "border-green-500 text-black": hasAnswered && correctAnswer == 1,
                                        })} p-1.5`, onClick: () => handleClickAnswer(1), children: questions[questionNumber - 1].answer1 }), _jsx(Button, { className: `basis-1/2 bg-white text-gray-900 rounded-lg border-4 border-blue-300 ${cx({
                                            "hover:border-blue-500": !hasAnswered,
                                            "border-red-500": !answer?.isCorrect && answer?.guess == 2,
                                            "border-gray-200 text-gray-300": hasAnswered && answer?.guess != 2,
                                            "border-green-500 text-black": hasAnswered && correctAnswer == 2,
                                        })} p-1.5`, onClick: () => handleClickAnswer(2), children: questions[questionNumber - 1].answer2 })] }), questions[questionNumber - 1].answer3 != "" && (_jsxs("div", { className: "mt-3 flex flex-row gap-x-2", children: [_jsx(Button, { className: `basis-1/2 bg-white text-gray-900 rounded-lg border-4 border-blue-300 ${cx({
                                            "hover:border-blue-500": !hasAnswered,
                                            "border-gray-200 text-gray-300": hasAnswered && answer?.guess != 3,
                                            "border-red-500": !answer?.isCorrect && answer?.guess == 3,
                                            "border-green-500 text-black": hasAnswered && correctAnswer == 3,
                                        })} p-1.5`, onClick: () => handleClickAnswer(3), children: questions[questionNumber - 1].answer3 }), _jsx(Button, { className: `basis-1/2 bg-white text-gray-900 rounded-lg border-4 border-blue-300 ${cx({
                                            "hover:border-blue-500": !hasAnswered,
                                            "border-red-500": !answer?.isCorrect && answer?.guess == 4,
                                            "border-gray-200 text-gray-300": hasAnswered && answer?.guess != 4,
                                            "border-green-500 text-black": hasAnswered && correctAnswer == 4,
                                        })} p-1.5`, onClick: () => handleClickAnswer(4), children: questions[questionNumber - 1].answer4 })] })), hasAnswered && questions[questionNumber - 1].additionalInfo && (_jsx("div", { className: "mt-3 flex flex-row gap-x-2 justify-center items-center mt-10 italic bg-blue-50 p-2 rounded-lg", children: questions[questionNumber - 1].additionalInfo })), hasAnswered && (_jsx("div", { className: "mt-3 flex flex-row gap-x-2 justify-center items-center mt-10", children: _jsx(Button, { className: "text-white bg-blue-500 rounded-lg border-4 border-blue-700 p-2 font-bold", color: "white", onClick: handleNextQuestion, children: questionNumber < questions.length
                                        ? `Next question`
                                        : `See results` }) }))] }))] }));
        }
        else {
            return (_jsx(Layout, { children: _jsx(Results, { quizName: quizName, numberCorrect: answers.filter((item) => item.isCorrect).length, totalQuestions: answers.length }) }));
        }
    }
    return _jsx(Layout, { children: "No data" });
};
export default StandardQuiz;
