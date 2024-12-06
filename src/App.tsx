import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MemoriseSequence from "./games/MemoriseSequence";
import StandardQuiz from "./games/StandardQuiz";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssociationRecall from "./games/AssociationRecall";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-slate-700">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sequence-recall" element={<MemoriseSequence />} />
            <Route
              path="/numerical-reasoning"
              element={<StandardQuiz quizName="Numerical reasoning" />}
            />
            <Route path="/association-recall" element={<AssociationRecall
             title = "Capital cities"
              recallInstruction = "Memorise the capital cities"
              continent="Europe"
              number={10}
            />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
