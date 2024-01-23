export type APIErrorResponse = {
    errors: APIErrorObject[];
    message?: string;
};
export type APIErrorObject = {
    error_code: string;
    error_message: string;
};
export interface FincodeError extends Error {
    readonly name: string;
    readonly message: string;
}
/**
 * This error is thrown when fincode API responded some Error
 *
 * @member {string} name - Error name (`FincodeAPIError`)
 * @member {Array<Object>} errors - List of `APIErrorObject`
 * @member {string} message - Last error message
 * @member {number} status - HTTP status code
 */
export declare class FincodeAPIError implements FincodeError {
    readonly name = "FincodeAPIError";
    readonly errors?: APIErrorObject[];
    readonly exceeded?: boolean;
    readonly status: number;
    get message(): string;
    constructor(errors: APIErrorObject[], status: number, exceeded?: boolean);
}
/**
 * This error is thrown when some Error occurred in this library
 *
 * @member {string} name - Error name (`FincodeSDKError`)
 * @member {string} message - Error message
 * @member {any} child - original thrown object
 */
export declare class FincodeSDKError implements FincodeError {
    readonly name = "FincodeSDKError";
    readonly message: string;
    readonly child?: any;
    constructor(message: string, thrownObject?: any);
}
