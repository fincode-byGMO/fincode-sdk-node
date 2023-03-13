import {
    APIRawErrorResponse,
    CardObject,
    DeletingCardResponse,
    ListResponse,
    RegisteringCardRequest,
    UpdatingCardRequest,
    createUnknownError,
    formatErrorResponse
} from "../types"
import { FincodeConfig } from "./fincode"
import { createFincodeRequest } from "./http"

class Card {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a card**
     * 
     * corresponding to `POST /v1/customers/:customer_id/cards`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public register(
        customerId: string,
        body: RegisteringCardRequest,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/customers/${customerId}/cards`,
                JSON.stringify(body),
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as CardObject

                        resolve(payment)
                    } else {
                        try {
                            const errRes = (JSON.parse(json) as APIRawErrorResponse)
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Retrieve card list of a customer**
     * 
     * corresponding to `GET /v1/customers/:customer_id/cards`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieveList(
        customerId: string,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<ListResponse<CardObject>> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards`,
                undefined,
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as ListResponse<CardObject>

                        resolve(payment)
                    } else {
                        try {
                            const errRes = (JSON.parse(json) as APIRawErrorResponse)
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Retrieve a card of customer**
     * 
     * corresponding to `GET /v1/customers/:customer_id/cards/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieve(
        customerId: string,
        id: string,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as CardObject

                        resolve(payment)
                    } else {
                        try {
                            const errRes = (JSON.parse(json) as APIRawErrorResponse)
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Update a card of customer**
     * 
     * corresponding to `PUT /v1/customers/:customer_id/cards/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public update(
        customerId: string,
        id: string,
        body: UpdatingCardRequest,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CardObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/customers/${customerId}/cards/${id}`,
                JSON.stringify(body),
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as CardObject

                        resolve(payment)
                    } else {
                        try {
                            const errRes = (JSON.parse(json) as APIRawErrorResponse)
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Delete a card of customer**
     * 
     * corresponding to `DELETE /v1/customers/:customer_id/cards/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public delete(
        customerId: string,
        id: string,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<DeletingCardResponse> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "DELETE",
                `/v1/customers/${customerId}/cards/${id}`,
                undefined,
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as DeletingCardResponse

                        resolve(payment)
                    } else {
                        try {
                            const errRes = (JSON.parse(json) as APIRawErrorResponse)
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }
}

export { Card }