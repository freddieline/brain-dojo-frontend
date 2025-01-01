import Modal from "@mui/material/Modal";
import "./ResultsPopup.css";
import { ButtonComponent } from "../ButtonComponent";
import { useNavigate } from "react-router-dom";

type InputProps = {
  open: boolean;
  derivedWords: Set<string>;
  corretWords: string[];
};

export const ResultsPopup: React.FC<InputProps> = ({
  open,
  derivedWords,
  corretWords,
}) => {
  const navigate = useNavigate();
  let wordArray = Array.from(derivedWords);
  const missedWords = wordArray.filter((word) => !corretWords.includes(word));

  let oddIndexItems= [];
  let evenIndexItems = [];
  for (var x = 0;  x < missedWords.length; x++){
    if(x % 2 != 0){
      oddIndexItems.push(missedWords[x]);
    }
    else {
      evenIndexItems.push(missedWords[x]);
    }
  }
  
  function handleTextChange(s: string) {
    console.log(s);
  }

  function handleClick(){
    navigate("/");
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="popup">
        <div>
          Well done! Your score is{" "}
          <span className="font-bold">{corretWords.length}</span>
        </div>
        <div className="mt-2">You missed these words which can be found in the <a className="text-blue-600 underline" href="https://www.collinsdictionary.com/dictionary/english">Collins English Dictionary</a></div>
        <div className="flex flex-row mt-4 h-[200px] overflow-scroll border-[2px] p-2">
          <ul className="w-[50%]">
            {evenIndexItems.length > 0 &&
              evenIndexItems.map((word: string) => <li key={word}>{word}</li>)}
          </ul>
          <ul className="w-[50%]">
            {oddIndexItems.length > 0 &&
              oddIndexItems.map((word: string) => <li key={word}>{word}</li>)}
          </ul>
        </div>
        {/* <TextInput
          type="text"
          label="Name"
          id="text-input"
          name="text-input"
          className="grow mt-2"
          autoFocus={true}
          onChange={handleTextChange}
          autoComplete="off"
        ></TextInput> */}
        <div className="mt-4  flex flex-row justify-between gap-2">
          <ButtonComponent
            onClick={handleClick}
            text={"Main menu"}
            width={250}
          ></ButtonComponent>
        </div>
      </div>
    </Modal>
  );
};
