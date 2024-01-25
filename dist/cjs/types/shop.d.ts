/**
     * Platform shop object
     */
export type ShopObject = {
    /**
     *  Shop ID
     */
    id: string;
    /**
     * Platform ID
     */
    platform_id: string;
    /**
     * Shop password (masked)
     */
    shop_password: string;
    /**
     * Shop name
     */
    shop_name: string;
    /**
     * Shop name kana
     */
    shop_name_kana?: string | null;
    /**
     * Email address of the shop
     */
    shop_mail_address?: string | null;
    /**
     * Email address to send notifications to
     */
    send_mail_address?: string | null;
    /**
     * Customer group ID
     */
    customer_group_id?: string | null;
    /**
     * Days to keep logs
     */
    log_keep_days?: string | null;
    /**
     * API version
     */
    api_version?: string | null;
    /**
     * Shop type
     *
     * - `(null)`: Standard shop
     * - `platform`: Platform
     * - `tenant`: Tenant (child shop of platform)
     */
    shop_type: ShopType;
    /**
     * Platform name
     */
    platform_name?: string | null;
    /**
     * Flag customers are shared between tenants.
     *
     * - `0`: Not shared
     * - `1`: Shared
     */
    shared_customer_flag: "0" | "1";
    /**
     * Platform rate config list
     */
    platform_rate_list?: PlatformRateConfig[] | null;
    /**
     * API Key displayed flag
     *
     * - `0`: Not displayed on dashboard
     * - `1`: Displayed on dashboard
     */
    api_key_display_flag: "0" | "1";
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
 * Examination master
 *
 * - `vm`: Visa/Mastercard
 * - `jad`: JCB/American Express/Diners
 * - `konbini`: Konbini
 */
export type ExaminationMaster = "vm" | "jad" | "konbini";
/**
 * Deposit cycle master ID
 *
 * - `1`: 1 time closing per month  with payment on the last day of the following month
 * - `2`: 2 times closing per month with payment 15 days after each closing
 * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
 * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
 * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
 */
export type DepositCycleMasterId = 1 | 2 | 3 | 4 | 5;
/**
 * Shop Type
 *
 * - `null`: Standard shop
 * - `platform`: Platform shop (includes Platform Sub shop)
 * - `tenant`: Tenant shop (child shop of Platform)
 */
export type ShopType = null | "platform" | "tenant";
/**
 * Information for Specified Commercial Transaction Act
 */
export type SpecifiedCommercialTransactionActInfo = {
    /**
     * Shop distributor name
     */
    shop_distributor_name?: string | null;
    /**
     * Shop sales manager name
     */
    shop_sales_manager_name?: string | null;
    /**
     * Service name
     */
    shop_service_name?: string | null;
    /**
     * Support TEL
     */
    shop_support_tel?: string | null;
    /**
     * Support email address
     */
    shop_support_mail?: string | null;
    /**
     * Postal code
     */
    shop_post_code?: string | null;
    /**
     * Shop address: Prefecture
     */
    shop_prefecture?: string | null;
    /**
     * Shop address: Municipality / City
     */
    shop_address_municipality?: string | null;
    /**
     * Shop address: Section / Line 1
     */
    shop_address_section?: string | null;
    /**
     * Shop address: Chrome / Line 2
     */
    shop_address_chrome?: string | null;
    /**
     * Shop address: Building name
     */
    shop_address_building_name?: string | null;
    /**
     * Shop address: Building name (kana)
     */
    shop_address_building_name_kana?: string | null;
    /**
     * Payment method
     */
    shop_payment_method?: string | null;
    /**
     * Shop charge description
     */
    shop_charge_description?: string | null;
    /**
     * Product delivery time
     *
     * TODO: deliever -> delivery (API returns `delievery`)
     */
    shop_product_delievery_time?: string | null;
    /**
     * Conditions of returning goods
     */
    shop_return_goods_handing_conditions?: string | null;
};
/**
 * Platform rate config object
 */
export type PlatformRateConfig = {
    /**
     * Examination master ID
     *
     * - `vm`: Visa/Mastercard
     * - `jad`: JCB/American Express/Diners
     * - `konbini`: Konbini
     */
    id: string;
    /**
     * Platform rate
     */
    platform_rate: number;
    /**
     * Fixed fee
     */
    fixed_fee?: number | null;
};
/**
 * Item detail
 */
export type ShopItemDetail = {
    /**
     * Item type
     *
     * - `0`: Product
     * - `1`: Service
     * - `2`: Digital content
     */
    type?: 0 | 1 | 2 | null;
    /**
     * Content 1 /3 name
     */
    content1_name?: string | null;
    /**
     * Content 1 /3 description
     */
    content1_description?: string | null;
    /**
     * Content 1 /3 Unit price
     */
    content1_unit_price?: number | null;
    /**
     * Content 2 /3 name
     */
    content2_name?: string | null;
    /**
     * Content 2 /3 description
     */
    content2_description?: string | null;
    /**
     * Content 2 /3 Unit price
     */
    content2_unit_price?: number | null;
    /**
     * Content 3 /3 name
     */
    content3_name?: string | null;
    /**
     * Content 3 /3 description
     */
    content3_description?: string | null;
    /**
     * Content 3 /3 Unit price
     */
    content3_unit_price?: number | null;
};
/**
 * Shop information object (v2, but there is no `ShopInformation` type for v1)
 */
export type ShopInformation_V2 = {
    /**
     * Shop name that will be displayed on the credit card statement
     */
    shop_name: string;
    /**
     * Shop name (kana) that will be displayed on the credit card statement
     */
    shop_name_kana?: string | null;
    /**
     * Shop name (English) that will be displayed on the credit card statement
     */
    shop_name_en?: string | null;
    /**
     * Support email address
     */
    support_mail?: string | null;
    /**
     * Support TEL
     */
    support_tel?: string | null;
    /**
     * unit price of an payment
     */
    unit_price?: number | null;
    /**
     * Whether or not the shop sells contents that fincode needs long time to examine.
     */
    deals_long_apply_content?: boolean | null;
    /**
     * Whether or not the shop has a history of losing lawsuits based on the revised Installment Sales Act in Japan.
     */
    lost_trial?: boolean | null;
    /**
     * Whether or not the shop sells insecure contents.
     */
    deals_insecure_content?: boolean | null;
    /**
     * Usage of fincode
     */
    use_of_fincode?: {
        /**
         * Use fincode in Website/Web application
         */
        used_on_web?: boolean | null;
        /**
         * Use fincode in Mobile application
         */
        used_on_app?: boolean | null;
    };
    /**
     * Whether or not service website is visitable when fincode examination is in progress.
     *
     * - `true`: fincode Examination team can visit the website.
     * - `false`: fincode Examination team cannot visit the website.
     */
    site_published?: boolean | null;
    /**
     * Website information
     */
    site_info?: {
        url?: string | null;
        /**
         * Credentials for login (fincode Examination team will use)
         */
        credential?: string | null;
    };
    /**
     * This shop has point system or not.
     */
    prepaid_point?: boolean | null;
    /**
     * Prepaid point information
     */
    prepaid_point_info?: {
        /**
         * Usage of prepaid point
         */
        how_to_use?: string | null;
        /**
         * Condition of point expiration (free text)
         */
        about_expiration?: string | null;
    };
    /**
     * Type of shop item.
     */
    provides?: {
        /**
         * This shop provides some products or not.
         */
        product?: boolean | null;
        /**
         * This shop provides some services or not.
         */
        service?: boolean | null;
        /**
         * This shop provides some digital contents or not.
         */
        digital_content?: boolean | null;
    };
    /**
     * Description of shop item.
     */
    content_description?: string | null;
    /**
     * Content information: Product
     */
    product_content_info?: ContentInformation_V2;
    /**
     * Content information: Service
     */
    service_content_info?: ContentInformation_V2;
    /**
     * Content information: Digital content
     */
    digital_content_info?: ContentInformation_V2;
};
export type ContentInformation_V2 = {
    /**
     * Content 1: Name
     */
    content1_name?: string | null;
    /**
     * Content 1: Description
     */
    content1_description?: string | null;
    /**
     * Content 1: Unit price
     */
    content1_unit_price?: number | null;
    /**
     * Content 2: Name
     */
    content2_name?: string | null;
    /**
     * Content 2: Description
     */
    content2_description?: string | null;
    /**
     * Content 2: Unit price
     */
    content2_unit_price?: number | null;
    /**
     * Content 3: Name
     */
    content3_name?: string | null;
    /**
     * Content 3: Description
     */
    content3_description?: string | null;
    /**
     * Content 3: Unit price
     */
    content3_unit_price?: number | null;
};
