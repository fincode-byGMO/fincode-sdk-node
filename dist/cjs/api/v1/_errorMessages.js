"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseJSONParseErrorMessage = exports.getFetchErrorMessage = void 0;
const getFetchErrorMessage = () => {
    return "Error fetching data";
};
exports.getFetchErrorMessage = getFetchErrorMessage;
const getResponseJSONParseErrorMessage = () => {
    return "Failed to parse response body";
};
exports.getResponseJSONParseErrorMessage = getResponseJSONParseErrorMessage;
