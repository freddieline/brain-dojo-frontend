import { useQuery } from "@tanstack/react-query";
import { WordWheel } from "../../types/types";
import { useEffect, useState } from "react";
import { findDerivedWords } from "../../lib/getDerivedWords";
import { EXAMPLE_WORD_LIST } from "../../lib/exampleWordList";

export const useFetchWords = (
  wordLength: number,
  shouldFetch: boolean,
): {
  data: WordWheel | null;
  error: Error | null;
  isPending: boolean;
  derivedWords: Set<string> | null;
} => {
  const apiUrl = "/api/words?word_length=" + wordLength;
  const url = process.env["VITE_QUIZ_API"] + apiUrl;
  const [derivedWords, setDerivedWords] = useState<Set<string> | null>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["data", url],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (data?.word && shouldFetch) {
      setDerivedWords(findDerivedWords(data?.word, data.mainLetter, EXAMPLE_WORD_LIST));
    }
  }, [data, shouldFetch]);
  
  return { isPending, error, data, derivedWords };
};
