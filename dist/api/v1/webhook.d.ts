import { DeletingWebhookResponse, ListResponse, SubscribingWebhookRequest, UpdatingWebhookRequest, WebhookObject } from "./../../types";
import { FincodePartialRequestHeader } from "./http";
import { FincodeConfig } from "./fincode";
import { RequestInit } from "node-fetch";
export declare class Webhook {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
    * **Subscribe webhook**
    *
    * corresponds to `POST /v1/webhook_settings`
    *
    * if the Promise is rejected, the error is an instance of `FincodeError`
    *
    * @param {SubscribingWebhookRequest} body Request object for Registering a webhook
    * @param {FincodePartialRequestHeader} [header]
    *
    * @returns {Promise<WebhookObject>} Webhook object
    */
    subscribe(body: SubscribingWebhookRequest, header?: FincodePartialRequestHeader): Promise<WebhookObject>;
    /**
     * *Retrieve a webhook*
     *
     * corresponds to `GET /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<WebhookObject>;
    /**
     * *Retrieve webhooks list*
     *
     * corresponds to `GET /v1/webhook_settings`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook list
     */
    retrieveList(header?: FincodePartialRequestHeader): Promise<ListResponse<WebhookObject>>;
    /**
     * *Update a webhook*
     *
     * corresponds to `PUT /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {UpdatingWebhookRequest} body Request object for Registering a webhook
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    update(id: string, body: UpdatingWebhookRequest, header?: FincodePartialRequestHeader): Promise<WebhookObject>;
    /**
     * *Delete a webhook*
     *
     * corresponds to `DELETE /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    delete(id: string, header?: FincodePartialRequestHeader): Promise<DeletingWebhookResponse>;
}
