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

export type QuizQuestion = {
  question: string;
  answer: number;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  correctAnswer: number;
  additionalInfo?: string;
};
