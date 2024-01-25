import { ListResponse, AccountObject, AccountDetailObject, RetrievingAccountListQueryParams } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class Account {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Retrieve account list **
     *
     * corresponds to `POST /v1/accounts`
     *
     * @param {RetrievingAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<AccountObject>>} - account object list
    */
    retrieveList(queryParams?: RetrievingAccountListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<AccountObject>>;
    /**
     * **Retrieve a account**
     *
     * corresponds to `GET /v1/accounts/:id`
     *
     * @param {string} id - account ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<AccountObject>} - account object
     */
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<AccountObject>;
    /**
     * **Retrieve a account detail*
     *
     * corresponds to `GET /v1/accounts/:id/detail`
     *
     * @param {string} id - account ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<AccountObject>} - account object
     */
    retrieveDetailList(id: string, headers?: FincodeRequestHeaders): Promise<ListResponse<AccountDetailObject>>;
}
export { Account };
