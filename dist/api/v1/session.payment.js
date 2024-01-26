import { FincodeAPIError, FincodeSDKError, } from "../../types/index.js";
import { createFincodeRequestFetch } from "./http.js";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js";
class PaymentSession {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Create a payment session**
     *
     * corresponds to `POST /v1/sessions`
     *
     * @param {CreatingPaymentSessionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentSessionObject>} - created payment session object
     */
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/sessions", JSON.stringify(body), headers, undefined);
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
export { PaymentSession };
