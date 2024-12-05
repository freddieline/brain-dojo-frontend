import { useState, useEffect } from "react";
import { CapitalQuestion, PairsRecallGameState, Size } from "../types/types";
import { HiCheckCircle } from "react-icons/hi";
import { Button, TextInput } from "flowbite-react";
import Results from "../components/Results";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { randomSelection } from "../lib/randomSelection";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import React, { FormEvent } from "react";
import Layout from "../layout/Layout";

type InputProps = {
  recallInstruction: string;
  apiUrl: string;
  title: string;
};

export const AssociationRecall: React.FC<InputProps> = ({
  recallInstruction,
  apiUrl,
  title,
}) => {
  const url = import.meta.env["VITE_QUIZ_API"] + apiUrl;

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  const [numberCorrect, setNumberCorrect] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [gameState, setGameState] = useState<PairsRecallGameState>(
    PairsRecallGameState.Memorize,
  );
  const [capitals, setCapitals] = useState<CapitalQuestion[]>([]);
  const capital = capitals[questionNumber - 1];

  useEffect(() => {
    if (data) {
      const randomCapitals: CapitalQuestion[] = randomSelection(data.data, 10);
      setCapitals(randomCapitals);
    }
  }, [data]);

  if (isPending) {
    return <p></p>;
  }

  if (error) {
    return <p>Error ... {error.message}</p>;
  }

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setGameState(PairsRecallGameState.Play);
      return 0;
    }
    return remainingTime;
  };

  if (gameState == PairsRecallGameState.Finish) {
    return (
      <div className="mt-4 rounded-lg w-[600px] m-auto">
        <Results
          totalQuestions={10}
          numberCorrect={numberCorrect}
          quizName={title}
        ></Results>
      </div>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (gameState == PairsRecallGameState.Play) {
      checkAnswer(e);
    } else if (questionNumber == 10) {
      setGameState(PairsRecallGameState.Finish);
    } else {
      setQuestionNumber(questionNumber + 1);
      setGameState(PairsRecallGameState.Play);
    }
  }

  function checkAnswer(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const answer = formData.get("text-input")?.toString();

    if (capitals && answer) {
      if (
        capital.capital
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s]/g, "") ==
        answer
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      ) {
        setNumberCorrect((prev) => (prev += 1));
        setGameState(PairsRecallGameState.Correct);
      } else {
        setGameState(PairsRecallGameState.Incorrect);
      }
    }
  }

  if (capitals.length > 0) {
    return (
      <Layout size={Size.medium}>
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            {gameState == PairsRecallGameState.Memorize && (
              <>
                <div>{recallInstruction}</div>
                <div className="text-xl m-auto mt-5 mb-8">
                  <CountdownCircleTimer
                    size={100}
                    isPlaying={gameState == PairsRecallGameState.Memorize}
                    duration={20}
                    colors={["#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 5, 0]}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
                {capitals &&
                  capitals.map((capital) => {
                    return (
                      <div
                        key={capital.capital}
                        className="flex flex-row flex-wrap"
                      >
                        <div className="w-[130px] mt-2">{capital.country}</div>
                        <div className="w-[130px] mt-2">{capital.capital}</div>
                      </div>
                    );
                  })}
              </>
            )}
            {gameState !== PairsRecallGameState.Memorize &&
              (gameState as PairsRecallGameState) !==
                PairsRecallGameState.Finish && (
                <>
                  <div
                    key={questionNumber}
                    className="flex flex-row flex-wrap gap-2"
                  >
                    <div className="w-[130px] mt-2">{capital.country}</div>
                    {gameState !== PairsRecallGameState.Incorrect && (
                      <TextInput
                        style={{
                          borderWidth: "2px",
                          borderColor: cx({
                            "#32CD32":
                              gameState === PairsRecallGameState.Correct,
                          }),
                        }}
                        disabled={gameState == PairsRecallGameState.Correct}
                        type="text"
                        id="text-input"
                        name="text-input"
                        autoFocus
                      ></TextInput>
                    )}
                    {gameState == PairsRecallGameState.Incorrect && (
                      <TextInput
                        style={{
                          borderWidth: "2px",
                          borderColor: "#ff0000",
                        }}
                        disabled={true}
                        id="text-input"
                        value={capital.capital}
                        autoFocus
                      ></TextInput>
                    )}
                    {capital.isCorrect && (
                      <HiCheckCircle
                        color="green"
                        size={30}
                        className="mt-1"
                      ></HiCheckCircle>
                    )}
                  </div>
                  <div className="flex flex-row flex-wrap mt-2">
                    {gameState == PairsRecallGameState.Play && (
                      <Button
                        className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-1 font-bold mt-5 w-[200px]"
                        type="submit"
                        name="submit2"
                      >
                        Submit
                      </Button>
                    )}
                    {gameState != PairsRecallGameState.Play && (
                      <Button
                        className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-1 font-bold mt-5 w-[200px]"
                        type="submit"
                        name="submit2"
                        autoFocus
                      >
                        {questionNumber != 10 && "Next question"}
                        {PairsRecallGameState.Play &&
                          questionNumber == 10 &&
                          "Show results"}
                      </Button>
                    )}
                  </div>
                </>
              )}
          </form>
        </div>
      </Layout>
    );
  } else {
    return <>No data</>;
  }
};

export default AssociationRecall;
