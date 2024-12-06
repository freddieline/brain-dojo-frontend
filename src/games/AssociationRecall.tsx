import { PairQuestion, PairsRecallGameState, Size } from "../types/types";
import { HiCheckCircle } from "react-icons/hi";
import { Button, TextInput } from "flowbite-react";
import Results from "../components/Results";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";
import cx from "classnames";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import { useState } from "react";
import { useAssociationRecallState } from "../hooks/game-state/useAssociationRecallState";
import { useFetchCountryCapitalPairs } from "../hooks/data-fetch/useFetchCountryCapitalPairs";

type InputProps = {
  recallInstruction: string;
  title: string;
  continent: string;
  number: number;
};

export const AssociationRecall: React.FC<InputProps> = ({
  recallInstruction,
  title,
  continent,
  number,
}) => {

  const [ shouldFetch, setShouldFetch ] = useState(true);
  const [ pairs, setPairs ] = useState<PairQuestion[]>([]);

  const { isPending, error, pairsData } = useFetchCountryCapitalPairs(
    continent,
    number,
    shouldFetch
  );

  const { pair, numberCorrect, gameState, questionNumber, handleSubmit, renderTime} = useAssociationRecallState(pairs);

  useEffect(() => {
    if (shouldFetch && pairsData) {
      setPairs(pairsData);
      setShouldFetch(false);
    }
  }, [pairsData]);

  if(!pairs) {
    return <p>No data</p>;
  }

  if (isPending) {
    return <p></p>;
  }

  if (error) {
    return <p>Error ... {error.message}</p>;
  }


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

  if (pairs && Array.isArray(pairs) && pairs.length > 0) {
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
                {
                  pairs?.map((pair) => {
                    return (
                      <div key={pair.value} className="flex flex-row flex-wrap">
                        <div className="w-[130px] mt-2">{pair.key}</div>
                        <div className="w-[130px] mt-2">{pair.value}</div>
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
                    <div className="w-[130px] mt-2">{pair?.key}</div>
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
                        autoFocus={true}
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
                        value={pair?.value}
                        autoFocus
                      ></TextInput>
                    )}
                    {pair?.isCorrect && (
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
