import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./WordWheel.css";
import cx from "classnames";
export const WordWheelLetters = ({ letters, mainLetter, handlePress, pressedLetters, }) => {
    return (_jsxs("div", { className: "circle-container", children: [letters.map((letter, index) => (_jsx("button", { className: cx({
                    "circle-item": true,
                    "item-clicked": pressedLetters[index],
                }), onClick: () => handlePress(letter, index), type: "button", disabled: pressedLetters[index], children: _jsx("div", { className: "circle-item-text", children: letter }, "item-text-" + index) }, "item-" + index))), _jsx("button", { className: cx({
                    "centre-letter": true,
                    "item-clicked": pressedLetters[8],
                }), disabled: pressedLetters[8], onClick: () => handlePress(mainLetter, 8), type: "button", children: mainLetter.toLowerCase() })] }));
};
