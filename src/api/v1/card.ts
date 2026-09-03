import {
    CardObject,
    DeletingCardResponse,
    ListResponse,
    CreatingCardRequest,
    UpdatingCardRequest,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Card {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig,) {
        this._config = config
    }

    /**
     * **Create a card**
     * 
     * corresponds to `POST /v1/customers/:customer_id/cards`
     * 
     * @param {string} customerId - customer id
     * @param {CreatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - created card object
     */
    public create(
        customerId: string,
        body: CreatingCardRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return executeRequest<CardObject>(this._config, "POST", `/v1/customers/${customerId}/cards`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve card list of a customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards`
     * 
     * @param {string} customerId - customer id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<CardObject>>} - card object list
     */
    public retrieveList(
        customerId: string,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<CardObject>> {
        return executeRequest<ListResponse<CardObject>>(this._config, "GET", `/v1/customers/${customerId}/cards`, {
            headers,
        })
    }

    /**
     * **Retrieve a card of customer**
     * 
     * corresponds to `GET /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - retrieved card object
     */
    public retrieve(
        customerId: string,
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return executeRequest<CardObject>(this._config, "GET", `/v1/customers/${customerId}/cards/${id}`, {
            headers,
        })
    }

    /**
     * **Update a card of customer**
     * 
     * corresponds to `PUT /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {UpdatingCardRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CardObject>} - updated card object
     */
    public update(
        customerId: string,
        id: string,
        body: UpdatingCardRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardObject> {
        return executeRequest<CardObject>(this._config, "PUT", `/v1/customers/${customerId}/cards/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Delete a card of customer**
     * 
     * corresponds to `DELETE /v1/customers/:customer_id/cards/:id`
     * 
     * @param {string} customerId - customer id
     * @param {string} id - card id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<DeletingCardResponse>} - deleting result
     */
    public delete(
        customerId: string,
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<DeletingCardResponse> {
        return executeRequest<DeletingCardResponse>(this._config, "DELETE", `/v1/customers/${customerId}/cards/${id}`, {
            headers,
        })
    }
}

export { Card }
