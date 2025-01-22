import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const SequenceTile = ({ id, src, show, highlight, animate, incorrectlyGuessed, }) => {
    const hiddenClass = show ? "is-flipped " : "";
    const highlightClass = highlight ? "highlight " : "";
    const animateClass = animate ? "animate " : "";
    const wrongClass = incorrectlyGuessed ? "wrong" : "";
    const darkenedClass = incorrectlyGuessed
        ? "absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
        : "";
    console.log(src);
    src = "/" + src;
    return (_jsx("div", { className: "flip-card w-110 mr-2 mb-2 " + hiddenClass + animateClass, children: _jsxs("div", { className: "flip-card-inner ", children: [_jsx("div", { className: "flip-card-front border-4 " + highlightClass + wrongClass }), _jsxs("div", { className: "flip-card-back border-4 relative " + highlightClass + wrongClass, children: [_jsx("img", { width: 110, height: "auto", src: src }), _jsx("div", { className: darkenedClass })] })] }) }, id));
};
export default React.memo(SequenceTile);
