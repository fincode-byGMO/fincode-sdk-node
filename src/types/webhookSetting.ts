export type WebhookSettingObject = {
    /**
     * Webhook ID
     */
    id: string

    /**
     * URL to send the webhook to
     */
    url?: string | null

    /**
     * Trigger event
     */
    event: WebhookEvent

    /**
     * Signature
     * 
     * if you set this value, you can verify the webhook request is from Fincode by checking `Fincode-Signature` header.
     */
    signature?: string | null

    /**
     * Created timestamp
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string

    /**
     * Updated timestamp
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

export type WebhookEvent =
    "payments.card.regist" |
    "payments.card.exec" |
    "payments.card.capture" |
    "payments.card.cancel" |
    "payments.card.auth" |
    "payments.card.change" |
    "payments.applepay.regist" |
    "payments.applepay.exec" |
    "payments.konbini.regist" |
    "payments.konbini.exec" |
    "payments.konbini.cancel" |
    "payments.konbini.complete" |
    "payments.konbini.complete.stub" |
    "payments.paypay.regist" |
    "payments.paypay.exec" |
    "payments.paypay.capture" |
    "payments.paypay.cancel" |
    "payments.paypay.change" |
    "payments.paypay.complete" |
    "card.regist" |
    "card.update" |
    "subscription.card.regist" |
    "subscription.card.delete" |
    "subscription.card.update" |
    "recurring.card.batch" |
    "payments.bulk.card.regist" |
    "payments.bulk.card.batch" |
    "contracts.status_code.updated"

/**
 * Request object for Creating a webhook setting
 */
export type CreatingWebhookSettingRequest = {
    /**
     * Webhook ID
     */
    id?: string | null

    /**
     * URL to send the webhook to
     */
    url?: string | null

    /**
     * Trigger event
     */
    event: WebhookEvent


    /**
     * Signature
     * 
     * if you set this value, you can verify the webhook request is from Fincode by checking `Fincode-Signature` header.
     */
    signature?: string | null
}

/**
 * Request object for Updating a webhook setting
 */
export type UpdatingWebhookSettingRequest = {
    /**
     * URL to send the webhook to
     */
    url?: string | null

    /**
     * Trigger event
     */
    event?: WebhookEvent | null

    /**
     * Signature
     * 
     * if you set this value, you can verify the webhook request is from Fincode by checking `Fincode-Signature` header.
     */
    signature?: string | null
}

/**
 * Response object for Deleting a webhook setting
 */
export type DeletingWebhookSettingResponse = {
    id: string
    delete_flag: "0" | "1"
}