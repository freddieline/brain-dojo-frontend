import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Size } from "./types/constants";
const Home = () => {
    return (_jsxs(Layout, { size: Size.small, children: [_jsx("div", { className: `w-[100%] overflow-hidden`, children: _jsx("img", { src: "brain-dojo.png", alt: "Logo" }) }), _jsx(Link, { className: "w-48", to: "/memory-games", children: _jsx("h3", { className: "text-xl underline mt-6 decoration-1", children: "Memory games" }) }), _jsx(Link, { className: "w-48", to: "/word-games", children: _jsx("h3", { className: "text-xl underline mt-6 decoration-1", children: "Word games" }) })] }));
};
export default Home;
