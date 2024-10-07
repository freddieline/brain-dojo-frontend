import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import History from "./routes/History";
import ScaleInScience from "./routes/ScaleInScience";
import Home from "./routes/Home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Capitals from "./routes/Capitals";


function App() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<div data-theme="fantasy">
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/capitals" element={<Capitals />} />
						<Route path="/history" element={<History />} />
						<Route path="/scale-in-science" element={<ScaleInScience />} />
					</Routes>
				</Router>
			</div>
		</QueryClientProvider>
	);
}

export default App;
