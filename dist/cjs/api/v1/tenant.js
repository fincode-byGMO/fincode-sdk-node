"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const index_1 = require("../../types/index");
const http_1 = require("./http");
const _errorMessages_1 = require("./_errorMessages");
/**
 * @typedef {Object} Tenant
 * @property {Function} createWithExistingUser - Create a tenant with existing platform user
 * @property {Function} createWithNewUser - Create a tenant with new user
 * @property {Function} updateExaminationInfo - *deprecated* Use `updateExaminationInfoV2` instead
 * @property {Function} retrieveExaminationInfo - *deprecated* Use `retrieveExaminationInfoV2` instead
 * @property {Function} requestExamination - Requesting a contract examination
 * @property {Function} retrieveContract - Retrieve contract information of a tenant
 * @property {Function} update - Update a tenant
 * @property {Function} retrieve - Retrieve a tenant
 * @property {Function} retrieveList - Retrieve tenant list
 * @property {Function} retrieveExaminationInfoV2 - Retrieve contract examination information of a tenant
 */
class Tenant {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Create a tenant with existing platform user**
     *
     * corresponds to `POST /v1/join_tenants`
     *
     * @param {CreatingTenantWithExistingUserRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CreatingTenantWithExistingUserResponse>} - created tenant object
     */
    createWithExistingUser(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "POST", `/v1/join_tenants`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Create a tenant with new user**
     *
     * corresponds to `POST /v1/tenant_entries`
     *
     * @param {CreatingTenantWithExistingUserRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<CreatingTenantWithExistingUserResponse>} - created tenant object
     */
    createWithNewUser(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "POST", `/v1/tenant_entries`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * @deprecated Use `updateExaminationInfoV2` instead
     *
     * **Update contract examination information of a tenant**
     *
     * corresponds to `PUT /v1/contracts/examinations/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ExaminationInfo>} - updated examination info object
     */
    updateExaminationInfo(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "PUT", `/v1/contracts/examinations/tenants/${id}`, JSON.stringify(body), {
                ...headers,
                tenantShopId: id,
            }, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json;
                        resolve(examInfo);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * @deprecated Use `retrieveExaminationInfoV2` instead
     *
     * **Retrieve contract examination information of a tenant**
     *
     * corresponds to `GET /v1/contracts/examinations/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ExaminationInfo>} - examination info object
     */
    retrieveExaminationInfo(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "GET", `/v1/contracts/examinations/tenants/${id}`, undefined, {
                ...headers,
                tenantShopId: id,
            }, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json;
                        resolve(examInfo);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Requesting a contract examination**
     *
     * corresponds to `POST /v1/contracts/examinations`
     *
     * @param {RequestingExaminationRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<RequestingExaminationResponse>} - created examination object
     */
    requestExamination(body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "POST", `/v1/contracts/examinations`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve contract information of a tenant**
     *
     * corresponds to `GET /v1/contracts/:id`
     *
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ContractObject>} - contract object
     */
    retrieveContract(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "GET", `/v1/contracts/${id}`, undefined, {
                ...headers,
                tenantShopId: id,
            }, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const contract = json;
                        resolve(contract);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Update a tenant**
     *
     * corresponds to `PUT /v1/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingTenantRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ShopObject>} - updated tenant object
     */
    update(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "PUT", `/v1/tenants/${id}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve a tenant**
     *
     * corresponds to `GET /v1/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ShopObject>} - tenant object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "GET", `/v1/tenants/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json;
                        resolve(tenant);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve tenant list**
     *
     * corresponds to `GET /v1/tenants`
     *
     * @param {RetrievingTenantShopListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<ShopObject>>} - tenant list
     */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "GET", "/v1/tenants", undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenantList = json;
                        resolve(tenantList);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve contract examination information of a tenant**
     *
     * corresponds to `GET /v1/contracts/examinations_v2/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ExaminationInfo_V2>} - examination info object
     */
    retrieveExaminationInfoV2(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "GET", `/v1/contracts/examinations_v2/tenants/${id}`, undefined, {
                ...headers,
                tenantShopId: id,
            }, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json;
                        resolve(examInfo);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                }).catch((e) => {
                    const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                    reject(err);
                });
            });
        });
    }
    /**
     * **Update contract examination information of a tenant**
     *
     * corresponds to `PUT /v1/contracts/examinations_v2/tenants/:id`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest_V2} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ExaminationInfo_V2>} - updated examination info object
     */
    updateExaminationInfoV2(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = (0, http_1.createFincodeRequestFetch)(this._config, "PUT", `/v1/contracts/examinations_v2/tenants/${id}`, JSON.stringify(body), {
                ...headers,
                tenantShopId: id,
            }, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json;
                        resolve(examInfo);
                    }
                    else {
                        const errRes = json;
                        const e = new index_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
                    }
                });
            }).catch((e) => {
                const err = new index_1.FincodeSDKError((0, _errorMessages_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
}
exports.Tenant = Tenant;
