import "./App.css";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./games/Home";
import MemoryGame from "./games/MemoryGame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-slate-700">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory-game" element={<MemoryGame />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
