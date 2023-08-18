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
    RetrievingTenantShopListPagination,
    ShopObject,
    TenantShopsSearchParams,
    UpdatingExaminationInfoRequest,
    UpdatingTenantRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    ExaminationInfo_V2,
    UpdatingExaminationInfoRequest_V2,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

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
     * 
     * **Create a tenant with existing platform user**
     * 
     * corresponds to `POST /v1/join_tenants`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {CreatingTenantWithExistingUserRequest} body
     * @param {FincodePartialRequestHeader} [header]
     */
    public createWithExistingUser(
        body: CreatingTenantWithExistingUserRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CreatingTenantWithExistingUserResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/join_tenants`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {CreatingTenantWithExistingUserRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<CreatingTenantWithExistingUserResponse>}
     */
    public createWithNewUser(
        body: CreatingTenantWithNewUserRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CreatingTenantWithNewUserResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/tenant_entries`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ExaminationInfo>}
     */
    public updateExaminationInfo(
        id: string,
        body: UpdatingExaminationInfoRequest,
        header?: FincodePartialRequestHeader
    ): Promise<ExaminationInfo> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/contracts/examinations/tenants/${id}`,
                JSON.stringify(body),
                {
                    ...header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ExaminationInfo>}
     */
    public retrieveExaminationInfo(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<ExaminationInfo> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/examinations/tenants/${id}`,
                undefined,
                {
                    ...header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {RequestingExaminationRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<RequestingExaminationResponse>}
     */
    public requestExamination(
        body: RequestingExaminationRequest,
        header?: FincodePartialRequestHeader
    ): Promise<RequestingExaminationResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/contracts/examinations`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<>}
     */
    public retrieveContract(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<ContractObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/${id}`,
                undefined,
                {
                    ...header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - tenant shop id
     * @param {UpdatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ShopObject>}
     */
    public update(
        id: string,
        body: UpdatingTenantRequest,
        header?: FincodePartialRequestHeader
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/tenants/${id}`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ShopObject>}
     */
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/tenants/${id}`,
                undefined,
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {RetrievingTenantShopListPagination} [pagination]
     * @param {TenantShopsSearchParams} [searchParams]
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<ShopObject>>}
     */
    public retrieveList(
        pagination?: RetrievingTenantShopListPagination,
        searchParams?: TenantShopsSearchParams,
        header?: FincodePartialRequestHeader
    ): Promise<ListResponse<ShopObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/tenants",
                undefined,
                header,
                {
                    pagination: pagination,
                    searchParams: searchParams,
                },
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public retrieveExaminationInfoV2(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<ExaminationInfo_V2> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/contracts/examinations_v2/tenants/${id}`,
                undefined,
                {
                    ...header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public updateExaminationInfoV2(
        id: string,
        body: UpdatingExaminationInfoRequest_V2,
        header?: FincodePartialRequestHeader
    ): Promise<ExaminationInfo_V2> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/contracts/examinations_v2/tenants/${id}`,
                JSON.stringify(body),
                {
                    ...header,
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
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

}
export { Tenant }