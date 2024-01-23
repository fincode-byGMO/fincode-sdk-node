import { Modify } from "../utils/utilTypes";
import { Pagination } from "./pagination";
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
export type PlatformDepositStatusCode = 3001 | 3002 | 3003 | 3004 | 3005 | 3006 | 3007 | 3008 | 3009 | 3010 | 3011 | 3012 | 3013;
/**
 * Platform account object
 */
export type PlatformAccountObject = {
    /**
     * Account ID
     */
    account_id: number;
    /**
     * Deposit ID
     */
    id: string;
    /**
     * Shop ID
     */
    shop_id: string;
    /**
     * Date of deposit
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    schedled_deposit_date: string;
    /**
     * Date the aggregate deposit starts
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_start: string;
    /**
     * Date the aggregate deposit ends
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_end: string;
    /**
     * Deposit date
     */
    deposit_date?: string | null;
    payment_deadline?: string | null;
    payment_completion_date?: string | null;
    /**
     * Deposit status code
     */
    status_code: PlatformDepositStatusCode;
    /**
     * Count
     */
    count: number;
    /**
     * Settlement amount
     */
    settlement_amount: number;
    /**
     * Bank transfer fee
     */
    bank_transfer_fee: number;
    /**
     * Total amount
     */
    total_amount: number;
    /**
     * Fee amount
     */
    fee_amount: number;
    /**
     * Platform fee amount
     */
    platform_fee_amount: number;
    /**
     * Platform fee tax amount
     */
    platform_fee_tax_amount: number;
    /**
     * tax_amount
     */
    tax_amount: number;
    /**
     * Deposit amount
     */
    deposit_amount: number;
    /**
     * Verified flag
     */
    verified: boolean;
    /**
     * Created timestamp
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
    /**
     * Updated timestamp
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null;
};
/**
 * Query Params object for Retrieving platform accounts list
 */
export type RetrievingPlatformAccountListQueryParams = Modify<Omit<Pagination, "sort">, {
    /**
     * Month the account was fixed at
     */
    processed?: string | null;
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
    status?: PlatformDepositStatusCode | null;
    /**
     * deposit scheduled date
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled?: string | null;
    /**
     * deposit scheduled date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null;
    /**
     * deposit scheduled date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null;
}>;
/**
 * Account summary object
 */
export type PlatformAccountSummaryObject = {
    /**
     * Summary ID
     */
    summary_id: number;
    /**
     * Account ID
     */
    account_id: number;
    /**
     * Shop ID
     */
    shop_id: string;
    /**
     * Date the deposit is scheduled
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    scheduled_deposit_date: string;
    /**
     * Date the aggregate deposit starts
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_start: string;
    /**
     * Date the aggregate deposit ends
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    aggregate_term_end: string;
    /**
     * Deposit date
     *
     * Format: `yyyy/MM/dd HH:mm`
     */
    deposit_date?: string | null;
    /**
     * Count
     */
    count: number;
    /**
     * Settlement amount
     */
    settlement_amount: number;
    /**
     * Bank transfer fee
     */
    bank_transfer_fee: number;
    /**
     * Total amount
     */
    total_amount: number;
    /**
     * Fee amount
     */
    fee_amount: number;
    /**
     * Platform fee amount
     */
    platform_fee_amount: number;
    /**
     * Platform fee tax amount
     */
    platform_fee_tax_amount: number;
    /**
     * Tax amount
     */
    tax_amount: number;
    /**
     * Deposit amount
     */
    deposit_amount: number;
    /**
     * Verified flag
     */
    verified: boolean;
    /**
     * Created timestamp
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string;
    /**
     * Updated timestamp
     *
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null;
};
/**
 * Pagination object for Retrieving platform account summary list
 */
export type RetrievinggPlatformAccountSummaryListPagination = Omit<Pagination, "sort"> & {
    /**
     * Date the deposit is scheduled (from)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null;
    /**
     * Date the deposit is scheduled (to)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null;
};
