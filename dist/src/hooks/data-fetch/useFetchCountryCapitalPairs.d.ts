import { PairQuestion } from "../../types/types";
export declare const useFetchCountryCapitalPairs: (continent: string, number: number, shouldFetch: boolean) => {
    pairs: PairQuestion[];
    error: Error | null;
    isPending: boolean;
};
