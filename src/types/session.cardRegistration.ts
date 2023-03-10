namespace CardRegistrationSession {
    /**
     * Card registration session object
     */
    export interface SessionObject {
        /**
         * Card registration session ID
         */
        id: string

        /**
         * Redirect target URL
         */
        link_url: string

        /**
         * Return URL (for successful payment)
         */
        success_url: string

        /**
         * Return URL (for canceled payment)
         */
        cancel_url?: string | null

        /**
         * Expire date
         * 
         * Format: `yyyy/MM/dd HH:mm:ss`
         * 
         * - Default: 24 hours.
         * - Max: 30 days.
         * - Min: 5 minutes.
         */
        expire: string | null

        /**
         * Shop service name displayed on the registration page.
         */
        shop_service_name?: string | null

        /**
         * Email address of the cardholder.
         */
        receiver_mail?: string | null

        /**
         * Customer name displayed on the mail.
         */
        mail_customer_name?: string | null

        /**
         * Flag to send guide mail.
         * 
         * - `0`: Not send. (default)
         * - `1`: Send.
         */
        guide_mail_send_flag?: "0" | "1" | null

        /**
         * Flag to send completion mail.
         * 
         * - `0`: Not send. (default)
         * - `1`: Send.
         */
        completion_mail_send_flag?: "0" | "1" | null

        /**
         * Mail template ID.
         */
        shop_mail_template_id?: string | null

        /**
         * Customer ID.
         */
        customer_id?: string | null

        /**
         * Customer name.
         */
        customer_name?: string | null

        /**
         * Created date
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        created: string

        /**
         * Updated date
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        updated?: string | null
    }

    /**
     * Request object for Creating a card registration session
     */
    export type CreatingRequest = {
        /**
         * Return URL (for successful payment)
         */
        success_url?: string | null

        /**
         * Return URL (for canceled payment)
         */
        cancel_url?: string | null

        /**
         * Expire date
         * 
         * Format: `yyyy/MM/dd HH:mm:ss`
         * 
         * - Default: 24 hours.
         * - Max: 30 days.
         * - Min: 5 minutes.
         */
        expire: string | null

        /**
         * Shop service name displayed on the registration page.
         */
        shop_service_name?: string | null

        /**
         * Email address of the cardholder.
         */
        receiver_mail?: string | null

        /**
         * Customer name displayed on the mail.
         */
        mail_customer_name?: string | null

        /**
         * Flag to send guide mail.
         * 
         * - `0`: Not send. (default)
         * - `1`: Send.
         */
        guide_mail_send_flag?: "0" | "1" | null

        /**
         * Flag to send completion mail.
         * 
         * - `0`: Not send. (default)
         * - `1`: Send.
         */
        completion_mail_send_flag?: "0" | "1" | null

        /**
         * Mail template ID.
         */
        shop_mail_template_id?: string | null

        /**
         * Customer ID.
         */
        customer_id?: string | null

        /**
         * Customer name.
         */
        customer_name?: string | null
    }
}
export default CardRegistrationSession