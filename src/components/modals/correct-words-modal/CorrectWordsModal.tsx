import Modal from "@mui/material/Modal";
import "./CorrectWordsModal.css";
import { ButtonComponent } from "../../../components/ButtonComponent";

type InputProps = {
  correctWords: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const CorrectWordsModal:React.FC<InputProps> = ({correctWords, open, setOpen}) => {

  function onClose() {
      setOpen(false);
  }
  console.log(correctWords, correctWords.length > 0);
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="popup">
        <ul className="mb-2">
          {correctWords.length == 0 ? "No correct words" : correctWords.map((word: string) => <li>{word}</li>)}
        </ul>
        <ButtonComponent onClick={onClose} text="Close"></ButtonComponent>
      </div>
    </Modal>
  )
}