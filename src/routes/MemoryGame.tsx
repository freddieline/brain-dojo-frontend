import { useState, useMemo } from "react";
import SequenceTile from '../components/SequenceTile';
import SelectableTile from '../components/SelectableTile';
import Layout from "../layout/Layout";
import { animals } from "../types/types"
import { randomSelection } from "../lib/randomSelection";
import { useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button } from 'flowbite-react';
import {ImCross} from 'react-icons/im';
import { TiTick } from "react-icons/ti";
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';

type SequenceItem = {
  animal: string;
  show: boolean;
  isWrong: boolean;
}

type SelectItem = {
  animal: string;
  selected: boolean;
}

enum GameState {
  PreGame = 'pre-game',
  Settings = 'settings',
  Start = 'start',
  Memorize = 'memorize',
  Play = 'play',
  Won = 'won',
  Lost = 'lost',
}

const MemoryGame = () => {
  const [ sequenceAnimals, setSequenceAnimals ] = useState<SequenceItem[]>([]);
  const [ selectable, setSelectable ] = useState<SelectItem[]>([]);
  const [ currentIndex, setCurrentIndex] = useState<number>(0);
  const [ sequenceLength ] = useState<number>(6);
  const [ gameState, setGameState ] = useState<GameState>(GameState.PreGame);
  const [ timeToMemorize ] = useState<number>(7);
  const navigate = useNavigate();

  const handleStart = () => {
    setCurrentIndex(0);
    setGameState(GameState.Start);
  }
  const gotoMainMenu = () => {
    navigate('/');
  }

  function initializeCards(){
    const sequenceAnimalsIni = randomSelection(animals, sequenceLength);
    let sequenceAnimalsInitialState = sequenceAnimalsIni.map((item) => { return { animal: item, show: false, isWrong: false }});
    setSequenceAnimals(sequenceAnimalsInitialState);
    // make initial selectable items as random selection excluding the first sequence item
    let selectableAnimalsIni = randomSelection(animals, 3, [sequenceAnimalsIni[0]]);
    // next we will be add the first sequence item so that it is guaranteed to be entered once
    selectableAnimalsIni.splice(Math.floor(Math.random() * 3), 0, sequenceAnimalsIni[0]);
    const selectableAnimalsIniState = selectableAnimalsIni.map((item) => { return { animal: item, selected: false} })
    setSelectable(selectableAnimalsIniState);
    setGameState(GameState.Memorize);
  }

  function memorise(){
    setSequenceAnimals((prevItems) => {
      return [...prevItems].map((item) => {
        item.show = true;
        return item
      })
    });

    setTimeout(() => {
      setSequenceAnimals((prevItems) => {
        return [...prevItems].map((item) => {
          item.show = false;
          return item
        });
      });
      setGameState(GameState.Play);
    }, 1000 * timeToMemorize);
  }

  function showMisrememberedCard(){
    setSequenceAnimals((prevItems) => {
      return [...prevItems].map((item, index) => {
        if(index == currentIndex) {
          item.show = true;
          item.isWrong = true;
        }
        return item
      })
    });
  }

  function showCorrectlyMatchedCard(){
    setSequenceAnimals((prevItems) => {
      return [...prevItems].map((item, index) => {
        if(index == currentIndex - 1)
        item.show = true;
        return item
      })
    });
  }

  function showFinalMatchedCard(){
    setSequenceAnimals((prevItems) => {
      return [...prevItems].map((item, index) => {
        if(index == currentIndex)
        item.show = true;
        return item
      })
    });
  }

  function shuffle(){
    setSelectable(() => {
      const nextAnimal = sequenceAnimals[currentIndex].animal;
      let selectableAnimalsNew = randomSelection(animals, 3, [nextAnimal]);
      console.log(selectableAnimalsNew, nextAnimal);
      selectableAnimalsNew.splice(Math.floor(Math.random() * 3), 0, nextAnimal);
      return selectableAnimalsNew.map((item) => {
        return { animal: item, selected: false}
      });
    });
  }

  useEffect(() => {
    if(gameState === GameState.Start){
      initializeCards();
    }

    if(gameState === GameState.Memorize){
      memorise();
    }

    if(gameState == GameState.Won){
      showFinalMatchedCard();
      setTimeout(() => {
        setGameState(GameState.PreGame);
      },5000);
    }

    if(gameState == GameState.Lost){
      showMisrememberedCard();
      setTimeout(() => {
        setGameState(GameState.PreGame);
      },3000);
    }

  },[animals, gameState]);

  useEffect(() => {
    if(gameState == GameState.Play){
      showCorrectlyMatchedCard();
      shuffle();
    }
  },[ currentIndex ]);

  const handleOnClick = (animal: string) => {
    setSelectable((prevItems) => {
      return [...prevItems].map((item) => {
        if (item.animal == animal){
          item.selected = true;
        }
        return item;
      })
    });

    let currentIndexTemp = currentIndex;
    let gameStateTemp = gameState;

    const hasMatch = handleHasMatch(animal);

    if(!hasMatch){
      gameStateTemp = GameState.Lost;
    } else {
      if(currentIndex != sequenceLength - 1){
        currentIndexTemp = currentIndex + 1;
      } else {
        gameStateTemp = GameState.Won;
      }
    }

    setCurrentIndex(currentIndexTemp);
    setGameState(gameStateTemp);
  };

  function handleHasMatch(animal: string){
    return sequenceAnimals.find((item, index) => {
      return (animal === item.animal && currentIndex == index);
    });
  }

  const getContent = () =>  { 
    const show = useMemo(() => {
      return gameState !== GameState.PreGame && 
             gameState !== GameState.Start && 
             gameState !== GameState.Memorize;
    }, [gameState]);
    return <>
      <h1 className="text-xl font-bold">Memorise!</h1>
      <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-3">
        { gameState != GameState.PreGame && sequenceAnimals.map((item, index) => {
            return <SequenceTile 
                    id={item.animal}
                    src={`animals/`+item.animal+`.jpeg`} 
                    show={sequenceAnimals[index].show}
                    animate={gameState == GameState.Memorize} 
                    highlight={index == currentIndex && gameState == GameState.Play}
                    incorrectlyGuessed={item.isWrong}
                    >   
                  </SequenceTile>
        })}
        </div>
      <div className="flex flex-row align-center flex-wrap ml-auto mr-auto mt-4">
        
        { gameState != GameState.PreGame && selectable.map((item) => {
            return <SelectableTile 
                    id={item.animal}
                    src={`animals/${item.animal}.jpeg`} 
                    onClick={handleOnClick} 
                    show={show}
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
            duration={7}
            colors={[ '#F7B801', '#A30000', '#A30000']}
            colorsTime={[4, 2, 0]}
          >
        </CountdownCircleTimer> 
      </div>
      }
    </>
  };

  return (<Layout>
    {
      (gameState == GameState.PreGame || gameState == GameState.Lost || gameState == GameState.Won || gameState == GameState.Settings) ? <>

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
                  <Button size="lg" color="purple" onClick={handleStart} pill>Play</Button>
                  <Button size="lg" color="light" onClick={gotoMainMenu} pill>Main menu</Button>
                </div>
              </div>
            }
            {gameState == GameState.Settings && 
            <div id="modal" className="modal">
              <div className="flex flex-col items-center justify-center h-screen gap-5">
                <Button size="lg" color="purple" onClick={handleStart} pill>Play</Button>
                <Button size="lg" color="light" onClick={gotoMainMenu} pill>Main menu</Button>
              </div>
            </div>
            }
      { getContent() }
      </> :
      getContent() 
    } 


</Layout>);
}

export default MemoryGame;