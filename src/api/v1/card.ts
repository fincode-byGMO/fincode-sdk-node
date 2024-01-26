import {
    CardObject,
    DeletingCardResponse,
    ListResponse,
    CreatingCardRequest,
    UpdatingCardRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage, } from "./_errorMessages.js"

class Card {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig,) {
        this._config = config
    }

    /**
     * **Create a card**
     * 
     * corresponds to `POST /v1/customers/:customer_id/cards`
     * 
     * @param {string} customerId - customer id
     * @param {CreatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - created card object
     */
    public create(
        customerId: string,
        body: CreatingCardRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/customers/${customerId}/cards`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json as CardObject
                        resolve(card)
                    } else {
                        const errRes = json as APIErrorResponse
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(err)
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
     * **Retrieve card list of a customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards`
     * 
     * @param {string} customerId - customer id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<CardObject>>} - card object list
     */
    public retrieveList(
        customerId: string,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<CardObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<CardObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(err)
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
     * **Retrieve a card of customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - retrieved card object
     */
    public retrieve(
        customerId: string,
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json as CardObject
                        resolve(card)
                    } else {
                        const errRes = json as APIErrorResponse
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(err)
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
     * **Update a card of customer**
     * 
     * corresponds to `PUT /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {UpdatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - updated card object
     */
    public update(
        customerId: string,
        id: string,
        body: UpdatingCardRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/customers/${customerId}/cards/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json as CardObject
                        resolve(card)
                    } else {
                        const errRes = json as APIErrorResponse
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(err)
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
     * **Delete a card of customer**
     * 
     * corresponds to `DELETE /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<DeletingCardResponse>} - deleting result
     */
    public delete(
        customerId: string,
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<DeletingCardResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const card = json as DeletingCardResponse
                        resolve(card)
                    } else {
                        const errRes = json as APIErrorResponse
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(err)
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
}

export { Card }