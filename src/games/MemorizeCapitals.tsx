import { AssociationRecall } from "../games-engines/AssociationRecall";
import { useQuery } from "@tanstack/react-query";
import type { CapitalQuestion, PairQuestion } from "../types/types";

export const MemoriseCapital = () => {
  const apiUrl = "/api/capitals?continent=europe";
  const url = import.meta.env["VITE_QUIZ_API"] + apiUrl;

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  if (data) {
    const json = data.data.map((obj: CapitalQuestion) =>
      mapToPair(obj.country, obj.capital),
    );

    console.log(json);
    return (
      <AssociationRecall
        title="Capital cities"
        data={json}
        recallInstruction="Memorise the capital cities"
      ></AssociationRecall>
    );
  }

  if (isPending) {
    return <p></p>;
  }

  if (error) {
    return <p>Error ... {error.message}</p>;
  }

  function mapToPair(key: string, value: string): PairQuestion {
    return {
      key: key,
      value: value,
    };
  }
};
