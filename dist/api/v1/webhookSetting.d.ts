import { ListResponse, CreatingWebhookSettingRequest, WebhookSettingObject, UpdatingWebhookSettingRequest, DeletingWebhookSettingResponse } from "../../types";
import { FincodePartialRequestHeader } from "./http";
import { FincodeConfig } from "./fincode";
export declare class WebhookSetting {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
    * **Subscribe webhook**
    *
    * corresponds to `POST /v1/webhook_settings`
    *
    * if the Promise is rejected, the error is an instance of `FincodeError`
    *
    * @param {SubscribingWebhookRequest} body Request object for Creating a webhook
    * @param {FincodePartialRequestHeader} [header]
    *
    * @returns {Promise<WebhookObject>} Webhook object
    */
    create(body: CreatingWebhookSettingRequest, header?: FincodePartialRequestHeader): Promise<WebhookSettingObject>;
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
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<WebhookSettingObject>;
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
    retrieveList(header?: FincodePartialRequestHeader): Promise<Pick<ListResponse<WebhookSettingObject>, "list">>;
    /**
     * *Update a webhook*
     *
     * corresponds to `PUT /v1/webhook_settings/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id Webhook ID
     * @param {UpdatingWebhookRequest} body Request object for Creating a webhook
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<WebhookObject>} Webhook object
     */
    update(id: string, body: UpdatingWebhookSettingRequest, header?: FincodePartialRequestHeader): Promise<WebhookSettingObject>;
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
    delete(id: string, header?: FincodePartialRequestHeader): Promise<DeletingWebhookSettingResponse>;
}
