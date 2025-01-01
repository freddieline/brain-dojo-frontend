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

export enum Size {
  small,
  medium,
  large,
}

export enum SequenceRecallGameState {
  PreGame,
  HowToPlay,
  Start,
  Memorize,
  Play,
  Won,
  Lost,
}

export enum GeneralGameState {
  Memorize,
  Play,
  Correct,
  Incorrect,
  Finish,
}
