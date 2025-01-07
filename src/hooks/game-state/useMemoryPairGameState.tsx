import { useState, FormEvent } from "react";
import { PairQuestion } from "../../types/types";
import { GeneralGameState } from "../../types/constants";

export const useMemoryPairGameState = (pairs: PairQuestion[] | null) => {
  const [numberCorrect, setNumberCorrect] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [gameState, setGameState] = useState<GeneralGameState>(
    GeneralGameState.Memorize,
  );

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setGameState(GeneralGameState.Play);
      return 0;
    }
    return remainingTime;
  };

  const pair: PairQuestion | null = pairs ? pairs[questionNumber - 1] : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gameState == GeneralGameState.Play) {
      checkAnswer(e);
    } else if (questionNumber == 10) {
      setGameState(GeneralGameState.Finish);
    } else {
      setQuestionNumber(questionNumber + 1);
      setGameState(GeneralGameState.Play);
    }
  }

  function checkAnswer(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const answer = formData.get("text-input")?.toString();

    if (pairs && pair && answer) {
      if (
        pair.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/g, "") ==
        answer
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      ) {
        setNumberCorrect((prev) => (prev += 1));
        setGameState(GeneralGameState.Correct);
      } else {
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
