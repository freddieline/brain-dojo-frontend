import { jsx as _jsx } from "react/jsx-runtime";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
export const TextInput = ({ label = "", value, onChange, validation = () => true, helperTextOnError = "Invalid input", error, ...props }) => {
    const [helperText, setHelperText] = useState("");
    useEffect(() => {
        if (error) {
            setHelperText(helperTextOnError);
        }
        else {
            setHelperText("");
        }
    }, [error, helperTextOnError]);
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (onChange) {
            onChange(newValue);
        }
    };
    return (_jsx(TextField, { label: label, value: value, onChange: handleChange, error: error, helperText: helperText, size: "small", ...props }));
};
