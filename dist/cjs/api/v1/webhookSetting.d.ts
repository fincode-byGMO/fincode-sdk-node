import { ListResponse, CreatingWebhookSettingRequest, WebhookSettingObject, UpdatingWebhookSettingRequest, DeletingWebhookSettingResponse } from "../../types/index.js";
import { FincodeRequestHeaders } from "./http.js";
import { FincodeConfig } from "./fincode.js";
export declare class WebhookSetting {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
    * **Subscribe webhook**
    *
    * corresponds to `POST /v1/webhook_settings`
    *
    * @param {SubscribingWebhookRequest} body - request body
    * @param {FincodeRequestHeaders} [headers] - request headers
    *
    * @returns {Promise<WebhookSettingObject>} - Webhook setting object
    */
    create(body: CreatingWebhookSettingRequest, headers?: FincodeRequestHeaders): Promise<WebhookSettingObject>;
    /**
     * *Retrieve a webhook*
     *
     * corresponds to `GET /v1/webhook_settings/:id`
     *
     * @param {string} id - webhook setting ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookSettingObject>} - Webhook setting object
     */
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<WebhookSettingObject>;
    /**
     * *Retrieve webhooks list*
     *
     * corresponds to `GET /v1/webhook_settings`
     *
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook setting object list
     */
    retrieveList(headers?: FincodeRequestHeaders): Promise<Pick<ListResponse<WebhookSettingObject>, "list">>;
    /**
     * *Update a webhook*
     *
     * corresponds to `PUT /v1/webhook_settings/:id`
     *
     * @param {string} id - Webhook ID
     * @param {UpdatingWebhookRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookSettingObject>} Webhook setting object
     */
    update(id: string, body: UpdatingWebhookSettingRequest, headers?: FincodeRequestHeaders): Promise<WebhookSettingObject>;
    /**
     * *Delete a webhook*
     *
     * corresponds to `DELETE /v1/webhook_settings/:id`
     *
     * @param {string} id - Webhook ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     *
     * @returns {Promise<WebhookObject>} - deleting webhook setting result
     */
    delete(id: string, headers?: FincodeRequestHeaders): Promise<DeletingWebhookSettingResponse>;
}
