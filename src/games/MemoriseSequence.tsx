import Layout from "../layout/Layout";
import { useMemorySequenceGameState } from "../hooks/game-state/useMemorySequenceGameState";
import { Size } from "../types/types";
import { Button } from "flowbite-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SequenceTile from "../components/SequenceTile";
import SelectableTile from "../components/SelectableTile";
import { SequenceRecallGameState } from "../types/types";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from "react-confetti-explosion";

const MemoriseSequence = () => {
  const {
    sequenceItems,
    sequenceLength,
    selectableItems,
    gameState,
    timeToMemorize,
    currentIndex,
    setupGame,
    start,
    handleSelection,
  } = useMemorySequenceGameState();

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return remainingTime;
  };

  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  return (
    <Layout size={Size.small}>
      {
        <>
          {gameState == SequenceRecallGameState.PreGame && (
            <div id="modal" className="modal">
              <div className={MODAL_CONTENT_CLASSES}>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => setupGame(4)}
                  pill
                >
                  4 images
                </Button>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => setupGame(6)}
                  pill
                >
                  6 images
                </Button>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => setupGame(8)}
                  pill
                >
                  8 images
                </Button>
              </div>
            </div>
          )}
          {gameState == SequenceRecallGameState.HowToPlay && (
            <div id="modal" className="modal">
              <div className={MODAL_CONTENT_CLASSES}>
                <div className="items-center w-[250px] h-[200px] p-8 rounded-lg bg-white text-center">
                  <div>
                    Select the {sequenceLength} animals that appear in the top
                    grid in the correct order
                  </div>
                  <Button
                    size="lg"
                    className="ml-auto mr-auto mt-6"
                    color="purple"
                    onClick={() => start()}
                    pill
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          )}
          <>
            <h1 className="text-xl font-bold">Memorise the sequence</h1>
            <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-3">
              {gameState >= SequenceRecallGameState.Start &&
                sequenceItems.map((item, index) => {
                  return (
                    <SequenceTile
                      id={item.animal}
                      src={`animals/` + item.animal + `.jpeg`}
                      show={sequenceItems[index].show}
                      animate={gameState == SequenceRecallGameState.Memorize}
                      highlight={
                        index == currentIndex &&
                        gameState == SequenceRecallGameState.Play
                      }
                      incorrectlyGuessed={item.isWrong}
                    ></SequenceTile>
                  );
                })}
            </div>
            <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-4">
              {gameState >= SequenceRecallGameState.Start &&
                selectableItems.map((item) => {
                  return (
                    <SelectableTile
                      id={item.animal}
                      src={`animals/${item.animal}.jpeg`}
                      onClick={handleSelection}
                      show={gameState >= SequenceRecallGameState.Play}
                      selected={item.selected}
                    ></SelectableTile>
                  );
                })}
            </div>
            {gameState == SequenceRecallGameState.Memorize && (
              <div className="ml-[90px] mt-[-240px]">
                <CountdownCircleTimer
                  size={70}
                  isPlaying={gameState == SequenceRecallGameState.Memorize}
                  duration={timeToMemorize}
                  colors={["#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[4, 2, 0]}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
            )}
            {gameState == SequenceRecallGameState.Won && (
              <div className="modal-plain">
                <div className={MODAL_CONTENT_CLASSES}>
                  <ConfettiExplosion
                    duration={8000}
                    force={0.8}
                    height={"100vh"}
                    className=""
                  />
                  <TiTick color="#32a852" size={200}></TiTick>
                </div>
              </div>
            )}
            {gameState == SequenceRecallGameState.Lost && (
              <div className="modal-plain">
                <div className={MODAL_CONTENT_CLASSES}>
                  <ImCross color="#ff2d2d" size={150}></ImCross>
                </div>
              </div>
            )}
          </>
        </>
      }
    </Layout>
  );
};

export default MemoriseSequence;
