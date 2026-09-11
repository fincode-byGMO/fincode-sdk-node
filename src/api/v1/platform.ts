import {
    ListResponse,
    ShopObject,
    UpdatingPlatformRequest,
    RetrievingPlatformShopListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Platform {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Retrieve platform shop list**
     * 
     * corresponds to `GET /v1/platforms`
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
        return executeRequest<ListResponse<ShopObject>>(this._config, "GET", "/v1/platforms", {
            headers,
            queryParams,
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
        return executeRequest<ShopObject>(this._config, "GET", `/v1/platforms/${id}`, {
            headers,
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
        return executeRequest<ShopObject>(this._config, "PUT", `/v1/platforms/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }
}

export { Platform }
