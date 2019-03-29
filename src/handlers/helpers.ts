import { Request } from "express";

export const safeQueryStringParam = (request: Request, paramName: string, defaultValue: string) => {

    const value = request.query[paramName];

    if (value === undefined || value === null) {
        return defaultValue;
    }

    return value === undefined || value === null ? defaultValue : value;
};

export const arrayQueryParam = (stringValue?: string) => {
    if (!stringValue) {
        return undefined;
    }

    const arrayValue = stringValue.split(',');

    return arrayValue;
};
