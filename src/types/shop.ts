namespace Shop {
    /**
     * Platform shop object
     */
    export type Shop = {
        /**
         *  Shop ID
         */
        id: string

        /**
         * Platform ID
         */
        platform_id: string

        /**
         * Shop password (masked)
         */
        shop_password: string

        /**
         * Shop name
         */
        shop_name: string

        /**
         * Shop name kana
         */
        shop_name_kana?: string | null

        /**
         * Email address of the shop
         */
        shop_mail_address?: string | null

        /**
         * Email address to send notifications to
         */
        send_mail_address?: string | null

        /**
         * Customer group ID
         */
        customer_group_id?: string | null

        /**
         * Days to keep logs
         */
        log_keep_days?: string | null

        /**
         * API version
         */
        api_version?: string | null

        /**
         * Shop type
         */
        shop_type: ShopType

        /**
         * Platform name
         */
        platform_name?: string | null

        /**
         * Flag customers are shared between tenants.
         * 
         * - `0`: Not shared
         * - `1`: Shared 
         */
        shared_customer_flag: "0" | "1"

        /**
         * Platform rate config list
         */
        platform_rate_list?: PlatformRateConfig[] | null

        /** 
         * API Key displayed flag
         * 
         * - `0`: Not displayed on dashboard
         * - `1`: Displayed on dashboard
         */
        api_key_display_flag: "0" | "1"

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
     * Examination master
     * 
     * - `vm`: Visa/Mastercard
     * - `jad`: JCB/American Express/Diners
     * - `konbini`: Konbini
     */
    export type ExaminationMaster = "vm" | "jad" | "konbini"

    /**
     * Contract status code
     * 
     * - `101`: Not contract
     * - `102`: Now being examined
     * - `103`: Now being examined (available VISA / MasterCard immediately)
     * - `105`: Canceling contract
     * - `106`: Contract failed
     * - `107`: Completed contract
     */
    export type ContractStatus = "101" | "102" | "103" | "105" | "106" | "107"

    /**
     * Deposit cycle master ID
     * 
     * - `1`: 1 time closing per month  with payment on the last day of the following month
     * - `2`: 2 times closing per month with payment 15 days after each closing
     * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
     * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
     * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
     */
    export type DepositCycleMasterId = "1" | "2" | "3" | "4" | "5"

    /**
     * Shop Type
     * 
     * - `null`: Standard shop
     * - `platform`: Platform shop (includes Platform Sub shop)
     * - `tenant`: Tenant shop (child shop of Platform)
     */
    export type ShopType = null | "platform" | "tenant"

    /**
     * Information for Specified Commercial Transaction Act
     */
    export type SpecifiedCommercialTransactionActInfo = {
        /**
         * Shop distributor name
         */
        shop_distributor_name?: string | null

        /**
         * Shop sales manager name
         */
        shop_sales_manager_name?: string | null

        /**
         * Service name
         */
        shop_service_name?: string | null

        /**
         * Support TEL
         */
        shop_support_tel?: string | null

        /**
         * Support email address
         */
        shop_support_mail?: string | null

        /**
         * Postal code
         */
        shop_post_code?: string | null

        /**
         * Shop address: Prefecture
         */
        shop_prefecture?: string | null

        /**
         * Shop address: Municipality / City
         */
        shop_address_municipality?: string | null

        /**
         * Shop address: Section / Line 1
         */
        shop_address_section?: string | null

        /**
         * Shop address: Chrome / Line 2
         */
        shop_address_chrome?: string | null

        /**
         * Shop address: Building name
         */
        shop_address_building_name?: string | null

        /**
         * Shop address: Building name (kana)
         */
        shop_address_building_name_kana?: string | null

        /**
         * Payment method
         */
        shop_payment_method?: string | null

        /**
         * Shop charge description
         */
        shop_charge_description?: string | null

        /**
         * Product delivery time
         * 
         * TODO: deliever -> delivery (API returns `delievery`)
         */
        shop_product_delievery_time?: string | null

        /**
         * Conditions of returning goods
         */
        shop_return_goods_handing_conditions?: string | null
    }
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
        id: string

        /**
         * Platform rate
         */
        platform_rate: number

        /**
         * Fixed fee
         */
        fixed_fee?: number | null
    }

    /**
     * Item detail
     */
    export type ItemDetail = {
        /**
         * Item type 
         * 
         * - `0`: Product
         * - `1`: Service
         * - `2`: Digital content
         */
        type?: 0 | 1 | 2 | null

        /**
         * Content 1 /3 name
         */
        content1_name?: string | null

        /**
         * Content 1 /3 description
         */
        content1_description?: string | null

        /**
         * Content 1 /3 Unit price
         */
        content1_unit_price?: number | null

        /**
         * Content 2 /3 name
         */
        content2_name?: string | null

        /**
         * Content 2 /3 description
         */
        content2_description?: string | null

        /**
         * Content 2 /3 Unit price
         */
        content2_unit_price?: number | null

        /**
         * Content 3 /3 name
         */
        content3_name?: string | null

        /**
         * Content 3 /3 description
         */
        content3_description?: string | null

        /**
         * Content 3 /3 Unit price
         */
        content3_unit_price?: number | null
    }
}
export default Shop