
import { Button } from 'flowbite-react';
import CapitalsQuiz from '../quizzes/CapitalsQuiz';
import { useState } from 'react'
import Layout from '../layout/Layout';


const Capitals = () => {

	const [continent, setContinent] = useState<string| null>(null)
	function handleSetContinent(continent: string){
		setContinent(continent)
	}

	const buttonClass = "rounded-lg border-4 border-blue-800 p-2 font-bold w-[140px] m-4 text-gray-800"
	if(!continent){
		return (<Layout>
					<h1 className="text-xl mb-3">Choose a continent to test your capitals cities knowledge:</h1>
					<div className="flex flex-wrap">
						<Button color="black" className={buttonClass} onClick={() => handleSetContinent("Europe")}>Europe</Button>
						<Button className={buttonClass} onClick={() => handleSetContinent("Africa")}>Africa</Button>
						<Button className={buttonClass} onClick={() => handleSetContinent("Asia")}>Asia</Button>
						<Button className={buttonClass} onClick={() => handleSetContinent("North America")}>North America</Button>
						<Button className={buttonClass} onClick={() => handleSetContinent("South America")}>South America</Button>
						<Button className={buttonClass} onClick={() => handleSetContinent("Oceania")}>Oceania</Button>
					</div>
		</Layout>)
	} else {
		return <CapitalsQuiz continent={continent}></CapitalsQuiz>
	}



};

export default Capitals;
