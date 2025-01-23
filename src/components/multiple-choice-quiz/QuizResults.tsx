import { Button } from "flowbite-react";
import { getEmoji, getMotivation, getScore } from "../../lib/getGrade";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

type InputProps = {
  quizName: string;
  numberCorrect: number;
  totalQuestions: number;
};

const Results: React.FC<InputProps> = ({
  quizName,
  numberCorrect,
  totalQuestions,
}) => {
  const navigate = useNavigate();
  const percentageScore: number = (numberCorrect / totalQuestions) * 100;

  const grade = getScore(percentageScore);
  const emoji = getEmoji(grade);
  const motivation = getMotivation(grade);

  function handleOnSubmit() {
    navigate("/");
  }

  return (
    <div>
      <p className="text-2xl font-bold text-center">{motivation}</p>
      <p className="text-lg font-bold text-center mt-2">
        You got {numberCorrect} of {totalQuestions} correct in the {quizName}{" "}
        quiz
      </p>
      <div className="mt-10 mb-10 flex flex-row items-center justify-center">
        <div className="text-2xl w-[150px]">
          <CircularProgressbar
            value={percentageScore}
            text={`${emoji}`}
            styles={buildStyles({
              textColor: "#00cc99",
              trailColor: "#d6d6d6",
              pathColor: "#00cc99",
              backgroundColor: "#3e98c7",
              textSize: "40px",
            })}
          />
        </div>
      </div>
      <div className="flex flex-row mt-5 gap-3 items-center justify-center">
        <a>
          <form onSubmit={handleOnSubmit}>
            <Button
              type="submit"
              className="rounded-lg border-4 border-blue-700 p-2 font-bold text-gray bg-blue-500 text-white"
              autoFocus
            >
              Main menu
            </Button>
          </form>
        </a>
      </div>
    </div>
  );
};

export default Results;
