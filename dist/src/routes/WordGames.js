import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";
const WordGames = () => {
    return (_jsxs(Layout, { size: Size.small, children: [_jsx("div", { className: `w-[100%] overflow-hidden`, children: _jsx("img", { src: "brain-dojo.png", alt: "Logo" }) }), _jsxs("div", { className: "mt-6 font-bold", children: [_jsx("a", { href: "/", children: "Home" }), " ", ">", " Word Games"] }), _jsx(Link, { className: "w-48", to: "/word-games/word-wheel", children: _jsx("h3", { className: "text-xl underline mt-3 decoration-1", children: "Word Wheel" }) })] }));
};
export default WordGames;
