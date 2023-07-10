import { RequestInit } from "node-fetch";
import { CardObject, DeletingCardResponse, ListResponse, RegisteringCardRequest, UpdatingCardRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Card {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Create a card**
     *
     * corresponds to `POST /v1/customers/:customer_id/cards`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    register(customerId: string, body: RegisteringCardRequest, header?: FincodePartialRequestHeader): Promise<CardObject>;
    /**
     * **Retrieve card list of a customer**
     *
     * corresponds to `GET /v1/customers/:customer_id/cards`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieveList(customerId: string, header?: FincodePartialRequestHeader): Promise<ListResponse<CardObject>>;
    /**
     * **Retrieve a card of customer**
     *
     * corresponds to `GET /v1/customers/:customer_id/cards/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieve(customerId: string, id: string, header?: FincodePartialRequestHeader): Promise<CardObject>;
    /**
     * **Update a card of customer**
     *
     * corresponds to `PUT /v1/customers/:customer_id/cards/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    update(customerId: string, id: string, body: UpdatingCardRequest, header?: FincodePartialRequestHeader): Promise<CardObject>;
    /**
     * **Delete a card of customer**
     *
     * corresponds to `DELETE /v1/customers/:customer_id/cards/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    delete(customerId: string, id: string, header?: FincodePartialRequestHeader): Promise<DeletingCardResponse>;
}
export { Card };
