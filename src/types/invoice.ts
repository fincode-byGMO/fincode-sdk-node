import { Modify } from "../utils/utilTypes"
import { Pagination } from "./pagination"
import { PayType, ThreeDSecure2RequestFields } from "./payment"
import { DirectDebitSettlementRoute } from "./paymentMethod"

/**
 * Status of an invoice.
 * 
 * - `DRAFT`: Draft. Not yet sent to the customer.
 * - `AWAITING_CUSTOMER_PAYMENT`: Waiting for the customer to pay.
 * - `PAID`: Paid.
 * - `CANCELED`: Canceled.
 */
export type InvoiceStatus = "DRAFT" | "AWAITING_CUSTOMER_PAYMENT" | "PAID" | "CANCELED"

/**
 * Payment methods an invoice can be paid with.
 */
export type InvoicePayType = Extract<PayType, "Card" | "Directdebit" | "Virtualaccount">

/**
 * How the amount of each line is given.
 * 
 * - `null`: by unit price (default)
 * - `amount`: by tax-included amount
 */
export type InvoiceInputType = "amount"

/**
 * Customer (billed party) of an invoice.
 */
export type InvoiceCustomer = {
    /**
     * Addressee.
     */
    name?: string | null

    /**
     * Email address.
     */
    email?: string | null

    /**
     * ISO 3166-1 numeric country code of the address.
     */
    addr_country?: string | null

    /**
     * Prefecture code of the address.
     */
    addr_state?: string | null

    /**
     * City of the address.
     */
    addr_city?: string | null
    /**
     * Town and block of the address.
     */
    addr_line_1?: string | null
    /**
     * Building and room number of the address.
     */
    addr_line_2?: string | null
    /**
     * Rest of the address.
     */
    addr_line_3?: string | null
    /**
     * Postal code of the address.
     */
    addr_post_code?: string | null
}

/**
 * Issuer of an invoice.
 */
export type InvoiceIssuer = {
    /**
     * Issuer name.
     */
    name?: string | null

    /**
     * Registration number as a qualified invoice issuer.
     */
    invoice_registration_number?: string | null

    /**
     * Prefecture code of the address.
     */
    addr_state?: string | null

    /**
     * City of the address.
     */
    addr_city?: string | null
    /**
     * Town and block of the address.
     */
    addr_line_1?: string | null
    /**
     * Building and room number of the address.
     */
    addr_line_2?: string | null
    /**
     * Rest of the address.
     */
    addr_line_3?: string | null
    /**
     * Postal code of the address.
     */
    addr_post_code?: string | null
    /**
     * Email address.
     */
    email?: string | null
    /**
     * Phone number.
     */
    phone_number?: string | null
}

/**
 * Line of an invoice.
 */
export type InvoiceLine = {
    /**
     * Format: `yyyy/MM/dd`
     */
    date?: string | null

    /**
     * Item name.
     */
    name?: string | null

    /**
     * Unit price.
     */
    unit_price?: number | null
    quantity?: number | null

    /**
     * Tax rate in percent.
     */
    tax_rate?: number | null

    /**
     * Tax-included amount.
     * 
     * Used when `input_type` is `amount`.
     */
    tax_included_amount?: number | null
}

/**
 * Card payment settings of an invoice.
 */
export type InvoiceCard = {
    /**
     * Job code.
     */
    job_code?: string | null

    /**
     * Defines the behavior of 3D Secure 2.
     */
    tds_type?: string | null

    /**
     * Defines the behavior when the card does not support 3D Secure 2.
     */
    tds2_type?: string | null

    /**
     * The value will be used as your business name in redirect page of 3D Secure.
     */
    td_tenant_name?: string | null
} & ThreeDSecure2RequestFields

/**
 * Bank transfer (virtual account) settings of an invoice.
 */
