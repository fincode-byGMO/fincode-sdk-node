import { FormData } from "undici"
import { Modify } from "../../utils/utilTypes"
import {
    DeletingPaymentBulkResponse,
    PaymentBulkPayType,
    VirtualAccountPaymentBulkDetailObject,
    ListResponse,
    ListWithErrors,
    PaymentBulkDetailObject,
    PaymentBulkObject,
    RetrievingPaymentBulkDetailQueryParams,
    RetrievingPaymentBulkQueryParams,
    CreatingPaymentBulkRequest,
    CreatingPaymentBulkQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"
import { generateUUIDv4 } from "./../../utils/random"

class PaymentBulk {

    private readonly _config: FincodeConfig
    constructor(config: FincodeConfig,) {
        this._config = config
    }

    /**
     * **Register a payment bulk**
     * 
     * corresponds to `POST /v1/payments/bulk`
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
            new Blob([body.file], { type: "application/json" }),
            body.fileName || `${generateUUIDv4()}.json`,
        )

        return executeRequest<PaymentBulkObject>(this._config, "POST", "/v1/payments/bulk", {
            body: formData,
            headers,
            queryParams: {
                pay_type: queryParams.pay_type,
                process_plan_date: queryParams.process_plan_date,
            },
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

        return executeRequest<ListResponse<PaymentBulkObject>>(this._config, "GET", "/v1/payments/bulk", {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve details of a payment bulk**
     * 
     * corresponds to `GET /v1/payments/bulk/:id`
     * 
     * The shape of each detail follows `queryParams.pay_type`. A card bulk
     * payment answers with {@link PaymentBulkDetailObject} and a virtual
     * account one with {@link VirtualAccountPaymentBulkDetailObject}. Neither
     * carries `pay_type`, so the query is what tells the two apart.
     * 
     * Passing a `pay_type` that is not a literal, such as the one read off a
     * bulk payment in a list, answers with both shapes as a union.
     * 
     * @param {string} id - payment bulk id
     * @param {RetrievingPaymentBulkDetailQueryParams} queryParams - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListWithErrors<PaymentBulkDetailObject>>} - retrieved payment bulk detail object list
     */
    public retrieveDetailList(
        id: string,
        queryParams: Modify<RetrievingPaymentBulkDetailQueryParams, { pay_type: Extract<PaymentBulkPayType, "Card"> }>,
        headers?: FincodeRequestHeaders,
    ): Promise<ListWithErrors<PaymentBulkDetailObject>>
    public retrieveDetailList(
        id: string,
        queryParams: Modify<RetrievingPaymentBulkDetailQueryParams, { pay_type: Extract<PaymentBulkPayType, "Virtualaccount"> }>,
        headers?: FincodeRequestHeaders,
    ): Promise<ListWithErrors<VirtualAccountPaymentBulkDetailObject>>
    public retrieveDetailList(
        id: string,
        queryParams: RetrievingPaymentBulkDetailQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListWithErrors<PaymentBulkDetailObject | VirtualAccountPaymentBulkDetailObject>>
    public retrieveDetailList(
        id: string,
        queryParams: RetrievingPaymentBulkDetailQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListWithErrors<PaymentBulkDetailObject | VirtualAccountPaymentBulkDetailObject>> {

        return executeRequest<ListWithErrors<PaymentBulkDetailObject | VirtualAccountPaymentBulkDetailObject>>(this._config, "GET", `/v1/payments/bulk/${id}`, {
            headers,
            queryParams,
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

        return executeRequest<DeletingPaymentBulkResponse>(this._config, "DELETE", `/v1/payments/bulk/${id}`, {
            headers,
        })
    }
}

export { PaymentBulk }
