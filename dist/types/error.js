/**
 * This error is thrown when fincode API responded some Error
 *
 * @member {string} name - Error name (`FincodeAPIError`)
 * @member {Array<Object>} errors - List of `APIErrorObject`
 * @member {string} message - Last error message
 * @member {number} status - HTTP status code
 */
export class FincodeAPIError {
    name = "FincodeAPIError";
    errors;
    exceeded;
    status;
    get message() {
        if (this.exceeded) {
            return "API call limit exceeded";
        }
        else if (this.errors && this.errors.length > 0) {
            return this.errors[this.errors.length - 1].error_message;
        }
        else {
            return "Unknown Error";
        }
    }
    constructor(errors, status, exceeded) {
        this.errors = errors;
        this.status = status;
        this.exceeded = exceeded;
    }
}
/**
 * This error is thrown when some Error occurred in this library
 *
 * @member {string} name - Error name (`FincodeSDKError`)
 * @member {string} message - Error message
 * @member {any} child - original thrown object
 */
export class FincodeSDKError {
    name = "FincodeSDKError";
    message;
    child;
    constructor(message, thrownObject) {
        this.message = message;
        this.child = thrownObject;
    }
}