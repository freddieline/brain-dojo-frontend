import "react-circular-progressbar/dist/styles.css";
type InputProps = {
    quizName: string;
    numberCorrect: number;
    totalQuestions: number;
};
declare const Results: React.FC<InputProps>;
export default Results;
