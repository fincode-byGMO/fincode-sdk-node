export type APIErrorResponse = {
    errors: APIErrorObject[]

    // When the number of your API calls exceeds the limit, this field will be filled with the message.
    message?: string
}
export type APIErrorObject = {
    error_code: string
    error_message: string
}

/**
 * This error is thrown when fincode API responded some Error
 * 
 * @member {string} name - Error name (`FincodeAPIError`)
 * @member {Array<Object>} errors - List of `APIErrorObject`
 * @member {string} message - Last error message
 * @member {number} status - HTTP status code
 */
export class FincodeAPIError implements Error {
    public readonly name = "FincodeAPIError"
    public readonly errors?: APIErrorObject[]
    public readonly exceeded?: boolean
    public readonly status: number

    public get message() {
        if (this.exceeded) {
            return "API call limit exceeded"
        } else if (this.errors && this.errors.length > 0) {
            return this.errors[this.errors.length - 1].error_message
        } else {
            return "Unknown Error"
        }
    }
    constructor(errors: APIErrorObject[], status: number, exceeded?: boolean) {
        this.errors = errors
        this.status = status
        this.exceeded = exceeded
    }
}

/**
 * This error is thrown when some Error occurred in this library
 * 
 * @member {string} name - Error name (`FincodeSDKError`)
 * @member {string} message - Error message
 * @member {any} child - original thrown object
 */

export class FincodeSDKError implements Error {
    public readonly name = "FincodeSDKError"
    public readonly message: string
    public readonly child?: any
    constructor(message: string, thrownObject?: any) {
        this.message = message
        this.child = thrownObject
    }
}