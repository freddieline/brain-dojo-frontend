import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";
const MemoryGames = () => {
    return (_jsxs(Layout, { size: Size.small, children: [_jsx("div", { className: `w-[100%] overflow-hidden`, children: _jsx("img", { src: "brain-dojo.png", alt: "Logo" }) }), _jsxs("div", { className: "mt-6 font-bold", children: [_jsx("a", { href: "/", children: "Home" }), " ", ">", " Memory Games"] }), _jsx(Link, { className: "w-48", to: "/memory-games/sequence", children: _jsx("h3", { className: "text-xl underline mt-3 decoration-1", children: "Memorise the sequence" }) }), _jsxs("h3", { className: "text-md", children: ["Images", " ", _jsx("a", { href: "http://www.freepik.com", style: { textDecoration: "none" }, children: "designed by brgfx / Freepik" })] }), _jsx(Link, { className: "w-48", to: "/memory-games/association", children: _jsx("h3", { className: "text-xl underline mt-3 decoration-1", children: "Memorise the capital cities" }) })] }));
};
export default MemoryGames;
