import {
    ListResponse,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
    CreatingWebhookSettingRequest,
    WebhookSettingObject,
    UpdatingWebhookSettingRequest,
    DeletingWebhookSettingResponse,
} from "../../types";
import { FincodeRequestHeaders, createFincodeRequestFetch } from "./http";
import { FincodeConfig } from "./fincode";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";


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
    * @param {SubscribingWebhookRequest} body - request body
    * @param {FincodeRequestHeaders} [headers] - request headers
    * 
    * @returns {Promise<WebhookSettingObject>} - Webhook setting object
    */

    public create(
        body: CreatingWebhookSettingRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<WebhookSettingObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/webhook_settings`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json as WebhookSettingObject
                        resolve(res)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
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
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json as WebhookSettingObject
                        resolve(res)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

    /**
     * *Retrieve webhooks list*
     * 
     * corresponds to `GET /v1/webhook_settings`
     * 
     * @param {FincodeRequestHeaders} [headers] - request headers
     * 
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook setting object list
     */
    public retrieveList(
        headers?: FincodeRequestHeaders,
    ): Promise<Pick<ListResponse<WebhookSettingObject>, "list">> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json as ListResponse<WebhookSettingObject>
                        resolve(res)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

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

    public update(
        id: string,
        body: UpdatingWebhookSettingRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<WebhookSettingObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/webhook_settings/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json as WebhookSettingObject
                        resolve(res)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
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
     * @returns {Promise<WebhookObject>} - deleting webhook setting result
     */
    public delete(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<DeletingWebhookSettingResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/webhook_settings/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const res = json as DeletingWebhookSettingResponse
                        resolve(res)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }
}

