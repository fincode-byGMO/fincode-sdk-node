import { Pagination, Sort } from "./pagination"

/**
     * Bulk payment object
     */
export type BulkPaymentObject = {
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
    status: BulkPaymentStatus

    /**
     * Payment method type.
     */
    pay_type: "Card"

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
 * Pagination object for Retrieving bulk payments
 */
export class BulkPaymentPagination implements Pagination {
    /**
     * Maximum number of items to return.
     */
    limit?: string | null

    /**
     * Number of this page.
     */
    page?: string | null

    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null

    /**
     * Sort 
     */
    sort?: Sort[] | null

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
    status?: BulkPaymentStatus[] | null

    /**
     * Payment method type.
     */
    pay_type?: "Card" | null

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

    constructor(args?: {
        limit?: string | null
        page?: string | null
        count_only?: boolean | null
        sort?: Sort[] | null
        process_plan_date_from?: string | null
        process_plan_date_to?: string | null
        status?: BulkPaymentStatus[] | null
        pay_type?: "Card" | null
        file_name?: string | null
        delete_flag?: "0" | "1" | null
        created_from?: string | null
        created_to?: string | null
    }) {
        if (args) {
            this.limit = args.limit
            this.page = args.page
            this.count_only = args.count_only
            this.sort = args.sort
            this.process_plan_date_from = args.process_plan_date_from
            this.process_plan_date_to = args.process_plan_date_to
            this.status = args.status
            this.pay_type = args.pay_type
            this.file_name = args.file_name
            this.delete_flag = args.delete_flag
            this.created_from = args.created_from
            this.created_to = args.created_to
        }
    }

    buildParams(): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(this)
            .filter(([key, value]) => value !== undefined)
            .map<[string, string]>(([key, value]) => {
                if (key === "sort" && value) {
                    const v = (value as Sort[]).map((s) => `${s.key} ${s.order}`).join(",")
                    return [key, v]
                } else if (key === "status" && value) {
                    const v = (value as BulkPaymentStatus[]).join(",")
                    return [key, v]
                } else {
                    return [key, value as string]
                }
            })
            .forEach(([key, value]) => params.append(key, value))

        return params
    }
}

/**
 * Request object for Registering bulk payment
 */
export type RegisteringBulkPaymentRequest = {}

/**
 * Pagination object for Retrieving bulk payment details
 */
export class BulkPaymentDetailPagination implements Pagination {
    /**
     * Bulk payment ID.
     */
    id: string

    /**
     * Payment method types
     */
    pay_type: "Card"

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
    status?: OnesPaymentStatus[] | null

    /**
     * Maximum number of items to return.
     */
    limit?: string | null

    /**
     * Number of this page.
     */
    page?: string | null

    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null

    /**
     * Sort 
     */
    sort?: Sort[] | null

    constructor(
        id: string,
        pay_type: "Card",
        args?: {
            order_id?: string | null
            status?: OnesPaymentStatus[] | null
            limit?: string | null
            page?: string | null
            count_only?: boolean | null
            sort?: Sort[] | null
        },
    ) {
        this.id = id
        this.pay_type = pay_type
        if (args) {
            this.order_id = args.order_id
            this.status = args.status
            this.limit = args.limit
            this.page = args.page
            this.count_only = args.count_only
            this.sort = args.sort
        }
    }

    buildParams(): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(this)
            .filter(([key, value]) => value !== undefined)
            .map<[string, string]>(([key, value]) => {
                if (key === "sort" && value) {
                    const v = (value as Sort[]).map((s) => `${s.key} ${s.order}`).join(",")
                    return [key, v]
                } else if (key === "status" && value) {
                    const v = (value as OnesPaymentStatus[]).join(",")
                    return [key, v]
                } else {
                    return [key, value as string]
                }
            }).forEach(([key, value]) => params.append(key, value))


        return params
    }
}

/**
 * Object of bulk payment detail
 */
export type BulkPaymentDetail = {
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
    status: OnesPaymentStatus

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
     */
    method?: "1" | "2" | null

    /**
     * The number of installments that will charge to the customer in this payment registered as installment payment.
     */
    pay_times?: string | null

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
 * Status of bulk payment
 * 
 * - `CHECKING`: Checking.
 * - `CHECKED`: Checked.
 * - `RUNNING`: Running.
 * - `COMPLETED`: Completed.
 * - `ERROR`: Some error occurred.
 */
export type BulkPaymentStatus = 'CHECKING' | 'CHECKED' | 'RUNNING' | 'COMPLETED' | 'ERROR'



/**
 * Status of a payment
 * 
 * - `CHECKED`: Checked.
 * - `SUCCEEDED`: Succeeded.
 * - `FAILED`: Failed.
 */
export type OnesPaymentStatus = 'CHECKED' | 'SUCCEEDED' | 'FAILED'