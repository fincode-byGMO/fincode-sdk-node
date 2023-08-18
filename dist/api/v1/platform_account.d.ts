import { PlatformAccountSearchParams } from "./../../types/searchParams";
import { ListResponse, PlatformAccountObject, PlatformAccountSummaryObject, RetrievingPlatformAccountListPagination } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class PlatformAccount {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Retrieve platform-account list **
     *
     * corresponds to `POST /v1/platform_accounts`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingPlatformAccountListPagination} [paginaiton]
     * @param {PlatformAccountSearchParams} [searchParams]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PlatformAccountObject>>}
     *
    */
    retrieveList(paginaiton?: RetrievingPlatformAccountListPagination, searchParams?: PlatformAccountSearchParams, header?: FincodePartialRequestHeader): Promise<ListResponse<PlatformAccountObject>>;
    /**
     * **Retrieve a platform-account**
     *
     * corresponds to `GET /v1/platform_accounts/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlatformAccountObject>}
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<PlatformAccountObject>;
    /**
     * **Retrieve a platform-account summary*
     *
     * corresponds to `GET /v1/platform_accounts/:id/summary`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlatformAccountObject>}
     */
    retrieveSummaryList(id: string, header?: FincodePartialRequestHeader): Promise<ListResponse<PlatformAccountSummaryObject>>;
}
export { PlatformAccount };
