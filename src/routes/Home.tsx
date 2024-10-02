import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="flex flex-col m-20 space-y-10">
			<Link className="btn w-48" to="/geography">
				<h3>Geography</h3>
			</Link>
			<Link className="btn w-48" to="/history">
				<h3>History</h3>
			</Link>
			<Link className="btn w-48" to="/scale-in-science">
				<h3>Scale in Science</h3>
			</Link>
		</div>
	);
};

export default Home;
