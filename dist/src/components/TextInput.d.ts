import React from "react";
type InputProps = {
    label?: string;
    value?: string;
    error?: boolean;
    onChange?: (value: string) => void;
    validation?: (value: string) => boolean;
    helperTextOnError?: string;
    [key: string]: any;
};
export declare const TextInput: React.FC<InputProps>;
export {};
