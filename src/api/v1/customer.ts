import {
    CreatingCustomerRequest,
    CustomerObject,
    DeletingCustomerResponse,
    ListResponse,
    UpdatingCustomerRequest,
    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    RetrievingCustomerListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class Customer {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a customer**
     * 
     * corresponds to `POST /v1/customers`
     * 
     * @param {CreatingCustomerRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CustomerObject>} - created customer object
     */
    public create(
        body: CreatingCustomerRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/customers",
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json as CustomerObject
                        resolve(customer)
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
     * **Retrieve customer list**
     * 
     * corresponds to `GET /v1/customers`
     * 
     * @param {RetrievingCustomerListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<CustomerObject>>} - retrieved customer object list
     */
    public retrieveList(
        queryParams?: RetrievingCustomerListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<CustomerObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/customers",
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<CustomerObject>
                        resolve(list)
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
     * **Retrieve a customer**
     * 
     * corresponds to `GET /v1/customers/:id`
     * 
     * @param {string} id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CustomerObject>} - retrieved customer object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/customers/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json as CustomerObject
                        resolve(customer)
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
     * **Update a customer**
     * 
     * corresponds to `PUT /v1/customers/:id`
     * 
     * @param {string} id
     * @param {UpdatingCustomerRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CustomerObject>} - updated customer object
    */
    public update(
        id: string,
        body: UpdatingCustomerRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CustomerObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/customers/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json as CustomerObject
                        resolve(customer)
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
     * **Delete a customer**
     * 
     * corresponds to `DELETE /v1/customers/:id`
     * 
     * @param {string} id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<DeletingCustomerResponse>} - deleting result
     */
    public delete(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<DeletingCustomerResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/customers/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const customer = json as DeletingCustomerResponse
                        resolve(customer)
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
export { Customer }