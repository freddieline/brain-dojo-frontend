import { randomSelection } from "../../lib/randomSelection";
import type { CapitalQuestion } from "../../types/types";
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
  const url = import.meta.env["VITE_QUIZ_API"] + apiUrl;
  console.log(shouldFetch);
  const { isPending, error, data } = useQuery({
    queryKey: ["data", url],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: shouldFetch,
  });

  let pairsData = null;
  if (data && data.data.length > 0) {
    const jsonData: PairQuestion[] = data.data.map((obj: CapitalQuestion) => ({
      key: obj.country,
      value: obj.capital,
    }));
    pairsData = randomSelection(jsonData, number);
  }

  return { isPending, error, pairsData };
};
