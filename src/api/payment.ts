import {
    APIRawErrorResponse,
    CancelingPaymentRequest,
    CapturingPaymentRequest,
    ChangingPaymentAmountRequest,
    Executing3DSecureAuthRequest,
    Executing3DSecureAuthResponse,
    ExecutingPaymentAfter3DSecureRequest,
    ExecutingPaymentRequest,
    ListResponse,
    PaymentObject,
    ReauthorizingPaymentRequest,
    RegisteringPaymentRequest,
    Retrieving3DSecureAuthResponse,
    RetrievingBarcodeInfoRequest,
    RetrievingPaymentListPagination,
    createUnknownError,
    formatErrorResponse,
} from "../types"
import { FincodeConfig } from "./fincode"
import { createFincodeRequest } from "./http"

class Payment {
    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a payment**
     * 
     * corresponding to `POST /v1/payments`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public register(
        body: RegisteringPaymentRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/payments`,
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
                        const payment = json as PaymentObject

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
     * **Retrieve payment list**
     * 
     * corresponding to `GET /v1/payments`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieveList(
        pagination?: RetrievingPaymentListPagination,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<ListResponse<PaymentObject>> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/payments`,
                undefined,
                header,
                {
                    pagination: pagination,
                },
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const list = json as ListResponse<PaymentObject>

                        resolve(list)
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
     * **Retrieve a payment**
     * 
     * corresponding to `GET /v1/payments/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieve(
        id: string,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/payments/${id}`,
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
                        const payment = json as PaymentObject

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
     * **Execute a Payment**
     * 
     * corresponding to `PUT /v1/payments/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public execute(
        id: string,
        body: ExecutingPaymentRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}`,
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
                        const payment = json as PaymentObject

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
     * **Capture a Payment**
     * 
     * corresponding to `PUT /v1/payments/:id/capture`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public capture(
        id: string,
        body: CapturingPaymentRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}/capture`,
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
                        const payment = json as PaymentObject

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
     * **Cancel a Payment**
     * 
     * corresponding to `PUT /v1/payments/:id/cancel`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public cancel(
        id: string,
        body: CancelingPaymentRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}/cancel`,
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
                        const payment = json as PaymentObject

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
     * **Reauthorize a Payment**
     * 
     * corresponding to `PUT /v1/payments/:id/auth`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public reauthorize(
        id: string,
        body: ReauthorizingPaymentRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}/auth`,
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
                        const payment = json as PaymentObject

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
     * **Change amount of a Payment**
     * 
     * corresponding to `PUT /v1/payments/:id/change`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public changeAmount(
        id: string,
        body: ChangingPaymentAmountRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}/change`,
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
                        const payment = json as PaymentObject

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
     * **Execute a Payment after 3D Secure Authentication**
     * 
     * corresponding to `PUT /v1/payments/:id/secure`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public executeAfter3DSecure(
        id: string,
        body: ExecutingPaymentAfter3DSecureRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/payments/${id}/secure`,
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
                        const payment = json as PaymentObject

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
     * **Execute 3D Secure Authentication**
     * 
     * corresponding to `PUT /v1/secure/:access_id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public auth3DSecure(
        accessId: string,
        body: Executing3DSecureAuthRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<Executing3DSecureAuthResponse> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/secure/${accessId}`,
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
                        const res = json as Executing3DSecureAuthResponse

                        resolve(res)
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
     * **Retrieve 3D Secure Authentication Result**
     * 
     * corresponding to `GET /v1/secure/:access_id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieve3DSecureAuthResult(
        accessId: string,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<Retrieving3DSecureAuthResponse> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/secure/${accessId}`,
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
                        const res = json as Retrieving3DSecureAuthResponse

                        resolve(res)
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
     * **Generate barcode of Konbini payment**
     * 
     * corresponding to `PUT /v1/payments/:id/barcode`
     * 
     * if rejected, the error is a instance of `FincodeError` 
     */
    public generateKonbiniBarcode(
        id: string,
        body: RetrievingBarcodeInfoRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/payments/${id}/barcode`,
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
                        const payment = json as PaymentObject

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

export { Payment }
