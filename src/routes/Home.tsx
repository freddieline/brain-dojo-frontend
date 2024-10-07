import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="flex flex-col m-20 space-y-10">
			<Link className="btn w-48" to="/capitals">
				<h3>Capital cities</h3>
			</Link>
			<Link className="btn w-48" to="/scale-in-science">
				<h3>Scale in Science</h3>
			</Link>
		</div>
	);
};

export default Home;
