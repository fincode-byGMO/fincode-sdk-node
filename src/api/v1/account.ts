import {
    ListResponse,
    AccountObject,
    AccountListItemObject,
    AccountDetailObject,
    RetrievingAccountListQueryParams,
    RetrievingAccountDetailListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Account {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Retrieve account list **
     * 
     * corresponds to `GET /v1/accounts`
     * 
     * @param {RetrievingAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<AccountListItemObject>>} - account object list
    */
    public retrieveList(
        queryParams?: RetrievingAccountListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<AccountListItemObject>> {
        return executeRequest<ListResponse<AccountListItemObject>>(this._config, "GET", "/v1/accounts", {
            headers,
            queryParams,
        })
    }

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
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<AccountObject> {
        return executeRequest<AccountObject>(this._config, "GET", `/v1/accounts/${id}`, {
            headers,
        })
    }

    /**
     * **Retrieve a account detail*
     * 
     * corresponds to `GET /v1/accounts/:id/detail`
     * 
     * @param {string} id - account ID
     * @param {RetrievingAccountDetailListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<ListResponse<AccountDetailObject>>} - account detail object list
     */

    public retrieveDetailList(
        id: string,
        queryParams?: RetrievingAccountDetailListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<AccountDetailObject>> {
        return executeRequest<ListResponse<AccountDetailObject>>(this._config, "GET", `/v1/accounts/${id}/detail`, {
            headers,
            queryParams,
        })
    }
}
export { Account }
