import { ListResponse, AccountObject, AccountDetailObject, RetrievingAccountListPagination } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Account {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Retrieve account list **
     *
     * corresponds to `POST /v1/accounts`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingAccountListPagination} [paginaiton]
     * @param {AccountSearchParams} [searchParams]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<AccountObject>>}
     *
    */
    retrieveList(paginaiton?: RetrievingAccountListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<AccountObject>>;
    /**
     * **Retrieve a account**
     *
     * corresponds to `GET /v1/accounts/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<AccountObject>}
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<AccountObject>;
    /**
     * **Retrieve a account detail*
     *
     * corresponds to `GET /v1/accounts/:id/detail`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<AccountObject>}
     */
    retrieveDetailList(id: string, header?: FincodePartialRequestHeader): Promise<ListResponse<AccountDetailObject>>;
}
export { Account };
