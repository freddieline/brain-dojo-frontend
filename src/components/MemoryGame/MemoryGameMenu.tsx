import { Button } from "flowbite-react";
import { GameState } from "../../types/types";
import { SequenceLength } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface InputProps {
  setupGame: (numberOfSquares: SequenceLength) => void;
  gameState: GameState;
  start: () => void;
}

const MemoryGameMenu: React.FC<InputProps> = ({
  setupGame,
  gameState,
  start,
}) => {
  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  const navigate = useNavigate();
  const gotoMainMenu = () => {
    navigate("/");
  };
  return (
    <>
      {gameState == GameState.PreGame && (
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
            <Button size="lg" color="light" onClick={gotoMainMenu} pill>
              Main menu
            </Button>
          </div>
        </div>
      )}
      {gameState == GameState.HowToPlay && (
        <div id="modal" className="modal">
          <div className={MODAL_CONTENT_CLASSES}>
            <div className="items-center w-[250px] h-[200px] p-8 rounded-lg bg-white text-center">
              <div>
                Select the animals that appear in the top grid in the correct
                order
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