export type InvoiceVirtualAccount = {
    /**
     * ID of the invoice whose virtual account is reused.
     */
    reference_invoice_id?: string | null

    /**
     * Whether an exact deposit amount is set on the virtual account.
     * 
     * When set, the customer cannot transfer an amount other than the billed
     * one.
     */
    use_exact_deposit_amount?: boolean | null
}

/**
 * Virtual account issued for an invoice.
 * 
 * Paying into this account settles the invoice.
 */
export type InvoiceEmbeddedVirtualAccount = {
    /**
     * Virtual account ID.
     */
    virtual_account_id?: string | null
    /**
     * Branch name.
     */
    branch_name?: string | null
    /**
     * Branch code.
     */
    branch_code?: string | null
    /**
     * Account number.
     */
    account_number?: string | null
    /**
     * Account holder name.
     */
    account_name?: string | null
}

/**
 * Direct debit settings of an invoice.
 */
export type InvoiceDirectDebit = {
    /**
     * Payment method ID of the bank account the debit is taken from.
     */
    payment_method_id?: string | null

    /**
     * Date the debit is taken.
     * 
     * Format: `yyyy/MM/dd`
     */
    target_date?: string | null

    /**
     * Usage details that will be displayed on the customer's bank statement.
     */
    remarks?: string | null

    /**
     * Transfer service the bank account is registered with.
     * 
     * - `1`: Direct debit on the 5th, 6th, 23rd and 27th.
     * - `2`: Direct debit on the 1st, 5th, 20th and 26th.
     */
    settlement_route?: DirectDebitSettlementRoute | null

    /**
     * Flag to notify the issuer when the debit fails.
     * 
     * - `0`: Do not send
     * - `1`: Send
     */
    directdebit_failure_mail_send_flag?: "0" | "1" | null
}

/**
 * Bank account the invoice is debited from.
 */
export type InvoiceEmbeddedDirectDebit = {
    /**
     * Bank name.
     */
    bank_name?: string | null
    /**
     * Bank code.
     */
    bank_code?: string | null
    /**
     * Branch name.
     */
    branch_name?: string | null
    /**
     * Branch code.
     */
    branch_code?: string | null
    /**
     * Account type.
     */
    account_type?: string | null
    /**
     * Account number.
     */
    account_number?: string | null
    /**
     * Account holder name in katakana.
     */
    account_name_kana?: string | null
}

/**
 * Payment an invoice was attached to after the fact.
 * 
 * Set when an invoice (receipt) was issued for a payment that already existed.
 */
export type InvoiceBackfill = {
    /**
     * Order ID of the payment.
     */
    order_id?: string | null

    /**
     * Access ID of the payment.
     */
    access_id?: string | null

    /**
     * Date the payment was paid.
     * 
     * Format: `yyyy/MM/dd`
     */
    paid_date?: string | null
}

/**
 * Invoice Object
 */
