import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { GeneralGameState, Size } from "../../types/constants";
import { HiCheckCircle } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import Results from "../../components/Results";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useAssociationRecallState } from "../../hooks/game-state/useAssociationRecallState";
import { useFetchCountryCapitalPairs } from "../../hooks/data-fetch/useFetchCountryCapitalPairs";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
export const AssociationRecall = ({ recallInstruction, title, continent, number, }) => {
    const [shouldFetch] = useState(true);
    const navigate = useNavigate();
    const { isPending, error, pairs } = useFetchCountryCapitalPairs(continent, number, shouldFetch);
    const quit = () => {
        navigate("/");
    };
    const { pair, numberCorrect, gameState, questionNumber, handleSubmit, renderTime, } = useAssociationRecallState(pairs);
    if (!pairs) {
        return _jsx("p", { children: "No data" });
    }
    if (isPending) {
        return _jsx("p", {});
    }
    if (error) {
        return _jsxs("p", { children: ["Error ... ", error.message] });
    }
    if (gameState == GeneralGameState.Finish) {
        return (_jsx("div", { className: "mt-4 rounded-lg w-[600px] m-auto", children: _jsx(Results, { totalQuestions: 10, numberCorrect: numberCorrect, quizName: title }) }));
    }
    if (pairs && Array.isArray(pairs) && pairs.length > 0) {
        return (_jsxs(Layout, { size: Size.medium, children: [_jsx("h1", { className: "text-xl font-bold mb-4", children: title }), _jsx("div", { className: "flex flex-col", children: _jsxs("form", { onSubmit: handleSubmit, children: [gameState == GeneralGameState.Memorize && (_jsxs(_Fragment, { children: [_jsx("div", { children: recallInstruction }), _jsx("div", { className: "text-xl m-auto mt-5 mb-8", children: _jsx(CountdownCircleTimer, { size: 100, isPlaying: gameState == GeneralGameState.Memorize, duration: 20, colors: ["#F7B801", "#A30000", "#A30000"], colorsTime: [10, 5, 0], children: renderTime }) }), pairs?.map((pair) => {
                                        return (_jsxs("div", { className: "flex flex-row flex-wrap", children: [_jsx("div", { className: "w-[130px] mt-2", children: pair.key }), _jsx("div", { className: "w-[130px] mt-2", children: pair.value })] }, pair.value));
                                    })] })), gameState !== GeneralGameState.Memorize &&
                                gameState !== GeneralGameState.Finish && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-row flex-wrap gap-2", children: [_jsx("div", { className: "w-[130px] mt-2", children: pair?.key }), gameState !== GeneralGameState.Incorrect && (_jsx(TextInput, { style: {
                                                    borderWidth: "2px",
                                                    borderColor: cx({
                                                        "#32CD32": gameState === GeneralGameState.Correct,
                                                    }),
                                                }, disabled: gameState == GeneralGameState.Correct, type: "text", id: "text-input", name: "text-input", autoFocus: true })), gameState == GeneralGameState.Incorrect && (_jsx(TextInput, { style: {
                                                    borderWidth: "2px",
                                                    borderColor: "#ff0000",
                                                }, disabled: true, id: "text-input", value: pair?.value, autoFocus: true })), pair?.isCorrect && (_jsx(HiCheckCircle, { color: "green", size: 30, className: "mt-1" }))] }, questionNumber), _jsxs("div", { className: "flex flex-row flex-wrap mt-6 gap-4", children: [gameState == GeneralGameState.Play && (_jsx(ButtonComponent, { text: "Submit", autoFocus: false, submit: true })), gameState != GeneralGameState.Play &&
                                                questionNumber != 10 && (_jsx(ButtonComponent, { text: "Next question", autoFocus: true, submit: true })), gameState != GeneralGameState.Play &&
                                                questionNumber == 10 && (_jsx(ButtonComponent, { text: "Show results", submit: true, autoFocus: true })), gameState != GeneralGameState.Play &&
                                                questionNumber == 10 && (_jsx(ButtonComponent, { text: "Show results", submit: true, autoFocus: true })), _jsx(ButtonComponent, { text: "Quit", autoFocus: true, onClick: quit, type: "secondary" })] })] }))] }) })] }));
    }
    else {
        return _jsx(_Fragment, { children: "No data" });
    }
};
export default AssociationRecall;
