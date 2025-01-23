import { PairQuestion } from "../../types/types";
import { GeneralGameState, Size } from "../../types/constants";
import { HiCheckCircle } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import Results from "../../components/multiple-choice-quiz/QuizResults";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React from "react";
import cx from "classnames";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useAssociationRecallState } from "../../hooks/game-state/useAssociationRecallState";
import { useFetchCountryCapitalPairs } from "../../hooks/data-fetch/useFetchCountryCapitalPairs";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useNavigate } from "react-router-dom";

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
  const [shouldFetch] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isPending, error, pairs } = useFetchCountryCapitalPairs(
    continent,
    number,
    shouldFetch,
  );

  const quit = () => {
    navigate("/");
  };

  const {
    pair,
    numberCorrect,
    gameState,
    questionNumber,
    handleSubmit,
    renderTime,
  } = useAssociationRecallState(pairs);

  if (!pairs) {
    return <p>No data</p>;
  }

  if (isPending) {
    return <p></p>;
  }

  if (error) {
    return <p>Error ... {error.message}</p>;
  }

  if (gameState == GeneralGameState.Finish) {
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
            {gameState == GeneralGameState.Memorize && (
              <>
                <div>{recallInstruction}</div>
                <div className="text-xl m-auto mt-5 mb-8">
                  <CountdownCircleTimer
                    size={100}
                    isPlaying={gameState == GeneralGameState.Memorize}
                    duration={20}
                    colors={["#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 5, 0]}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
                {pairs?.map((pair) => {
                  return (
                    <div key={pair.value} className="flex flex-row flex-wrap">
                      <div className="w-[130px] mt-2">{pair.key}</div>
                      <div className="w-[130px] mt-2">{pair.value}</div>
                    </div>
                  );
                })}
              </>
            )}
            {gameState !== GeneralGameState.Memorize &&
              (gameState as GeneralGameState) !== GeneralGameState.Finish && (
                <>
                  <div
                    key={questionNumber}
                    className="flex flex-row flex-wrap gap-2"
                  >
                    <div className="w-[130px] mt-2">{pair?.key}</div>
                    {gameState !== GeneralGameState.Incorrect && (
                      <TextInput
                        style={{
                          borderWidth: "2px",
                          borderColor: cx({
                            "#32CD32": gameState === GeneralGameState.Correct,
                          }),
                        }}
                        disabled={gameState == GeneralGameState.Correct}
                        type="text"
                        id="text-input"
                        name="text-input"
                        autoFocus={true}
                        autoComplete="off"
                      ></TextInput>
                    )}
                    {gameState == GeneralGameState.Incorrect && (
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
                  <div className="flex flex-row flex-wrap mt-6 gap-4">
                    {gameState == GeneralGameState.Play && (
                      <ButtonComponent
                        text={"Submit"}
                        autoFocus={false}
                        submit={true}
                      ></ButtonComponent>
                    )}
                    {gameState != GeneralGameState.Play &&
                      questionNumber != 10 && (
                        <ButtonComponent
                          text={"Next question"}
                          autoFocus={true}
                          submit={true}
                        ></ButtonComponent>
                      )}
                    {gameState != GeneralGameState.Play &&
                      questionNumber == 10 && (
                        <ButtonComponent
                          text={"Show results"}
                          submit={true}
                          autoFocus={true}
                        ></ButtonComponent>
                      )}
                    {gameState != GeneralGameState.Play &&
                      questionNumber == 10 && (
                        <ButtonComponent
                          text={"Show results"}
                          submit={true}
                          autoFocus={true}
                        ></ButtonComponent>
                      )}
                    <ButtonComponent
                      text={"Quit"}
                      autoFocus={true}
                      onClick={quit}
                      type="secondary"
                    ></ButtonComponent>
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
