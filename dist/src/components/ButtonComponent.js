import { jsx as _jsx } from "react/jsx-runtime";
import Button from "@mui/material/Button";
export const ButtonComponent = ({ type = "primary", text, autoFocus, width = 200, height = 44, onClick, submit = false, }) => {
    let className;
    let variant = "outlined";
    if (type === "secondary") {
        className = `text-black bg-white rounded-lg border-[2px] border-blue-700 text-center p-1`;
    }
    else {
        variant = "contained";
        className = `text-white bg-blue-700 rounded-lg text-center justify-center p-1`;
    }
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        else {
            console.warn("No onClick handler defined.");
        }
    };
    return (_jsx(Button, { style: {
            width: `${width}px`,
            height: `${height}px`,
        }, variant: type == "secondary" ? "outlined" : "contained", type: submit ? "submit" : "button", className: className, ...(onClick ? { onClick: handleClick } : {}), autoFocus: autoFocus, children: text }));
};
