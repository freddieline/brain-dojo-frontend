import { randomSelection } from "../../lib/randomSelection";
import { useQuery } from "@tanstack/react-query";
export const useFetchQuizQuestions = (topic, number, shouldFetch = true) => {
    const apiUrl = "/api/quiz-questions?topic=" + topic;
    const baseUrl = import.meta.env?.VITE_QUIZ_API || "http://localhost:3001";
    const url = baseUrl + apiUrl;
    const { isPending, error, data } = useQuery({
        queryKey: ["data", url],
        queryFn: () => fetch(url).then((res) => res.json()),
        enabled: shouldFetch,
    });
    let quizQuestions = null;
    if (shouldFetch && data && data.length > 0) {
        quizQuestions = randomSelection(data, number);
    }
    return { isPending, error, quizQuestions };
};
