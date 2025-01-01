import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "@mui/material/Modal";
import "./ResultsPopup.css";
import { ButtonComponent } from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
export const ResultsPopup = ({ open, derivedWords, corretWords, }) => {
    const navigate = useNavigate();
    let wordArray = Array.from(derivedWords);
    const missedWords = wordArray.filter((word) => !corretWords.includes(word));
    let oddIndexItems = [];
    let evenIndexItems = [];
    for (var x = 0; x < missedWords.length; x++) {
        if (x % 2 != 0) {
            oddIndexItems.push(missedWords[x]);
        }
        else {
            evenIndexItems.push(missedWords[x]);
        }
    }
    function handleClick() {
        navigate("/");
    }
    return (_jsx(Modal, { open: open, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsxs("div", { className: "popup", children: [_jsxs("div", { children: ["Well done! Your score is", " ", _jsx("span", { className: "font-bold", children: corretWords.length })] }), _jsxs("div", { className: "mt-2", children: ["You missed these words which can be found in the", " ", _jsx("a", { className: "text-blue-600 underline", href: "https://www.collinsdictionary.com/dictionary/english", target: "_blank", children: "Collins English Dictionary" })] }), _jsxs("div", { className: "flex flex-row mt-4 h-[200px] overflow-scroll border-[2px] p-2", children: [_jsx("ul", { className: "w-[50%]", children: evenIndexItems.length > 0 &&
                                evenIndexItems.map((word) => _jsx("li", { children: word }, word)) }), _jsx("ul", { className: "w-[50%]", children: oddIndexItems.length > 0 &&
                                oddIndexItems.map((word) => _jsx("li", { children: word }, word)) })] }), _jsx("div", { className: "mt-4  flex flex-row justify-between gap-2", children: _jsx(ButtonComponent, { onClick: handleClick, text: "Main menu", width: 250 }) })] }) }));
};
