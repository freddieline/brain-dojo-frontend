import { QuizQuestion } from "../../types/types";
export declare const useFetchQuizQuestions: (topic: string, number: number, shouldFetch?: boolean) => {
    quizQuestions: QuizQuestion[] | null;
    error: Error | null;
    isPending: boolean;
};
