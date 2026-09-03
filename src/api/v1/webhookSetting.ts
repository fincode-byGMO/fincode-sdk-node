import {
    ListResponse,
    CreatingWebhookSettingRequest,
    WebhookSettingObject,
    UpdatingWebhookSettingRequest,
    DeletingWebhookSettingResponse,
} from "../../types/index";
import { FincodeRequestHeaders } from "./http";
import { FincodeConfig } from "./fincode";
import { executeRequest } from "./_request";


export class WebhookSetting {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
    * **Subscribe webhook**
    * 
    * corresponds to `POST /v1/webhook_settings`
    * 
    * @param {CreatingWebhookSettingRequest} body - request body
    * @param {FincodeRequestHeaders} [headers] - request headers
    * 
    * @returns {Promise<WebhookSettingObject>} - Webhook setting object
    */

    public create(
        body: CreatingWebhookSettingRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<WebhookSettingObject> {
        return executeRequest<WebhookSettingObject>(this._config, "POST", `/v1/webhook_settings`, {
            body: JSON.stringify(body),
            headers,
        })
    }


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
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<WebhookSettingObject> {
        return executeRequest<WebhookSettingObject>(this._config, "GET", `/v1/webhook_settings/${id}`, {
            headers,
        })
    }

    /**
     * *Retrieve webhooks list*
     * 
     * corresponds to `GET /v1/webhook_settings`
     * 
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<ListResponse<WebhookSettingObject>>} Webhook setting object list
     */
    public retrieveList(
        headers?: FincodeRequestHeaders,
    ): Promise<Pick<ListResponse<WebhookSettingObject>, "list">> {
        return executeRequest<Pick<ListResponse<WebhookSettingObject>, "list">>(this._config, "GET", `/v1/webhook_settings`, {
            headers,
        })
    }

    /**
     * *Update a webhook*
     * 
     * corresponds to `PUT /v1/webhook_settings/:id`
     * 
     * @param {string} id - Webhook ID
     * @param {UpdatingWebhookSettingRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<WebhookSettingObject>} Webhook setting object
     */

    public update(
        id: string,
        body: UpdatingWebhookSettingRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<WebhookSettingObject> {
        return executeRequest<WebhookSettingObject>(this._config, "PUT", `/v1/webhook_settings/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * *Delete a webhook*
     * 
     * corresponds to `DELETE /v1/webhook_settings/:id`
     * 
     * @param {string} id - Webhook ID
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<DeletingWebhookSettingResponse>} - deleting webhook setting result
     */
    public delete(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<DeletingWebhookSettingResponse> {
        return executeRequest<DeletingWebhookSettingResponse>(this._config, "DELETE", `/v1/webhook_settings/${id}`, {
            headers,
        })
    }
}

