import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Plan {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Register a plan**
     *
     * corresponds to `POST /v1/plans`
     * w
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    create(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/plans", JSON.stringify(body), header, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json;
                        resolve(plan);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
        });
    }
    /**
     * **Retrieve plan list**
     *
     * corresponds to `GET /v1/plans`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PlanObject>>}
     */
    retrieveList(pagination, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/plans", undefined, header, { pagination: pagination });
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
                }).catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
        });
    }
    /**
     * **Retrieve a plan**
     *
     * corresponds to `GET /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    retrieve(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/plans/${id}`, undefined, header, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json;
                        resolve(plan);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
        });
    }
    /**
     * **Update a plan**
     *
     * corresponds to `PUT /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {UpdatingPlanRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    update(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/plans/${id}`, JSON.stringify(body), header, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json;
                        resolve(plan);
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
     * **Delete a plan**
     *
     * corresponds to `DELETE /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<DeletingPlanResponse>}
     */
    delete(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/plans/${id}`, undefined, header, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json;
                        resolve(plan);
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
export { Plan };
