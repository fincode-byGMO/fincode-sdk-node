export type APIRawErrorResponse = {
    errors: APIRawError[]
}
export type APIRawError = {
    error_code: string
    error_message: string
}


export type APIError = {
    type: APIErrorType
    raw: APIRawError
    status?: number
}

/**
 * This error is thrown when fincode API responded some Error
 * 
 * @member {string} name - Error name
 * @member {Array<Object>} errors - List of `APIError`
 * @member {string} message - Error message
 */
export class FincodeError implements Error {
    public readonly name = "FincodeError"
    public readonly errors: APIError[]
    public readonly message: string = "Some errors occurred in fincode-node"
    constructor(errors: APIError[], statusCode?: number) {
        this.errors = errors
    }
}

export const formatErrorResponse = (res: APIRawErrorResponse, status: number): FincodeError => {
    const errors: APIError[] = []
    for (const e of res.errors) {
        errors.push({
            status: status,
            type: lookupErrorType(e.error_code),
            raw: e
        })
    }

    return new FincodeError(errors)
}
export const createError = (
    message: string = "Unknown Error",
    type: APIErrorType = "UNKNOWN_ERROR",
    rawCode: string = "UNKNOWN_ERROR",
    status?: number
): FincodeError => {
    return new FincodeError([{
        status: status,
        type: type,
        raw: {
            error_code: rawCode,
            error_message: message,
        }
    }])
}

export type APIErrorType =
    /**
     * 不明なエラー ( Unknown Error )
     */
    'UNKNOWN_ERROR' |

    /**
     * SDK内部エラー ( SDK Internal Error )
     */
    'SDK_ERROR' |

    /**
     * APIバージョン指定におけるエラー ( Invalid API Version )
     */
    'INVALID_API_VERSION' |

    /**
     * リクエスト全体のエラー (Bad Request)
     */
    'BAD_REQUEST' |

    /**
     * パラメータ誤りエラー ( Invalid Parameter )
     */
    'INVALID_PARAMETER' |

    /**
     * 決済処理エラー ( Payment Error )
     */
    'PAYMENT_ERROR' |

    /**
     * 認証/認可エラー ( fincode Authentication/Authentication Error )
     */
    'FINCODE_AUTH_ERROR' |

    /**
     * 冪等性エラー ( Idempotency Error )
     */
    'IDEMPOTENCY_ERROR' |

    /**
     * 存在しないリソースエラー ( Resource Not Found Error )
     */
    'RESOURCE_NOT_FOUND' |

    /**
     * fincodeリソースの重複エラー ( Duplicate resource Error )
     */
    'DUPLICATE_RESOURCE' |

    /**
     * fincodeリソースの数量エラー ( Invalid resource length Error )
     */
    'INVALID_RESOURCE_LENGTH' |

    /**
     * fincode 契約上のエラー ( fincode Contract Error )
     */
    'FINCODE_CONTRACT_ERROR'

