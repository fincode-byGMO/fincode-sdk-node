import FormData from "form-data"
import {
    DeletingPaymentBulkResponse,
    ListResponse,
    ListWithErrors,
    PaymentBulkDetailObject,
    PaymentBulkObject,
    RetrievingPaymentBulkDetailPagination,
    RetrievingPaymentBulkPagination,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { RequestInit } from "node-fetch"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class PaymentBulk {

    private readonly _config: FincodeConfig
    private readonly _agent: RequestInit["agent"]

    constructor(config: FincodeConfig, agent?: RequestInit["agent"]) {
        this._config = config
        this._agent = agent
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
    public register(
        payType: "Card",
        processPlanDate: string,
        file: Buffer | string,
        fileName: string,
        header?: FincodePartialRequestHeader
    ): Promise<PaymentBulkObject> {

        // multipart-form-data
        const formData = new FormData()
        formData.append(
            "file",
            file,
            {
                filename: fileName,
                contentType: "application/json"
            }
        )

        const fetch = createFincodeRequestFetch(
            this._config,
            "POST",
            "/v1/payments/bulk",
            formData,
            {
                ...header,
                contentType: `multipart/form-data; boundary=${formData.getBoundary()}`
            },
            {
                keyValues: {
                    pay_type: payType,
                    process_plan_date: processPlanDate,
                }
            },
            this._agent,
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulk = json as PaymentBulkObject
                        resolve(bulk)
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
            this._agent,
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkList = json as ListResponse<PaymentBulkObject>
                        resolve(bulkList)
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
    public retrieveDetailList(
        id: string,
        pagination: RetrievingPaymentBulkDetailPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListWithErrors<PaymentBulkDetailObject>> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "GET",
            `/v1/payments/bulk/${id}`,
            undefined,
            header,
            { pagination: pagination },
            this._agent,
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkDetailList = json as ListWithErrors<PaymentBulkDetailObject>
                        resolve(bulkDetailList)
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
            undefined,
            this._agent
        )

        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const deleteResult = json as DeletingPaymentBulkResponse
                        resolve(deleteResult)
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

export { PaymentBulk }