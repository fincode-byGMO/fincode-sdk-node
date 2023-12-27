import { Pagination, Sort } from "./pagination";
import { SearchParams } from "./searchParams";
import * as Shop from "./shop";
/**
 * Search Params object for Retrieving platform shops list
 */
export declare class PlatformShopsSearchParams implements SearchParams {
    id?: string | null;
    shop_name?: string | null;
    shop_mail_address?: string | null;
    created_from?: string | null;
    created_to?: string | null;
    buildParams(): URLSearchParams;
}
/**
 * Pagination object for Retrieving platform shops list
 */
export declare class RetrievingPlatformShopListPagination implements Pagination {
    /**
     * Shop ID
     */
    id?: string | null;
    /**
     * Shop name
     */
    shop_name?: string | null;
    /**
     * Shop email address
     */
    shop_mail_address?: string | null;
    /**
     * Created timestamp (from)
     *
     * Format: `yyyy/MM/dd`
     */
    created_from?: string | null;
    /**
     * Created timestamp (to)
     *
     * Format: `yyyy/MM/dd`
     */
    created_to?: string | null;
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
    buildParams(): URLSearchParams;
}
/**
 * Request object for Updating platform shop
 */
export type UpdatingPlatformRequest = {
    /**
     * Examination master ID
     *
     * - `vm`: Visa/Mastercard
     * - `jad`: JCB/American Express/Diners
     * - `konbini`: Konbini
     */
    examination_master_id?: Shop.ExaminationMaster | null;
    /**
     * Platform rate
     */
    platform_rate?: string | null;
    /**
     * Fixed fee
     */
    fixed_fee?: string | null;
};