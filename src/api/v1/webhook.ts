import { APIRawErrorResponse, DeletingWebhookResponse, ListResponse, SubscribingWebhookRequest, UpdatingWebhookRequest, WebhookObject, createError, formatErrorResponse } from "./../../types";
import { FincodePartialRequestHeader, createFincodeRequestFetch } from "./http";
import { FincodeConfig } from "./fincode";


export class Webhook {

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
    * @param {SubscribingWebhookRequest} body Request object for Registering a webhook
    * @param {FincodePartialRequestHeader} [header]
    * 
    * @returns {Promise<WebhookObject>} Webhook object
    */

    public subscribe(
        body: SubscribingWebhookRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<WebhookObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                `/v1/webhook_settings`,
                JSON.stringify(body),
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as WebhookObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
    ): Promise<WebhookObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings/${id}`,
                undefined,
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as WebhookObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
    ): Promise<ListResponse<WebhookObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/webhook_settings`,
                undefined,
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as ListResponse<WebhookObject>
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
     * @param {UpdatingWebhookRequest} body Request object for Registering a webhook
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<WebhookObject>} Webhook object
     */

    public update(
        id: string,
        body: UpdatingWebhookRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<WebhookObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/webhook_settings/${id}`,
                JSON.stringify(body),
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as WebhookObject
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
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
    ): Promise<DeletingWebhookResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/webhook_settings/${id}`,
                undefined,
                header,
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const res = json as DeletingWebhookResponse
                        resolve(res)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes, res.status)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createError(message, "SDK_ERROR")
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createError(message, "SDK_ERROR")
                reject(err)
            })
        })
    }
}

