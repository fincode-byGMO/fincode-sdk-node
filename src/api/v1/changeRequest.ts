import {
    ChangeRequestObject,
    RegisteringChangeRequestRequest,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class ChangeRequest {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a change request**
     * 
     * corresponds to `POST /v1/change_requests`
     * 
     * Changes the contract details of a tenant. With
     * `need_change_examination: false` the change is applied directly; with
     * `true` it is filed for examination, which the tenant has to have
     * completed its initial registration for.
     * 
     * Only the main shop of a platform can call this, and
     * `headers.tenantShopId` names the tenant.
     * 
     * @param {RegisteringChangeRequestRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ChangeRequestObject>} - registered change request object
     */
    public register(
        body: RegisteringChangeRequestRequest,
        headers?: FincodeRequestHeaders
    ): Promise<ChangeRequestObject> {
        return executeRequest<ChangeRequestObject>(this._config, "POST", "/v1/change_requests", {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve a change request**
     * 
     * corresponds to `GET /v1/change_requests/:shopId`
     * 
     * Only the main shop of a platform can call this, and
     * `headers.tenantShopId` names the tenant.
     * 
     * @param {string} shopId - shop id of the tenant
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ChangeRequestObject>} - retrieved change request object
     */
    public retrieve(
        shopId: string,
        headers?: FincodeRequestHeaders
    ): Promise<ChangeRequestObject> {
        return executeRequest<ChangeRequestObject>(this._config, "GET", `/v1/change_requests/${shopId}`, {
            headers,
        })
    }
}

export { ChangeRequest }
