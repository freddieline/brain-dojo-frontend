import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const CorrectWords = ({ words }) => {
    return (_jsxs("div", { className: "ml-4 mb-4", children: [_jsxs("div", { className: "flex flex-row justify-between mb-2", children: [_jsx("div", { children: "Words found: " }), _jsx("div", { className: "right", children: words.length })] }), _jsx("div", { className: "w-[200px] h-[300px] bg-white rounded-lg border-[2px] border-grey pl-4 pt-1 overflow-scroll", children: _jsx("ul", { children: words.map((word) => (_jsx("li", { children: word }, word))) }) })] }));
};
