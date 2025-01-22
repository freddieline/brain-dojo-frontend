import { setupServer } from "msw/node";
import { rest } from "msw";
export const mockQuizQuestions = [
    {
        id: 1,
        question: "What is 2 + 2?",
        answer: 4,
        answer1: "3",
        answer2: "4",
        answer3: "5",
        answer4: "6",
        correctAnswer: 2,
    },
    {
        id: 2,
        question: "What is 5 x 3?",
        answer: 15,
        answer1: "12",
        answer2: "14",
        answer3: "15",
        answer4: "16",
        correctAnswer: 3,
    },
];
export const handlers = [
    rest.get("http://localhost:3001/api/quiz-questions", (req, res, ctx) => {
        return res(ctx.json(mockQuizQuestions));
    }),
];
export const server = setupServer(...handlers);
