import "./App.css";
// import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MemoriseSequence from "./games/memory-games/MemoriseSequence";
import MemoryGames from "./routes/MemoryGames";
import WordGames from "./routes/WordGames";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssociationRecall from "./games/memory-games/AssociationRecall";
import { WordWheel } from "./games/word-games/WordWheel";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: "2px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
            "&.Mui-disabled": {
              color: "#000",
              "-webkit-text-fill-color": "#9e9e9e",
              borderColor: "#000",
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true, // Disable ripple globally
          disableElevation: true, // Disable elevation globally
        },
        styleOverrides: {
          root: {
            color: "#ffffff", // Custom text color// Custom background color
            textTransform: "capitalize", // Disable uppercase text
            borderRadius: "8px", // Rounded corners
            fontSize: "16px", // Custom font size
            padding: "8px 16px", // Custom padding
            "&:hover": {
              backgroundColor: "#115293", // Hover background color
            },
          },
          outlined: {
            border: "2px solid #1976d2", // Custom border for outlined buttons
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
            },
          },
          text: {
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)", // Light blue hover effect
            },
          },
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="text-slate-700">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/memory-games" element={<MemoryGames />} />
              <Route
                path="/memory-games/sequence"
                element={<MemoriseSequence />}
              />
              <Route
                path="/memory-games/association"
                element={
                  <AssociationRecall
                    title="Capital cities"
                    recallInstruction="Memorise the capital cities"
                    continent="Europe"
                    number={10}
                  />
                }
              />
              <Route path="/word-games" element={<WordGames />} />
              <Route
                path="/word-games/word-wheel"
                element={
                  <WordWheel wordLength={7} numberOfQuestions={10}></WordWheel>
                }
              ></Route>
              created by Freddie Line
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
