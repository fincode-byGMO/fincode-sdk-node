import { CreatingCustomerRequest, CustomerObject, DeletingCustomerResponse, ListResponse, RetrievingCustomerListPagination, UpdatingCustomerRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Customer {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Create a customer**
     *
     * corresponds to `POST /v1/customers`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingCustomerRequest} body - request body
     * @param {FincodePartialRequestHeader} [header] - request header
     *
     * @returns {Promise<CustomerObject>} - created customer
     */
    create(body: CreatingCustomerRequest, header?: FincodePartialRequestHeader): Promise<CustomerObject>;
    /**
     * **Retrieve customer list**
     *
     * corresponds to `GET /v1/customers`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieveList(pagination?: RetrievingCustomerListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<CustomerObject>>;
    /**
     * **Retrieve a customer**
     *
     * corresponds to `GET /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<CustomerObject>;
    /**
     * **Update a customer**
     *
     * corresponds to `PUT /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    update(id: string, body: UpdatingCustomerRequest, header?: FincodePartialRequestHeader): Promise<CustomerObject>;
    /**
     * **Delete a customer**
     *
     * corresponds to `DELETE /v1/customers/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    delete(id: string, header?: FincodePartialRequestHeader): Promise<DeletingCustomerResponse>;
}
export { Customer };