// format ([0-9A-Z]{5})([0-9]{3})([0-9]{3})
const errorCodeFormat = /^([0-9A-Z]{5})([0-9A-Z]{3})([0-9A-Z]{3})$/
export const lookupErrorType = (code: string): APIErrorType => {
    if (code.length !== 11) {
        throw new Error('Invalid error code. It seems not to be fincode error code.')
    }

    /**
     * Error occurred in backward of fincode
     */
    // invalid parameter
    if (code === "E9993134001") return "INVALID_PARAMETER"
    // this transaction has already been completed
    if (code === "E9993134002") return "PAYMENT_ERROR"
    // updating failed
    if (code === "E9993134003") return "PAYMENT_ERROR"
    // invalid pay_type
    if (code === "E9993134004") return "PAYMENT_ERROR"
    // invalid card number
    if (code === "E9993134005") return "PAYMENT_ERROR"
    // some error occurred by marchant configuration
    if (code === "E9993134006") return "PAYMENT_ERROR"
    // invalid card information
    if (code === "E9993134007") return "PAYMENT_ERROR"
    // not enough information
    if (code === "E9993134008") return "PAYMENT_ERROR"
    // network error
    if (code === "E9993134009") return "PAYMENT_ERROR"
    // unknown error
    if (code === "E9993134999") return "PAYMENT_ERROR"
    // G Errors
    if (gErrorCodes.includes(code)) return "PAYMENT_ERROR"

    /**
     * Idempotency Error
     */
    // duplicated idempotency key
    if (code === "E9991001001") return "IDEMPOTENCY_ERROR"

    /**
     * System Error
     */
    // Database
    if (code === "E9991001002") return "UNKNOWN_ERROR"
    // Network
    if (code === "E9991001003") return "UNKNOWN_ERROR"
    // Timeout
    if (code === "E9991001004") return "UNKNOWN_ERROR"
    // Unknown Error
    if (code === "E9991001999") return "UNKNOWN_ERROR"

    /**
     * Request Error
     */
    // Bad request body
    if (code === "E9992001001") return "BAD_REQUEST"
    // Bad request with 404
    if (code === "E9992001002") return "BAD_REQUEST"
    // Bad request with 405
    if (code === "E9992001003") return "BAD_REQUEST"
    // Not acceptable with 406
    if (code === "E9992001004") return "BAD_REQUEST"
    // Unsupported media type with 415
    if (code === "E9992001005") return "BAD_REQUEST"


    const matches = code.match(errorCodeFormat)
    if (!matches) {
        throw new Error('Invalid error code. It seems not to be fincode error code.')
    }

    const functionalCode = matches[1]
    const indexCode = matches[2]
    const checkID = matches[3]

    /**
     * Authorization Error
     */
    if (functionalCode === apiAuthorizationCode) return "FINCODE_AUTH_ERROR"

    /**
     * Authentication Error
     */
    if (functionalCode === apiAuthenticationCode) return "FINCODE_AUTH_ERROR"

    /**
     * Resource Not Found Error
     */
    if (checkID === notFoundCheckID) return "RESOURCE_NOT_FOUND"

    /**
     * Duplicate Resource Error
     */
    if (checkID === duplicatedCheckID) return "DUPLICATE_RESOURCE"

    /**
     * Invalid Resource Length Error
     */
    if (checkID === invalidResourceLenCheckID) return "INVALID_RESOURCE_LENGTH"

    /**
     * Contract Error
     */
    if (checkID === contractCheckID) return "FINCODE_CONTRACT_ERROR"
    if (indexCode === "106" && checkID === "A01") return "FINCODE_CONTRACT_ERROR"

    /**
     * Authentication Error
     */
    if (checkID === authenticationCheckID) return "FINCODE_AUTH_ERROR"
    if (checkID === accountLockedCheckID) return "FINCODE_AUTH_ERROR"
    if (authFunctionCodes.includes(functionalCode)) return "FINCODE_AUTH_ERROR"

    /**
     * Konbini payment 
     */
    // konbiniFunctionCodes.forEach((konbiniFunctionCode) => {})

    /**
     * PayPay payment
     */
    // paypayFunctionCodes.forEach((paypayFunctionCode) => {})



    return "INVALID_PARAMETER"
}

const gErrorCodes = [
    "E9993134010",
    "E9993134011",
    "E9993134012",
    "E9993134013",
    "E9993134014",
    "E9993134015",
    "E9993134016",
    "E9993134017",
    "E9993134018",
    "E9993134019",
    "E9993134020",
    "E9993134021",
    "E9993134022",
    "E9993134023",
    "E9993134024",
    "E9993134025",
    "E9993134026",
    "E9993134027",
    "E9993134028",
    "E9993134029",
    "E9993134030",
    "E9993134031",
    "E9993134032",
]

const konbiniFunctionCodes = [
    "ED001",
    "ED002",
    "ED003",
    "ED004",
    "ED005",
    "ED006",
    "ED007",
    "ED008",
    "ED009",
]

const paypayFunctionCodes = [
    "EE001",
    "EE002",
    "EE003",
    "EE004",
    "EE005",
    "EE006",
    "EE007",
    "EE008",
    "EE009",
    "EE010",
]

const authFunctionCodes = [
    "E0017",
    "E0018",
    "E0019",
    "E0020",
    "E0021",
    "E0022",
    "E0023",
    "E0024",
    "E0025",
    //
    //
    "E0028",
    "E0029",
    "E0030",
    "E0031",
    "E0032",
    "E0033",
    "E0034",
    "E0035",
    "E0036",
]

const apiAuthorizationCode = "E9994"
const apiAuthenticationCode = "E9995"

const notFoundCheckID = "002"
const duplicatedCheckID = "014"
const invalidResourceLenCheckID = "030"
const contractCheckID = "019"
const authenticationCheckID = "025"
const accountLockedCheckID = "026"