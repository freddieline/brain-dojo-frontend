import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Size } from "../types/constants";
const MemoryGames = () => {
    return (_jsx(Layout, { size: Size.small, children: _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: `w-[100%] overflow-hidden`, children: _jsx("img", { src: "brain-dojo.png", alt: "Logo" }) }), _jsxs("div", { className: "mt-6 font-bold", children: [_jsx("a", { href: "/", children: "Home" }), " ", ">", " Memory Games"] }), _jsx(Link, { to: "/memory-games/sequence", className: "no-underline text-black hover:underline decoration-2", children: _jsx("h3", { className: "text-xl mt-3", children: "Memorise the sequence" }) }), _jsxs("h3", { className: "text-sm", children: ["Images", " ", _jsx("a", { href: "http://www.freepik.com", style: { textDecoration: "none" }, children: "designed by brgfx / Freepik" })] }), _jsx(Link, { to: "/memory-games/association", className: "no-underline text-black hover:underline", children: _jsx("h3", { className: "text-xl mt-4", children: "Memorise the capital cities" }) }), _jsxs("div", { className: "absolute bottom-5", children: [_jsx("a", { href: "https://buymeacoffee.com/freddieline", children: _jsx("img", { src: "bmc-full-logo.png", width: 200, className: "mb-2 hover:pointer" }) }), "created by Freddie Line"] })] }) }));
};
export default MemoryGames;
