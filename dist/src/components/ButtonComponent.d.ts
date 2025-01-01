import React from "react";
type PrimaryButtonInputProps = {
    text: string;
    autoFocus?: boolean;
    width?: number;
    height?: number;
    type?: "primary" | "secondary";
    onClick?: () => void;
    submit?: boolean;
};
export declare const ButtonComponent: React.FC<PrimaryButtonInputProps>;
export {};
