import { RequestInit } from "node-fetch"
import {
    CardObject,
    DeletingCardResponse,
    ListResponse,
    CreatingCardRequest,
    UpdatingCardRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage, } from "./_errorMessages"

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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public create(
        customerId: string,
        body: CreatingCardRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/customers/${customerId}/cards`,
                JSON.stringify(body),
                header,
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
     * **Retrieve card list of a customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public retrieveList(
        customerId: string,
        header?: FincodePartialRequestHeader
    ): Promise<ListResponse<CardObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards`,
                undefined,
                header,
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
     * **Retrieve a card of customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public retrieve(
        customerId: string,
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                header,
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
     * **Update a card of customer**
     * 
     * corresponds to `PUT /v1/customers/:customer_id/cards/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public update(
        customerId: string,
        id: string,
        body: UpdatingCardRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/customers/${customerId}/cards/${id}`,
                JSON.stringify(body),
                header,
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
     * **Delete a card of customer**
     * 
     * corresponds to `DELETE /v1/customers/:customer_id/cards/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public delete(
        customerId: string,
        id: string,
        header?: FincodePartialRequestHeader
    ): Promise<DeletingCardResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                header,
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

export { Card }