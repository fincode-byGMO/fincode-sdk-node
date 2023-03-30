import {
    APIRawErrorResponse,
    ListResponse,
    PlatformShopsSearchParams,
    RetrievingPlatformShopListPagination,
    ShopObject,
    UpdatingPlatformRequest,
    createError,
    formatErrorResponse
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"

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
                "POST",
                "/v1/platforms",
                undefined,
                header,
                {
                    pagination: pagination,
                    searchParams: searchParams,
                },
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<ShopObject>
                        resolve(list)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const shop = json as ShopObject
                        resolve(shop)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const shop = json as ShopObject
                        resolve(shop)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
                reject(err)
            })
        })
    }
}

export { Platform }