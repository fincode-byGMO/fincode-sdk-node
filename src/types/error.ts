export type APIErrorResponse = {
    errors: APIErrorObject[]

    // When the number of your API calls exceeds the limit, this field will be filled with the message.
    message?: string
}
export type APIErrorObject = {
    error_code: string
    error_message: string
}

export interface FincodeError extends Error {
    readonly name: string
    readonly message: string
}

/**
 * This error is thrown when fincode API responded some Error
 * 
 * @member {string} name - Error name (`FincodeAPIError`)
 * @member {Array<Object>} errors - List of `APIErrorObject`
 * @member {string} message - Last error message
 * @member {number} status - HTTP status code
 */
export class FincodeAPIError extends Error implements FincodeError {
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
        super()
        this.errors = errors
        this.status = status
        this.exceeded = exceeded
    }
}

/**
 * Why the SDK could not complete a request.
 * 
 * The underlying object is kept in {@link FincodeSDKError.child}, but its
 * shape depends on the HTTP client the SDK is built on. Branch on this
 * instead.
 * 
 * - `timeout` - the request did not finish within `options.timeout`. The
 *   request may still have reached fincode, so a payment registered this way
 *   can exist even though the call failed.
 * - `network` - the request never reached fincode. Name resolution, the
 *   connection or the TLS handshake failed.
 * - `response_body` - a response arrived, but its body was not the JSON the
 *   API is documented to return. `status` tells which response it was; a 5xx
 *   here usually comes from something in front of fincode rather than from
 *   fincode itself.
 * - `unknown` - anything else.
 */
export type FincodeSDKErrorKind =
    | "timeout"
    | "network"
    | "response_body"
    | "unknown"

/**
 * This error is thrown when some Error occurred in this library
 * 
 * @member {string} name - Error name (`FincodeSDKError`)
 * @member {string} message - Error message
 * @member {FincodeSDKErrorKind} kind - what went wrong
 * @member {number} [status] - HTTP status code, when a response arrived
 * @member {unknown} [child] - original thrown object
 */
export class FincodeSDKError extends Error implements FincodeError {
    public readonly name = "FincodeSDKError"
    public readonly kind: FincodeSDKErrorKind
    public readonly status?: number
    public readonly child?: unknown

    constructor(
        message: string,
        kind: FincodeSDKErrorKind,
        details?: {
            status?: number
            child?: unknown
        },
    ) {
        super(message)
        this.kind = kind
        this.status = details?.status
        this.child = details?.child
    }
}
