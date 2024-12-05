import { Button } from "flowbite-react";
import { SequenceRecallGameState } from "../../types/types";

interface InputProps {
  setupGame: (numberOfItems: number) => void;
  gameState: SequenceRecallGameState;
  start: () => void;
  sequenceLength: number;
}

const MemoryGameMenu: React.FC<InputProps> = ({
  gameState,
  setupGame,
  start,
  sequenceLength,
}) => {
  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  return (
    <>
      {gameState == SequenceRecallGameState.PreGame && (
        <div id="modal" className="modal">
          <div className={MODAL_CONTENT_CLASSES}>
            <Button size="lg" color="purple" onClick={() => setupGame(4)} pill>
              4 images
            </Button>
            <Button size="lg" color="purple" onClick={() => setupGame(6)} pill>
              6 images
            </Button>
            <Button size="lg" color="purple" onClick={() => setupGame(8)} pill>
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
                Select the {sequenceLength} animals that appear in the top grid
                in the correct order
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
    </>
  );
};

export default MemoryGameMenu;
