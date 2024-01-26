import {
    ContractObject,
    CreatingTenantWithExistingUserRequest,
    CreatingTenantWithExistingUserResponse,
    ExaminationInfo,
    ListResponse,
    CreatingTenantWithNewUserRequest,
    CreatingTenantWithNewUserResponse,
    RequestingExaminationRequest,
    RequestingExaminationResponse,
    ShopObject,
    UpdatingExaminationInfoRequest,
    UpdatingTenantRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    ExaminationInfo_V2,
    UpdatingExaminationInfoRequest_V2,
    RetrievingTenantShopListQueryParams,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js"

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

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
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
    public createWithExistingUser(
        body: CreatingTenantWithExistingUserRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CreatingTenantWithExistingUserResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/join_tenants`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as CreatingTenantWithExistingUserResponse
                        resolve(tenant)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public createWithNewUser(
        body: CreatingTenantWithNewUserRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CreatingTenantWithNewUserResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/tenant_entries`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as CreatingTenantWithNewUserResponse
                        resolve(tenant)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public updateExaminationInfo(
        id: string,
        body: UpdatingExaminationInfoRequest,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/contracts/examinations/tenants/${id}`,
                JSON.stringify(body),
                {
                    ...headers,
                    tenantShopId: id,
                },
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json as ExaminationInfo
                        resolve(examInfo)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public retrieveExaminationInfo(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/examinations/tenants/${id}`,
                undefined,
                {
                    ...headers,
                    tenantShopId: id,
                },
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json as ExaminationInfo
                        resolve(examInfo)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public requestExamination(
        body: RequestingExaminationRequest,
        headers?: FincodeRequestHeaders
    ): Promise<RequestingExaminationResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/contracts/examinations`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as RequestingExaminationResponse
                        resolve(tenant)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public retrieveContract(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ContractObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/${id}`,
                undefined,
                {
                    ...headers,
                    tenantShopId: id,
                },
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const contract = json as ContractObject
                        resolve(contract)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public update(
        id: string,
        body: UpdatingTenantRequest,
        headers?: FincodeRequestHeaders
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/tenants/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as ShopObject
                        resolve(tenant)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/tenants/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as ShopObject
                        resolve(tenant)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public retrieveList(
        queryParams?: RetrievingTenantShopListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<ShopObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/tenants",
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenantList = json as ListResponse<ShopObject>
                        resolve(tenantList)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
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
    public retrieveExaminationInfoV2(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo_V2> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/examinations_v2/tenants/${id}`,
                undefined,
                {
                    ...headers,
                    tenantShopId: id,
                },
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json as ExaminationInfo_V2
                        resolve(examInfo)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getFetchErrorMessage(), e)
                    reject(err)
                })
            })
        })
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
    public updateExaminationInfoV2(
        id: string,
        body: UpdatingExaminationInfoRequest_V2,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo_V2> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/contracts/examinations_v2/tenants/${id}`,
                JSON.stringify(body),
                {
                    ...headers,
                    tenantShopId: id,
                },
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const examInfo = json as ExaminationInfo_V2
                        resolve(examInfo)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

}
export { Tenant }