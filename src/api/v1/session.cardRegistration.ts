import { RequestInit } from "node-fetch"
import {
    CreatingCardRegistrationSessionRequest,
    CardRegistrationSessionObject,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class CardRegistrationSession {

    private readonly _config: FincodeConfig
    private readonly _agent: RequestInit["agent"]

    constructor(config: FincodeConfig, agent?: RequestInit["agent"]) {
        this._config = config
        this._agent = agent
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
                undefined,
                this._agent,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }
}

export { CardRegistrationSession }