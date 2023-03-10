export type APIErrorResponse = {
    errors: APIError[]
}

export type APIRawError = {
    error_code: string
    error_messaage: string
}

export type APIError = {
    type: APIErrorType
    raw: APIRawError
}

export type APIErrorType =
    /**
     * 不明なエラー ( Unknown Error )
     */
    'UNKNOWN_ERROR' |

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
    if ("E9993134001") return "INVALID_PARAMETER"
    // this transaction has already been completed
    if ("E9993134002") return "PAYMENT_ERROR"
    // updating failed
    if ("E9993134003") return "PAYMENT_ERROR"
    // invalid pay_type
    if ("E9993134004") return "PAYMENT_ERROR"
    // invalid card number
    if ("E9993134005") return "PAYMENT_ERROR"
    // some error occurred by marchant configuration
    if ("E9993134006") return "PAYMENT_ERROR"
    // invalid card information
    if ("E9993134007") return "PAYMENT_ERROR"
    // not enough information
    if ("E9993134008") return "PAYMENT_ERROR"
    // network error
    if ("E9993134009") return "PAYMENT_ERROR"
    // unknown error
    if ("E9993134999") return "PAYMENT_ERROR"
    // G Errors
    if (gErrorCodes.includes(code)) return "PAYMENT_ERROR"

    /**
     * Idempotency Error
     */
    // duplicated idempotency key
    if ("E9991001001") return "IDEMPOTENCY_ERROR"

    /**
     * System Error
     */
    // Database
    if ("E9991001002") return "UNKNOWN_ERROR"
    // Network
    if ("E9991001003") return "UNKNOWN_ERROR"
    // Timeout
    if ("E9991001004") return "UNKNOWN_ERROR"
    // Unknown Error
    if ("E9991001999") return "UNKNOWN_ERROR"

    /**
     * Request Error
     */
    // Bad request body
    if ("E9992001001") return "BAD_REQUEST"
    // Bad request with 404
    if ("E9992001002") return "BAD_REQUEST"
    // Bad request with 405
    if ("E9992001003") return "BAD_REQUEST"
    // Not acceptable with 406
    if ("E9992001004") return "BAD_REQUEST"
    // Unsupported media type with 415
    if ("E9992001005") return "BAD_REQUEST"


    const matches = code.match(errorCodeFormat)
    if (!matches) {
        throw new Error('Invalid error code. It seems not to be fincode error code.')
    }

    const functionalCode = matches[0]
    const indexCode = matches[1]
    const checkID = matches[2]

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