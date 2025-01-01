import { FormEvent } from "react";
import { PairQuestion } from "../../types/types";
import { GeneralGameState } from "../../types/constants";
export declare const useAssociationRecallState: (pairs: PairQuestion[] | null) => {
    pairs: PairQuestion[] | null;
    pair: PairQuestion | null;
    numberCorrect: number;
    gameState: GeneralGameState;
    questionNumber: number;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    renderTime: ({ remainingTime }: {
        remainingTime: number;
    }) => number;
};
