import { Link } from "react-router-dom";
import Layout from '../layout/Layout';

const Home = () => {
	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-6 text-center">Fred's quiz home page</h1>

			<div className={`w-[100%] overflow-hidden shadow-lg`}>
      	<img className=" object-cover" src="babel.png" alt="Tower of Babel" />
    	</div>
			<p className="text-lg  mt-5 mb-5">I've always been interested in learning new bits of knowledge from a range of topics. Hope you enjoy the quizzes I've created below. Please give feedback at the end of each one to help me make them better!</p>

			<Link className="w-48 underline" to="/scale-in-science">
				<h3 className="text-lg underline">Scale in Science (medium difficulty)</h3>
			</Link>
			<Link className="w-48" to="/capitals">
				<h3 className="text-lg underline">Capital cities (hard difficulty)</h3>
			</Link>
		</Layout>
	);
};

export default Home;
