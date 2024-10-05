import { useState } from "react";
import { Button} from "flowbite-react";
import Results from "../components/Results";
import Layout from "../layout/Layout";
import {
  useQuery,
} from '@tanstack/react-query'
import { QuizQuestion, Answer } from "../types/types";
import { transformKeys } from "../lib/snakeToCamel";
import { IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";


const ScaleInScience = () => {
	const url = import.meta.env['VITE_QUIZ_API'] + "/api/quiz-questions?topic=Scale%20in%20Science";

	const [answers, setAnswers] = useState<Answer[]>([{
		question:1,
		like:true,
		guess:2,
		isCorrect:true,
	},
	{
		question:3,
		like:false,
		guess:2,
		isCorrect:true,
	},
	{
		question:4,
		like:false,
		guess:2,
		isCorrect:true,
	}

]);
	const [questionNumber, setQuestionNumber] = useState<number>(1);
	const [quizFinished, setQuizFinished ] = useState<boolean>(true);


  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(url).then((res) =>
        res.json(),
      ),
  })

	if (isPending) {
		return <p>Loading ... </p>;
	}

	if (error) {
		return <p>Error ... {error.message}</p>;
	}

	if (data) {
		const questions = transformKeys(data.data) as QuizQuestion[];

		const handleThumbsUp = () => {
			if(answers){
				let newAnswers = [...answers];
				newAnswers[questionNumber - 1].like = true;
				setAnswers(newAnswers);
			}
		}
	
		const handleThumbsDown = () => {
			if(answers){
				console.log(answers);
				let newAnswers = [...answers];
				newAnswers[questionNumber - 1].like = false;
				setAnswers(newAnswers);
			}

			console.log(answers);
		}

		const handleNextQuestion = () => {
			console.log(questionNumber, questions.length);
			if(questionNumber < questions.length) {
				setQuestionNumber(questionNumber + 1);
			} else {
				console.log(questionNumber, questions.length);
				setQuizFinished(true);
			}
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

	const feedbackHidden =  answers?.[questionNumber-1] ? "" : " invisible";
	const currentAnswer = answers?.[questionNumber - 1 ];

	if(!quizFinished){
		return (
			<Layout>
				<h1 className="text-2xl bold mb-3">Scale in Science</h1>
				<h1 className="text-xl bold mb-3">{questionNumber} of {questions.length}</h1>
				<div className={"flex flex-row justify-end mb-2 "+feedbackHidden}>
					<IoIosThumbsDown onClick={handleThumbsDown} color={currentAnswer?.like === false ? `red`: `black`} />
					<IoIosThumbsUp onClick={handleThumbsUp} color={currentAnswer?.like ? `green`: `black`} />
				</div>
				{questions.length > 0 && 
					<div className="bg-blue-50 rounded-lg p-2">
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
						{ hasAnswered && <>
							<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10 italic">
						{ questions[questionNumber -1].additionalInfo}	
						</div>
						<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10" >
							<Button className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold" color="white" onClick={handleNextQuestion}>{questionNumber < questions.length ? `Next question` : `See results`}</Button>
						</div>
						</>}

					</div>
				}
			</Layout>);
		} else {
			return (
				<Layout>
					<Results answers={answers} questions={questions}></Results>
				</Layout>
			)
		}
	}

	return <Layout>No data</Layout>



};

export default ScaleInScience;
