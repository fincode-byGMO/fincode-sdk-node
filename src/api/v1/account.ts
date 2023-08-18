import {
    ListResponse,
    AccountObject,
    AccountDetailObject,
    RetrievingAccountListPagination,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class Account {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

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
    public retrieveList(
        paginaiton?: RetrievingAccountListPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<AccountObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/accounts",
                undefined,
                header,
                {
                    pagination: paginaiton,
                },
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<AccountObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
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
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<AccountObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/accounts/${id}`,
                undefined,
                header,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const platformAccount = json as AccountObject
                        resolve(platformAccount)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
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

    public retrieveDetailList(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<AccountDetailObject>> {

        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/accounts/${id}/detail`,
                undefined,
                header,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<AccountDetailObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
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
export { Account }