import {
    APIRawErrorResponse,
    CreatingCustomerRequest,
    CustomerObject,
    DeletingCustomerResponse,
    ListResponse,
    RetrievingCustomerListPagination,
    UpdatingCustomerRequest,
    createUnknownError,
    formatErrorResponse
} from "../types"
import { FincodeConfig } from "./fincode"
import { createFincodeRequest } from "./http"

class Customer {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a customer**
     * 
     * corresponding to `POST /v1/customers`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public create(
        body: CreatingCustomerRequest,
        header: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/customers`,
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
                        const payment = json as CustomerObject

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
     * **Retrieve customer list**
     * 
     * corresponding to `GET /v1/customers`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieveList(
        pagination?: RetrievingCustomerListPagination,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<ListResponse<CustomerObject>> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/customers`,
                undefined,
                header,
                { pagination: pagination }
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const payment = json as ListResponse<CustomerObject>

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
     * **Retrieve a customer**
     * 
     * corresponding to `GET /v1/customers/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieve(
        id: string,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/customers/${id}`,
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
                        const payment = json as CustomerObject

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
     * **Update a customer**
     * 
     * corresponding to `PUT /v1/customers/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public update(
        id: string,
        body: UpdatingCustomerRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/customers/${id}`,
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
                        const payment = json as CustomerObject

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
     * **Delete a customer**
     * 
     * corresponding to `DELETE /v1/customers/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public delete(
        id: string,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<DeletingCustomerResponse> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "DELETE",
                `/v1/customers/${id}`,
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
                        const payment = json as DeletingCustomerResponse

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