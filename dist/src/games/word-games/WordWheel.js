import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useFetchWords } from "../../hooks/data-fetch/useFetchWords";
import Layout from "../../components/Layout";
import { Size, GeneralGameState } from "../../types/constants";
import { ButtonComponent } from "../../components/ButtonComponent";
import { WordWheelLetters } from "../../components/WordWheel/WordWheelLetters";
import { CorrectWords } from "../../components/CorrectWords";
import { EXAMPLE_WORD_LIST } from "../../lib/exampleWordList";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ResultsPopup } from "../../components/ResultsPopup/ResultsPopup";
export const WordWheel = ({ wordLength }) => {
    const [gameState, setGameState] = useState(GeneralGameState.Play);
    const [refreshKey, setRefreshKey] = useState(0);
    const [guess, setGuess] = useState("");
    const [correctWords, setCorrectWords] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const { data, derivedWords, error, isPending } = useFetchWords(wordLength, shouldFetch);
    const [errorText, setErrorText] = useState("");
    const [openResults, setOpenResults] = React.useState(false);
    const [pressedLetters, setPressedLetters] = useState(Array(9).fill(false));
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            handleFinish();
            return "00 : 00";
        }
        const minutes = Math.floor(remainingTime / 60);
        const remainingSeconds = remainingTime % 60;
        const pad = (num) => String(num).padStart(2, "0");
        return `${pad(minutes)} : ${pad(remainingSeconds)}`;
    };
    function handleFinish() {
        setGameState(GeneralGameState.Finish);
        setOpenResults(true);
    }
    useEffect(() => {
        if (data && shouldFetch) {
            setShouldFetch(false);
        }
    }, [data, shouldFetch]);
    if (error) {
        return _jsx(_Fragment, { children: error.message });
    }
    if (isPending || !data) {
        return _jsx(_Fragment, {});
    }
    function handleClearText() {
        setGuess("");
        setPressedLetters(Array(9).fill(false));
        setGameState(GeneralGameState.Play);
    }
    function handlePress(l, i) {
        setGameState(GeneralGameState.Play);
        setGuess(guess + l);
        const newPressedLetters = [...pressedLetters];
        newPressedLetters[i] = !newPressedLetters[i];
        setPressedLetters(newPressedLetters);
    }
    function handleSubmit() {
        if (data && data.derivedWords.length > 0) {
            const correctWord = EXAMPLE_WORD_LIST.find((word) => word === guess);
            if (correctWord &&
                !correctWords.find((word) => word === correctWord) &&
                guess.includes(data.mainLetter) &&
                guess.length > 3) {
                setGameState(GeneralGameState.Correct);
                setCorrectWords((prevWords) => [...prevWords, guess]);
            }
            else if (correctWord &&
                correctWords.find((word) => word === correctWord)) {
                setErrorText("Word already used");
                setGameState(GeneralGameState.Incorrect);
            }
            else if (correctWord && !guess.includes(data.mainLetter)) {
                setErrorText("Central letter not used");
                setGameState(GeneralGameState.Incorrect);
            }
            else if (correctWord && guess.length <= 3) {
                setErrorText("More than 3 letters needed");
                setGameState(GeneralGameState.Incorrect);
            }
            else {
                setErrorText("Not a word");
                setGameState(GeneralGameState.Incorrect);
            }
        }
        setGuess("");
        setPressedLetters(Array(9).fill(false));
        setRefreshKey(1 + refreshKey);
    }
    return (_jsxs(Layout, { size: Size.large, children: [_jsxs("div", { className: "flex flex-row justify-between", children: [_jsxs("div", { className: "", children: [_jsx("div", { className: "text-3xl mb-4", children: "Word wheel" }), _jsx("div", { className: "text-lg mb-2 max-w-[290px]", children: "Find as many words with more than 3 letters using the central letter" })] }), _jsx(CountdownCircleTimer, { size: 85, duration: 600, isPlaying: true, colors: ["#F7B801", "#A30000", "#A30000"], colorsTime: [10, 5, 0], children: renderTime })] }), _jsxs("form", { autoComplete: "off", children: [_jsxs("div", { className: "flex flex-row flex-grow gap-2 justify-between flex-wrap", children: [_jsx(WordWheelLetters, { letters: data.letters, mainLetter: data.mainLetter, handlePress: handlePress, pressedLetters: pressedLetters }, refreshKey), _jsx(CorrectWords, { words: correctWords })] }), _jsxs("div", { className: "mb-2", children: ["9 letter word hint: ", data.hint] }), _jsxs("div", { className: "flex flex-row flex-grow gap-2 flex-wrap", children: [_jsxs("div", { className: "w-[35%] h-[65px]", children: [_jsxs("div", { className: "text-2xl border-2 border-gray-500 rounded p-1", children: ["\u00A0", guess] }), GeneralGameState.Incorrect == gameState && (_jsx("div", { className: "text-red-500 font-bold", children: errorText }))] }), _jsxs("div", { className: "flex flex-row flex-grow gap-2", children: [_jsx(ButtonComponent, { type: "primary", height: 44, text: "Add word", width: 130, onClick: handleSubmit }), _jsx(ButtonComponent, { type: "secondary", height: 44, text: "Clear", onClick: handleClearText, width: 100 }), _jsx(ButtonComponent, { type: "secondary", height: 44, text: "Finish", onClick: handleFinish, width: 100 })] })] })] }), derivedWords && (_jsx(ResultsPopup, { open: openResults, derivedWords: derivedWords, corretWords: correctWords }))] }));
};
