import {
    ListResponse,
    ShopObject,
    UpdatingPlatformRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    RetrievingPlatformShopListQueryParams,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js"

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
     * @param {RetrievingPlatformShopListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<ShopObject>>} - platform shop object list
     */
    public retrieveList(
        queryParams?: RetrievingPlatformShopListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<ShopObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/platforms",
                undefined,
                headers,
                queryParams,
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
     * **Retrieve a platform shop**
     * 
     * corresponds to `GET /v1/platforms/:id`
     * 
     * @param {string} id - platform shop ID
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ShopObject>} - retrieved platform shop object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/platforms/${id}`,
                undefined,
                headers,
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
     * **Update a platform shop**
     * 
     * corresponds to `PUT /v1/platforms/:id`
     * 
     * @param {string} id - platform shop ID
     * 
     * @returns {Promise<ShopObject>} - updated platform shop object
     */
    public update(
        id: string,
        body: UpdatingPlatformRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<ShopObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/platforms/${id}`,
                JSON.stringify(body),
                headers,
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

export { Platform }