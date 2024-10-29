import { useState } from "react";
import { SequenceItem } from "../types/types";
import Layout from "../layout/Layout";
import { animals } from "../types/types"
import { randomSelection } from "../lib/randomSelection";
import { SelectItem, GameState } from '../types/types'
import { Button } from 'flowbite-react';
import { ImCross } from 'react-icons/im';
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import MemoryGameContent from '../components/content/MemoryGameContent';
import { useEffect } from "react";

const MemoryGame = () => {
  const [ sequenceItems, setSequenceItems ] = useState<SequenceItem[]>([]);
  const [ selectableItems, setSelectable] = useState<SelectItem[]>([]);
  const [ currentIndex, setCurrentIndex] = useState<number>(0);
  const [ sequenceLength, setSequenceLength ] = useState<number>(6);
  const [ gameState, setGameState ] = useState<GameState>(GameState.PreGame);
  const [ timeToMemorize, setTimeToMemorize ] = useState<number>(10);
  const navigate = useNavigate();

  type SequenceLength = 4 | 6 | 8;

  const gameConfig: Record<SequenceLength, { time: number }>  = {
    4: { time: 6 },
    6: { time: 10 },
    8: { time: 14 },
  };

  const handleStart = () => {
    setGameState(GameState.Start);
  }

  const handleInitialize = (sequenceLength: SequenceLength) => {
    setTimeToMemorize(gameConfig[sequenceLength].time);
    setCurrentIndex(0);
    setSequenceLength(sequenceLength);
    setGameState(GameState.HowToPlay);
  }

  const gotoMainMenu = () => {
    navigate('/');
  }

  function generateInitialCards(){
    const sequenceItemsIni = randomSelection(animals, sequenceLength);
    let sequenceItemsInitialState = sequenceItemsIni.map((item) => { return { animal: item, show: false, isWrong: false }});
    setSequenceItems(sequenceItemsInitialState);
    // make initial selectable items as random selection excluding the first sequence item
    let selectableAnimalsIni = randomSelection(animals, 3, [sequenceItemsIni[0]]);
    // next we will be add the first sequence item so that it is guaranteed to be entered once
    selectableAnimalsIni.splice(Math.floor(Math.random() * 3), 0, sequenceItemsIni[0]);
    const selectableAnimalsIniState = selectableAnimalsIni.map((item) => { return { animal: item, selected: false} })
    setSelectable(selectableAnimalsIniState);
    setGameState(GameState.Memorize);
  }

  const updateGameState = () => {
    if (gameState === GameState.Start) generateInitialCards();
    if (gameState === GameState.Memorize) revealSequence();
    if (gameState === GameState.Play && currentIndex > 0) shuffleSelectableItems();
    if (gameState === GameState.Won || gameState === GameState.Lost) {
      setTimeout(() => setGameState(GameState.PreGame), gameState === GameState.Won ? 5000 : 3000);
    }
  };

  function revealSequence(){
    setSequenceItems((prevItems) => {
      return [...prevItems].map((item) => {
        item.show = true;
        return item
      })
    });

    setTimeout(() => {
      setSequenceItems((prevItems) => {
        return [...prevItems].map((item) => {
          item.show = false;
          return item
        });
      });
      setGameState(GameState.Play);
    }, 1000 * timeToMemorize);
  }

  function updateCardDisplay(index: number, options: { show?: boolean; isWrong?: boolean } = {}) {
    setSequenceItems((prevItems) => {
      return prevItems.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            show: options.show ?? item.show,
            isWrong: options.isWrong ?? item.isWrong,
          };
        }
        return item;
      });
    });
  }

  function shuffleSelectableItems(){
    setSelectable(() => {
      const nextAnimal = sequenceItems[currentIndex].animal;
      let selectableAnimalsNew = randomSelection(animals, 3, [nextAnimal]);
      selectableAnimalsNew.splice(Math.floor(Math.random() * 3), 0, nextAnimal);
      return selectableAnimalsNew.map((item) => {
        return { animal: item, selected: false}
      });
    });
  }

  // update changes in game state
  useEffect(() => updateGameState() ,[gameState]);

  // update changes in user turns
  useEffect(() => {
    if(gameState == GameState.Play){
      updateCardDisplay(currentIndex - 1, { show: true });
      shuffleSelectableItems();
    }
  },[ currentIndex ]);

  const handleSelection = (animal: string) => {
    setSelectable((prevItems) => {
      return [...prevItems].map((item) => {
        if (item.animal == animal){
          item.selected = true;
        }
        return item;
      })
    });

    const isCorrect = sequenceItems[currentIndex]?.animal === animal;
    if( isCorrect ) {
      if(currentIndex != sequenceLength - 1){
        setCurrentIndex(prev => prev + 1 );
      } else {
        updateCardDisplay(currentIndex, { show: true });
        setGameState(GameState.Won);
      }
    } else {
      updateCardDisplay(currentIndex, { show: true, isWrong: true });
      setGameState(GameState.Lost);
    }
  };

  return (<Layout>
    {
      <>
        {gameState == GameState.Won && 
          <div className="modal-plain">
            <div className="flex flex-col items-center justify-center h-screen gap-5">
              <ConfettiExplosion 
                duration={8000}
                force={0.8}
                height={"100vh"}
                className=""
                />
              <TiTick color='#32a852' size={200}></TiTick>
            </div>
          </div>
        }
        {gameState == GameState.Lost && <div className="modal-plain">
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <ImCross color='#ff2d2d' size={150}></ImCross>
        </div>
        </div>
        }
        {gameState == GameState.PreGame && 
          <div id="modal" className="modal">
            <div className="flex flex-col items-center justify-center h-screen gap-5">
              <Button size="lg" color="purple" onClick={()=>handleInitialize(4)} pill>4 images</Button>
              <Button size="lg" color="purple" onClick={()=>handleInitialize(6)} pill>6 images</Button>
              <Button size="lg" color="purple" onClick={()=>handleInitialize(8)} pill>8 images</Button>
              <Button size="lg" color="light" onClick={gotoMainMenu} pill>Main menu</Button>
            </div>
          </div>
        }
        {gameState == GameState.HowToPlay && 
          <div id="modal" className="modal">
            <div className="flex flex-col items-center justify-center h-screen gap-5 max-w-[350px] mr-auto ml-auto">
              <div className="h-[200px] flex flex-col bg-white text-center p-8 rounded-lg flex flex-col justify-center space-around items-center">
              <div>Select each animal that appears in the top grid in the correct order</div>
              <Button size="lg" className="ml-auto mr-auto mt-6" color="purple" onClick={()=>handleStart()} pill>Start</Button>
              </div>
            </div>
          </div>
        }
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
</Layout>);
}

export default MemoryGame;