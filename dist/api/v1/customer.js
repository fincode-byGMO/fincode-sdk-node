import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Customer {
    _config;
    _agent;
    constructor(config, agent) {
        this._config = config;
        this._agent = agent;
    }
    /**
     * **Create a customer**
     *
     * corresponds to `POST /v1/customers`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingCustomerRequest} body - request body
     * @param {FincodePartialRequestHeader} [header] - request header
     *
     * @returns {Promise<CustomerObject>} - created customer
     */
    create(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/customers", JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json;
                        resolve(customer);
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
     * **Retrieve customer list**
     *
     * corresponds to `GET /v1/customers`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieveList(pagination, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/customers", undefined, header, { pagination }, this._agent);
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
     * **Retrieve a customer**
     *
     * corresponds to `GET /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieve(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/customers/${id}`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json;
                        resolve(customer);
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
     * **Update a customer**
     *
     * corresponds to `PUT /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    update(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/customers/${id}`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json;
                        resolve(customer);
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
     * **Delete a customer**
     *
     * corresponds to `DELETE /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    delete(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/customers/${id}`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json;
                        resolve(customer);
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
export { Customer };
