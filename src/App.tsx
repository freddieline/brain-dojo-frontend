import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Geography from "./routes/Geography";
import History from "./routes/History";
import ScaleInScience from "./routes/ScaleInScience";
import Home from "./routes/Home";


function App() {
	return (
		<div className="App" data-theme="fantasy">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/geography" element={<Geography />} />
					<Route path="/history" element={<History />} />
					<Route path="/scale-in-science" element={<ScaleInScience />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
