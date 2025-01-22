import { useState } from "react";
import { GeneralGameState } from "../../types/constants";
export const useAssociationRecallState = (pairs) => {
    const [numberCorrect, setNumberCorrect] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [gameState, setGameState] = useState(GeneralGameState.Memorize);
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setGameState(GeneralGameState.Play);
            return 0;
        }
        return remainingTime;
    };
    const pair = pairs ? pairs[questionNumber - 1] : null;
    function handleSubmit(e) {
        e.preventDefault();
        if (gameState == GeneralGameState.Play) {
            checkAnswer(e);
        }
        else if (questionNumber == 10) {
            setGameState(GeneralGameState.Finish);
        }
        else {
            setQuestionNumber(questionNumber + 1);
            setGameState(GeneralGameState.Play);
        }
    }
    function checkAnswer(e) {
        const formData = new FormData(e.currentTarget);
        const answer = formData.get("text-input")?.toString();
        if (pairs && pair && answer) {
            if (pair.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/g, "") ==
                answer
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")) {
                setNumberCorrect((prev) => (prev += 1));
                setGameState(GeneralGameState.Correct);
            }
            else {
                setGameState(GeneralGameState.Incorrect);
            }
        }
    }
    return {
        pairs,
        pair,
        numberCorrect,
        gameState,
        questionNumber,
        handleSubmit,
        renderTime,
    };
};
