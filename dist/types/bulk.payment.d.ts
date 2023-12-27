import { Pagination, Sort } from "./pagination";
import { PayType } from "./payment";
/**
     * Bulk payment object
     */
export type PaymentBulkObject = {
    /**
     * Bulk payment ID.
     */
    id: string;
    /**
     * Shop ID.
     */
    shop_id: string;
    /**
     * Date the process is planned.
     *
     * Format: `yyyy/MM/dd`
     */
    process_plan_date: string;
    /**
     * Status of bulk payment
     *
     * - `CHECKING`: Checking.
     * - `CHECKED`: Checked.
     * - `RUNNING`: Running.
     * - `COMPLETED`: Completed.
     * - `ERROR`: Some error occurred.
     */
    status: PaymentBulkStatus;
    /**
     * Payment method type.
     */
    pay_type: Extract<PayType, "Card">;
    /**
     * File name.
     */
    file_name: string;
    /**
     * Date the payment starts.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    process_start_date?: string | null;
    /**
     * Date the payment ends.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    process_end_date?: string | null;
    /**
     * Total number of payments.
     */
    total_count?: number | null;
    /**
     * Number of successful payments.
     */
    process_success_count?: number | null;
    /**
     * Number of failed payments.
     */
    process_failure_count?: number | null;
    /**
     * Error code
     */
    error_code?: string | null;
    /**
     * Delete flag.
     */
    delete_flag?: "0" | "1" | null;
    /**
     * Created timestamp.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
    /**
     * Updated timestamp.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null;
};
/**
 * Pagination object for Retrieving bulk payments
 */
export declare class RetrievingPaymentBulkPagination implements Pagination {
    /**
     * Maximum number of items to return.
     */
    limit?: string | null;
    /**
     * Number of this page.
     */
    page?: string | null;
    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null;
    /**
     * Sort
     */
    sort?: Sort[] | null;
    /**
     * Date the process is planned. (from)
     *
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_from?: string | null;
    /**
     * Date the process is planned. (to)
     *
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_to?: string | null;
    /**
     * Status of bulk payment
     *
     * - `CHECKING`: Checking.
     * - `CHECKED`: Checked.
     * - `RUNNING`: Running.
     * - `COMPLETED`: Completed.
     * - `ERROR`: Some error occurred.
     */
    status?: PaymentBulkStatus[] | null;
    /**
     * Payment method type.
     */
    pay_type?: "Card" | null;
    /**
     * File name.
     */
    file_name?: string | null;
    /**
     * Delete flag.
     *
     * - `0`: Not deleted.
     * - `1`: Deleted.
     * - `(empty string)`: All.
     */
    delete_flag?: "0" | "1" | null;
    /**
     * Created timestamp. (from)
     *
     * Format: `yyyy/MM/dd`
     */
    created_from?: string | null;
    /**
     * Created timestamp. (to)
     *
     * Format: `yyyy/MM/dd`
     */
    created_to?: string | null;
    constructor(args?: {
        limit?: string | null;
        page?: string | null;
        count_only?: boolean | null;
        sort?: Sort[] | null;
        process_plan_date_from?: string | null;
        process_plan_date_to?: string | null;
        status?: PaymentBulkStatus[] | null;
        pay_type?: "Card" | null;
        file_name?: string | null;
        delete_flag?: "0" | "1" | null;
        created_from?: string | null;
        created_to?: string | null;
    });
    buildParams(): URLSearchParams;
}
/**
 * Request object for Creating bulk payment
 */
export type CreatingPaymentBulkRequest = {};
/**
 * Pagination object for Retrieving bulk payment details
 */
export declare class RetrievingPaymentBulkDetailPagination implements Pagination {
    /**
     * Payment method types
     */
    pay_type: "Card";
    /**
     * Order ID.
     */
    order_id?: string | null;
    /**
     * Status of a payment
     *
     * - `CHECKED`: Checked.
     * - `SUCCEEDED`: Succeeded.
     * - `FAILED`: Failed.
     */
    status?: OnesPaymentStatus[] | null;
    /**
     * Maximum number of items to return.
     */
    limit?: string | null;
    /**
     * Number of this page.
     */
    page?: string | null;
    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null;
    /**
     * Sort
     */
    sort?: Sort[] | null;
    constructor(pay_type: "Card", args?: {
        order_id?: string | null;
        status?: OnesPaymentStatus[] | null;
        limit?: string | null;
        page?: string | null;
        count_only?: boolean | null;
        sort?: Sort[] | null;
    });
    buildParams(): URLSearchParams;
}
/**
 * Object of bulk payment detail
 */
export type PaymentBulkDetailObject = {
    /**
     * Bulk payment ID.
     */
    id: string;
    /**
     * Shop ID.
     */
    shop_id: string;
    /**
     * Order ID.
     */
    order_id: string;
    /**
     * Status of a payment
     */
    status: OnesPaymentStatus;
    /**
     * Access ID.
     */
    access_id: string;
    /**
     * Job code.
     *
     * - `CAPTURE`: Capture.
     */
    job_code: "CAPTURE";
    /**
     * Item code.
     */
    item_code?: string | null;
    /**
     * Amount.
     */
    amount: number;
    /**
     * Tax.
     */
    tax: number | null;
    /**
     * Total amount.
     */
    total_amount: number;
    /**
     * Charging method of card payment.
     *
     * - `1`: The customer will be charged for this payment in a lump-sum.
     * - `2`: The customer will be charged for this payment in several installments.
     */
    method?: "1" | "2" | null;
    /**
     * The number of installments that will charge to the customer in this payment registered as installment payment.
     */
    pay_times?: string | null;
    /**
     * Customer ID.
     */
    customer_id?: string | null;
    /**
     * Card ID.
     */
    card_id?: string | null;
    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null;
    client_field_2?: string | null;
    client_field_3?: string | null;
    /**
     * Transaction ID
     */
    transaction_id?: string | null;
    /**
     * Approve
     */
    approve?: string | null;
    /**
     * Forward
     */
    forward?: string | null;
    /**
     * Error code
     */
    error_code?: string | null;
    /**
     * Created timestamp.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
    /**
     * Updated timestamp.
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null;
};
/**
 * Response object for Deleting bulk payment
 */
export type DeletingPaymentBulkResponse = {
    /**
     * Bulk payment ID.
     */
    id: string;
    /**
     * Whether or not the bulk payment was deleted.
     */
    delete_flag: "0" | "1";
};
/**
 * Status of bulk payment
 *
 * - `CHECKING`: Checking.
 * - `CHECKED`: Checked.
 * - `RUNNING`: Running.
 * - `COMPLETED`: Completed.
 * - `ERROR`: Some error occurred.
 */
export type PaymentBulkStatus = 'CHECKING' | 'CHECKED' | 'RUNNING' | 'COMPLETED' | 'ERROR';
/**
 * Status of a payment
 *
 * - `CHECKED`: Checked.
 * - `SUCCEEDED`: Succeeded.
 * - `FAILED`: Failed.
 */
export type OnesPaymentStatus = 'CHECKED' | 'SUCCEEDED' | 'FAILED';