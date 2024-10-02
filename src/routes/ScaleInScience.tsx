import { useFetch } from "../hooks/useFetch";
import { QuizQuestion } from "../types/QuizQuestion";
import { useState } from "react";

interface Answers {
	[questionNumber: number]: number;
}

const ScaleInScience = () => {
	const url = import.meta.env['VITE_QUIZ_API'] + "/api/quiz-questions";
	const [answers, setAnswers] = useState<Answers | null>(null);
	const [questionNumber, setQuestionNumber] = useState<number>(1);
	
	const { data, loading, error } = useFetch<QuizQuestion[]>(url, {
		searchParams: {
			topic: "Scale in Science",
		},
	});

	const handleClickAnswer = (answer: number) => {
		if(data){
				setAnswers(prevAnswers => {
					let newAnswer = {...prevAnswers};
					newAnswer[questionNumber] = answer;
					return newAnswer;
				});
		}
	}

	const handleNextQuestion = () => {
		setQuestionNumber(questionNumber + 1);
	}

	if (loading) {
		return <p>Loading ... </p>;
	}

	if (error) {
		return <p>Error ... {error.message}</p>;
	}

	if (data) {
		let borderColorClassBtn1 = "border-blue-300 hover:border-blue-500";
		let borderColorClassBtn2 = "border-blue-300 hover:border-blue-500";
		let borderColorClassBtn3 = "border-blue-300 hover:border-blue-500"; 
		let borderColorClassBtn4 = "border-blue-300 hover:border-blue-500";
		let hasAnswered = false;

		if(answers){

		hasAnswered = !!answers[questionNumber];

		const correctAnswer = data[questionNumber -1].correctAnswer;
		const answer  = answers[questionNumber];

		if(hasAnswered){
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
			if (correctAnswer != answer){
				switch(answer){
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



		return <div className="max-w-[550px] m-auto">
			<h1 className="text-2xl bold mb-3">Scale in Science</h1>
			<h1 className="text-xl bold mb-3">{questionNumber} of {data.length} (number correct = {})</h1>
			{data.length > 0 && 
				<div className="bg-blue-50 rounded-lg p-2">
					<div className="mt-3 flex flex-row gap-x-2">
						<h3 className="flex-auto">{data[questionNumber - 1].question}</h3>
					</div>
					<div className="mt-3 flex flex-row gap-x-2">
						<button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn1} p-1.5`} onClick={(() => handleClickAnswer(1))}>{data[questionNumber - 1].answer1}</button>
						<button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn2} p-1.5`} onClick={(() => handleClickAnswer(2))}>{data[questionNumber - 1].answer2}</button>
					</div>
					<div className="mt-3 flex flex-row gap-x-2">
						<button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn3} p-1.5`} onClick={(() => handleClickAnswer(3))}>{data[questionNumber - 1].answer3}</button>
						<button className={`basis-1/2 bg-white text-gray-900 rounded-lg border-4 ${borderColorClassBtn4} p-1.5`} onClick={(() => handleClickAnswer(4))}>{data[questionNumber - 1].answer4}</button>
					</div>
					<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10">
					{ hasAnswered && data[questionNumber -1].additionalInfo}	
					</div>
					<div className="mt-3 flex flex-row gap-x-2 justify-center items-center mt-10">
						<button className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold" color="white" onClick={handleNextQuestion}>Next question</button>
					</div>
				</div>
			}
		</div>;
	}

	return <h1>No data</h1>



};

export default ScaleInScience;
