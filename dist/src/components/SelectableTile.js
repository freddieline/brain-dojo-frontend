import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const SelectableTile = ({ id, src, onClick, show, selected, }) => {
    function handleOnClick() {
        onClick(id);
    }
    const hiddenClass = show ? "" : " invisible";
    const selectedClass = selected ? " select" : "";
    src = "/" + src;
    return (_jsx("button", { className: "w-110 mr-2 mb-2 h-auto bg-white border-4 border-gray-300 select-card hover:border-blue-700 hover:border-4" +
            hiddenClass +
            selectedClass, onClick: handleOnClick, children: _jsx("img", { width: 110, height: "auto", src: src }) }, id));
};
export default React.memo(SelectableTile);
