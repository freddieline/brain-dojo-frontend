export declare const snakeToCamel: (input: string) => string;
type AnyObject = {
    [key: string]: any;
};
export declare const transformKeys: (input: AnyObject | AnyObject[]) => AnyObject | AnyObject[];
export {};
