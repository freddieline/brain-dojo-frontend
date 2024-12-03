import { Button } from "flowbite-react";
import { SequenceRecallGameState, SequenceItem } from "../../types/types";

interface InputProps {
  setupGame: () => void;
  gameState: SequenceRecallGameState;
  start: () => void;
  sequenceItems: SequenceItem[];
}

const MemoryGameMenu: React.FC<InputProps> = ({
  gameState,
  start,
  sequenceItems,
}) => {
  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  return (
    <>
      {gameState == SequenceRecallGameState.HowToPlay && (
        <div id="modal" className="modal">
          <div className={MODAL_CONTENT_CLASSES}>
            <div className="items-center w-[250px] h-[200px] p-8 rounded-lg bg-white text-center">
              <div>
                Select the {sequenceItems.length} animals that appear in the top
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
    </>
  );
};

export default MemoryGameMenu;
