import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Layout from "../../components/Layout";
import { useMemorySequenceGameState } from "../../hooks/game-state/useMemorySequenceGameState";
import { Size, SequenceRecallGameState } from "../../types/constants";
import { Button } from "flowbite-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SequenceTile from "../../components/SequenceTile";
import SelectableTile from "../../components/SelectableTile";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
const MemoriseSequence = () => {
    const { sequenceItems, sequenceLength, selectableItems, gameState, timeToMemorize, currentIndex, setupGame, start, handleSelection, } = useMemorySequenceGameState();
    const navigate = useNavigate();
    const quit = () => {
        console.log("quit");
        navigate("/");
    };
    const renderTime = ({ remainingTime }) => {
        return remainingTime;
    };
    const MODAL_CONTENT_CLASSES = "flex flex-col items-center justify-center h-screen gap-5";
    return (_jsx(Layout, { size: Size.small, children: _jsxs(_Fragment, { children: [gameState == SequenceRecallGameState.PreGame && (_jsx("div", { id: "modal", className: "modal", children: _jsxs("div", { className: MODAL_CONTENT_CLASSES, children: [_jsx(Button, { size: "lg", color: "purple", onClick: () => setupGame(4), pill: true, children: "4 images" }), _jsx(Button, { size: "lg", color: "purple", onClick: () => setupGame(6), pill: true, children: "6 images" }), _jsx(Button, { size: "lg", color: "purple", onClick: () => setupGame(8), pill: true, children: "8 images" })] }) })), gameState == SequenceRecallGameState.HowToPlay && (_jsx("div", { id: "modal", className: "modal", children: _jsx("div", { className: MODAL_CONTENT_CLASSES, children: _jsxs("div", { className: "items-center w-[250px] h-[200px] p-8 rounded-lg bg-white text-center", children: [_jsxs("div", { children: ["Select the ", sequenceLength, " animals that appear in the top grid in the correct order"] }), _jsxs("div", { className: "flex flex-row", children: [_jsx(Button, { size: "lg", className: "ml-auto mr-auto mt-6", color: "purple", onClick: () => start(), pill: true, children: "Start" }), _jsx(Button, { size: "lg", className: "ml-auto mr-auto mt-6", color: "light", onClick: () => quit(), pill: true, children: "Quit" })] })] }) }) })), _jsxs(_Fragment, { children: [_jsx("h1", { className: "text-xl font-bold", children: "Memorise the sequence" }), _jsx("div", { className: "flex flex-row align-center flex-wrap ml-auto mr-auto mt-3", children: gameState >= SequenceRecallGameState.Start &&
                                sequenceItems.map((item, index) => {
                                    return (_jsx(SequenceTile, { id: item.animal, src: `animals/` + item.animal + `.jpeg`, show: sequenceItems[index].show, animate: gameState == SequenceRecallGameState.Memorize, highlight: index == currentIndex &&
                                            gameState == SequenceRecallGameState.Play, incorrectlyGuessed: item.isWrong }, index));
                                }) }), _jsx("div", { className: "flex flex-row align-center flex-wrap ml-auto mr-auto mt-4", children: gameState >= SequenceRecallGameState.Start &&
                                selectableItems.map((item, index) => {
                                    return (_jsx(SelectableTile, { id: item.animal, src: `animals/${item.animal}.jpeg`, onClick: handleSelection, show: gameState >= SequenceRecallGameState.Play, selected: item.selected }, index));
                                }) }), gameState == SequenceRecallGameState.Memorize && (_jsx("div", { className: "ml-[90px] mt-[-240px]", children: _jsx(CountdownCircleTimer, { size: 70, isPlaying: gameState == SequenceRecallGameState.Memorize, duration: timeToMemorize, colors: ["#F7B801", "#A30000", "#A30000"], colorsTime: [4, 2, 0], children: renderTime }) })), gameState == SequenceRecallGameState.Won && (_jsx("div", { className: "modal-plain", children: _jsxs("div", { className: MODAL_CONTENT_CLASSES, children: [_jsx(ConfettiExplosion, { duration: 8000, force: 0.8, height: "100vh", className: "" }), _jsx(TiTick, { color: "#32a852", size: 200 })] }) })), gameState == SequenceRecallGameState.Lost && (_jsx("div", { className: "modal-plain", children: _jsx("div", { className: MODAL_CONTENT_CLASSES, children: _jsx(ImCross, { color: "#ff2d2d", size: 150 }) }) }))] })] }) }));
};
export default MemoriseSequence;
