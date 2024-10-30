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

export type SequenceItem = {
  animal: string;
  show: boolean;
  isWrong: boolean;
};

export type SelectItem = {
  animal: string;
  selected: boolean;
};

export enum GameState {
  PreGame,
  HowToPlay,
  Start,
  Memorize,
  Play,
  Won,
  Lost,
}

export interface Answer {
  question: number;
  guess?: number;
  isCorrect?: boolean;
}
