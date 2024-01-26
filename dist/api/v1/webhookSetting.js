import { FincodeAPIError, FincodeSDKError, } from "../../types";
import { createFincodeRequestFetch } from "./http.js";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js";
export class WebhookSetting {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
    * **Subscribe webhook**
    *
    * corresponds to `POST /v1/webhook_settings`
    *
    * @param {SubscribingWebhookRequest} body - request body
    * @param {FincodeRequestHeaders} [headers] - request headers
    *
    * @returns {Promise<WebhookSettingObject>} - Webhook setting object
    */
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/webhook_settings`, JSON.stringify(body), headers, undefined);
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
     * @param {string} id - webhook setting ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookSettingObject>} - Webhook setting object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/webhook_settings/${id}`, undefined, headers, undefined);
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
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook setting object list
     */
    retrieveList(headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/webhook_settings`, undefined, headers, undefined);
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
     * @param {string} id - Webhook ID
     * @param {UpdatingWebhookRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookSettingObject>} Webhook setting object
     */
    update(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/webhook_settings/${id}`, JSON.stringify(body), headers, undefined);
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
     * @param {string} id - Webhook ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookObject>} - deleting webhook setting result
     */
    delete(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/webhook_settings/${id}`, undefined, headers, undefined);
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
