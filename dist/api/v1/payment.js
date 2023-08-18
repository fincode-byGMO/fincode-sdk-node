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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    create(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/payments", JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {ExecutingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    execute(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingPaymentListPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PaymentObject>>}
     */
    retrieveList(pagination, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/payments", undefined, header, { pagination: pagination });
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    retrieve(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/payments/${id}`, undefined, header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {CapturingPaymentRequest} body
     *
     * @returns {Promise<PaymentObject>}
     */
    capture(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/capture`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {CancelingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    cancel(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/cancel`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    reauthorize(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/auth`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    changeAmount(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/change`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {ExecutingPaymentAfter3DSecureRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    executeAfter3DSecureAuth(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/secure`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} accessId
     * @param {Executing3DSecureAuthRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Executing3DSecureAuthResponse}
     */
    execute3DSecureAuth(accessId, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/secure/${accessId}`, JSON.stringify(body), header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} accessId
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<Retrieving3DSecureAuthResultResponse>}
     */
    retrieve3DSecureAuthResult(accessId, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/secure/${accessId}`, undefined, header, undefined);
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {GeneratingKonbiniPaymentBarcodeRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    generateKonbiniPaymentBarcode(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/payments/${id}/barcode`, JSON.stringify(body), header, undefined);
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
