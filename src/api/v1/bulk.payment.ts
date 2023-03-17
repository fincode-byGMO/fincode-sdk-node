import FormData from "form-data"
import {
    APIRawErrorResponse,
    DeletingPaymentBulkResponse,
    ListResponse,
    PaymentBulkDetailObject,
    PaymentBulkObject,
    RetrievingPaymentBulkDetailPagination,
    RetrievingPaymentBulkPagination,
    createFincodeRequestHeader,
    createUnknownError,
    formatErrorResponse
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, createFincodeRequestURL, FincodePartialRequestHeader } from "./http.js"

class PaymentBulk {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a payment bulk**
     * 
     * corresponds to `POST /v1/sessions`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {CreatingCardRegistrationSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<PaymentBulkObject>}
     */
    public create(
        payType: "Card",
        processPlanDate: string,
        file: Buffer | string,
        fileName: string,
        header?: FincodePartialRequestHeader
    ): Promise<PaymentBulkObject> {

        // multipart-form-data
        const formData = new FormData()
        const fileAppendOptions: FormData.AppendOptions = {
            filename: fileName,
            contentType: "application/json"
        }
        formData.append("file", file, fileAppendOptions)

        const fetch = createFincodeRequestFetch(
            this._config,
            "POST",
            "/v1/payments/bulk",
            formData,
            header,
            {
                pay_type: payType,
                process_plan_date: processPlanDate,
            },
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const bulk = json as PaymentBulkObject
                        resolve(bulk)
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
     * **Retrieve payment bulk list**
     * 
     * corresponds to `GET /v1/payments/bulk`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {RetrievingPaymentBulkPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<PaymentBulkObject>>}
     */
    public retrieveList(
        pagination?: RetrievingPaymentBulkPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<PaymentBulkObject>> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "GET",
            "/v1/payments/bulk",
            undefined,
            header,
            { pagination: pagination },
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const bulkList = json as ListResponse<PaymentBulkObject>
                        resolve(bulkList)
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
     * **Retrieve details of a payment bulk**
     * 
     * corresponds to `GET /v1/payments/bulk/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {RetrievingPaymentBulkDetailPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<PaymentBulkDetailObject>}
     */
    public retrieveDetail(
        id: string,
        pagination?: RetrievingPaymentBulkDetailPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<PaymentBulkDetailObject> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "GET",
            `/v1/payments/bulk/${id}`,
            undefined,
            header,
            { pagination: pagination },
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const bulkDetail = json as PaymentBulkDetailObject
                        resolve(bulkDetail)
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
     * **Delete a payment bulk**
     * 
     * corresponds to `DELETE /v1/payments/bulk/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<DeletingPaymentBulkResponse>}
     */
    public delete(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<DeletingPaymentBulkResponse> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "DELETE",
            `/v1/payments/bulk/${id}`,
            undefined,
            header,
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const deleteResult = json as DeletingPaymentBulkResponse
                        resolve(deleteResult)
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

export { PaymentBulk }