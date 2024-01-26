"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSession = void 0;
const index_js_1 = require("../../types/index.js");
const http_js_1 = require("./http.js");
const _errorMessages_js_1 = require("./_errorMessages.js");
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
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "POST", "/v1/sessions", JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const session = json;
                        resolve(session);
                    }
                    else {
                        const errRes = json;
                        const e = new index_js_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
}
exports.PaymentSession = PaymentSession;
