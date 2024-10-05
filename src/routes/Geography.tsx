import { useFetch } from "../hooks/useFetch";
import { useState, ChangeEvent } from "react";
import type { CapitalQuestion } from "../types/types";
import { TextInput } from 'flowbite-react';
import { HiCheckCircle } from "react-icons/hi";
import Layout from "../layout/Layout"

const Geography = () => {
	const url = "https://quiz-express-57b839d4ea17.herokuapp.com/api/capitals";
	const { data, loading, error, setData } = useFetch<CapitalQuestion[]>(url, {
		searchParams: {
			continent: "europe",
		},
	});
	const [_, setNumberComplete] = useState<number>(0);

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
						item.showAnswer = true;
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
								{capital.showAnswer && <HiCheckCircle color="green" size={30} className="mt-1 ml-4"></HiCheckCircle>}
							</div>
						);
					})}
			</div>
		</Layout>
	);
};

export default Geography;
