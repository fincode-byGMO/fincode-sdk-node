import {
    CreatingPaymentMethodRequest,
    RetrievingPaymentMethodListQueryParams,
    PaymentMethodObject,
    ListResponse,
    DeletingPaymentMethodResponse,
    RetrievingPaymentMethodQueryParams,
} from "../../types"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class PaymentMethod {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a payment method**
     * 
     * corresponds to `POST /v1/customers/{customer_id}/payment_methods`
     * 
     * @param {string} customerId - customer id
     * @param {CreatingPaymentMethodRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentMethodObject>} - created payment method object
     */
    public create(
        customerId: string,
        body: CreatingPaymentMethodRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "POST", `/v1/customers/${customerId}/payment_methods`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve payment method list**
     * 
     * corresponds to `GET /v1/customers/{customerId}/payment_methods`
     * 
     * @param {string} customerId - customer id
     * @param {RetrievingPaymentMethodListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<PaymentMethodObject>>}
     */
    public retrieveList(
        customerId: string,
        queryParams: RetrievingPaymentMethodListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<PaymentMethodObject>> {
        return executeRequest<ListResponse<PaymentMethodObject>>(this._config, "GET", `/v1/customers/${customerId}/payment_methods`, {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve a payment method**
     * 
     * corresponds to `GET /v1/customers/{customerId}/payment_methods/{id}`
     *
     * @param {string} customerId - customer id
     * @param {string} id - payment method id 
     * @param {RetrievingPaymentMethodQueryParams} queryParams - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentMethodObject>} - retrieved payment method object
     */
    public retrieve(
        customerId: string,
        id: string,
        queryParams: RetrievingPaymentMethodQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "GET", `/v1/customers/${customerId}/payment_methods/${id}`, {
            headers,
            queryParams,
        })
    }

    /**
     * **Delete a payment method**
     * 
     * corresponds to `DELETE /v1/customers/{customerId}/payment_methods/{id}`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - payment method id
     * @param {FincodeRequestHeaders} [headers] - request header
     *  
     * @returns {Promise<DeletingPaymentMethodResponse>} - deleting result
     */
    public delete(
        customerId: string,
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<DeletingPaymentMethodResponse> {
        return executeRequest<DeletingPaymentMethodResponse>(this._config, "DELETE", `/v1/customers/${customerId}/payment_methods/${id}`, {
            headers,
        })
    }

}

export { PaymentMethod }
