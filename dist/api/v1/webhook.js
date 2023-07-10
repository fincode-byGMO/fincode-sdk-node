import { FincodeAPIError, FincodeSDKError, } from "./../../types";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
export class Webhook {
    _config;
    _agent;
    constructor(config, agent) {
        this._config = config;
        this._agent = agent;
    }
    /**
    * **Subscribe webhook**
    *
    * corresponds to `POST /v1/webhook_settings`
    *
    * if the Promise is rejected, the error is an instance of `FincodeError`
    *
    * @param {SubscribingWebhookRequest} body Request object for Registering a webhook
    * @param {FincodePartialRequestHeader} [header]
    *
    * @returns {Promise<WebhookObject>} Webhook object
    */
    subscribe(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/webhook_settings`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json;
                        resolve(res);
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
     * *Retrieve a webhook*
     *
     * corresponds to `GET /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    retrieve(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/webhook_settings/${id}`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json;
                        resolve(res);
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
     * *Retrieve webhooks list*
     *
     * corresponds to `GET /v1/webhook_settings`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook list
     */
    retrieveList(header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/webhook_settings`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json;
                        resolve(res);
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
     * *Update a webhook*
     *
     * corresponds to `PUT /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {UpdatingWebhookRequest} body Request object for Registering a webhook
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    update(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/webhook_settings/${id}`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json;
                        resolve(res);
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
     * *Delete a webhook*
     *
     * corresponds to `DELETE /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    delete(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/webhook_settings/${id}`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json;
                        resolve(res);
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
