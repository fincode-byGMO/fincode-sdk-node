"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const index_js_1 = require("../../types/index.js");
const http_js_1 = require("./http.js");
const _errorMessages_js_1 = require("./_errorMessages.js");
class Subscription {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Register a subscription**
     *
     * corresponds to `POST /v1/subscriptions`
     *
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<SubscriptionObject>} - created subscription object
     */
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "POST", "/v1/subscriptions", JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
     * **Retrieve subscription list**
     *
     * corresponds to `GET /v1/subscriptions`
     *
     * @param {RetrievingSubscriptionListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<SubscriptionObject>>} - subscription object list
     */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", "/v1/subscriptions", undefined, headers, queryParams);
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
    /**
     * **Retrieve a subscription**
     *
     * corresponds to `GET /v1/subscriptions/:id`
     *
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<SubscriptionObject>} - subscription object
     */
    retrieve(id, queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", `/v1/subscriptions/${id}`, undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
     * **Update a subscription**
     *
     * corresponds to `PUT /v1/subscriptions/:id`
     *
     * @param {string} id - subscription id
     * @param {UpdatingSubscriptionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<SubscriptionObject>} - updated subscription object
     */
    update(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "PUT", `/v1/subscriptions/${id}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
     * **Cancel a subscription**
     *
     * corresponds to `DELETE /v1/subscriptions/:id`
     *
     * @param {string} id - subscription id
     * @param {CancelingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CancelingSubscriptionResponse>} - canceled subscription object
     */
    cancel(id, queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "DELETE", `/v1/subscriptions/${id}`, undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
     * **Retrieve subscription result list**
     *
     * corresponds to `GET /v1/subscriptions/:id/result`
     *
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionResultListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<SubscriptionResultObject>>} - subscription result object list
     */
    retrieveResultList(id, queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", `/v1/subscriptions/${id}/result`, undefined, headers, queryParams);
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
exports.Subscription = Subscription;
