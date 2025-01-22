import { SequenceItem, SelectItem } from "../../types/types";
import { SequenceRecallGameState } from "../../types/constants";
export declare const useMemorySequenceGameState: () => {
    sequenceItems: SequenceItem[];
    sequenceLength: number;
    selectableItems: SelectItem[];
    currentIndex: number;
    gameState: SequenceRecallGameState;
    timeToMemorize: number;
    setupGame: (sequenceLength: number) => void;
    start: () => void;
    handleSelection: (animal: string) => void;
    nextLevel: () => void;
};
