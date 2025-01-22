import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "@mui/material/Modal";
import "./ResultsPopup.css";
import { ButtonComponent } from "../ButtonComponent";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../TextInput";
import { usePostHighscore } from "../../hooks/data-post/usePostHighscore";
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
    const { mutate, isPending, isError, error, isSuccess, data } = usePostHighscore();
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        if (data.name) {
            const body = {
                name: data.name,
                game: 'word wheel',
                score: corretWords.length == 0 ? 1 : corretWords.length
            };
            mutate(body);
        }
        else {
            console.log('no name');
        }
    }
    function handleCancel() {
        navigate("/");
    }
    return (_jsx(Modal, { open: open, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", children: _jsxs("div", { className: "popup", children: [!isSuccess &&
                    _jsxs("div", { children: [_jsxs("div", { children: ["Well done! Your score is", " ", _jsx("span", { className: "font-bold", children: corretWords.length })] }), _jsxs("div", { className: "mt-2", children: ["You missed these words which can be found in the", " ", _jsx("a", { className: "text-blue-600 underline", href: "https://www.collinsdictionary.com/dictionary/english", target: "_blank", children: "Collins English Dictionary" })] }), _jsxs("div", { className: "flex flex-row mt-4 h-[200px] overflow-scroll border-[2px] p-2", children: [_jsx("ul", { className: "w-[50%]", children: evenIndexItems.length > 0 &&
                                            evenIndexItems.map((word) => _jsx("li", { children: word }, word)) }), _jsx("ul", { className: "w-[50%]", children: oddIndexItems.length > 0 &&
                                            oddIndexItems.map((word) => _jsx("li", { children: word }, word)) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grow mt-4", children: [_jsx("div", { className: "mb-4", children: "Submit high score" }), _jsx(TextInput, { type: "text", label: "Name", id: "text-input", name: "name", autoFocus: true, autoComplete: "off" })] }), _jsxs("div", { className: "mt-4  flex flex-row justify-between gap-2", children: [_jsx(ButtonComponent, { text: "Submit", width: 250, submit: true }), _jsx(ButtonComponent, { onClick: handleCancel, type: 'secondary', text: "Cancel", width: 250 })] })] })] }), isSuccess &&
                    _jsxs("div", { children: ["Word wheel high scores:", _jsxs("table", { className: "mt-4 mb-4 w-[330px]", children: [_jsxs("tr", { children: [_jsx("th", { className: "text-left", children: "Name" }), _jsx("th", { className: "text-left", children: "Score" })] }), data.slice(0, 15).map((item) => {
                                        return _jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: item.score })] });
                                    })] }), _jsx(ButtonComponent, { onClick: handleCancel, type: 'secondary', text: "Main menu", width: 200 })] })] }) }));
};
