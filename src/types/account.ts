import { Modify } from "../utils/utilTypes"
import { Pagination } from "./pagination"

/**
 * Deposit status code
 * 
 * - `3001`: before deposit amount is confirmed
 * - `3002`: after deposit amount is confirmed
 * - `3003`: already deposited
 * - `3004`: depositing was stopped
 * - `3005`: some errors has occurred during deposit
 * - `3006`: under invoice
 * - `3007`: some errors has occurred during invoice
 * - `3008`: invoice was stopped
 * - `3009`: already invoiced
 * - `3010`: identity verification document is not uploaded
 * - `3011`: deposit has already been completed
 * - `3012`: before deposit
 * - `3013`: contract failed 
 */
export type DepositStatusCode = 3001 | 3002 | 3003 | 3004 | 3005 | 3006 | 3007 | 3008 | 3009 | 3010 | 3011 | 3012 | 3013

/**
 * Account object
 */
/**
 * Breakdown of the fees aggregated into a deposit or a platform fee income.
 * 
 * Deposits and platform fee incomes return these only when retrieved
 * individually. The list endpoints omit them.
 */
export type FeeAmountBreakdown = {
    /**
     * Total of the fees that consumption tax applies to.
     */
    taxable_fee_amount?: number | null

    /**
     * Total of the fees that consumption tax does not apply to.
     */
    nontaxable_fee_amount?: number | null

    /**
     * Total of the fees charged for registering direct debit accounts online.
     */
    web_registration_fee_amount?: number | null

    /**
     * Total of the platform's share of the online registration fees.
     */
    platform_web_registration_fee_amount?: number | null

    /**
     * Total of the fees charged for registering direct debit accounts by paper form.
     */
    paper_registration_fee_amount?: number | null

    /**
     * Total of the platform's share of the paper form registration fees.
     */
    platform_paper_registration_fee_amount?: number | null
}

export type AccountObject = FeeAmountBreakdown & {
    /**
     * Account ID
     */
    account_id: number

    /**
     * Deposit ID
     */
    id: string

    /**
     * Shop ID
     */
    shop_id: string

    /**
     * Scheduled date of deposit.
     * 
     * This is the planned date, not the actual one. The date the deposit
     * was actually made is returned in `deposit_date`.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    scheduled_deposit_date: string

    /**
     * Date the aggregate deposit starts
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_start: string

    /**
     * Date the aggregate deposit ends
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_end: string

    /**
     * Deposit date
     */
    deposit_date?: string | null

    payment_deadline?: string | null
    payment_completion_date?: string | null

    /**
     * Deposit status code
     */
    status_code: DepositStatusCode

    /**
     * Count
     */
    count: number

    /**
     * Settlement amount
     */
    settlement_amount: number

    /**
     * Bank transfer fee
     */
    bank_transfer_fee: number

    /**
     * Total amount
     */
    total_amount: number

    /**
     * Fee amount
     */
    fee_amount: number

    /**
     * Platform fee amount
     */
    platform_fee_amount: number

    /**
     * Platform fee tax amount
     */
    platform_fee_tax_amount: number

    /**
     * tax_amount
     */
    tax_amount: number

    /**
     * Deposit amount
     */
    deposit_amount: number

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
    /**
     * Deposit amount after the deduction of offsetting items.
     */
    deposit_amount_after_deduction?: number | null

    /**
     * Deposit status after the deduction of offsetting items.
     */
    status_code_after_deduction?: DepositStatusCode | null


    /**
     * Bank account the sales are deposited into.
     * 
     * Returned when retrieving a single deposit, not in the list.
     */
    deposit_destination?: DepositDestination | null
}

/**
 * A single item of the deposit list. (used for `GET /v1/accounts`)
 * 
 * The list omits the fee breakdown and the deposit destination. Retrieve a
 * single deposit to get those.
 */
export type AccountListItemObject = Omit<AccountObject,
    | "tax_amount"
    | "taxable_fee_amount"
    | "nontaxable_fee_amount"
    | "web_registration_fee_amount"
    | "platform_web_registration_fee_amount"
    | "paper_registration_fee_amount"
    | "platform_paper_registration_fee_amount"
    | "deposit_destination"
>

/**
 * Bank account the sales are deposited into.
 */
