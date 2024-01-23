import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Payment {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Register a payment**
     *
     * corresponds to `POST /v1/payments`
     *
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - created payment object
     */
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/payments", JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Execute a payment**
     *
     * corresponds to `PUT /v1/payments/:id`
     *
     * @param {string} id - payment id
     * @param {ExecutingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - executed payment object
     */
    execute(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Retrieve payment list**
     *
     * corresponds to `GET /v1/payments`
     *
     * @param {RetrievingPaymentListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PaymentObject>>} - retrieved payment object list
     */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/payments", undefined, headers, queryParams);
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
     * **Retrieve a payment**
     *
     * corresponds to `GET /v1/payments/:id`
     *
     * @param {string} id - payment id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - retrieved payment object
     */
    retrieve(id, queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/payments/${id}`, undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Capture a payment**
     *
     * corresponds to `PUT /v1/payments/:id/capture`
     *
     * @param {string} id - payment id
     * @param {CapturingPaymentRequest} body - request body
     *
     * @returns {Promise<PaymentObject>} - captured payment object
     */
    capture(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/capture`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Cancel a payment**
     *
     * corresponds to `PUT /v1/payments/:id/cancel`
     *
     * @param {string} id - payment id
     * @param {CancelingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - canceled payment object
     */
    cancel(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/cancel`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Re-authorize a payment**
     *
     * corresponds to `PUT /v1/payments/:id/auth`
     *
     * @param {string} id - payment id
     * @param {ReauthorizingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - re-authorized payment object
     */
    reauthorize(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/auth`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Change amount of a payment**
     *
     * corresponds to `PUT /v1/payments/:id/change`
     *
     * @param {string} id - payment id
     * @param {ChangingPaymentAmountRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - changed payment object
     */
    changeAmount(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/change`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Execute a payment after 3D Secure authentication**
     *
     * corresponds to `PUT /v1/payments/:id/secure`
     *
     * @param {string} id - payment id
     * @param {ExecutingPaymentAfter3DSecureRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - executed payment object
     */
    executeAfter3DSecureAuth(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/secure`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
     * **Execute a 3D Secure authentication for a payment**
     *
     * corresponds to `PUT /v1/secure2/:access_id`
     *
     * @param {string} accessId - access id
     * @param {Executing3DSecureAuthRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Executing3DSecureAuthResponse} - executed 3D Secure authentication result
     */
    execute3DSecureAuth(accessId, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/secure/${accessId}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const auth = json;
                        resolve(auth);
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
     * **Retrieve a 3D Secure authentication result**
     *
     * corresponds to `GET /v1/secure2/:access_id`
     *
     * @param {string} accessId - access id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<Retrieving3DSecureAuthResultResponse>} - retrieved 3D Secure authentication result
     */
    retrieve3DSecureAuthResult(accessId, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/secure/${accessId}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const auth = json;
                        resolve(auth);
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
     * **Generating a Konbini payment barcode**
     *
     * corresponds to `PUT /v1/payments/:id/barcode`
     *
     * @param {string} id - payment id
     * @param {GeneratingKonbiniPaymentBarcodeRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - barcode-generated payment object
     */
    generateKonbiniPaymentBarcode(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/barcode`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const payment = json;
                        resolve(payment);
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
export { Payment };
