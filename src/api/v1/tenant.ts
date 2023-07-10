import { RequestInit } from "node-fetch"
import {
    ContractObject,
    CreatingTenantRequest,
    CreatingTenantResponse,
    ExaminationInfo,
    ListResponse,
    RegisteringTenantRequest,
    RegisteringTenantResponse,
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
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class Tenant {

    private readonly _config: FincodeConfig
    private readonly _agent: RequestInit["agent"]

    constructor(config: FincodeConfig, agent?: RequestInit["agent"]) {
        this._config = config
        this._agent = agent
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
    public create(
        body: CreatingTenantRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CreatingTenantResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/join_tenants`,
                JSON.stringify(body),
                header,
                undefined,
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as CreatingTenantResponse
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
    public register(
        body: RegisteringTenantRequest,
        header?: FincodePartialRequestHeader
    ): Promise<RegisteringTenantResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/tenant_entries`,
                JSON.stringify(body),
                header,
                undefined,
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as RegisteringTenantResponse
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
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as ExaminationInfo
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
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as ExaminationInfo
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
                this._agent,
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
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const tenant = json as ContractObject
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
                this._agent,
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
                this._agent,
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
                this._agent,
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
}
export { Tenant }