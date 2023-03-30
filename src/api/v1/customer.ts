import {
    APIRawErrorResponse,
    CreatingCustomerRequest,
    CustomerObject,
    DeletingCustomerResponse,
    ListResponse,
    RetrievingCustomerListPagination,
    UpdatingCustomerRequest,
    createError,
    formatErrorResponse
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"

class Customer {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
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
    public create(
        body: CreatingCustomerRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/customers",
                JSON.stringify(body),
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const customer = json as CustomerObject
                        resolve(customer)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
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
     * **Retrieve customer list**
     * 
     * corresponds to `GET /v1/customers`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public retrieveList(
        pagination?: RetrievingCustomerListPagination,
        header?: FincodePartialRequestHeader
    ): Promise<ListResponse<CustomerObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/customers",
                undefined,
                header,
                { pagination },
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<CustomerObject>
                        resolve(list)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
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
     * **Retrieve a customer**
     * 
     * corresponds to `GET /v1/customers/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${id}`,
                undefined,
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const customer = json as CustomerObject
                        resolve(customer)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
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
     * **Update a customer**
     * 
     * corresponds to `PUT /v1/customers/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public update(
        id: string,
        body: UpdatingCustomerRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/customers/${id}`,
                JSON.stringify(body),
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const customer = json as CustomerObject
                        resolve(customer)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
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
     * **Delete a customer**
     * 
     * corresponds to `DELETE /v1/customers/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public delete(
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<DeletingCustomerResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/customers/${id}`,
                undefined,
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const customer = json as DeletingCustomerResponse
                        resolve(customer)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
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
export { Customer }