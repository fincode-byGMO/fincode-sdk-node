import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingPaymentSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentSessionObject>}
     */
    create(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/sessions", JSON.stringify(body), header, undefined);
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
