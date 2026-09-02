import {
    ListResponse,
    PlatformAccountObject,
    PlatformAccountListItemObject,
    PlatformAccountSummaryObject,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    RetrievingPlatformAccountListQueryParams,
    RetrievingPlatformAccountSummaryListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/platform_accounts",
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<PlatformAccountListItemObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platform_accounts/${id}`,
                undefined,
                headers,
                undefined,
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
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
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

        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platform_accounts/${id}/summary`,
                undefined,
                headers,
                queryParams,
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
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }
}
export { PlatformAccount }
