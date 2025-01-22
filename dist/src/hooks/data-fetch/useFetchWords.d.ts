import { WordWheel } from "../../types/types";
export declare const useFetchWords: (wordLength: number, shouldFetch: boolean) => {
    data: WordWheel | null;
    error: Error | null;
    isPending: boolean;
    derivedWords: Set<string> | null;
};
