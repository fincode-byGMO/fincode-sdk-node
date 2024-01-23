import { Modify } from "../utils/utilTypes";
import { Pagination } from "./pagination";
/**
     * Subscription object
     */
export type SubscriptionObject = {
    /**
     * Subscription ID.
     */
    id: string;
    /**
     * Payment method used for this subscription.
     *
     * - `Card`: Card
     */
    pay_type: "Card";
    /**
     * Plan ID.
     */
    plan_id: string;
    /**
     * Plan name.
     */
    plan_name: string;
    /**
     * Amount
     */
    amount: number;
    /**
     * Tax
     */
    tax: number;
    /**
     * Total amount
     */
    total_amount: number;
    /**
     * Initial amount
     */
    initial_amount?: number | null;
    /**
     * Initial tax
    */
    initial_tax?: number | null;
    /**
     * Initial total amount
     */
    initial_total_amount?: number | null;
    /**
     * Customer ID.
     */
    customer_id: string;
    /**
     * Shop ID.
     */
    shop_id: string;
    /**
     * Card ID.
     */
    card_id?: string | null;
    /**
     * Subscription status.
     *
     * - `ACTIVE`: Active
     * - `RUNNING`: Running
     * - `CANCELED`: Canceled or Failed
     * - `INCOMPLETE`: Incomplete to register subscription
     */
    status: SubscriptionStatus;
    /**
     * Start date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    start_date: string;
    /**
     * Stop date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    stop_date?: string | null;
    /**
     * Next charge date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    next_charge_date: string;
    /**
     * Flag that means this subscription charges at the end of the month.
     *
     * - `0`: No. This subscription charges at *dd* of `start_date`.
     * - `1`: Yes. This subscription charges at the end of the month.
     */
    end_month_flag: "0" | "1";
    /**
     * Send URL.
     */
    send_url?: string | null;
    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Interval Pattern.
     *
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern: "month" | "year";
    /**
     * Interval Count.
     */
    interval_count: 1 | 2 | 3 | 6;
    /**
     * Error code.
     */
    error_code?: string | null;
    /**
     * Created
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
    /**
     * Updated
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null;
};
/**
 * Request object for Creating a subscription (used for `POST /v1/subscriptions`)
 */
export type CreatingSubscriptionRequest = {
    /**
     * Subscription ID.
     */
    id?: string | null;
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
    /**
     * Plan ID.
     */
    plan_id: string;
    /**
     * Customer ID.
     */
    customer_id: string;
    /**
     * Card ID.
     *
     * If you do not specify this parameter, the default card will be used.
     */
    card_id?: string | null;
    /**
     * Start date.
     *
     * Format: `yyyy/MM/dd`
     */
    start_date: string;
    /**
     * Stop date.
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date?: string | null;
    /**
     * Flag that means this subscription charges at the end of the month.
     *
     * - `0`: No. This subscription charges at *dd* of `start_date`.
     * - `1`: Yes. This subscription charges at the end of the month.
     */
    end_month_flag?: "0" | "1" | null;
    /**
     * Webhook target URL.
     */
    send_url?: string | null;
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Initial amount.
     */
    initial_amount?: string | null;
    /**
     * Initial tax.
     */
    initial_tax?: string | null;
};
/**
 * Pagination object for Retrieving a list of subscriptions. (used for `GET /v1/subscriptions`)
 */
export type RetrievingSubscriptionListQueryParams = Modify<Pagination, {
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
    /**
     * Subscription ID
     */
    id?: string | null;
    /**
     * Plan ID
     */
    plan_id?: string | null;
    /**
     * Minimam total amount
     */
    total_amount_min?: string | null;
    /**
     * Maximum total amount
     */
    total_amount_max?: string | null;
    /**
     * Interval Pattern.
     */
    interval_pattern?: "month" | "year" | null;
    /**
     * Start date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    start_date_from?: string | null;
    /**
     * Start date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    start_date_to?: string | null;
    /**
     * Stop date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date_from?: string | null;
    /**
     * Stop date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date_to?: string | null;
    /**
     * Next charge date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    next_charge_date_from?: string | null;
    /**
     * Next charge date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    next_charge_date_to?: string | null;
    /**
     * Update date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_from?: string | null;
    /**
     * Update date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_to?: string | null;
    /**
     * Status.
     *
     * - `ACTIVE`: Active
     * - `RUNNING`: Running
     * - `CANCELED`: Canceled or Failed
     * - `INCOMPLETE`: Incomplete to register subscription
     */
    status?: SubscriptionStatus[] | null;
}>;
/**
 * Query parameters for Retrieving a subscriptions. (used for `GET /v1/subscriptions/:id`)
 */
export type RetrievingSubscriptionQueryParams = {
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
};
/**
 * Request object for Updating a subscription (used for `PUT /v1/subscriptions/:id`)
 */
export type UpdatingSubscriptionRequest = {
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
    /**
     * Plan ID.
     */
    plan_id?: string | null;
    /**
     * Start date.
     *
     * Format: `yyyy/MM/dd`
     */
    start_date?: string | null;
    /**
     * Stop date.
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date?: string | null;
    /**
     * Flag that means this subscription charges at the end of the month.
     *
     * - `0`: No. This subscription charges at *dd* of `start_date`.
     * - `1`: Yes. This subscription charges at the end of the month.
     */
    end_month_flag?: "0" | "1" | null;
    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Initial amount
     */
    initial_amount?: string | null;
    /**
     * Initial tax
     */
    initial_tax?: string | null;
};
/**
 * Query parameters for Canceling a subscription (used for `DELETE /v1/subscriptions/:id`)
 */
export type CancelingSubscriptionQueryParams = {
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
};
/**
 * Response object for Canceling a subscription (used for `DELETE /v1/subscriptions/:id`)
 */
export type CancelingSubscriptionResponse = {
    /**
     * Subscription ID.
     */
    id: string;
    /**
     * PayType
     */
    pay_type: "Card";
    /**
     * Plan ID.
     */
    plan_id: string;
    /**
     * Plan name.
     */
    plan_name: string;
    /**
     * Amount.
     */
    amount: number;
    /**
     * Tax.
     */
    tax: number;
    /**
     * Total amount.
     */
    total_amount: number;
    /**
     * Initial amount.
     */
    initial_amount: number;
    /**
     * Initial tax.
     */
    initial_tax: number;
    /**
     * Initial total amount.
     */
    initial_total_amount: number;
    /**
     * Customer ID.
     */
    customer_id: string;
    /**
     * Shop ID.
     */
    shop_id: string;
    /**
     * Card ID.
     */
    card_id: string;
    /**
     * Status
     *
     * - `ACTIVE`: Active
     * - `RUNNING`: Running
     * - `CANCELED`: Canceled
     * - `INCOMPLETE`: Incomplete
     */
    status: SubscriptionStatus;
    /**
     * Start date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    start_date: string;
    /**
     * Stop date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    stop_date?: string | null;
    /**
     * Next charge date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    next_charge_date?: string | null;
    /**
     * Whether or not this subscription charges at the end of the month.
     */
    end_month_flag: "0" | "1";
    /**
     * Webhook URL.
     */
    send_url?: string | null;
    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Interval pattern
     *
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern: "month" | "year";
    /**
     * Interval count
     *
     * How many intervals are there in a cycle.
     */
    interval_count: 1 | 2 | 3 | 6;
    /**
     * Error code
     */
    error_code?: string | null;
    /**
     * Created date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created_date: string;
    /**
     * Updated date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated_date: string;
};
/**
 * Pagination object for Retrieving subscription result list (used for `GET /v1/subscriptions/{id}/result`)
 */
export type RetrievingSubscriptionResultListQueryParams = Modify<Pagination, {
    /**
     * Payment method used for this subscription.
     */
    pay_type: "Card";
}>;
/**
 * Subscription result object
 */
export type SubscriptionResultObject = {
    /**
     * Subscription ID.
     */
    id: string;
    /**
     * Pay type
     */
    pay_type: "Card";
    /**
     * Status
     */
    status: SubscriptionResultStatus;
    /**
     * Process date
     */
    process_date: string;
    /**
     * Amount
     */
    amount: number;
    /**
     * Tax
     */
    tax: number;
    /**
     * Total amount
     */
    total_amount: number;
    /**
     * Customer ID
     */
    customer_id?: string | null;
    /**
     * Shop ID
     */
    shop_id: string;
    /**
     * Card ID
     */
    card_id?: string | null;
    /**
     * Access ID
     */
    access_id: string;
    /**
     * Webhook URL
     */
    send_url?: string | null;
    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Interval pattern
     *
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern: "month" | "year";
    /**
     * Interval count
     *
     * How many intervals are there in a cycle.
     */
    interval_count: 1 | 2 | 3 | 6;
    /**
     * Error code
     */
    error_code?: string | null;
    /**
     * Created date.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
};
/**
 * Status
 *
 * - `ACTIVE`: Active
 * - `RUNNING`: Running
 * - `CANCELED`: Canceled
 * - `INCOMPLETE`: Incomplete
 */
export type SubscriptionStatus = "ACTIVE" | "RUNNING" | "CANCELED" | "INCOMPLETE";
/**
 * Result Status
 *
 * - `CHRCKED`: Checked the card is valid
 * - `SUCCEEDED: Success
 * - `FAILED`: Failed
 */
export type SubscriptionResultStatus = "CHECKED" | "SUCCEEDED" | "FAILED";
