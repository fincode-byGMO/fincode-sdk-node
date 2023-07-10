import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Subscription {
    _config;
    _agent;
    constructor(config, agent) {
        this._config = config;
        this._agent = agent;
    }
    /**
     * **Register a subscription**
     *
     * corresponds to `POST /v1/subscriptions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RegisteringPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    register(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/subscriptions", JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
    /**
     * **Retrieve subscription list**
     *
     * corresponds to `GET /v1/subscriptions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<SubscriptionObject>>}
     */
    retrieveList(pagination, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/subscriptions", undefined, header, { pagination: pagination }, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
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
    /**
     * **Retrieve a subscription**
     *
     * corresponds to `GET /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {string} payType
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    retrieve(id, payType, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/subscriptions/${id}`, undefined, header, {
                keyValues: {
                    pay_type: payType,
                }
            }, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
    /**
     * **Update a subscription**
     *
     * corresponds to `PUT /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {UpdatingSubscriptionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    update(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/subscriptions/${id}`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
    /**
     * **Cancel a subscription**
     *
     * corresponds to `DELETE /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {string} payType
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<DeletingSubscriptionResponse>}
     */
    cancel(id, payType, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/subscriptions/${id}`, undefined, header, {
                keyValues: {
                    pay_type: payType,
                },
            }, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json;
                        resolve(subscription);
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
    /**
     * **Retrieve subscription result list**
     *
     * corresponds to `GET /v1/subscriptions/:id/result`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {RetrievingSubscriptionResultListPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<SubscriptionResultObject>>}
     */
    retrieveResultList(id, pagination, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/subscriptions/${id}/result`, undefined, header, { pagination: pagination }, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
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
export { Subscription };
