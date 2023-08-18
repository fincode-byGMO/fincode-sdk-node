import { RequestInit } from "node-fetch"
import {
    ListResponse,
    PlatformShopsSearchParams,
    RetrievingPlatformShopListPagination,
    ShopObject,
    UpdatingPlatformRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class Platform {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Retrieve platform shop list**
     * 
     * corresponds to `POST /v1/platforms`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<ShopObject>>}
     */
    public retrieveList(
        pagination?: RetrievingPlatformShopListPagination,
        searchParams?: PlatformShopsSearchParams,
        header?: FincodePartialRequestHeader
    ): Promise<ListResponse<ShopObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/platforms",
                undefined,
                header,
                {
                    pagination: pagination,
                    searchParams: searchParams,
                },
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<ShopObject>
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
     * **Retrieve a platform shop**
     * 
     * corresponds to `GET /v1/platforms/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - Platform shop ID
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ShopObject>}
     */
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platforms/${id}`,
                undefined,
                header,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const shop = json as ShopObject
                        resolve(shop)
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
     * **Update a platform shop**
     * 
     * corresponds to `PUT /v1/platforms/:id`
     * 
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id - Platform shop ID
     * 
     * @returns {Promise<ShopObject>}
     */
    public update(
        id: string,
        body: UpdatingPlatformRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/platforms/${id}`,
                JSON.stringify(body),
                header,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const shop = json as ShopObject
                        resolve(shop)
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

export { Platform }