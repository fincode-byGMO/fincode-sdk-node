import { ListResponse, PlatformAccountObject, PlatformAccountSummaryObject, RetrievingPlatformAccountListQueryParams } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class PlatformAccount {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Retrieve platform-account list **
     *
     * corresponds to `POST /v1/platform_accounts`
     *
     * @param {RetrievingPlatformAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PlatformAccountObject>>} - platform-account object list
     *
    */
    retrieveList(queryParams?: RetrievingPlatformAccountListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<PlatformAccountObject>>;
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
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<PlatformAccountObject>;
    /**
     * **Retrieve a platform-account summary*
     *
     * corresponds to `GET /v1/platform_accounts/:id/summary`
     *
     * @param {string} id - platform-account id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlatformAccountObject>} - platform-account object
     */
    retrieveSummaryList(id: string, headers?: FincodeRequestHeaders): Promise<ListResponse<PlatformAccountSummaryObject>>;
}
export { PlatformAccount };
