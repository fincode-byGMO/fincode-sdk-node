import { PlatformAccountSearchParams } from "./../../types/searchParams"
import {
    ListResponse,
    PlatformAccountObject,
    PlatformAccountSummaryObject,
    RetrievingPlatformAccountListPagination,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { RequestInit } from "node-fetch"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class PlatformAccount {

    private readonly _config: FincodeConfig
    private readonly _agent: RequestInit["agent"]

    constructor(config: FincodeConfig, agent?: RequestInit["agent"]) {
        this._config = config
        this._agent = agent
    }

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
    public retrieveList(
        paginaiton?: RetrievingPlatformAccountListPagination,
        searchParams?: PlatformAccountSearchParams,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<PlatformAccountObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/platform_accounts",
                undefined,
                header,
                {
                    pagination: paginaiton,
                    searchParams: searchParams,
                },
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<PlatformAccountObject>
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
     * **Retrieve a platform-account*
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
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<PlatformAccountObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platform_accounts/${id}`,
                undefined,
                header,
                undefined,
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const platformAccount = json as PlatformAccountObject
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

    public retrieveSummaryList(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<PlatformAccountSummaryObject>> {

        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platform_accounts/${id}/summary`,
                undefined,
                header,
                undefined,
                this._agent,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<PlatformAccountSummaryObject>
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
export { PlatformAccount }