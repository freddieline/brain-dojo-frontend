import { randomSelection } from "../../lib/randomSelection";
import type { Capital } from "../../types/types";
import { PairQuestion } from "../../types/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchCountryCapitalPairs = (
  continent: string,
  number: number,
  shouldFetch: boolean,
): {
  pairsData: PairQuestion[] | null;
  error: Error | null;
  isPending: boolean;
} => {
  const apiUrl = "/api/capitals?continent=" + continent;
  const url = process.env["VITE_QUIZ_API"] + apiUrl;

  const { isPending, error, data } = useQuery({
    queryKey: ["data", url],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: shouldFetch,
  });

  let pairsData = null;
  if (shouldFetch && data && data.data.length > 0) {
    const jsonData: PairQuestion[] = data.data.map((obj: Capital) => ({
      key: obj.country,
      value: obj.capital,
    }));
    pairsData = randomSelection(jsonData, number);
  }

  return { isPending, error, pairsData };
};
