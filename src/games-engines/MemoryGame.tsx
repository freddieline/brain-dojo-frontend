import Layout from "../layout/Layout";
import MemoryGameMenu from "../components/MemoryGame/MemoryGameMenu";

import MemoryGameContent from "../components/MemoryGame/MemoryGameContent";
import { useMemoryGameState } from "../hooks/useMemoryGameState";

const MemoryGame = () => {
  const {
    sequenceItems,
    selectableItems,
    gameState,
    timeToMemorize,
    currentIndex,
    setupGame,
    start,
    handleSelection,
  } = useMemoryGameState();

  return (
    <Layout>
      {
        <>
          <MemoryGameMenu
            setupGame={setupGame}
            start={start}
            gameState={gameState}
            sequenceItems={sequenceItems}
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

export default MemoryGame;
