import { useMutation } from "@tanstack/react-query";

interface PostLeaderboardItemProps {
  name: string;
  score: number;
  game: string;
}

export const usePostHighscore = () => {
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: async (body: PostLeaderboardItemProps) => {
      const url = process.env["VITE_QUIZ_API"] + "/api/leaderboard";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error: " + response.statusText);
      }

      return response.json();
    },
  });

  return { mutate, isPending, isError, error, isSuccess, data };
};
