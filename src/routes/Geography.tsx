import { useFetch } from "../hooks/useFetch";
import { useState, ChangeEvent } from "react";
import type { CapitalQuestion } from "../types/types";

const Geography = () => {
	const url = "https://quiz-express-57b839d4ea17.herokuapp.com/api/capitals";
	const { data, loading, error, setData } = useFetch<CapitalQuestion[]>(url, {
		searchParams: {
			continent: "africa",
		},
	});
	const [numberComplete, setNumberComplete] = useState<number>(0);

	function onChange(
		e: ChangeEvent<HTMLInputElement>,
		capital: CapitalQuestion,
	) {
		if (data) {
			const cap = data.reduce(
				(accum: CapitalQuestion[], item: CapitalQuestion) => {
					if (
						item.country == capital.country &&
						capital.capital == e.target.value
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
	if (data) {
		console.log(data);
	}

	return (
		<>
			<div>Number complete {numberComplete}</div>
			<div className="flex flex-col">
				{data &&
					data.map((capital) => {
						return (
							<div key={capital.capital} className="flex flex-row">
								<div className="basis-1/3">{capital.country}</div>
								<input
									className="input input-sm input-bordered basis-1/3 mt-2"
									onChange={(e) => onChange(e, capital)}
								></input>
								{capital.showAnswer && capital.capital}
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Geography;
