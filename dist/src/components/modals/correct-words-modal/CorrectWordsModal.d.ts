import "./CorrectWordsModal.css";
type InputProps = {
    correctWords: string[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const CorrectWordsModal: React.FC<InputProps>;
export {};
