import { SingleLetter } from "../../types/types";
import "./WordWheel.css";
type WWLInputProps = {
    letters: SingleLetter[];
    mainLetter: SingleLetter;
    handlePress: (l: SingleLetter, i: number) => void;
    pressedLetters: boolean[];
};
export declare const WordWheelLetters: React.FC<WWLInputProps>;
export {};
