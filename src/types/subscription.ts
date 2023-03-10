import { Pagination } from "./pagination"

namespace Subscription {

    /**
     * Subscription object
     */
    export type Subscription = {
        /**
         * Subscription ID.
         */
        id: string

        /**
         * Payment method used for this subscription.
         * 
         * - `Card`: Card
         */
        pay_type: "Card"

        /**
         * Plan ID.
         */
        plan_id: string

        /**
         * Plan name.
         */
        plan_name: string

        /**
         * Amount
         */
        amount: number

        /**
         * Tax
         */
        tax: number

        /**
         * Total amount
         */
        total_amount: number

        /**
         * Initial amount
         */
        initial_amount?: number | null

        /**
         * Initial tax
        */
        initial_tax?: number | null

        /**
         * Initial total amount
         */
        initial_total_amount?: number | null

        /**
         * Customer ID.
         */
        customer_id: string

        /**
         * Shop ID.
         */
        shop_id: string

        /**
         * Card ID.
         */
        card_id?: string | null

        /**
         * Subscription status.
         * 
         * - `ACTIVE`: Active
         * - `RUNNING`: Running
         * - `CANCELED`: Canceled or Failed
         * - `INCOMPLETE`: Incomplete to register subscription
         */
        status: Status

        /**
         * Start date.
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        start_date: string

        /**
         * Stop date.
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        stop_date?: string | null

        /**
         * Next charge date.
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        next_charge_date: string

        /**
         * Flag that means this subscription charges at the end of the month.
         * 
         * - `0`: No. This subscription charges at *dd* of `start_date`.
         * - `1`: Yes. This subscription charges at the end of the month.
         */
        end_month_flag: "0" | "1"

        /**
         * Send URL.
         */
        send_url?: string | null

        /**
         * Fields where merchants can freely set values
         */
        client_field_1?: string | null
        client_field_2?: string | null
        client_field_3?: string | null

        /**
         * Interval Pattern.
         * 
         * - `month`: Monthly
         * - `year`: Yearly
         */
        interval_pattern: "month" | "year"

        /**
         * Interval Count.
         */
        interval_count: 1 | 2 | 3 | 6

        /**
         * Error code.
         */
        error_code?: string | null

        /**
         * Created
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        created: string

        /**
         * Updated
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        updated?: string | null
    }

    /**
     * Request object for Registering a subscription (used for `POST /v1/subscriptions`)
     */
    export type RegisteringRequest = {
        /**
         * Subscription ID.
         */
        id?: string | null

        /**
         * Payment method used for this subscription.
         */
        pay_type: "Card"

        /**
         * Plan ID.
         */
        plan_id: string

        /**
         * Customer ID.
         */
        customer_id: string

        /**
         * Card ID.
         * 
         * If you do not specify this parameter, the default card will be used.
         */
        card_id?: string | null

        /**
         * Start date.
         * 
         * Format: `yyyy/MM/dd`
         */
        start_date: string

        /**
         * Stop date.
         * 
         * Format: `yyyy/MM/dd`
         */
        stop_date?: string | null

        /**
         * Flag that means this subscription charges at the end of the month.
         * 
         * - `0`: No. This subscription charges at *dd* of `start_date`.
         * - `1`: Yes. This subscription charges at the end of the month.
         */
        end_month_flag?: "0" | "1" | null

        /**
         * Webhook target URL.
         */
        send_url?: string | null
    }

    /**
     * Pagination object for Retrieving a list of subscriptions. (used for `GET /v1/subscriptions`)
     */
    export type RetrievingListPagination = Pagination & {
        /**
         * Payment method used for this subscription.
         */
        pay_type: "Card"

        /**
         * Subscription ID
         */
        id?: string | null

        /**
         * Plan ID
         */
        plan_id?: string | null

        /**
         * Minimam total amount
         */
        total_amount_min?: string | null

        /**
         * Maximum total amount
         */
        total_amount_max?: string | null

        /**
         * Interval Pattern.
         */
        interval_pattern?: "month" | "year" | null

        /**
         * Start date (from).
         * 
         * Format: `yyyy/MM/dd`
         */
        start_date_from?: string | null

        /**
         * Start date (to).
         * 
         * Format: `yyyy/MM/dd`
         */
        start_date_to?: string | null

        /**
         * Stop date (from).
         * 
         * Format: `yyyy/MM/dd`
         */
        stop_date_from?: string | null

        /**
         * Stop date (to).
         * 
         * Format: `yyyy/MM/dd`
         */
        stop_date_to?: string | null

        /**
         * Next charge date (from).
         * 
         * Format: `yyyy/MM/dd`
         */
        next_charge_date_from?: string | null

        /**
         * Next charge date (to).
         * 
         * Format: `yyyy/MM/dd`
         */
        next_charge_date_to?: string | null

        /**
         * Update date (from).
         * 
         * Format: `yyyy/MM/dd`
         */
        update_date_from?: string | null

        /**
         * Update date (to).
         * 
         * Format: `yyyy/MM/dd`
         */
        update_date_to?: string | null

        /**
         * Status.
         * 
         * - `ACTIVE`: Active
         * - `RUNNING`: Running
         * - `CANCELED`: Canceled or Failed
         * - `INCOMPLETE`: Incomplete to register subscription
         */
        status?: Status[] | null
    }

    /**
     * Request object for Updating a subscription (used for `PUT /v1/subscriptions/:id`)
     */
    export type UpdatingRequest = {
        /**
         * Payment method used for this subscription.
         */
        pay_type: "Card"

        /**
         * Plan ID.
         */
        plan_id?: string | null

        /**
         * Start date.
         * 
         * Format: `yyyy/MM/dd`
         */
        start_date?: string | null

        /**
         * Stop date.
         * 
         * Format: `yyyy/MM/dd`
         */
        stop_date?: string | null

        /**
         * Flag that means this subscription charges at the end of the month.
         * 
         * - `0`: No. This subscription charges at *dd* of `start_date`.
         * - `1`: Yes. This subscription charges at the end of the month.
         */
        end_month_flag?: "0" | "1" | null

        /**
         * Fields where merchants can freely set values
         */
        client_field_1?: string | null
        client_field_2?: string | null
        client_field_3?: string | null

        /**
         * Initial amount
         */
        initial_amount?: string | null

        /**
         * Initial tax
         */
        initial_tax?: string | null
    }

    /**
     * Request object for Canceling a subscription (used for `DELETE /v1/subscriptions/:id`)
     */
    export type CancelingQueryParams = {
        /**
         * Payment method used for this subscription.
         */
        pay_type: "Card"
    }

    /**
     * Pagination object for Retrieving subscription result list (used for `GET /v1/subscriptions/{id}/result`)
     */
    export type RetrievingResultListPagination = Pagination & {
        /**
         * Payment method used for this subscription.
         */
        pay_type: "Card"
    }

    export type Status = "ACTIVE" | "RUNNING" | "CANCELED" | "INCOMPLETE"
}
export default Subscription