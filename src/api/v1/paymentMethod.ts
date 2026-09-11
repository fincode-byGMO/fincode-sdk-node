import {
    CreatingPaymentMethodRequest,
    RetrievingPaymentMethodListQueryParams,
    PaymentMethodObject,
    ListResponse,
    DeletingPaymentMethodQueryParams,
    UpdatingPaymentMethodRequest,
    SwitchingPaymentMethodStateRequest,
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
     * **Update a payment method**
     * 
     * corresponds to `PUT /v1/customers/{customerId}/payment_methods/{id}`
     * 
     * The card number itself cannot be changed. Accepts `Card` and
     * `Virtualaccount` payment methods.
     * 
     * @param {string} customerId - customer id
     * @param {string} id - payment method id
     * @param {UpdatingPaymentMethodRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentMethodObject>} - updated payment method object
     */
    public update(
        customerId: string,
        id: string,
        body: UpdatingPaymentMethodRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "PUT", `/v1/customers/${customerId}/payment_methods/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Inactivate a payment method**
     * 
     * corresponds to `PUT /v1/customers/{customerId}/payment_methods/{id}/inactivate`
     * 
     * An inactivated payment method cannot be used for payments until it is
     * reactivated. Accepts `Virtualaccount` payment methods.
     * 
     * @param {string} customerId - customer id
     * @param {string} id - payment method id
     * @param {SwitchingPaymentMethodStateRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentMethodObject>} - inactivated payment method object
     */
    public inactivate(
        customerId: string,
        id: string,
        body: SwitchingPaymentMethodStateRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "PUT", `/v1/customers/${customerId}/payment_methods/${id}/inactivate`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Reactivate a payment method**
     * 
     * corresponds to `PUT /v1/customers/{customerId}/payment_methods/{id}/reactivate`
     * 
     * Puts an inactivated payment method back into use. Accepts
     * `Virtualaccount` payment methods.
     * 
     * @param {string} customerId - customer id
     * @param {string} id - payment method id
     * @param {SwitchingPaymentMethodStateRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentMethodObject>} - reactivated payment method object
     */
    public reactivate(
        customerId: string,
        id: string,
        body: SwitchingPaymentMethodStateRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "PUT", `/v1/customers/${customerId}/payment_methods/${id}/reactivate`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Delete a payment method**
     * 
     * corresponds to `DELETE /v1/customers/{customerId}/payment_methods/{id}`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - payment method id
     * @param {DeletingPaymentMethodQueryParams} queryParams - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *  
     * @returns {Promise<PaymentMethodObject>} - deleted payment method object
     */
    public delete(
        customerId: string,
        id: string,
        queryParams: DeletingPaymentMethodQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<PaymentMethodObject> {
        return executeRequest<PaymentMethodObject>(this._config, "DELETE", `/v1/customers/${customerId}/payment_methods/${id}`, {
            headers,
            queryParams,
        })
    }

}

export { PaymentMethod }
