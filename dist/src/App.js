import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ThemeProvider, { theme: theme, children: _jsx("div", { className: "text-slate-700", children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/memory-games", element: _jsx(MemoryGames, {}) }), _jsx(Route, { path: "/memory-games/sequence", element: _jsx(MemoriseSequence, {}) }), _jsx(Route, { path: "/memory-games/association", element: _jsx(AssociationRecall, { title: "Capital cities", recallInstruction: "Memorise the capital cities", continent: "Europe", number: 10 }) }), _jsx(Route, { path: "/word-games", element: _jsx(WordGames, {}) }), _jsx(Route, { path: "/word-games/word-wheel", element: _jsx(WordWheel, { wordLength: 7, numberOfQuestions: 10 }) })] }) }) }) }) }));
}
export default App;
