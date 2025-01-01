import { randomSelection } from "../../lib/randomSelection";
import type { Capital } from "../../types/types";
import { PairQuestion } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const useFetchCountryCapitalPairs = (
  continent: string,
  number: number,
  shouldFetch: boolean,
): {
  pairs: PairQuestion[];
  error: Error | null;
  isPending: boolean;
} => {
  const apiUrl = "/api/capitals?continent=" + continent;
  const url = process.env["VITE_QUIZ_API"] + apiUrl;

  const [pairs, setPairs] = useState<PairQuestion[]>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["data", url],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (data && data.data.length > 0 && shouldFetch) {
      const jsonData: PairQuestion[] = data.data.map((obj: Capital) => ({
        key: obj.country,
        value: obj.capital,
      }));
      setPairs(randomSelection(jsonData, number));
    }
  }, [data, number, shouldFetch]);

  return { isPending, error, pairs };
};
