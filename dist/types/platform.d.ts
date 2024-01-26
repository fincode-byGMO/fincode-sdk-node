import { Modify } from "../utils/utilTypes.js";
import { Pagination } from "./pagination.js";
import * as Shop from "./shop.js";
/**
 * Pagination object for Retrieving platform shops list
 */
export type RetrievingPlatformShopListQueryParams = Modify<Pagination, {
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
}>;
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
