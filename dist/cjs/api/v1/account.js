"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const index_js_1 = require("../../types/index.js");
const http_js_1 = require("./http.js");
const _errorMessages_js_1 = require("./_errorMessages.js");
class Account {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Retrieve account list **
     *
     * corresponds to `POST /v1/accounts`
     *
     * @param {RetrievingAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<AccountObject>>} - account object list
    */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", "/v1/accounts", undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        resolve(json);
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
    /**
     * **Retrieve a account**
     *
     * corresponds to `GET /v1/accounts/:id`
     *
     * @param {string} id - account ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<AccountObject>} - account object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", `/v1/accounts/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const platformAccount = json;
                        resolve(platformAccount);
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
    /**
     * **Retrieve a account detail*
     *
     * corresponds to `GET /v1/accounts/:id/detail`
     *
     * @param {string} id - account ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<AccountObject>} - account object
     */
    retrieveDetailList(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", `/v1/accounts/${id}/detail`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
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
exports.Account = Account;
