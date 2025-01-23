import { ButtonComponent } from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../TextInput";
import { usePostHighscore } from "../../hooks/data-post/usePostHighscore";

type InputProps = {
  open: boolean;
  derivedWords: Set<string> | null;
  corretWords: string[];
};

export const WordWheelResults: React.FC<InputProps> = ({
  derivedWords,
  corretWords,
}) => {
  const navigate = useNavigate();
  let wordArray: string[] = [];
  if (derivedWords) {
    wordArray = Array.from(derivedWords);
  }
  const missedWords = wordArray.filter((word) => !corretWords.includes(word));

  let oddIndexItems = [];
  let evenIndexItems = [];
  for (var x = 0; x < missedWords.length; x++) {
    if (x % 2 != 0) {
      oddIndexItems.push(missedWords[x]);
    } else {
      evenIndexItems.push(missedWords[x]);
    }
  }

  const { mutate, isSuccess, data } = usePostHighscore();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.name) {
      const body = {
        name: data.name as string,
        game: "word wheel",
        score: corretWords.length == 0 ? 1 : corretWords.length,
      };
      mutate(body);
    } else {
      console.log("no name");
    }
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div>
      {!isSuccess && (
        <div>
          <div className="text-xl">
            Well done! Your score is{" "}
            <span className="font-bold">{corretWords.length}</span>
          </div>
          <div className="mt-2">
            You missed these words which can be found in the{" "}
            <a
              className="text-blue-600 underline"
              href="https://www.collinsdictionary.com/dictionary/english"
              target="_blank"
            >
              Collins English Dictionary
            </a>
          </div>
          <div className="flex flex-row mt-4 h-[200px] overflow-scroll border-[2px] p-2">
            <ul className="w-[50%]">
              {evenIndexItems.length > 0 &&
                evenIndexItems.map((word: string) => (
                  <li key={word}>{word}</li>
                ))}
            </ul>
            <ul className="w-[50%]">
              {oddIndexItems.length > 0 &&
                oddIndexItems.map((word: string) => <li key={word}>{word}</li>)}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grow mt-4">
              <div className="mb-4">Submit high score</div>
              <TextInput
                type="text"
                label="Name"
                id="text-input"
                name="name"
                autoFocus={true}
                autoComplete="off"
              ></TextInput>
            </div>
            <div className="mt-4  flex flex-row justify-between gap-2">
              <ButtonComponent
                text={"Submit"}
                width={250}
                submit={true}
              ></ButtonComponent>
              <ButtonComponent
                onClick={handleCancel}
                type="secondary"
                text={"Cancel"}
                width={250}
              ></ButtonComponent>
            </div>
          </form>
        </div>
      )}
      {isSuccess && (
        <div>
          <div className="text-xl">Word wheel high scores:</div>
          <table className="mt-4 mb-4 w-[330px]">
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Score</th>
            </tr>
            {data.slice(0, 15).map((item: any) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </table>
          <ButtonComponent
            onClick={handleCancel}
            type="secondary"
            text={"Main menu"}
            width={200}
          ></ButtonComponent>
        </div>
      )}
    </div>
  );
};
