import { useState, useEffect } from "react";
import { SequenceItem, SelectItem, GameState } from "../types/types";
import { randomSelection } from "../lib/randomSelection";
import { animals } from "../types/types";
import { SequenceLength } from "../types/types";

const gameConfig: Record<SequenceLength, { time: number }> = {
  4: { time: 6 },
  6: { time: 10 },
  8: { time: 14 },
};

export const useMemoryGameState = () => {
  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);
  const [selectableItems, setSelectable] = useState<SelectItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sequenceLength, setSequenceLength] = useState<number>(6);
  const [gameState, setGameState] = useState<GameState>(GameState.PreGame);
  const [timeToMemorize, setTimeToMemorize] = useState<number>(10);

  const setupGame = (sequenceLength: SequenceLength) => {
    setTimeToMemorize(gameConfig[sequenceLength].time);
    setCurrentIndex(0);
    setSequenceLength(sequenceLength);
    setGameState(GameState.HowToPlay);
  };

  const start = () => {
    setGameState(GameState.Start);
  };

  // update changes in user turns
  useEffect(() => {
    if (gameState == GameState.Play) {
      updateCardDisplay(currentIndex - 1, { show: true });
      shuffleSelectableItems();
    }
  }, [currentIndex]);

  useEffect(() => updateGameState(), [gameState]);

  const updateGameState = () => {
    if (gameState === GameState.Start) generateInitialCards();
    if (gameState === GameState.Memorize) revealSequence();
    if (gameState === GameState.Play && currentIndex > 0)
      shuffleSelectableItems();
    if (gameState === GameState.Won || gameState === GameState.Lost) {
      setTimeout(
        () => setGameState(GameState.PreGame),
        gameState === GameState.Won ? 5000 : 3000,
      );
    }
  };

  function generateInitialCards() {
    const sequenceItemsIni = randomSelection(animals, sequenceLength);
    let sequenceItemsInitialState = sequenceItemsIni.map((item) => {
      return { animal: item, show: false, isWrong: false };
    });
    setSequenceItems(sequenceItemsInitialState);
    // make initial selectable items as random selection excluding the first sequence item
    let selectableAnimalsIni = randomSelection(animals, 3, [
      sequenceItemsIni[0],
    ]);
    // next we will be add the first sequence item so that it is guaranteed to be entered once
    selectableAnimalsIni.splice(
      Math.floor(Math.random() * 3),
      0,
      sequenceItemsIni[0],
    );
    const selectableAnimalsIniState = selectableAnimalsIni.map((item) => {
      return { animal: item, selected: false };
    });
    setSelectable(selectableAnimalsIniState);
    setGameState(GameState.Memorize);
  }

  function revealSequence() {
    setSequenceItems((prevItems) =>
      prevItems.map((item) => ({ ...item, show: true })),
    );

    setTimeout(() => {
      setSequenceItems((prevItems) =>
        prevItems.map((item) => ({ ...item, show: false })),
      );
      setGameState(GameState.Play);
    }, 1000 * timeToMemorize);
  }

  const handleSelection = (animal: string) => {
    setSelectable((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: item.animal == animal ? true : false,
      })),
    );

    const isCorrect = sequenceItems[currentIndex]?.animal === animal;
    if (isCorrect) {
      if (currentIndex != sequenceLength - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        updateCardDisplay(currentIndex, { show: true });
        setGameState(GameState.Won);
      }
    } else {
      updateCardDisplay(currentIndex, { show: true, isWrong: true });
      setGameState(GameState.Lost);
    }
  };

  function updateCardDisplay(
    index: number,
    options: { show?: boolean; isWrong?: boolean } = {},
  ) {
    setSequenceItems((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, ...options } : item,
      ),
    );
  }

  function shuffleSelectableItems() {
    setSelectable(() => {
      const nextAnimal = sequenceItems[currentIndex].animal;
      let selectableAnimalsNew = randomSelection(animals, 3, [nextAnimal]);
      selectableAnimalsNew.splice(Math.floor(Math.random() * 3), 0, nextAnimal);
      return selectableAnimalsNew.map((item) => {
        return { animal: item, selected: false };
      });
    });
  }

  return {
    sequenceItems,
    selectableItems,
    currentIndex,
    gameState,
    timeToMemorize,
    setupGame,
    start,
    handleSelection,
  };
};