export type InvoiceObject = {
    /**
     * Invoice ID.
     */
    id: string

    /**
     * Status of this invoice.
     */
    status?: InvoiceStatus | null

    /**
     * URL of the page the customer pays on.
     */
    invoice_url?: string | null

    /**
     * Flag to send the bill email or not.
     * 
     * - `0`: Do not send
     * - `1`: Send
     */
    bill_mail_send_flag?: "0" | "1" | null

    /**
     * URL of the page that shows the bill.
     * 
     * @deprecated The customer can reach this page from `invoice_url`.
     */
    bill_pdf_url?: string | null

    /**
     * Flag to send the receipt email or not.
     * 
     * - `0`: Do not send
     * - `1`: Send
     */
    receipt_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send the email that bills the difference or not.
     * 
     * - `0`: Do not send
     * - `1`: Send
     */
    underpayment_mail_send_flag?: "0" | "1" | null

    /**
     * URL of the page that shows the receipt.
     * 
     * @deprecated The customer can reach this page from `invoice_url` once the
     * invoice is paid.
     */
    receipt_pdf_url?: string | null

    /**
     * Bill number.
     */
    invoice_number?: string | null

    /**
     * Customer (billed party) ID.
     */
    customer_id?: string | null

    /**
     * Honorific placed after the customer's name.
     */
    customer_honorific?: string | null

    /**
     * Customer (billed party) registered in fincode.
     */
    customer?: InvoiceCustomer | null

    /**
     * Customer information that overrides `customer` on this invoice.
     */
    customer_overwrite?: InvoiceCustomer | null

    /**
     * Issuer of this invoice.
     */
    issuer?: InvoiceIssuer | null

    /**
     * Issuer information that overrides `issuer` on this invoice.
     */
    issuer_overwrite?: Omit<InvoiceIssuer, "name" | "invoice_registration_number"> | null

    /**
     * Date of issue.
     * 
     * Format: `yyyy/MM/dd`
     */
    issue_date?: string | null

    /**
     * Lines of this invoice.
     */
    lines?: InvoiceLine[] | null

    /**
     * Total amount of the lines.
     */
    total_amount?: number | null

    /**
     * Total amount billed.
     */
    billing_total_amount?: number | null

    /**
     * Payment methods this invoice can be paid with.
     */
    pay_types?: InvoicePayType[] | null

    /**
     * How the amount of each line is given.
     */
    input_type?: InvoiceInputType | null

    /**
     * Card payment settings.
     */
    card?: InvoiceCard | null

    /**
     * Bank transfer (virtual account) settings.
     */
    virtual_account?: InvoiceVirtualAccount | null

    /**
     * Virtual account issued for this invoice.
     */
    embedded_virtual_account?: InvoiceEmbeddedVirtualAccount | null

    /**
     * Whether the amounts are shown tax-included.
     * 
     * - `true`: tax-included
     * - `false`: tax-excluded
     */
    is_tax_included?: boolean | null

    /**
     * Due date.
     * 
     * Format: `yyyy/MM/dd`
     */
    due_date?: string | null

    /**
     * Note.
     */
    memo?: string | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Whether this invoice is considered hard to collect.
     */
    is_uncollectible?: boolean | null

    /**
     * Whether this invoice was paid outside fincode.
     */
    is_paid_externally?: boolean | null

    /**
     * Date the payment completed.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    transaction_date?: string | null

    /**
     * Bill ID
     */
    bill_id?: string | null

    /**
     * Direct debit settings.
     */
    directdebit?: InvoiceDirectDebit | null

    /**
     * Bank account this invoice is debited from.
     */
    embedded_directdebit?: InvoiceEmbeddedDirectDebit | null

    /**
     * Payment this invoice was attached to after the fact.
     */
    invoice_backfill?: InvoiceBackfill | null

    /**
     * Company stamp, base64 encoded.
     * 
     * Returned by retrieving and opening an invoice.
     */
    company_stamp_data?: string | null

    /**
     * Date this invoice was created.
     */
    created?: string | null

    /**
     * Date this invoice was updated.
     */
    updated?: string | null
}

/**
 * Invoice Object returned in a list.
 * 
 * A list holds the customer and issuer names as plain strings instead of the
 * objects the single-invoice response carries, and leaves out the payment
 * settings.
 */
