import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Tenant {
    _config;
    _agent;
    constructor(config, agent) {
        this._config = config;
        this._agent = agent;
    }
    /**
     * **Create a tenant**
     *
     * corresponds to `POST /v1/join_tenants`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     */
    create(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/join_tenants`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Register a tenant**
     *
     * corresponds to `POST /v1/tenant_entries`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<CreatingTenantResponse>}
     */
    register(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/tenant_entries`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Update contract examination information of a tenant**
     *
     * corresponds to `PUT /v1/contracts/examinations/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ExaminationInfo>}
     */
    updateExaminationInfo(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/contracts/examinations/tenants/${id}`, JSON.stringify(body), {
                ...header,
                tenantShopId: id,
            }, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Retrieve contract examination information of a tenant**
     *
     * corresponds to `GET /v1/contracts/examinations/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ExaminationInfo>}
     */
    retrieveExaminationInfo(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/contracts/examinations/tenants/${id}`, undefined, {
                ...header,
                tenantShopId: id,
            }, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Requesting a contract examination**
     *
     * corresponds to `POST /v1/contracts/examinations`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RequestingExaminationRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<RequestingExaminationResponse>}
     */
    requestExamination(body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "POST", `/v1/contracts/examinations`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Retrieve contract information of a tenant**
     *
     * corresponds to `GET /v1/contracts/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<>}
     */
    retrieveContract(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/contracts/${id}`, undefined, {
                ...header,
                tenantShopId: id,
            }, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Update a tenant**
     *
     * corresponds to `PUT /v1/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ShopObject>}
     */
    update(id, body, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/tenants/${id}`, JSON.stringify(body), header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Retrieve a tenant**
     *
     * corresponds to `GET /v1/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ShopObject>}
     */
    retrieve(id, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/tenants/${id}`, undefined, header, undefined, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
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
     * **Retrieve tenant list**
     *
     * corresponds to `GET /v1/tenants`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingTenantShopListPagination} [pagination]
     * @param {TenantShopsSearchParams} [searchParams]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<ShopObject>>}
     */
    retrieveList(pagination, searchParams, header) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/tenants", undefined, header, {
                pagination: pagination,
                searchParams: searchParams,
            }, this._agent);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenantList = json;
                        resolve(tenantList);
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
export { Tenant };
