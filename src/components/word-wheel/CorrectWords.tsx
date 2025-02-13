type InputProps = {
  words: string[];
};

export const CorrectWords: React.FC<InputProps> = ({ words }) => {
  return (
    <div className={"ml-4 mb-4 bg-white"}>
      <div className="flex flex-row justify-between mb-2">
        <div>Words found: </div>
        <div className="right">{words.length}</div>
      </div>
      <div className="w-[200px] h-[300px] bg-white rounded-lg border-[2px] border-grey pl-4 pt-1 overflow-scroll">
        <ul>
          {words.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
