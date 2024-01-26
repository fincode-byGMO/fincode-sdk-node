import { ListResponse, ShopObject, UpdatingPlatformRequest, RetrievingPlatformShopListQueryParams } from "../../types/index.js";
import { FincodeConfig } from "./fincode.js";
import { FincodeRequestHeaders } from "./http.js";
declare class Platform {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    retrieveList(queryParams?: RetrievingPlatformShopListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<ShopObject>>;
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
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<ShopObject>;
    /**
     * **Update a platform shop**
     *
     * corresponds to `PUT /v1/platforms/:id`
     *
     * @param {string} id - platform shop ID
     *
     * @returns {Promise<ShopObject>} - updated platform shop object
     */
    update(id: string, body: UpdatingPlatformRequest, headers?: FincodeRequestHeaders): Promise<ShopObject>;
}
export { Platform };
