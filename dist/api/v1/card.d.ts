import { CardObject, DeletingCardResponse, ListResponse, CreatingCardRequest, UpdatingCardRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class Card {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    create(customerId: string, body: CreatingCardRequest, headers?: FincodeRequestHeaders): Promise<CardObject>;
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
    retrieveList(customerId: string, headers?: FincodeRequestHeaders): Promise<ListResponse<CardObject>>;
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
    retrieve(customerId: string, id: string, headers?: FincodeRequestHeaders): Promise<CardObject>;
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
    update(customerId: string, id: string, body: UpdatingCardRequest, headers?: FincodeRequestHeaders): Promise<CardObject>;
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
    delete(customerId: string, id: string, headers?: FincodeRequestHeaders): Promise<DeletingCardResponse>;
}
export { Card };
