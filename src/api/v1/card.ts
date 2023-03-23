import {
    APIRawErrorResponse,
    CardObject,
    DeletingCardResponse,
    ListResponse,
    RegisteringCardRequest,
    UpdatingCardRequest,
    createError,
    formatErrorResponse
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"

class Card {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a card**
     * 
     * corresponds to `POST /v1/customers/:customer_id/cards`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    public register(
        customerId: string,
        body: RegisteringCardRequest,
        header?: FincodePartialRequestHeader
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/customers/${customerId}/cards`,
                JSON.stringify(body),
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const card = json as CardObject
                        resolve(card)
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<CardObject>
                        resolve(list)
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const card = json as CardObject
                        resolve(card)
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const card = json as CardObject
                        resolve(card)
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const card = json as DeletingCardResponse
                        resolve(card)
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

export { Card }