export type InvoiceListItemObject = {
    /**
     * Invoice ID.
     */
    id: string

    /**
     * Status of this invoice.
     */
    status?: InvoiceStatus | null

    /**
     * URL of the page that shows the bill.
     * 
     * @deprecated The customer can reach this page from `invoice_url`.
     */
    bill_pdf_url?: string | null

    /**
     * URL of the page that shows the receipt.
     * 
     * @deprecated The customer can reach this page from `invoice_url` once the
     * invoice is paid.
     */
    receipt_pdf_url?: string | null

    /**
     * Bill number.
     */
    invoice_number?: string | null

    /**
     * Bill ID
     */
    bill_id?: string | null

    /**
     * Payment this invoice was attached to after the fact.
     */
    invoice_backfill?: InvoiceBackfill | null

    /**
     * Customer (billed party) ID.
     */
    customer_id?: string | null

    /**
     * Addressee of the customer.
     */
    customer_name?: string | null

    /**
     * Addressee that overrides `customer_name` on this invoice.
     */
    overwrite_customer_name?: string | null

    /**
     * Date of issue.
     * 
     * Format: `yyyy/MM/dd`
     */
    issue_date?: string | null

    /**
     * Total amount of the lines.
     */
    total_amount?: number | null

    /**
     * Total amount billed.
     */
    billing_total_amount?: number | null

    /**
     * Payment methods this invoice can be paid with.
     */
    pay_types?: InvoicePayType[] | null

    /**
     * Due date.
     * 
     * Format: `yyyy/MM/dd`
     */
    due_date?: string | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Whether this invoice is considered hard to collect.
     */
    is_uncollectible?: boolean | null

    /**
     * Whether this invoice was paid outside fincode.
     */
    is_paid_externally?: boolean | null

    /**
     * Date the payment completed.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    transaction_date?: string | null

    /**
     * Date this invoice was created.
     */
    created?: string | null

    /**
     * Date this invoice was updated.
     */
    updated?: string | null
}

/**
 * Query parameters of Retrieving a list of invoices. (used for GET /v1/invoices)
 */
export type RetrievingInvoiceListQueryParams = Modify<Pagination, {
    /**
     * Status of the invoice.
     * 
     * Multiple values narrow the list down to invoices in any of them.
     */
    status?: InvoiceStatus | InvoiceStatus[] | null

    /**
     * Keyword.
     * 
     * Matches invoices where any of `client_field_1` to `client_field_3`
     * contains it.
     */
    keyword?: string | null

    /**
     * Due date (from). Format: `yyyy/MM/dd`
     */
    due_date_from?: string | null

    /**
     * Due date (to). Format: `yyyy/MM/dd`
     */
    due_date_to?: string | null

    /**
     * Date of issue (from). Format: `yyyy/MM/dd`
     */
    issue_date_from?: string | null

    /**
     * Date of issue (to). Format: `yyyy/MM/dd`
     */
    issue_date_to?: string | null

    /**
     * Upper bound of the total amount.
     */
    total_amount_max?: number | null

    /**
     * Lower bound of the total amount.
     */
    total_amount_min?: number | null

    /**
     * Created date (from). Format: `yyyy/MM/dd`
     */
    created_from?: string | null

    /**
     * Created date (to). Format: `yyyy/MM/dd`
     */
    created_to?: string | null

    /**
     * Customer ID. Matches exactly.
     */
    customer_id?: string | null

    /**
     * Addressee of the customer. Matches partially.
     */
    customer_name?: string | null

    /**
     * Bill number. Matches exactly.
     */
    invoice_number?: string | null

    /**
     * Date of a line (from). Format: `yyyy/MM/dd`
     */
    lines_date_from?: string | null

    /**
     * Date of a line (to). Format: `yyyy/MM/dd`
     */
    lines_date_to?: string | null

    /**
     * Date the payment completed (from). Format: `yyyy/MM/dd`
     */
    transaction_date_from?: string | null

    /**
     * Date the payment completed (to). Format: `yyyy/MM/dd`
     */
    transaction_date_to?: string | null

    /**
     * Whether the invoice is marked as hard to collect.
     * 
     * Leave it out to get both.
     */
    is_uncollectible?: boolean | null

    /**
     * Whether the invoice was issued for a payment that already existed.
     * 
     * Leave it out to get both.
     */
    is_backfill?: boolean | null
}>

/**
 * Fields shared by registering and updating an invoice.
 */
