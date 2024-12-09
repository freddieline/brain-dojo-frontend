import { randomSelection } from "../../lib/randomSelection";
import { QuizQuestion } from "../../types/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchQuizQuestions = (
  topic: string,
  number: number,
  shouldFetch = true,
): {
  quizQuestions: QuizQuestion[] | null;
  error: Error | null;
  isPending: boolean;
} => {
  const apiUrl = "/api/quiz-questions?topic=" + topic;
  const url = import.meta.env["VITE_QUIZ_API"] + apiUrl;

  const { isPending, error, data } = useQuery({
    queryKey: ["data", url],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: shouldFetch,
  });

  let quizQuestions: QuizQuestion[] | null = null;
  if (shouldFetch && data && data.length > 0) {
    quizQuestions = randomSelection(data, number);
  }

  return { isPending, error, quizQuestions };
};
