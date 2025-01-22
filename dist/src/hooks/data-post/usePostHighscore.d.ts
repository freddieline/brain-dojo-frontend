interface PostLeaderboardItemProps {
    name: string;
    score: number;
    game: string;
}
export declare const usePostHighscore: () => {
    mutate: import("@tanstack/react-query").UseMutateFunction<any, Error, PostLeaderboardItemProps, unknown>;
    isPending: boolean;
    isError: boolean;
    error: Error | null;
    isSuccess: boolean;
    data: any;
};
export {};
