import FormData from "form-data"
import {
    DeletingPaymentBulkResponse,
    ListResponse,
    ListWithErrors,
    PaymentBulkDetailObject,
    PaymentBulkObject,
    RetrievingPaymentBulkDetailQueryParams,
    RetrievingPaymentBulkQueryParams,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    CreatingPaymentBulkRequest,
    CreatingPaymentBulkQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"
import { generateUUIDv4 } from "./../../utils/random"

class PaymentBulk {

    private readonly _config: FincodeConfig
    constructor(config: FincodeConfig,) {
        this._config = config
    }

    /**
     * **Register a payment bulk**
     * 
     * corresponds to `POST /v1/sessions`
     * 
     * @param {CreatingPaymentBulkQueryParams} queryParams - request query parameters
     * @param {CreatingPaymentBulkRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentBulkObject>} - created payment bulk object
     */
    public create(
        queryParams: CreatingPaymentBulkQueryParams,
        body: CreatingPaymentBulkRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentBulkObject> {

        // multipart-form-data
        const formData = new FormData()
        formData.append(
            "file",
            body.file,
            {
                filename: body.fileName || `${generateUUIDv4()}.json`,
                contentType: "application/json"
            }
        )

        const fetch = createFincodeRequestFetch(
            this._config,
            "POST",
            "/v1/payments/bulk",
            formData,
            {
                ...headers,
                contentType: `multipart/form-data; boundary=${formData.getBoundary()}`
            },
            {
                pay_type: queryParams.pay_type,
                process_plan_date: queryParams.process_plan_date,
            },
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
     * @param {RetrievingPaymentBulkQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<PaymentBulkObject>>} - retrieved payment bulk object list
     */
    public retrieveList(
        queryParams?: RetrievingPaymentBulkQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<PaymentBulkObject>> {
        const fetch = createFincodeRequestFetch(
            this._config,
            "GET",
            "/v1/payments/bulk",
            undefined,
            headers,
            queryParams,
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
     * @param {string} id - payment bulk id
     * @param {RetrievingPaymentBulkDetailQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentBulkDetailObject>} - retrieved payment bulk detail object
     */
    public retrieveDetailList(
        id: string,
        queryParams: RetrievingPaymentBulkDetailQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListWithErrors<PaymentBulkDetailObject>> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "GET",
            `/v1/payments/bulk/${id}`,
            undefined,
            headers,
            queryParams,
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
     * @param {string} id - payment bulk id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<DeletingPaymentBulkResponse>} - deleting result
     */
    public delete(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<DeletingPaymentBulkResponse> {

        const fetch = createFincodeRequestFetch(
            this._config,
            "DELETE",
            `/v1/payments/bulk/${id}`,
            undefined,
            headers,
            undefined,
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