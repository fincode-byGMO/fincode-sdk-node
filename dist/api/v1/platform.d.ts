import { ListResponse, PlatformShopsSearchParams, RetrievingPlatformShopListPagination, ShopObject, UpdatingPlatformRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Platform {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    retrieveList(pagination?: RetrievingPlatformShopListPagination, searchParams?: PlatformShopsSearchParams, header?: FincodePartialRequestHeader): Promise<ListResponse<ShopObject>>;
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
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<ShopObject>;
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
    update(id: string, body: UpdatingPlatformRequest, header?: FincodePartialRequestHeader): Promise<ShopObject>;
}
export { Platform };
