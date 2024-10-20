import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import History from "./routes/History";
import StandardQuiz from "./quizzes/StandardQuiz";
import Home from "./routes/Home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Capitals from "./routes/Capitals";

function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			
			<div className="text-slate-700">
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/capitals" element={<Capitals />} />
						<Route path="/history" element={<History />} />
						<Route path="/greek-mythology" element={
							<StandardQuiz quizName="Greek mythology" />
							} />
						<Route path="/scale-in-science" element={
							<StandardQuiz quizName="Scale in Science" />
							} />
					</Routes>
				</Router>
			</div>
		</QueryClientProvider>
	);
}

export default App;
