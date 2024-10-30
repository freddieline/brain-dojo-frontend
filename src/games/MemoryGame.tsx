import Layout from "../layout/Layout";
import { GameState } from "../types/types";
import { Button } from "flowbite-react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
import MemoryGameContent from "../components/content/MemoryGameContent";
import { useMemoryGameState } from "../hooks/useMemoryGameState";

const MemoryGame = () => {
  const navigate = useNavigate();
  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  const {
    sequenceItems,
    selectableItems,
    gameState,
    timeToMemorize,
    currentIndex,
    handleInitialize,
    handleStart,
    handleSelection,
  } = useMemoryGameState();

  const gotoMainMenu = () => {
    navigate("/");
  };

  return (
    <Layout>
      {
        <>
          {gameState == GameState.Won && (
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
          {gameState == GameState.Lost && (
            <div className="modal-plain">
              <div className={MODAL_CONTENT_CLASSES}>
                <ImCross color="#ff2d2d" size={150}></ImCross>
              </div>
            </div>
          )}
          {gameState == GameState.PreGame && (
            <div id="modal" className="modal">
              <div className={MODAL_CONTENT_CLASSES}>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => handleInitialize(4)}
                  pill
                >
                  4 images
                </Button>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => handleInitialize(6)}
                  pill
                >
                  6 images
                </Button>
                <Button
                  size="lg"
                  color="purple"
                  onClick={() => handleInitialize(8)}
                  pill
                >
                  8 images
                </Button>
                <Button size="lg" color="light" onClick={gotoMainMenu} pill>
                  Main menu
                </Button>
              </div>
            </div>
          )}
          {gameState == GameState.HowToPlay && (
            <div id="modal" className="modal">
              <div className={MODAL_CONTENT_CLASSES}>
                <div
                  className={
                    "items-center w-[250px] h-[200px] p-8 rounded-lg bg-white text-center"
                  }
                >
                  <div>
                    Select the animals that appears in the top grid in the
                    correct order
                  </div>
                  <Button
                    size="lg"
                    className="ml-auto mr-auto mt-6"
                    color="purple"
                    onClick={() => handleStart()}
                    pill
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
          )}
          <MemoryGameContent
            sequenceItems={sequenceItems}
            selectableItems={selectableItems}
            handleSelection={handleSelection}
            gameState={gameState}
            timeToMemorize={timeToMemorize}
            currentIndex={currentIndex}
          />
        </>
      }
    </Layout>
  );
};

export default MemoryGame;
