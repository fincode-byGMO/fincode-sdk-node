import {
    APIRawErrorResponse,
    RegisteringSubscriptionRequest,
    CancelingSubscriptionResponse,
    ListResponse,
    SubscriptionObject,
    RetrievingSubscriptionListPagination,
    UpdatingSubscriptionRequest,
    createUnknownError,
    formatErrorResponse,
    SubscriptionResultObject,
    RetrievingSubscriptionResultListPagination
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http.js"

class Subscription {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a subscription**
     * 
     * corresponds to `POST /v1/subscriptions`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {RegisteringPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<SubscriptionObject>}
     */
    public register(
        body: RegisteringSubscriptionRequest,
        header?: FincodePartialRequestHeader
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/subscriptions",
                JSON.stringify(body),
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const payment = json as SubscriptionObject
                        resolve(payment)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

    /**
     * **Retrieve subscription list**
     * 
     * corresponds to `GET /v1/subscriptions`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<SubscriptionObject>>}
     */
    public retrieveList(
        pagination?: RetrievingSubscriptionListPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<SubscriptionObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/subscriptions",
                undefined,
                header,
                { pagination: pagination },
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<SubscriptionObject>
                        resolve(list)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

    /**
     * **Retrieve a subscription**
     * 
     * corresponds to `GET /v1/subscriptions/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<SubscriptionObject>}
     */
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/subscriptions/${id}`,
                undefined,
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const subscription = json as SubscriptionObject
                        resolve(subscription)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

    /**
     * **Update a subscription**
     * 
     * corresponds to `PUT /v1/subscriptions/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {UpdatingSubscriptionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<SubscriptionObject>}
     */
    public update(
        id: string,
        body: UpdatingSubscriptionRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/subscriptions/${id}`,
                JSON.stringify(body),
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const subscription = json as SubscriptionObject
                        resolve(subscription)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

    /**
     * **Cancel a subscription**
     * 
     * corresponds to `DELETE /v1/subscriptions/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<DeletingSubscriptionResponse>}
     */
    public cancel(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<CancelingSubscriptionResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/subscriptions/${id}`,
                undefined,
                header,
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const resp = json as CancelingSubscriptionResponse
                        resolve(resp)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

    /**
     * **Retrieve subscription result list**
     * 
     * corresponds to `GET /v1/subscriptions/:id/result`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {RetrievingSubscriptionResultListPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<SubscriptionResultObject>>}
     */
    public retrieveResultList(
        id: string,
        pagination?: RetrievingSubscriptionResultListPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<SubscriptionResultObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/subscriptions/${id}/result`,
                undefined,
                header,
                { pagination: pagination },
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<SubscriptionResultObject>
                        resolve(list)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }
}

export { Subscription }