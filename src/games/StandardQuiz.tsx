import { useState } from "react";
import { Button} from "flowbite-react";
import Results from "../components/Results";
import Layout from "../layout/Layout";
import {
  useQuery,
} from '@tanstack/react-query'
import { Answer } from "../types/types";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

type InputProps = {
	quizName: string;
}

const StandardQuiz: React.FC<InputProps> = ({ quizName }) => {

	const url = import.meta.env['VITE_QUIZ_API'] + "/api/quiz-questions?topic="+ quizName;

	const [answers, setAnswers] = useState<Answer[]>([]);
	const [questionNumber, setQuestionNumber] = useState<number>(1);
	const [quizFinished, setQuizFinished ] = useState<boolean>(false);
	const [key, setKey] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(url).then((res) =>
        res.json(),
      ),
  });


	const renderTime = ({ remainingTime }: { remainingTime: number }) => {
		if (remainingTime === 0) {
			if(!answers[questionNumber -1]){
				let newAnswers = [...answers];
				newAnswers[questionNumber - 1] = {
					...newAnswers[questionNumber - 1],
					question: questionNumber,
					isCorrect: false
				};
				setAnswers(newAnswers);
			}
			return 0;
		}
		return remainingTime;
	};

	if (isPending) {
		return <p></p>;
	}

	if (error) {
		return <p>Error ... {error.message}</p>;
	}

	if (data) {
		const questions = data;

		const handleNextQuestion = () => {
			if(questionNumber < questions.length) {
				setQuestionNumber(questionNumber + 1);
			} else {
				setQuizFinished(true);
			}
			setKey(key +1);
		}

		function onRestart(){
			setQuizFinished(false);
			setQuestionNumber(1);
			setAnswers([]);
		}

		const handleClickAnswer = (answer: number) => {
			if(answers){
				if(!answers[questionNumber -1]){
					let newAnswers = [...answers];
					newAnswers[questionNumber - 1] = {
						...newAnswers[questionNumber - 1],
						guess: answer,
						question: questionNumber,
						isCorrect: answer == questions[questionNumber -1].correctAnswer
					};
					setAnswers(newAnswers);
				}
			} else {
				const firstAnswer: Answer[] = [
					{
						question: questionNumber,
						guess: answer,
					},
				];
				setAnswers(firstAnswer);
			}
		}

		let borderColorClassBtn1 = "border-blue-300 hover:border-blue-500";
		let borderColorClassBtn2 = "border-blue-300 hover:border-blue-500";
		let borderColorClassBtn3 = "border-blue-300 hover:border-blue-500"; 
		let borderColorClassBtn4 = "border-blue-300 hover:border-blue-500";
		let hasAnswered = false;

		if(answers && !quizFinished){
			hasAnswered = !!answers[questionNumber - 1];
			const correctAnswer = questions[questionNumber - 1].correctAnswer;
			const answer = answers[questionNumber - 1];

			if(hasAnswered){
				borderColorClassBtn1 = "border-gray-200 text-gray-300";
				borderColorClassBtn2 = "border-gray-200 text-gray-300";
				borderColorClassBtn3 = "border-gray-200 text-gray-300";
				borderColorClassBtn4 = "border-gray-200 text-gray-300";
				switch(correctAnswer){
					case 1:
						borderColorClassBtn1 = "border-green-500";
						break;
					case 2:
						borderColorClassBtn2 = "border-green-500";
						break;
					case 3:
						borderColorClassBtn3 = "border-green-500";
						break;
					case 4:
						borderColorClassBtn4 = "border-green-500";
						break;
				}
				if (!answer.isCorrect){
					switch(answer.guess){
						case 1:
							borderColorClassBtn1 = "border-red-500";
							break;
						case 2:
							borderColorClassBtn2 = "border-red-500";
							break;
						case 3:
							borderColorClassBtn3 = "border-red-500";
							break;
						case 4:
							borderColorClassBtn4 = "border-red-500";
							break;
					}
				} 
			}
	}

	if(!quizFinished){
		return (
			<Layout>
				<div className="mt-3 flex flex-row gap-x-2 justify-between">
					<div>
						<h1 className="text-2xl bold mb-3">{quizName}</h1>
						<h1 className="text-xl bold mb-3">{questionNumber} of {questions.length}</h1>
					</div>
					<CountdownCircleTimer
						size={70}
						isPlaying={!hasAnswered}
						key={key}
						duration={6}
						colors={[ '#F7B801', '#A30000', '#A30000']}
						colorsTime={[10, 5, 0]}
					>
							{renderTime}
					</CountdownCircleTimer>
				</div>
				{questions.length > 0 && 
					<div className="border-4 rounded-lg p-4 border-blue-300">
						<div className="mt-3 flex flex-row gap-x-2">
							<h3 className="flex-auto">{questions[questionNumber - 1].question}</h3>
						</div>
						<div className="mt-3 flex flex-row gap-x-2">
							<Button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn1} p-1.5`} onClick={(() => handleClickAnswer(1))}>{questions[questionNumber - 1].answer1}</Button>
							<Button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn2} p-1.5`} onClick={(() => handleClickAnswer(2))}>{questions[questionNumber - 1].answer2}</Button>
						</div>
						{ questions[questionNumber -1].answer3 != '' && 	
							<div className="mt-3 flex flex-row gap-x-2">
								<Button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn3} p-1.5`} onClick={(() => handleClickAnswer(3))}>{questions[questionNumber - 1].answer3}</Button>
								<Button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn4} p-1.5`} onClick={(() => handleClickAnswer(4))}>{questions[questionNumber - 1].answer4}</Button>
							</div>
						}
						{ hasAnswered && questions[questionNumber -1].additionalInfo &&
							<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10 italic bg-blue-50 p-2 rounded-lg">
						{ questions[questionNumber -1].additionalInfo}	
							</div>
						}
						{ hasAnswered && 
						<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10" >
							<Button className="text-white bg-blue-500 rounded-lg border-4 border-blue-700 p-2 font-bold" color="white" onClick={handleNextQuestion}>{questionNumber < questions.length ? `Next question` : `See results`}</Button>
						</div>
						}

					</div>
				}
			</Layout>);

		} else {
			return (
				<Layout>
					<Results 
						quizName={quizName} 
						numberCorrect={answers.filter((item) => item.isCorrect).length} 
						totalQuestions={answers.length} 
						onClick={onRestart}
						>
						</Results>
				</Layout>
			)
		}
	}

	return <Layout>No data</Layout>

};

export default StandardQuiz;
