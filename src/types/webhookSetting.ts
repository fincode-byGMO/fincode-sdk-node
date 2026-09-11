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

/**
 * Event that triggers a webhook notification.
 */
export type WebhookEvent =
    // Card payment
    | "payments.card.regist"
    | "payments.card.exec"
    | "payments.card.capture"
    | "payments.card.cancel"
    | "payments.card.auth"
    | "payments.card.change"
    | "payments.card.secure"
    | "payments.card.secure2.authenticate"
    | "payments.card.secure2.result"

    // Apple Pay payment
    | "payments.applepay.regist"
    | "payments.applepay.exec"
    | "payments.applepay.capture"
    | "payments.applepay.cancel"

    // Google Pay payment
    | "payments.googlepay.regist"
    | "payments.googlepay.exec"
    | "payments.googlepay.capture"
    | "payments.googlepay.cancel"
    | "payments.googlepay.auth"
    | "payments.googlepay.change"
    | "payments.googlepay.secure"
    | "payments.googlepay.secure2.authenticate"
    | "payments.googlepay.secure2.result"

    // Konbini payment
    | "payments.konbini.regist"
    | "payments.konbini.exec"
    | "payments.konbini.cancel"
    | "payments.konbini.complete"
    | "payments.konbini.complete.stub"
    | "konbini.expired.update.batch"

    // PayPay payment
    | "payments.paypay.regist"
    | "payments.paypay.exec"
    | "payments.paypay.capture"
    | "payments.paypay.cancel"
    | "payments.paypay.change"
    | "payments.paypay.complete"

    // Direct Debit payment
    | "payments.directdebit.regist"
    | "payments.directdebit.exec"
    | "payments.directdebit.cancel"
    | "payments.directdebit.change"
    | "payments.directdebit.complete"
    | "payments.directdebit.complete.stub"

    // Virtual Account payment
    | "payments.virtualaccount.regist"
    | "payments.virtualaccount.exec"
    | "payments.virtualaccount.cancel"
    | "payments.virtualaccount.complete"
    | "payments.virtualaccount.complete.stub"

    // Bulk payment
    | "payments.bulk.card.regist"
    | "payments.bulk.virtualaccount.regist"
    | "payments.bulk.card.batch"
    | "payments.bulk.virtualaccount.batch"

    // Card
    | "card.regist"
    | "card.updater.complete"
    | "card.update"

    // Payment method
    | "customers.payment_methods.created"
    | "customers.payment_methods.updated"
    | "customers.payment_methods.inactivated"
    | "customers.payment_methods.activated"
    | "customers.payment_methods.deleted"

    // Subscription
    | "subscription.card.regist"
    | "subscription.directdebit.regist"
    | "subscription.card.update"
    | "subscription.directdebit.update"
    | "subscription.card.delete"
    | "subscription.directdebit.delete"
    | "recurring.card.batch"
    | "recurring.directdebit.batch"

    // Invoice
    | "invoice.cancel"
    | "invoice.update"
    | "invoice.delete"
    | "invoice.create"
    | "invoice.open"
    | "invoice.expired"
    | "invoice.paid"

    // Chargeback
    | "charge_backs.regist"
    | "charge_backs.update"

    // Change request
    | "change_requests.regist"
    | "change_requests.update"

    // Contract
    | "contracts.status_code.updated"

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