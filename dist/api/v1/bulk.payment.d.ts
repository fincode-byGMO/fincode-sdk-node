import { DeletingPaymentBulkResponse, ListResponse, ListWithErrors, PaymentBulkDetailObject, PaymentBulkObject, RetrievingPaymentBulkDetailQueryParams, RetrievingPaymentBulkQueryParams, CreatingPaymentBulkRequest, CreatingPaymentBulkQueryParams } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class PaymentBulk {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    create(queryParams: CreatingPaymentBulkQueryParams, body: CreatingPaymentBulkRequest, headers?: FincodeRequestHeaders): Promise<PaymentBulkObject>;
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
    retrieveList(queryParams?: RetrievingPaymentBulkQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<PaymentBulkObject>>;
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
    retrieveDetailList(id: string, queryParams: RetrievingPaymentBulkDetailQueryParams, headers?: FincodeRequestHeaders): Promise<ListWithErrors<PaymentBulkDetailObject>>;
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
    delete(id: string, headers?: FincodeRequestHeaders): Promise<DeletingPaymentBulkResponse>;
}
export { PaymentBulk };
