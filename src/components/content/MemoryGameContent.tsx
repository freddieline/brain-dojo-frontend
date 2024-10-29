import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SequenceTile from '../../components/SequenceTile';
import SelectableTile from '../../components/SelectableTile';
import { SelectItem, SequenceItem, GameState } from '../../types/types'

interface InputProps {
  selectableItems: SelectItem[];
  sequenceItems: SequenceItem[];
  gameState: GameState;
  handleSelection: (animal: string) => void;
  timeToMemorize: number;
  currentIndex: number;
}

const MemoryGameContent: React.FC<InputProps> = ({ sequenceItems, selectableItems, handleSelection, gameState, timeToMemorize, currentIndex }) => {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return remainingTime;
  };

  return <>
      <h1 className="text-xl font-bold">Memorise!</h1>
      <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-3">
        { gameState >= GameState.Start && sequenceItems.map((item, index) => {
            return <SequenceTile 
                    id={item.animal}
                    src={`animals/`+item.animal+`.jpeg`} 
                    show={sequenceItems[index].show}
                    animate={gameState == GameState.Memorize} 
                    highlight={index == currentIndex && gameState == GameState.Play}
                    incorrectlyGuessed={item.isWrong}
                    >   
                  </SequenceTile>
        })}
        </div>
      <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-4">

        { gameState >= GameState.Start && selectableItems.map((item) => {
            return <SelectableTile 
                    id={item.animal}
                    src={`animals/${item.animal}.jpeg`} 
                    onClick={handleSelection} 
                    show={gameState >= GameState.Play}
                    selected={item.selected}
                    >
                  </SelectableTile>
        })}
      </div>
      { gameState == GameState.Memorize && 
      <div className="ml-[90px] mt-[-240px]">
        <CountdownCircleTimer
            size={70}
            isPlaying={gameState == GameState.Memorize}
            duration={timeToMemorize}
            colors={[ '#F7B801', '#A30000', '#A30000']}
            colorsTime={[4, 2, 0]}
          >
            {renderTime}
        </CountdownCircleTimer> 
      </div>
      }
    </>
};

export default MemoryGameContent;