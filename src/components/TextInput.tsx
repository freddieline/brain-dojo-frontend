import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";

type InputProps = {
  label?: string; // Optional label for the TextField
  value?: string; // Current value of the TextField
  error?: boolean;
  onChange: (value: string) => void; // Callback to update the value
  validation?: (value: string) => boolean; // Validation function, returns true if valid
  helperTextOnError?: string; // Error message to display when validation fails
  [key: string]: any;
};
export const TextInput: React.FC<InputProps> = ({
  label = "",
  value,
  onChange,
  validation = () => true,
  helperTextOnError = "Invalid input",
  error,
  ...props
}) => {
  const [helperText, setHelperText] = useState("");
  console.log(value);

  useEffect(() => {
    if (error) {
      setHelperText(helperTextOnError);
    } else {
      setHelperText("");
    }
  }, [error, helperTextOnError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      size="small"
      {...props}
    />
  );
};
