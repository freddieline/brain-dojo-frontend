import { SingleLetter } from "../../../types/types";
import "./WordWheel.css";
import cx from "classnames";

type WWLInputProps = {
  letters: SingleLetter[];
  mainLetter: SingleLetter;
  handlePress: (l: SingleLetter, i: number) => void;
  pressedLetters: boolean[];
};

export const WordWheelLetters: React.FC<WWLInputProps> = ({
  letters,
  mainLetter,
  handlePress,
  pressedLetters,
}) => {
  return (
    <div className="circle-container">
      {letters.map((letter, index) => (
        <button
          key={"item-" + index}
          className={cx({
            "circle-item": true,
            "item-clicked": pressedLetters[index],
          })}
          onClick={() => handlePress(letter, index)}
          type="button"
          disabled={pressedLetters[index]}
        >
          <div key={"item-text-" + index} className="circle-item-text">
            {letter}
          </div>
        </button>
      ))}
      <button
        className={cx({
          "centre-letter": true,
          "item-clicked": pressedLetters[8],
        })}
        disabled={pressedLetters[8]}
        onClick={() => handlePress(mainLetter, 8)}
        type="button"
      >
        {mainLetter.toLowerCase()}
      </button>
    </div>
  );
};
