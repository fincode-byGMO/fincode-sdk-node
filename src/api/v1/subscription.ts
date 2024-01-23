import {
    CreatingSubscriptionRequest,
    CancelingSubscriptionResponse,
    ListResponse,
    SubscriptionObject,
    UpdatingSubscriptionRequest,
    SubscriptionResultObject,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    RetrievingSubscriptionListQueryParams,
    RetrievingSubscriptionQueryParams,
    CancelingSubscriptionQueryParams,
    RetrievingSubscriptionResultListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

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
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - created subscription object
     */
    public create(
        body: CreatingSubscriptionRequest,
        headers?: FincodeRequestHeaders
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/subscriptions",
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json as SubscriptionObject
                        resolve(subscription)
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
     * **Retrieve subscription list**
     * 
     * corresponds to `GET /v1/subscriptions`
     * 
     * @param {RetrievingSubscriptionListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<SubscriptionObject>>} - subscription object list
     */
    public retrieveList(
        queryParams: RetrievingSubscriptionListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<SubscriptionObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/subscriptions",
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<SubscriptionObject>
                        resolve(list)
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
     * **Retrieve a subscription**
     * 
     * corresponds to `GET /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - subscription object
     */
    public retrieve(
        id: string,
        queryParams: RetrievingSubscriptionQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/subscriptions/${id}`,
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json as SubscriptionObject
                        resolve(subscription)
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
     * **Update a subscription**
     * 
     * corresponds to `PUT /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {UpdatingSubscriptionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - updated subscription object
     */
    public update(
        id: string,
        body: UpdatingSubscriptionRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<SubscriptionObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/subscriptions/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json as SubscriptionObject
                        resolve(subscription)
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
     * **Cancel a subscription**
     * 
     * corresponds to `DELETE /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {CancelingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CancelingSubscriptionResponse>} - canceled subscription object
     */
    public cancel(
        id: string,
        queryParams: CancelingSubscriptionQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<CancelingSubscriptionResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/subscriptions/${id}`,
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const subscription = json as CancelingSubscriptionResponse
                        resolve(subscription)
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
     * **Retrieve subscription result list**
     * 
     * corresponds to `GET /v1/subscriptions/:id/result`
     * 
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionResultListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<SubscriptionResultObject>>} - subscription result object list
     */
    public retrieveResultList(
        id: string,
        queryParams?: RetrievingSubscriptionResultListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<SubscriptionResultObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/subscriptions/${id}/result`,
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<SubscriptionResultObject>
                        resolve(list)
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

export { Subscription }