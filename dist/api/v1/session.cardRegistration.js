import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class CardRegistrationSession {
    _config;
    constructor(config) {
        this._config = config;
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
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/card_sessions", JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const session = json;
                        resolve(session);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e);
                reject(err);
            });
        });
    }
}
export { CardRegistrationSession };
