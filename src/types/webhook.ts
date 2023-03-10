namespace Webhook {

    export type Webhook = {
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
        event: Event

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

    export type Event =
        "payments.card.regist" |
        "payments.card.exec" |
        "payments.card.capture" |
        "payments.card.cancel" |
        "payments.card.auth" |
        "payments.card.change" |
        "payments.konbini.regist" |
        "payments.konbini.exec" |
        "payments.konbini.cancel" |
        "payments.konbini.complete" |
        "payments.konbini.complete.stub" |
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
     * Request object for Registering a webhook
     */
    export type RegisteringRequest = {
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
        event: Event
    }

    /**
     * Request object for Updating a webhook
     */
    export type UpdatingRequest = {
        /**
         * URL to send the webhook to
         */
        url?: string | null

        /**
         * Trigger event
         */
        event?: Event | null
    }

}

export default Webhook