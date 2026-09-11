import { Modify } from "../utils/utilTypes"
import { Pagination } from "./pagination"
import { CardPayTimesResponse, PaymentObject, PayType } from "./payment"

/**
     * Bulk payment object
     */
export type PaymentBulkObject = {
    /**
     * Bulk payment ID.
     */
    id: string

    /**
     * Shop ID.
     */
    shop_id: string

    /**
     * Date the process is planned.
     * 
     * Format: `yyyy/MM/dd`
     */
    process_plan_date: string

    /**
     * Status of bulk payment
     * 
     * - `CHECKING`: Checking.
     * - `CHECKED`: Checked.
     * - `RUNNING`: Running.
     * - `COMPLETED`: Completed.
     * - `ERROR`: Some error occurred.
     */
    status: PaymentBulkStatus

    /**
     * Payment method type.
     */
    pay_type: PaymentBulkPayType

    /**
     * File name.
     */
    file_name: string

    /**
     * Date the payment starts.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS` 
     */
    process_start_date?: string | null

    /**
     * Date the payment ends.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    process_end_date?: string | null

    /**
     * Total number of payments.
     */
    total_count?: number | null

    /**
     * Number of successful payments.
     */
    process_success_count?: number | null

    /**
     * Number of failed payments.
     */
    process_failure_count?: number | null

    /**
     * Error code
     */
    error_code?: string | null

    /**
     * Delete flag.
     */
    delete_flag?: "0" | "1" | null

    /**
     * Created timestamp.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string

    /**
     * Updated timestamp.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

/**
 * Query Params object for Retrieving bulk payments
 */
export type RetrievingPaymentBulkQueryParams = Modify<Pagination, {
    /**
     * Date the process is planned. (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_from?: string | null

    /**
     * Date the process is planned. (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_to?: string | null

    /**
     * Status of bulk payment
     * 
     * - `CHECKING`: Checking.
     * - `CHECKED`: Checked.
     * - `RUNNING`: Running.
     * - `COMPLETED`: Completed.
     * - `ERROR`: Some error occurred.
     */
    status?: PaymentBulkStatus[] | null

    /**
     * Payment method type.
     */
    pay_type?: PaymentBulkPayType | null

    /**
     * File name.
     */
    file_name?: string | null

    /**
     * Delete flag.
     * 
     * - `0`: Not deleted.
     * - `1`: Deleted.
     * - `(empty string)`: All.
     */
    delete_flag?: "0" | "1" | null

    /**
     * Created timestamp. (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_from?: string | null

    /**
     * Created timestamp. (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_to?: string | null
}>

/**
 * Request object for Creating bulk payment
 */
export type CreatingPaymentBulkRequest = {
    /**
     * JSON file to upload for bulk payment
     */
    file: Buffer | string,
    /**
     * File name of the `file`.
     */
    fileName?: string
}
export type CreatingPaymentBulkQueryParams = {
    /**
     * Payment method type.
     * 
     * - `Card`: Card
     * - `Virtualaccount`: Bank transfer (virtual account)
     */
    pay_type: PaymentBulkPayType,
    /**
     * Date the process is planned.
     * 
     * Format: `yyyy/MM/dd`
     */
    process_plan_date: string
}

/**
 * Pagination object for Retrieving bulk payment details
 */
export type RetrievingPaymentBulkDetailQueryParams = Modify<Pagination, {
    /**
     * Payment method type. Decides the shape of each detail.
     * 
     * - `Card`: Card
     * - `Virtualaccount`: Bank transfer (virtual account)
     */
    pay_type: PaymentBulkPayType

    /**
     * Order ID.
     */
    order_id?: string | null

    /**
     * Status of a payment
     * 
     * - `CHECKED`: Checked.
     * - `SUCCEEDED`: Succeeded.
     * - `FAILED`: Failed.
     */
    status?: PaymentStatusInBulkPayment[] | null
}>

/**
 * Object of bulk payment detail
 */
export type PaymentBulkDetailObject = {
    /**
     * Bulk payment ID.
     */
    id: string

    /**
     * Shop ID.
     */
    shop_id: string

    /**
     * Order ID.
     */
    order_id: string

    /**
     * Status of a payment
     */
    status: PaymentStatusInBulkPayment

    /**
     * Access ID.
     */
    access_id: string

    /**
     * Job code.
     * 
     * - `CAPTURE`: Capture.
     */
    job_code: "CAPTURE"

    /**
     * Item code.
     */
    item_code?: string | null

    /**
     * Amount.
     */
    amount: number

    /**
     * Tax.
     */
    tax: number | null

    /**
     * Total amount.
     */
    total_amount: number

    /**
     * Charging method of card payment.
     * 
     * - `1`: The customer will be charged for this payment in a lump-sum.
     * - `2`: The customer will be charged for this payment in several installments.
     * - `5`: The customer will be charged for this payment on a revolving basis.
     */
    method?: "1" | "2" | "5" | null

    /**
     * The number of installments that will charge to the customer in this payment registered as installment payment.
     */
    pay_times?: CardPayTimesResponse | null

    /**
     * Customer ID.
     */
    customer_id?: string | null

    /**
     * Card ID.
     */
    card_id?: string | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Transaction ID
     */
    transaction_id?: string | null

    /**
     * Approve
     */
    approve?: string | null

    /**
     * Forward
     */
    forward?: string | null

    /**
     * Error code
     */
    error_code?: string | null

    /**
     * Created timestamp.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string

    /**
     * Updated timestamp.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

/**
 * Response object for Deleting bulk payment
 */
export type DeletingPaymentBulkResponse = {
    /**
     * Bulk payment ID.
     */
    id: string

    /**
     * Whether or not the bulk payment was deleted.
     */
    delete_flag: "0" | "1"
}

/**
 * Status of bulk payment
 * 
 * - `CHECKING`: Checking.
 * - `CHECKED`: Checked.
 * - `RUNNING`: Running.
 * - `COMPLETED`: Completed.
 * - `ERROR`: Some error occurred.
 */
export type PaymentBulkStatus = 'CHECKING' | 'CHECKED' | 'RUNNING' | 'COMPLETED' | 'ERROR'



/**
 * Status of a payment
 * 
 * - `CHECKED`: Checked.
 * - `SUCCEEDED`: Succeeded.
 * - `FAILED`: Failed.
 */
export type PaymentStatusInBulkPayment = 'CHECKED' | 'SUCCEEDED' | 'FAILED'

/**
 * Payment methods bulk payment works with.
 * 
 * - `Card`: Card
 * - `Virtualaccount`: Bank transfer (virtual account)
 */
export type PaymentBulkPayType = Extract<PayType, "Card" | "Virtualaccount">

/**
 * Bulk payment detail of a bank transfer (virtual account) payment.
 * 
 * The detail of a card payment is {@link PaymentBulkDetailObject}. Neither
 * carries `pay_type`, so which shape arrives follows the `pay_type` given in
 * the query.
 */
export type VirtualAccountPaymentBulkDetailObject = Partial<Pick<PaymentObject,
    | "shop_id"
    | "access_id"
    | "customer_id"
    | "billing_amount"
    | "billing_tax"
    | "billing_total_amount"
    | "payment_method_id"
    | "va_branch_code"
    | "va_branch_name"
    | "va_account_number"
    | "va_account_name"
    | "virtual_account_id"
    | "account_assignment_date"
    | "transaction_date"
    | "value_date"
    | "remitter_account_name"
    | "remitter_bank_name"
    | "remitter_branch_name"
    | "overpayment_flag"
    | "cancel_overpayment_flag"
    | "expire_overpayment_flag"
    | "client_field_1"
    | "client_field_2"
    | "client_field_3"
    | "payment_term_day"
    | "payment_term"
    | "use_exact_deposit_amount"
>> & {
    /**
     * Bulk payment ID this detail belongs to.
     */
    id?: string | null

    /**
     * Order ID of the payment.
     */
    order_id?: string | null

    /**
     * Status of this payment.
     * 
     * - `CHECKED`: Checked.
     * - `SUCCEEDED`: Succeeded.
     * - `FAILED`: Failed.
     */
    status?: PaymentStatusInBulkPayment | null

    /**
     * Order ID whose virtual account this payment reuses.
     */
    reference_order_id?: string | null

    /**
     * Error code of the most recent error, when there was one.
     */
    error_code?: string | null

    /**
     * Date this detail was created.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created?: string | null

    /**
     * Date this detail was updated.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}
