import {
    CreatingPaymentMethodRequest,
    RetrievingPaymentMethodListQueryParams,
    PaymentMethodObject,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    ListResponse,
    DeletingPaymentMethodResponse,
    RetrievingPaymentMethodQueryParams,
} from "../../types"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/customers/${customerId}/payment_methods`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const paymentMethod = json as PaymentMethodObject
                        resolve(paymentMethod)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/payment_methods`,
                undefined,
                headers,
                queryParams
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<PaymentMethodObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${customerId}/payment_methods/${id}`,
                undefined,
                headers,
                queryParams
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const paymentMethod = json as PaymentMethodObject
                        resolve(paymentMethod)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/customers/${customerId}/payment_methods/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const data = json as DeletingPaymentMethodResponse
                        resolve(data)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

}

export { PaymentMethod }
