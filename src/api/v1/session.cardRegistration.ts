import {
    APIRawErrorResponse,
    CreatingCardRegistrationSessionRequest,
    CardRegistrationSessionObject,
    createUnknownError,
    formatErrorResponse
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http.js"

class PaymentSession {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a payment session**
     * 
     * corresponds to `POST /v1/sessions`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {CreatingCardRegistrationSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<PaymentSessionObject>}
     */
    public create(
        body: CreatingCardRegistrationSessionRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CardRegistrationSessionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/card_sessions",
                JSON.stringify(body),
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const session = json as CardRegistrationSessionObject
                        resolve(session)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }
}

export { PaymentSession }