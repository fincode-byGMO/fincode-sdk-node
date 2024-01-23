import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage, } from "./_errorMessages";
class Card {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Create a card**
     *
     * corresponds to `POST /v1/customers/:customer_id/cards`
     *
     * @param {string} customerId - customer id
     * @param {CreatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CardObject>} - created card object
     */
    create(customerId, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/customers/${customerId}/cards`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json;
                        resolve(card);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
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
     * **Retrieve card list of a customer**
     *
     * corresponds to `GET /v1/customers/:customer_id/cards`
     *
     * @param {string} customerId - customer id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<CardObject>>} - card object list
     */
    retrieveList(customerId, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/customers/${customerId}/cards`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
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
     * **Retrieve a card of customer**
     *
     * corresponds to `GET /v1/customers/:customer_id/cards/:id`
     *
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CardObject>} - retrieved card object
     */
    retrieve(customerId, id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/customers/${customerId}/cards/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json;
                        resolve(card);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
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
     * **Update a card of customer**
     *
     * corresponds to `PUT /v1/customers/:customer_id/cards/:id`
     *
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {UpdatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CardObject>} - updated card object
     */
    update(customerId, id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/customers/${customerId}/cards/${id}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json;
                        resolve(card);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
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
     * **Delete a card of customer**
     *
     * corresponds to `DELETE /v1/customers/:customer_id/cards/:id`
     *
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<DeletingCardResponse>} - deleting result
     */
    delete(customerId, id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/customers/${customerId}/cards/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json;
                        resolve(card);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
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
export { Card };
