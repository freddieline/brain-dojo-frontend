import { jsx as _jsx } from "react/jsx-runtime";
import { useFetchQuizQuestions } from "./useFetchQuizQuestions";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockQuizQuestions } from "../../test/mocks/server";
let testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});
const wrapper = ({ children }) => (_jsx(QueryClientProvider, { client: testQueryClient, children: children }));
describe("useFetchQuizQuestions", () => {
    test("should fetch quiz questions correctly", async () => {
        const { result } = renderHook(() => useFetchQuizQuestions("math", 2, true), { wrapper });
        await waitFor(() => {
            expect(result.current.isPending).toBeFalsy();
            expect(result.current.error).toBeNull();
            expect(result.current.quizQuestions).toHaveLength(2); // Based on the `number` passed
            const quizQuestion = findQuizQuestion(result.current.quizQuestions, {
                question: mockQuizQuestions[0].question,
            });
            expect(quizQuestion).toBeDefined();
        });
    });
    test("should not fetch if shouldFetch is false", async () => {
        const { result } = renderHook(() => useFetchQuizQuestions("math", 2, false), { wrapper });
        await waitFor(() => {
            expect(result.current.isPending).toBeFalsy();
            expect(result.current.error).toBeNull();
            expect(result.current.quizQuestions).toBeNull();
        });
    });
    test('should return the correct number of questions based on the "number" argument', async () => {
        const { result } = renderHook(() => useFetchQuizQuestions("math", 2, true), { wrapper });
        // Check that the hook returns the correct number of questions
        await waitFor(() => {
            expect(result.current.isPending).toBeFalsy();
            expect(result.current.quizQuestions).toHaveLength(2); // Should return 2 questions
        });
    });
    test("should return quiz questions with answers", async () => {
        const { result } = renderHook(() => useFetchQuizQuestions("math", 2, true), { wrapper });
        // Check that the returned quiz questions have the expected answers
        await waitFor(() => {
            const quizQuestion = findQuizQuestion(result.current?.quizQuestions, {
                answer1: "3",
                answer2: "4",
                answer3: "5",
                answer4: "6",
            });
            expect(quizQuestion).toBeDefined();
        });
    });
});
function findQuizQuestion(quizQuestionsResponse, searchParams = {}) {
    if (!quizQuestionsResponse) {
        return null;
    }
    return quizQuestionsResponse.find((question) => {
        return Object.keys(searchParams).every((key) => {
            const paramKey = key;
            return searchParams[paramKey] === question[paramKey];
        });
    });
}
