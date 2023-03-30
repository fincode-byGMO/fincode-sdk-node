import {
    APIRawErrorResponse,
    CreatingCardRegistrationSessionRequest,
    CardRegistrationSessionObject,
    createError,
    formatErrorResponse
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"

class CardRegistrationSession {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a card registration session**
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
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
                reject(err)
            })
        })
    }
}

export { CardRegistrationSession }