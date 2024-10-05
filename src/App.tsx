import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Geography from "./routes/Geography";
import History from "./routes/History";
import ScaleInScience from "./routes/ScaleInScience";
import Home from "./routes/Home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App max-w-[550px] m-auto" data-theme="fantasy">
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/geography" element={<Geography />} />
						<Route path="/history" element={<History />} />
						<Route path="/scale-in-science" element={<ScaleInScience />} />
					</Routes>
				</Router>
			</div>
		</QueryClientProvider>
	);
}

export default App;
