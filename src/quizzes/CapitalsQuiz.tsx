import { useFetch } from "../hooks/useFetch";
import { useState, ChangeEvent, useEffect } from "react";
import type { CapitalQuestion } from "../types/types";
import { TextInput } from 'flowbite-react';
import { HiCheckCircle } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import Layout from "../layout/Layout";
import { Button } from 'flowbite-react';
import Results from '../components/Results';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { randomSelection } from "../lib/randomSelection";

type InputProps  = {
  continent: string;
}

const CapitalsQuiz:React.FC<InputProps> = ({continent}) => {

	const quizName = "Capital cities";

	const url = import.meta.env['VITE_QUIZ_API'] + "/api/capitals";

	const { data, loading, error } = useFetch<CapitalQuestion[]>(url, {
		searchParams: {
			continent: continent,
		},
	});

	const [numberComplete, setNumberComplete] = useState<number>(0);
	const [complete, setComplete] = useState(false);
	const [capitals, setCapitals] = useState<CapitalQuestion[]>([]);
	const [showResults, setShowResults] = useState<boolean>(false);

	useEffect(() => {
		if(data){
			const randomCapitals = randomSelection(data, 10)
			setCapitals(randomCapitals);
		}
	},[data])

	function revealAnswers() {
		setComplete(true);
	}

	function handleShowResults() {
		setShowResults(true);
	}

	if (loading) {
		return <p></p>;
	}

	if (error) {
		return <p>Error ... {error.message}</p>;
	}


	const renderTime = ({ remainingTime  }: { remainingTime: number }) => {
		if (remainingTime === 0) {
			setComplete(true);
			return 0;
		}
		return remainingTime;
	};


	if(showResults){
		return <Results totalQuestions={10} numberCorrect={numberComplete} quizName={quizName} quizRoute="/capitals"></Results>
	}

	if(data && data.length > 0) {

		function onChange(
			e: ChangeEvent<HTMLInputElement>,
			capital: CapitalQuestion,
		) {
			if (capitals) {
				const cap = capitals.reduce(
					(accum: CapitalQuestion[], item: CapitalQuestion) => {
						if (
							item.country == capital.country &&
							capital.capital.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
						) {
							item.isCorrect = true;
							setNumberComplete((prev) => (prev += 1));
						}
						accum.push(item);
						return accum;
					},
					[],
				);
				setCapitals(cap);
			}
		}

		return (
			<Layout>
        <h1 className="text-2xl bold mb-3">Capital Cities Quiz</h1>
				<div className="mb-4">Enter as many capitals of {continent} as you can in 1 minute</div>
				<div className="flex flex-col">
        <div className="text-xl m-auto mt-5 mb-8">
				<CountdownCircleTimer
					size={100}
					isPlaying={!complete}
					duration={60}
					colors={[ '#F7B801', '#A30000', '#A30000']}
					colorsTime={[10, 5, 0]}
				>
						{renderTime}
				</CountdownCircleTimer>
        </div>
					{capitals &&
						capitals.map((capital) => {
							const inputBg = capital.isCorrect || complete ? "#ddd" : ""
							return (
								<div key={capital.capital} className="flex flex-row flex-wrap">
									<div className="w-[130px] mt-2">{capital.country}</div>
									<TextInput
										 style={{ backgroundColor: inputBg }}
										className={"input input-sm input-bordered w-300 mb-2 mr-5" }
										disabled={capital.isCorrect || complete}
										onChange={(e) => onChange(e, capital)}
									></TextInput>
									  {capital.isCorrect && <HiCheckCircle color="green" size={30} className="mt-1"></HiCheckCircle>}
									  {(complete && !capital.isCorrect) && <div className="w-[140px] flex flex-row mb-4 font-bold"><ImCross color="red" size={30} className="mt-1 mr-3"></ImCross> <div className="mt-1">{` `+capital.capital}</div></div>}
								</div>
							);
						})}
				</div>
				{ !complete && 
					<Button  className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold mt-5"  
						onClick={revealAnswers}>Reveal answers
					</Button>
				}
				{ complete &&
					<Button className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold mt-5"  
						onClick={handleShowResults}>Show results
					</Button>
				}
			</Layout>
		);
	} else {
		return <>No data</>
	}

};

export default CapitalsQuiz;
