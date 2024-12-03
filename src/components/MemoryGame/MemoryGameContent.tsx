import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SequenceTile from "./SequenceTile";
import SelectableTile from "./SelectableTile";
import {
  SelectItem,
  SequenceItem,
  SequenceRecallGameState,
} from "../../types/types";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from "react-confetti-explosion";

interface InputProps {
  selectableItems: SelectItem[];
  sequenceItems: SequenceItem[];
  gameState: SequenceRecallGameState;
  handleSelection: (animal: string) => void;
  timeToMemorize: number;
  currentIndex: number;
}

const MemoryGameContent: React.FC<InputProps> = ({
  sequenceItems,
  selectableItems,
  handleSelection,
  gameState,
  timeToMemorize,
  currentIndex,
}) => {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return remainingTime;
  };


  console.log(sequenceItems);

  const MODAL_CONTENT_CLASSES =
    "flex flex-col items-center justify-center h-screen gap-5";

  return (
    <>
      <h1 className="text-xl font-bold">Memorise!</h1>
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
  );
};

export default MemoryGameContent;
