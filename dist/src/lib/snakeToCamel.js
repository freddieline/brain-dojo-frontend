export const snakeToCamel = (input) => {
    return input.replace(/([-_][a-z,0-9])/g, (match) => match.toUpperCase().replace(/[-_]/g, ""));
};
export const transformKeys = (input) => {
    if (Array.isArray(input)) {
        return input.map((item) => transformKeys(item));
    }
    else if (typeof input === "object" && input !== null) {
        return Object.keys(input).reduce((acc, key) => {
            const value = input[key];
            const camelCaseKey = snakeToCamel(key);
            acc[camelCaseKey] =
                value && typeof value === "object" ? transformKeys(value) : value;
            return acc;
        }, {});
    }
    else {
        return input;
    }
};
