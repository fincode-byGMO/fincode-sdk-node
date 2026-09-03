import {
    ChargebackObject,
    ListResponse,
    ReplyingChargebackRequest,
    RetrievingChargebackListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Chargeback {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Retrieve chargeback list**
     * 
     * corresponds to `GET /v1/shop_charge_backs`
     * 
     * @param {RetrievingChargebackListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<ChargebackObject>>} - retrieved chargeback object list
     */
    public retrieveList(
        queryParams?: RetrievingChargebackListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<ChargebackObject>> {
        return executeRequest<ListResponse<ChargebackObject>>(this._config, "GET", "/v1/shop_charge_backs", {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve a chargeback**
     * 
     * corresponds to `GET /v1/shop_charge_backs/:id`
     * 
     * @param {string} id - chargeback id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ChargebackObject>} - retrieved chargeback object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<ChargebackObject> {
        return executeRequest<ChargebackObject>(this._config, "GET", `/v1/shop_charge_backs/${id}`, {
            headers,
        })
    }

    /**
     * **Reply to a chargeback**
     * 
     * corresponds to `POST /v1/shop_charge_backs/:id/reply`
     * 
     * Which fields the fincode team needs depends on what the cardholder
     * claims, given by `request` on the chargeback.
     * 
     * @param {string} id - chargeback id
     * @param {ReplyingChargebackRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ChargebackObject>} - chargeback object the reply was registered on
     */
    public reply(
        id: string,
        body: ReplyingChargebackRequest,
        headers?: FincodeRequestHeaders
    ): Promise<ChargebackObject> {
        return executeRequest<ChargebackObject>(this._config, "POST", `/v1/shop_charge_backs/${id}/reply`, {
            body: JSON.stringify(body),
            headers,
        })
    }
}

export { Chargeback }
