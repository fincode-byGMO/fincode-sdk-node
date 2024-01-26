import { CreatingCustomerRequest, CustomerObject, DeletingCustomerResponse, ListResponse, UpdatingCustomerRequest, RetrievingCustomerListQueryParams } from "../../types/index.js";
import { FincodeConfig } from "./fincode.js";
import { FincodeRequestHeaders } from "./http.js";
declare class Customer {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    create(body: CreatingCustomerRequest, headers?: FincodeRequestHeaders): Promise<CustomerObject>;
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
    retrieveList(queryParams?: RetrievingCustomerListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<CustomerObject>>;
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
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<CustomerObject>;
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
    update(id: string, body: UpdatingCustomerRequest, headers?: FincodeRequestHeaders): Promise<CustomerObject>;
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
    delete(id: string, headers?: FincodeRequestHeaders): Promise<DeletingCustomerResponse>;
}
export { Customer };
