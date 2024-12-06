import Layout from "../layout/Layout";
import MemoryGameMenu from "../components/MemoryGame/MemoryGameMenu";
import MemoryGameContent from "../components/MemoryGame/MemoryGameContent";
import { useMemorySequenceGameState } from "../hooks/game-state/useMemorySequenceGameState";
import { Size } from "../types/types";

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

  return (
    <Layout size={Size.small}>
      {
        <>
          <MemoryGameMenu
            setupGame={setupGame}
            start={start}
            gameState={gameState}
            sequenceLength={sequenceLength}
          ></MemoryGameMenu>
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

export default MemoriseSequence;
