import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MemoryGame from "./games-engines/MemoryGame";
import StandardQuiz from "./games-engines/StandardQuiz";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoriseCapital } from "./games/MemorizeCapitals";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-slate-700">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sequence-recall" element={<MemoryGame />} />
            <Route
              path="/numerical-reasoning"
              element={<StandardQuiz quizName="Numerical reasoning" />}
            />
            <Route path="/association-recall" element={<MemoriseCapital />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
