import { DepositDestination, FeeAmountBreakdown } from "./account"
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
export type PlatformDepositStatusCode = 3001 | 3002 | 3003 | 3004 | 3005 | 3006 | 3007 | 3008 | 3009 | 3010 | 3011 | 3012 | 3013

/**
 * Platform account object
 */
export type PlatformAccountObject = FeeAmountBreakdown & {
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
    status_code: PlatformDepositStatusCode

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
     * Whether the income has been verified.
     * 
     * @deprecated This is a closed feature.
     */
    verified: boolean

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
     * Bank account the platform fee income is deposited into.
     * 
     * Returned when retrieving a single income, not in the list.
     */
    deposit_destination?: DepositDestination | null
}

/**
 * A single item of the platform fee income list. (used for `GET /v1/platform_accounts`)
 * 
 * The list omits the fee breakdown and the deposit destination. Retrieve a
 * single income to get those.
 */
export type PlatformAccountListItemObject = Omit<PlatformAccountObject,
    | "taxable_fee_amount"
    | "nontaxable_fee_amount"
    | "web_registration_fee_amount"
    | "platform_web_registration_fee_amount"
    | "paper_registration_fee_amount"
    | "platform_paper_registration_fee_amount"
    | "deposit_destination"
>

/**
 * Query Params object for Retrieving platform accounts list
 */
export type RetrievingPlatformAccountListQueryParams = Modify<Omit<Pagination, "sort">, {
    /**
     * Month the account was fixed at
     */
    processed?: string | null

    /**
     * deposit status
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
    status?: PlatformDepositStatusCode | null

    /**
     * deposit scheduled date
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled?: string | null

    /**
     * deposit scheduled date (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null

    /**
     * deposit scheduled date (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null
}>

/**
 * One tenant's contribution to a platform fee income.
 * (used for `GET /v1/platform_accounts/{id}/summary`)
 * 
 * The income is broken down per tenant shop, so each item carries the tenant
 * shop it came from.
 */
export type PlatformAccountSummaryObject = FeeAmountBreakdown & {
    /**
     * Summary ID
     */
    summary_id: number

    /**
     * Platform fee income ID this summary belongs to.
     */
    account_id: number

    /**
     * Shop ID of the platform shop.
     */
    shop_id: string

    /**
     * Tenant shop this summary is for.
     */
    tenant_shop_id?: string | null

    /**
     * Name of the tenant shop this summary is for.
     */
    tenant_shop_name?: string | null

    /**
     * Scheduled date of the income this summary belongs to.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    scheduled_deposit_date?: string | null

    /**
     * Start of the aggregation term.
     * 
     * Format: `yyyy/MM/dd`
     */
    aggregate_term_start: string

    /**
     * End of the aggregation term.
     * 
     * Format: `yyyy/MM/dd`
     */
    aggregate_term_end: string

    /**
     * Number of payments aggregated into this summary.
     */
    count: number

    /**
     * Total amount of the payments aggregated into this summary.
     */
    total_amount: number

    /**
     * Total of the fees charged for this tenant shop.
     */
    fee_amount: number


    /**
     * Platform fee for this tenant shop, excluding consumption tax.
     */
    platform_fee_amount: number

    /**
     * Consumption tax on the platform fee.
     */
    platform_fee_tax_amount: number

    /**
     * Total consumption tax in this summary.
     */
    tax_amount: number

    /**
     * Amount deposited to the platform from this tenant shop.
     */
    deposit_amount: number

    /**
     * Deposit IDs of the tenant shop that were aggregated into this summary.
     */
    tenant_account_process_id_list?: string[] | null

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
 * Pagination object for Retrieving platform account summary list
 */
export type RetrievingPlatformAccountSummaryListQueryParams = Omit<Pagination, "sort"> & {
    /**
     * Date the deposit is scheduled (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null

    /**
     * Date the deposit is scheduled (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null
}
