import React, { useState, useEffect } from "react";
import { useFetchWords } from "../../hooks/data-fetch/useFetchWords";
import Layout from "../../components/Layout";
import { Size, GeneralGameState } from "../../types/constants";
import { ButtonComponent } from "../../components/ButtonComponent";
import { WordWheelLetters } from "../../components/word-wheel-letters/WordWheelLetters";
import { CorrectWords } from "../../components/CorrectWords";
import { EXAMPLE_WORD_LIST } from "../../lib/exampleWordList";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ResultsPopup } from "../../components/modals/results-modal/ResultsPopup";
import { SingleLetter } from "../../types/types";
import { useMediaQuery } from "@mui/material";
import { CorrectWordsModal } from "../../components/modals/correct-words-modal/CorrectWordsModal";

type WordWheelProps = {
  wordLength: number;
  numberOfQuestions: number;
};

export const WordWheel: React.FC<WordWheelProps> = ({ wordLength }) => {
  const [gameState, setGameState] = useState<GeneralGameState>(
    GeneralGameState.Play,
  );

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const { data, derivedWords, error, isPending } = useFetchWords(
    wordLength,
    shouldFetch,
  );
  const [errorText, setErrorText] = useState<string>("");
  const [openResults, setOpenResults] = React.useState(false);
  const [pressedLetters, setPressedLetters] = useState<boolean[]>(
    Array(9).fill(false),
  );
  const [openCorrectWordsModal, setOpenCorrectWordsModal ] = useState<boolean>(false);

  const isMobile = useMediaQuery("(max-width:567px)");

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      handleFinish();
      return "00 : 00";
    }

    const minutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(minutes)} : ${pad(remainingSeconds)}`;
  };

  function handleFinish() {
    setGameState(GeneralGameState.Finish);
    setOpenResults(true);
  }

  useEffect(() => {
    if (data && shouldFetch) {
      setShouldFetch(false);
    }
  }, [data, shouldFetch]);

  if (error) {
    return <>{error.message}</>;
  }

  if (isPending || !data) {
    return <></>;
  }

  function handleClearText() {
    setGuess("");
    setPressedLetters(Array(9).fill(false));
    setGameState(GeneralGameState.Play);
  }

  function handlePress(l: SingleLetter, i: number) {
    setGameState(GeneralGameState.Play);
    setGuess(guess + l);
    const newPressedLetters = [...pressedLetters];
    newPressedLetters[i] = !newPressedLetters[i];
    setPressedLetters(newPressedLetters);
  }

  function handleSubmit() {
    if (data && derivedWords) {
      const correctWord = EXAMPLE_WORD_LIST.find((word) => word === guess);
      if (
        correctWord &&
        !correctWords.find((word) => word === correctWord) &&
        guess.includes(data.mainLetter) &&
        guess.length > 3
      ) {
        setGameState(GeneralGameState.Correct);
        setCorrectWords((prevWords) => [guess, ...prevWords]);
      } else if (
        correctWord &&
        correctWords.find((word) => word === correctWord)
      ) {
        setErrorText("Word already used");
        setGameState(GeneralGameState.Incorrect);
      } else if (correctWord && !guess.includes(data.mainLetter)) {
        setErrorText("Central letter not used");
        setGameState(GeneralGameState.Incorrect);
      } else if (correctWord && guess.length <= 3) {
        setErrorText("More than 3 letters needed");
        setGameState(GeneralGameState.Incorrect);
      } else {
        setErrorText("Not a word");
        setGameState(GeneralGameState.Incorrect);
      }
    }
    setGuess("");
    setPressedLetters(Array(9).fill(false));
    setRefreshKey(1 + refreshKey);
  }

  return (
    <Layout size={Size.large}>
      <div className="flex flex-row justify-between">
        <div className="">
          <div className="text-2xl mb-4">Word wheel</div>
          <div className="text-lg mb-2 max-w-[290px]">
            Find words with more than 3 letters using the central letter.
          </div>
        </div>
        <CountdownCircleTimer
          size={85}
          duration={600}
          isPlaying={gameState != GeneralGameState.Finish}
          colors={["#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 5, 0]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <form autoComplete="off">
        <div className="flex flex-row flex-grow gap-2 justify-between flex-wrap">
          <WordWheelLetters
            letters={data.letters}
            mainLetter={data.mainLetter}
            key={refreshKey}
            handlePress={handlePress}
            pressedLetters={pressedLetters}
          ></WordWheelLetters>
          { isMobile ? <div><ButtonComponent text="Show correct words" type="secondary" className="mb-5" onClick={() => setOpenCorrectWordsModal(true)}></ButtonComponent><CorrectWordsModal correctWords={correctWords} open={openCorrectWordsModal} setOpen={setOpenCorrectWordsModal}></CorrectWordsModal></div> : <CorrectWords words={correctWords}></CorrectWords>}
        </div>
        <div className="mb-2 mt-2">9 letter word hint: {data.hint}</div>
        <div className="flex flex-row flex-grow gap-2 flex-wrap">
          <div className="w-[47%]">
            <div className="text-2xl border-2 border-gray-500 rounded p-1">
              &nbsp;{guess}
            </div>
            {GeneralGameState.Incorrect == gameState && (
              <div className="text-red-500 font-bold">{errorText}</div>
            )}
          </div>
          <div className="flex flex-row flex-grow gap-2">
            <ButtonComponent
              type="primary"
              height={44}
              text={"Add"}
              width={80}
              onClick={handleSubmit}
            ></ButtonComponent>
            <ButtonComponent
              type="secondary"
              height={44}
              text={"Clear"}
              onClick={handleClearText}
              width={80}
            ></ButtonComponent>
            <ButtonComponent
              type="secondary"
              height={44}
              text={"Finish"}
              onClick={handleFinish}
              width={100}
            ></ButtonComponent>
          </div>
        </div>
      </form>
      {derivedWords && (
        <ResultsPopup
          open={openResults}
          derivedWords={derivedWords}
          corretWords={correctWords}
        ></ResultsPopup>
      )}
    </Layout>
  );
};
