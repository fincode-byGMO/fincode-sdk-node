import {
    CreatingCustomerRequest,
    CustomerObject,
    DeletingCustomerResponse,
    ListResponse,
    UpdatingCustomerRequest,
    RetrievingCustomerListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

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
        return executeRequest<CustomerObject>(this._config, "POST", "/v1/customers", {
            body: JSON.stringify(body),
            headers,
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
        return executeRequest<ListResponse<CustomerObject>>(this._config, "GET", "/v1/customers", {
            headers,
            queryParams,
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
        return executeRequest<CustomerObject>(this._config, "GET", `/v1/customers/${id}`, {
            headers,
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
        return executeRequest<CustomerObject>(this._config, "PUT", `/v1/customers/${id}`, {
            body: JSON.stringify(body),
            headers,
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
        return executeRequest<DeletingCustomerResponse>(this._config, "DELETE", `/v1/customers/${id}`, {
            headers,
        })
    }
}
export { Customer }
