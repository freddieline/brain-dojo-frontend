export const animals = [
  "beaver",
  "cheetah",
  "cricket",
  "crocodile",
  "hen",
  "kanga",
  "ladybird",
  "lion",
  "parrot",
  "pelican",
  "pig",
  "snail",
  "rabbit",
  "tortoise",
  "wolf",
];

export type CapitalQuestion = {
  capital: string;
  country: string;
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

export enum SequenceRecallGameState {
  PreGame,
  HowToPlay,
  Start,
  Memorize,
  Play,
  Won,
  Lost,
}

export enum PairsRecallGameState {
  Memorize,
  Play,
  Correct,
  Incorrect,
  Finish,
}

export interface Answer {
  question: number;
  guess?: number;
  isCorrect?: boolean;
}

export enum Size {
  small,
  medium,
  large,
}
