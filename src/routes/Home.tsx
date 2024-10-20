import { Link } from "react-router-dom";
import Layout from '../layout/Layout';

const Home = () => {
	return (
		<Layout>
			<h1 className="text-[40px] font-bold mb-6 text-center leckerli-one-regular text-blue-800">Fred's quiz</h1>

			<div className={`w-[100%] overflow-hidden shadow-lg`}>
      	<img src="readingbook.png" alt="Tower of Babel" />
    	</div>
			<p className="text-lg  mt-5 mb-5">Do you love learning new bits of knowledge? If so I hope you enjoy the quizzes and take something away with you :-)</p>
			{/* <p className="text-lg  mt-5 mb-5">Please leave some feedback at the end too. This will really help me in making the quizzes better.</p> */}
			<Link className="w-48" to="/greek-mythology">
				<h3 className="text-lg underline">Greek mythology (medium)</h3>
			</Link>
			<Link className="w-48 underline" to="/scale-in-science">
				<h3 className="text-lg underline">Scale in Science (medium)</h3>
			</Link>
			{/* <Link className="w-48 underline" to="/capitals">
				<h3 className="text-lg underline">Capital cities (hard)</h3>
			</Link> */}
		</Layout>
	);
};

export default Home;
