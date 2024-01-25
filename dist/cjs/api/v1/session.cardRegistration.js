"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRegistrationSession = void 0;
const index_1 = require("../../types/index");
const http_1 = require("./http");
const _errorMessages_1 = require("./_errorMessages");
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
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "POST", "/v1/card_sessions", JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const session = json;
                        resolve(session);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
}
exports.CardRegistrationSession = CardRegistrationSession;
