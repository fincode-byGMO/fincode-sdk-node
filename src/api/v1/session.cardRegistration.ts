import {
    CreatingCardRegistrationSessionRequest,
    CardRegistrationSessionObject,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js"

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
     * @param {CreatingCardRegistrationSessionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentSessionObject>} - created card registration session object
     */
    public create(
        body: CreatingCardRegistrationSessionRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardRegistrationSessionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/card_sessions",
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const session = json as CardRegistrationSessionObject
                        resolve(session)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }
}

export { CardRegistrationSession }