export type DepositDestination = {
    /**
     * Whether the account holder is a corporation.
     */
    corporate?: boolean | null

    /**
     * Corporate name of the recipient.
     */
    recipient_corporate_name?: string | null

    /**
     * Last name of the recipient's representative.
     */
    recipient_representative_last_name?: string | null

    /**
     * First name of the recipient's representative.
     */
    recipient_representative_first_name?: string | null

    bank_name?: string | null
    bank_name_kana?: string | null
    bank_code?: string | null
    branch_name?: string | null
    branch_name_kana?: string | null
    branch_code?: string | null

    /**
     * Account type
     * 
     * - `0`: Savings account (普通預金)
     * - `1`: Current account (当座預金)
     */
    account_kind?: 0 | 1 | null

    account_number?: string | null
    account_name?: string | null
}

/**
 * Query Params object for Retrieving accounts list
 */
export type RetrievingAccountListQueryParams = Modify<Omit<Pagination, "sort">, {
    /**
     * Month the deposit was processed
     */
    processed?: string | null

    /**
     * Status
     */
    status?: DepositStatusCode | null

    /**
     * Deposit scheduled date (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null

    /**
     * Deposit scheduled date (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null
}>

/**
 * Trade type of a deposit detail.
 * 
 * The value decides whether the detail's amount is added to or subtracted from
 * the deposit total.
 * 
 * - `1`: Payment. (added)
 * - `2`: Refund. (subtracted)
 * - `3`: Chargeback. (subtracted)
 * - `4`: Adjustment. (added, but may carry a negative amount)
 * - `5`: Chargeback reversal. (added)
 * - `6`: Fee for a failed direct debit. (subtracted)
 * - `7`: Fee for registering a direct debit account online. (subtracted)
 * - `8`: Fee for registering a direct debit account by paper form. (subtracted)
 * - `10`: Fee for setting an exact deposit amount on a virtual account. (subtracted)
 * - `11`: Fee for registering a static virtual account for a customer. (subtracted)
 * - `12`: Fee for virtual accounts issued for a bulk payment but never used. (subtracted)
 */
export type AccountDetailTradeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11 | 12

/**
 * Payment method used by the payment this deposit detail corresponds to.
 * 
 * - `VM`: Card (VISA / Mastercard)
 * - `JA`: Card (JCB / American Express / Diners Club / Discover)
 * - `KONBINI`: Konbini
 * - `Paypay`: PayPay
 * - `ApplepayVM`: Apple Pay (VISA / Mastercard)
 * - `ApplepayJA`: Apple Pay (JCB / American Express / Discover)
 * - `GooglepayVM`: Google Pay (VISA / Mastercard)
 * - `GooglepayJA`: Google Pay (JCB / American Express / Diners Club)
 * - `Directdebit`: Direct Debit (withdrawal on the 5th, 6th, 23rd and 27th)
 * - `DirectdebitMizuho`: Direct Debit (withdrawal on the 1st, 5th, 20th and 26th)
 * - `Virtualaccount`: Bank transfer (Virtual Account)
 */
export type AccountPaymentMethod =
    | "VM"
    | "JA"
    | "KONBINI"
    | "Paypay"
    | "ApplepayVM"
    | "ApplepayJA"
    | "GooglepayVM"
    | "GooglepayJA"
    | "Directdebit"
    | "DirectdebitMizuho"
    | "Virtualaccount"

/**
 * One line of a deposit's breakdown. (used for `GET /v1/accounts/{id}/detail`)
 * 
 * Each line corresponds to a single payment, refund, chargeback or fee that
 * makes up the deposit.
 */
export type AccountDetailObject = {
    /**
     * Deposit detail ID
     */
    detail_id?: number | null

    /**
     * Deposit ID this detail belongs to.
     */
    account_id?: number | null

    /**
     * Shop ID
     */
    shop_id?: string | null

    /**
     * Scheduled date of the deposit this detail belongs to.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    scheduled_deposit_date?: string | null

    /**
     * What this line represents, and whether it adds to or subtracts from the total.
     */
    trade_type?: AccountDetailTradeType | null

    /**
     * Payment method used by the corresponding payment.
     */
    payment_method?: AccountPaymentMethod | null

    /**
     * Details of the billing correction.
     */
    amount_correction_type?: string | null

    /**
     * Order ID of the corresponding payment.
     */
    order_id?: string | null

    /**
     * Access ID of the corresponding payment.
     */
    access_id?: string | null

    /**
     * Date this line was processed.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    processed_date?: string | null

    /**
     * Start of the aggregation term of the deposit this detail belongs to.
     * 
     * Format: `yyyy/MM/dd`
     */
    aggregate_term_start?: string | null

    /**
     * End of the aggregation term of the deposit this detail belongs to.
     * 
     * Format: `yyyy/MM/dd`
     */
    aggregate_term_end?: string | null

    /**
     * Amount deposited for this line.
     */
    deposit_amount?: number | null

    /**
     * Amount of the corresponding payment, excluding tax and shipping.
     */
    amount?: number | null

    /**
     * Tax and shipping of the corresponding payment.
     */
    tax?: number | null

    // ---
    // Fees charged by fincode
    // ---

    /**
     * Fee rate applied to this line, as a percentage.
     */
    fee_rate_total?: number | null

    /**
     * Fee charged for this line, excluding consumption tax.
     */
    fee_total?: number | null

    /**
     * Fee charged for this line, including consumption tax.
     */
    fee_total_taxin?: number | null

    /**
     * Portion of the fee that is the payment provider's cost.
     */
    fee_cost?: number | null

    /**
     * Portion of the fee that is fincode's revenue, excluding consumption tax.
     */
    fee_profit?: number | null

    /**
     * Consumption tax on `fee_profit`.
     */
    fee_profit_tax?: number | null

    /**
     * Minimum fee charged by fincode, applied when it exceeds the rate-based fee.
     */
    fixed_fee?: number | null

    /**
     * Which of the two fee rules fincode applied to this line.
     * 
     * - `0`: The fee rate was applied.
     * - `1`: The minimum fee was applied.
     */
    apply_type?: 0 | 1 | null

    // ---
    // Direct debit account registration fees
    // ---

    /**
     * Fee for registering a direct debit account online, excluding consumption tax.
     */
    web_registration_fee?: number | null

    /**
     * Fee for registering a direct debit account online, including consumption tax.
     */
    web_registration_fee_taxin?: number | null

    /**
     * Consumption tax on `web_registration_fee`.
     */
    web_registration_fee_tax?: number | null

    /**
     * Fee for registering a direct debit account by paper form, excluding consumption tax.
     */
    paper_registration_fee?: number | null

    /**
     * Fee for registering a direct debit account by paper form, including consumption tax.
     */
    paper_registration_fee_taxin?: number | null

    /**
     * Consumption tax on `paper_registration_fee`.
     */
    paper_registration_fee_tax?: number | null

    // ---
    // Platform's share
    // ---

    /**
     * Platform fee for this line, excluding consumption tax.
     */
    platform_fee?: number | null

    /**
     * Platform fee for this line, including consumption tax.
     */
    platform_fee_taxin?: number | null

    /**
     * Platform fee rate applied to this line, as a percentage.
     * 
     * Returned for tenant shops only.
     */
    platform_fee_rate?: number | null

    /**
     * Minimum platform fee, applied when it exceeds the rate-based fee.
     * 
     * Returned for tenant shops only.
     */
    fixed_fee_for_platform_fee?: number | null

    /**
     * Which of the two fee rules the platform applied to this line.
     * 
     * Returned for tenant shops only.
     * 
     * - `0`: The platform fee rate was applied.
     * - `1`: The minimum platform fee was applied.
     */
    apply_type_for_platform_fee?: 0 | 1 | null

    /**
     * Platform's share of the online registration fee, excluding consumption tax.
     */
    platform_web_registration_fee?: number | null

    /**
     * Platform's share of the online registration fee, including consumption tax.
     */
    platform_web_registration_fee_taxin?: number | null

    /**
     * Consumption tax on `platform_web_registration_fee`.
     */
    platform_web_registration_fee_tax?: number | null

    /**
     * Platform's share of the paper form registration fee, excluding consumption tax.
     */
    platform_paper_registration_fee?: number | null

    /**
     * Platform's share of the paper form registration fee, including consumption tax.
     */
    platform_paper_registration_fee_taxin?: number | null

    /**
     * Consumption tax on `platform_paper_registration_fee`.
     */
    platform_paper_registration_fee_tax?: number | null

    /**
     * Fields where merchants can freely set values, copied from the corresponding payment.
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Date this line was created.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created?: string | null

    /**
     * Date this line was updated.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

/**
 * Query Params object for Retrieving account summary list
 */
// export type RetrievingAccountDetailListQueryParams = Modify<Omit<Pagination, "sort">, {}>
export type RetrievingAccountDetailListQueryParams = Omit<Pagination, "sort">
