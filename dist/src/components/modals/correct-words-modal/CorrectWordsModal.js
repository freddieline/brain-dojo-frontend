import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "@mui/material/Modal";
import "./CorrectWordsModal.css";
import { ButtonComponent } from "../../../components/ButtonComponent";
export const CorrectWordsModal = ({ correctWords, open, setOpen }) => {
    function onClose() {
        setOpen(false);
    }
    console.log(correctWords, correctWords.length > 0);
    return (_jsx(Modal, { open: open, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsxs("div", { className: "popup", children: [_jsx("ul", { className: "mb-2", children: correctWords.length == 0 ? "No correct words" : correctWords.map((word) => _jsx("li", { children: word })) }), _jsx(ButtonComponent, { onClick: onClose, text: "Close" })] }) }));
};
