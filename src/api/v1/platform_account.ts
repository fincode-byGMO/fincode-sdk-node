import {
    ListResponse,
    PlatformAccountObject,
    PlatformAccountListItemObject,
    PlatformAccountSummaryObject,
    RetrievingPlatformAccountListQueryParams,
    RetrievingPlatformAccountSummaryListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class PlatformAccount {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Retrieve platform-account list **
     * 
     * corresponds to `GET /v1/platform_accounts`
     * 
     * @param {RetrievingPlatformAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<PlatformAccountListItemObject>>} - platform-account object list
     * 
    */
    public retrieveList(
        queryParams?: RetrievingPlatformAccountListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<PlatformAccountListItemObject>> {
        return executeRequest<ListResponse<PlatformAccountListItemObject>>(this._config, "GET", "/v1/platform_accounts", {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve a platform-account**
     * 
     * corresponds to `GET /v1/platform_accounts/:id`
     * 
     * @param {string} id - platform-account id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PlatformAccountObject>} - platform-account object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<PlatformAccountObject> {
        return executeRequest<PlatformAccountObject>(this._config, "GET", `/v1/platform_accounts/${id}`, {
            headers,
        })
    }

    /**
     * **Retrieve a platform-account summary*
     * 
     * corresponds to `GET /v1/platform_accounts/:id/summary`
     * 
     * @param {string} id - platform-account id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @param {RetrievingPlatformAccountSummaryListQueryParams} [queryParams] - query parameters
     * @returns {Promise<ListResponse<PlatformAccountSummaryObject>>} - platform-account summary object list
     */

    public retrieveSummaryList(
        id: string,
        queryParams?: RetrievingPlatformAccountSummaryListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<PlatformAccountSummaryObject>> {
        return executeRequest<ListResponse<PlatformAccountSummaryObject>>(this._config, "GET", `/v1/platform_accounts/${id}/summary`, {
            headers,
            queryParams,
        })
    }
}
export { PlatformAccount }
