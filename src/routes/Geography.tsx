import { useFetch } from "../hooks/useFetch";
import { useState, ChangeEvent } from "react";
import type { CapitalQuestion } from "../types/types";
import { TextInput } from 'flowbite-react';
import { HiCheckCircle } from "react-icons/hi";
import { ImCross } from "react-icons/im";

import Layout from "../layout/Layout";
import { Button } from 'flowbite-react';

const Geography = () => {
	const url = "https://quiz-express-57b839d4ea17.herokuapp.com/api/capitals";
	const { data, loading, error, setData } = useFetch<CapitalQuestion[]>(url, {
		searchParams: {
			continent: "europe",
		},
	});
	const [numberComplete, setNumberComplete] = useState<number>(0);
	const [complete, setComplete] = useState(false);

	function revealAnswers() {
		setComplete(true);
	}

	function onChange(
		e: ChangeEvent<HTMLInputElement>,
		capital: CapitalQuestion,
	) {
		console.log(capital);
		if (data) {
			const cap = data.reduce(
				(accum: CapitalQuestion[], item: CapitalQuestion) => {
					if (
						item.country == capital.country &&
						capital.capital.toLowerCase() == e.target.value.toLowerCase()
					) {
						item.isCorrect = true;
						setNumberComplete((prev) => (prev += 1));
					}
					accum.push(item);
					return accum;
				},
				[],
			);

			setData(cap);
		}
	}

	if (loading) {
		return <p>Loading ... </p>;
	}

	if (error) {
		return <p>Error ... {error.message}</p>;
	}



	return (
		<Layout>
			<div className="font-bold mb-4">Enter as many capitals of Europe as you can in 2 minutes</div>
			<div className="font-bold mb-4">You have {numberComplete} correct!</div>
			<div className="flex flex-col">
				{data &&
					data.map((capital) => {
						return (
							<div key={capital.capital} className="flex flex-row">
								<div className="basis-1/3 mt-2">{capital.country}</div>
								<TextInput
									className={"input input-sm input-bordered basis-1/3 mb-2"}
									disabled={capital.showAnswer}
									onChange={(e) => onChange(e, capital)}
								></TextInput>
								{capital.isCorrect && <HiCheckCircle color="green" size={30} className="mt-1 ml-4"></HiCheckCircle>}
								{(complete && !capital.isCorrect) && <><ImCross color="red" size={30} className="mt-1 ml-4 mr-3"></ImCross> {` `+capital.capital}</>}
							</div>
						);
					})}
			</div>
			<Button className="text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold"  onClick={revealAnswers}>Reveal answers</Button>
		</Layout>
	);
};

export default Geography;
