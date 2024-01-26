import {
    ListResponse,
    AccountObject,
    AccountDetailObject,
    RetrievingAccountListQueryParams,
    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js"

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
     * @param {RetrievingAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<AccountObject>>} - account object list
    */
    public retrieveList(
        queryParams?: RetrievingAccountListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<AccountObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/accounts",
                undefined,
                headers,
                queryParams,
            )

            fetch().then((res) => {
                res.json().then((json: ListResponse<AccountObject>) => {
                    if (res.ok) {
                        resolve(json)
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/accounts/${id}`,
                undefined,
                headers,
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
     * **Retrieve a account detail*
     * 
     * corresponds to `GET /v1/accounts/:id/detail`
     * 
     * @param {string} id - account ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<AccountObject>} - account object
     */

    public retrieveDetailList(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<AccountDetailObject>> {

        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/accounts/${id}/detail`,
                undefined,
                headers,
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
export { Account }