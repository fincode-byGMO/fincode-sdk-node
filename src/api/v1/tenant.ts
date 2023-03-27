import {
    APIRawErrorResponse,
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
    createError,
    formatErrorResponse
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"

class Tenant {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as CreatingTenantResponse
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as RegisteringTenantResponse
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ExaminationInfo
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ExaminationInfo
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as RequestingExaminationResponse
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ContractObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ShopObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ShopObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
     * @param {FincodePartialRequestHeader} [header]
     * 
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
                }
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ListResponse<ShopObject>
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
                reject(err)
            })
        })
    }
}