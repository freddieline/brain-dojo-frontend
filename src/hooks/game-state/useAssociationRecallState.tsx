import { useState } from "react";
import { FormEvent } from "react";
import { PairQuestion, PairsRecallGameState } from "../../types/types";

export const useAssociationRecallState = (pairs: PairQuestion[]| null) => {
  const [numberCorrect, setNumberCorrect] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [gameState, setGameState] = useState<PairsRecallGameState>(
    PairsRecallGameState.Memorize,
  );

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setGameState(PairsRecallGameState.Play);
      return 0;
    }
    return remainingTime;
  };

  const pair: PairQuestion | null = pairs ? pairs[questionNumber - 1] : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gameState == PairsRecallGameState.Play) {
      checkAnswer(e);
    } else if (questionNumber == 10) {
      setGameState(PairsRecallGameState.Finish);
    } else {
      setQuestionNumber(questionNumber + 1);
      setGameState(PairsRecallGameState.Play);
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
        setGameState(PairsRecallGameState.Correct);
      } else {
        setGameState(PairsRecallGameState.Incorrect);
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
