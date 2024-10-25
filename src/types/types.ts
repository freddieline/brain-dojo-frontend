export interface QuizQuestion {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
  additionalInfo: string;
  quizName: string;
}

export interface Feedback {
  quizName: string;
  feedback: string;
  likedQuestions?: number[],
  dislikedQuestions?: number[]
}

export interface Answer {
	question: number;
	guess?: number;
	isCorrect?: boolean;
}

export interface Level {
  [minPercentage: number]: number
}

export const animals = ['beaver', 'cheetah', 'cricket', 'crocodile', 'hen', 'kanga', 'ladybird', 'lion', 'parrot', 'pelican', 'pig', 'snail', 'rabbit', 'tortoise', 'turtle', 'wolf'];