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

export type CapitalQuestion = {
	capital: string;
	country: string;
	showAnswer?: boolean;
};


export interface Answer {
	question: number;
	guess?: number;
	like?: boolean;
	isCorrect?: boolean;
}