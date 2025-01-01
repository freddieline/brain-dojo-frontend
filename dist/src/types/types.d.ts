export type Capital = {
    id: number;
    capital: string;
    country: string;
};
export type PairQuestion = {
    key: string;
    value: string;
    showAnswer?: boolean;
    isCorrect?: boolean;
};
export type SequenceItem = {
    animal: string;
    show: boolean;
    isWrong: boolean;
};
export type SelectItem = {
    animal: string;
    selected: boolean;
};
export interface Answer {
    question: number;
    guess?: number;
    isCorrect?: boolean;
}
export interface WordWheel {
    id: number;
    word: string;
    letters: SingleLetter[];
    mainLetter: SingleLetter;
    derivedWords: string[];
    hint?: string;
}
export type QuizQuestion = {
    id: number;
    question: string;
    answer: number;
    answer1: string;
    answer2: string;
    answer3?: string;
    answer4?: string;
    correctAnswer: number;
    additionalInfo?: string;
};
export type SingleLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