type InvoiceRequestCommonFields = {
    /**
     * Flag to send the bill email or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    bill_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send the receipt email or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    receipt_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send the email that bills the difference or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    underpayment_mail_send_flag?: "0" | "1" | null

    /**
     * Bill number.
     * 
     * Assigned automatically when the invoice is opened without one.
     */
    invoice_number?: string | null

    /**
     * Customer (billed party) ID.
     */
    customer_id?: string | null

    /**
     * Honorific placed after the customer's name.
     */
    customer_honorific?: string | null

    /**
     * Customer information that overrides the registered customer on this
     * invoice.
     */
    customer_overwrite?: InvoiceCustomer | null

    /**
     * Issuer information that overrides the registered issuer on this invoice.
     * 
     * Leave it out to use the information submitted when applying for the live
     * environment.
     */
    issuer_overwrite?: Omit<InvoiceIssuer, "name" | "invoice_registration_number"> | null

    /**
     * Whether the amounts are shown tax-included.
     * 
     * - `true`: tax-included
     * - `false`: tax-excluded
     */
    is_tax_included?: boolean | null

    /**
     * Due date.
     * 
     * Format: `yyyy/MM/dd`
     */
    due_date?: string | null

    /**
     * Note.
     */
    memo?: string | null

    /**
     * Lines of this invoice.
     */
    lines?: InvoiceLine[] | null

    /**
     * Payment methods to make available on this invoice.
     */
    pay_types?: InvoicePayType[] | null

    /**
     * How the amount of each line is given.
     */
    input_type?: InvoiceInputType | null

    /**
     * Card payment settings.
     */
    card?: Modify<InvoiceCard, {
        /**
         * Job code.
         * 
         * - `AUTH`: Authorization (default)
         * - `CAPTURE`: Capture
         */
        job_code?: "AUTH" | "CAPTURE" | null
    }> | null

    /**
     * Bank transfer (virtual account) settings.
     */
    virtual_account?: InvoiceVirtualAccount | null

    /**
     * Direct debit settings.
     * 
     * `settlement_route` is decided by the payment method and cannot be given
     * here.
     */
    directdebit?: Omit<InvoiceDirectDebit, "settlement_route"> | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Payment to attach this invoice to after the fact.
     */
    invoice_backfill?: InvoiceBackfill | null
}

/**
 * Request body of Registering an invoice (used for POST /v1/invoices)
 */
export type CreatingInvoiceRequest = InvoiceRequestCommonFields & {
    /**
     * Invoice ID.
     * 
     * Must be unique within the shop. Generated automatically when left out.
     */
    id?: string | null
}

/**
 * Request body of Updating an invoice (used for PUT /v1/invoices/{id})
 */
export type UpdatingInvoiceRequest = InvoiceRequestCommonFields & {
    /**
     * Whether to mark this invoice as hard to collect.
     */
    is_uncollectible?: boolean | null
}

/**
 * Request body of Opening an invoice (used for PUT /v1/invoices/{id}/open)
 * 
 * These flags take precedence over the ones given when registering or
 * updating the invoice.
 */
export type OpeningInvoiceRequest = {
    /**
     * Flag to send the bill email or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    bill_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send the receipt email or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    receipt_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send the email that bills the difference or not.
     * 
     * - `0`: Do not send (default)
     * - `1`: Send
     */
    underpayment_mail_send_flag?: "0" | "1" | null
}

/**
 * Request body of Marking an invoice as paid outside fincode
 * (used for PUT /v1/invoices/{id}/paid_externally)
 */
export type MarkingInvoicePaidExternallyRequest = {
    /**
     * Date the payment completed.
     * 
     * Format: `yyyy/MM/dd`
     */
    transaction_date?: string | null
}

/**
 * Response object of Deleting an invoice (used for DELETE /v1/invoices/{id})
 */
export type DeletingInvoiceResponse = {
    /**
     * Invoice ID that has just been deleted.
     */
    id: string

    /**
     * Delete flag.
     * 
     * - `1`: Deleted
     */
    delete_flag: "0" | "1"
}
