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
import { FincodePartialRequestHeader, createFincodeRequestFetch } from "./http";
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
    * if the Promise is rejected, the error is an instance of `FincodeError`
    * 
    * @param {SubscribingWebhookRequest} body Request object for Creating a webhook
    * @param {FincodePartialRequestHeader} [header]
    * 
    * @returns {Promise<WebhookObject>} Webhook object
    */

    public create(
        body: CreatingWebhookSettingRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<WebhookSettingObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/webhook_settings`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<WebhookObject>} Webhook object
     */
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<WebhookSettingObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings/${id}`,
                undefined,
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<ListResponse<WebhookObject>>} Webhook list
     */
    public retrieveList(
        header?: FincodePartialRequestHeader,
    ): Promise<Pick<ListResponse<WebhookSettingObject>, "list">> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings`,
                undefined,
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id Webhook ID
     * @param {UpdatingWebhookRequest} body Request object for Creating a webhook
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<WebhookObject>} Webhook object
     */

    public update(
        id: string,
        body: UpdatingWebhookSettingRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<WebhookSettingObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/webhook_settings/${id}`,
                JSON.stringify(body),
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id Webhook ID
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<WebhookObject>} Webhook object
     */
    public delete(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<DeletingWebhookSettingResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/webhook_settings/${id}`,
                undefined,
                header,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }
}

