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
     *
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - created plan object
     */
    create(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/plans", JSON.stringify(body), headers, undefined);
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
     * @param {RetrievingPlanListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PlanObject>>}
     */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/plans", undefined, headers, queryParams);
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
     * @param {string} id - plan id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - retrieved plan object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/plans/${id}`, undefined, headers, undefined);
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
     * @param {string} id - plan id
     * @param {UpdatingPlanRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - updated plan object
     */
    update(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/plans/${id}`, JSON.stringify(body), headers, undefined);
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
     * @param {string} id - plan id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<DeletingPlanResponse>} - deleting result
     */
    delete(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/plans/${id}`, undefined, headers, undefined);
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
