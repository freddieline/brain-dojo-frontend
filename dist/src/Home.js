import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Size } from "./types/constants";
const Home = () => {
    return (_jsx(Layout, { size: Size.small, children: _jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { children: [_jsx("div", { className: `w-[100%] overflow-hidden`, children: _jsx("img", { src: "brain-dojo.png", alt: "Logo" }) }), _jsx(Link, { to: "/memory-games", className: "no-underline text-black hover:underline", children: _jsx("h3", { className: "text-xl mt-6", children: "Memory games" }) }), _jsx(Link, { to: "/word-games", className: "no-underline text-black hover:underline grow", children: _jsx("h3", { className: "text-xl mt-6", children: "Word games" }) })] }), _jsxs("div", { className: "absolute bottom-5", children: [_jsx("a", { href: "https://buymeacoffee.com/freddieline", children: _jsx("img", { src: "bmc-full-logo.png", width: 200, className: "mb-2 hover:pointer" }) }), "created by Freddie Line"] })] }) }));
};
export default Home;
