import * as Contract from "./contract"
import { Pagination, Sort } from "./pagination"
import { SearchParams } from "./searchParams"
import * as Shop from "./shop"

/**
 * Pagination object for Retrieving tenant shops list
 */
export class RetrievingTenantShopListPagination implements Pagination {
    /**
     * Shop ID
     */
    id?: string | null

    /**
     * Shop name
     */
    shop_name?: string | null

    /**
     * Shop email address
     */
    shop_mail_address?: string | null

    /**
     * Created timestamp (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_from?: string | null

    /**
     * Created timestamp (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_to?: string | null

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
        args?: {
            id?: string | null
            shop_name?: string | null
            shop_mail_address?: string | null
            created_from?: string | null
            created_to?: string | null
            limit?: string | null
            page?: string | null
            count_only?: boolean | null
            sort?: Sort[] | null
        }
    ) {
        if (args) {
            this.id = args.id
            this.shop_name = args.shop_name
            this.shop_mail_address = args.shop_mail_address
            this.created_from = args.created_from
            this.created_to = args.created_to
            this.limit = args.limit
            this.page = args.page
            this.count_only = args.count_only
            this.sort = args.sort
        }
    }

    buildParams(): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map<[string, string]>(([key, value]) => {
                if (key === "sort") {
                    return [key, (value as Sort[]).map((sort) => `${sort.key} ${sort.order}`).join(",")]
                } else {
                    return [key, value as string]
                }
            })
            .forEach(([key, value]) => params.append(key, value))

        return params
    }
}

/**
 * Search Params object for Retrieving tenant shops list
 */
export class TenantShopsSearchParams implements SearchParams {
    id?: string | null
    shop_name?: string | null
    shop_mail_address?: string | null
    created_from?: string | null
    created_to?: string | null

    constructor(args?: {
        id?: string | null
        shop_name?: string | null
        shop_mail_address?: string | null
        created_from?: string | null
        created_to?: string | null
    }) {
        if (args) {
            this.id = args.id
            this.shop_name = args.shop_name
            this.shop_mail_address = args.shop_mail_address
            this.created_from = args.created_from
            this.created_to = args.created_to
        }
    }

    buildParams(): URLSearchParams {
        const param = new URLSearchParams()

        Object.entries(this)
            .filter(([_, value]) => value !== null)
            .map<[string, string]>(([key, value]) => {
                return [key, value as string]
            })
            .forEach(([key, value]) => {
                param.append(key, value)
            })

        return param
    }
}

/**
 * Request object for Creating tenant shop with existing platform user.
 */
export type CreatingTenantWithExistingUserRequest = {
    /**
     * Email address of first shop owner (must be one of platform administrators)
     */
    email: string

    /**
     * Password of first shop owner (must be one of platform administrators)
     */
    password: string

    /**
     * Tenant invitation URL ID
     */
    tenant_url_id: string
}

/**
 * Response object for Creating tenant shop with existing platform user.
 */
export type CreatingTenantWithExistingUserResponse = {
    /**
     * Shop ID
     */
    id: string

    /**
     * Shop password (masked)
     */
    password?: string | null

    /**
     * Shop name
     */
    shop_name?: string | null

    /**
     * Shop name (kana)
     */
    shop_name_kana?: string | null

    /**
     * Send email address
     */
    send_mail_address?: string | null

    /**
     * Shop email address
     */
    shop_mail_address?: string | null

    /**
     * Days to keep logs
     */
    log_keep_days?: number | null

    /**
     * API Version
     */
    api_version?: string | null

    /**
     * Shop type
     * 
     * - `null`: Standard
     * - `platform`: Platform shop (includes Platform Sub shop)
     * - `tenant`: Tenant shop (child shop of Platform)
     */
    shop_type?: Shop.ShopType | null

    /**
     * Platform ID
     */
    platform_id?: string | null

    /**
     * Platform name
     */
    platform_name?: string | null

    /**
     * Whether or not the customers are shared between tenant shops
     * 
     * - `0`: Not shared
     * - `1`: Shared
     */
    shared_customer_flag?: "0" | "1" | null

    /**
     * Whether or not the API key is displayed on dashboard
     * 
     * - `0`: Not displayed on dashboard
     * - `1`: Displayed on dashboard
     */
    api_key_display_flag?: "0" | "1" | null

    /**
     * Created timestamp
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created?: string | null

    /**
     * Updated timestamp
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

/**
 * Request object for Creating tenant shop with new tenant user.
 */
export type CreatingTenantWithNewUserRequest = {
    /**
     * Email address of first shop administrator (new user in fincode)
     */
    email: string

    /**
     * Password of first shop administrator (new user in fincode)
     */
    password: string

    /**
     * First shop administrator name
     */
    name: string

    /**
     * Tenant invitation URL ID
     */
    tenant_url_id: string
}

/**
 * Response object for Creating tenant shop with new tenant user.
 */
export type CreatingTenantWithNewUserResponse = {
    /**
     * Access token
     */
    access_token?: string | null

    /**
     * Authorities
     */
    authorities?: UserAuthority[] | null

    /**
     * User Data
     */
    user_data?: UserData | null
}
export type UserAuthority = {
    /**
     * Authentication ID
     */
    auth_id: string

    /**
     * Endpoint
     */
    endpoint: string

    /**
     * Method
     */
    method: string
}
export type UserData = {
    /**
     * User ID
     */
    id: string

    /**
     * Default shop ID ( new shop ID )
     */
    default_shop_id: string

    /**
     * Role ID
     */
    role_id: string

    /**
     * Email address
     */
    email: string

    /**
     * Name
     */
    name: string

    /**
     * User type
     * 
     * - `01`: Shop user
     */
    user_type: "01"

    /**
     * 2 factor authorization status
     * 
     * - `00`: Not enabled
     * - `01`: Enabled
     */
    two_factor_auth_status: "00" | "01"

    /**
     * Mail authorization status
     * 
     * - `01`: Not authorized yet.
     * - `02`: Authorized.
     */
    mail_auth_status: "01" | "02"

    /**
     * Password lock status
     * 
     * - `00`: Not locked
     * - `01`: Locked
     */
    password_lock_status: "00" | "01"

    /**
     * Last login date
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    last_login_date?: string | null

    /**
     * Login failure date
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    login_failure_date?: string | null

    /**
     * Login failure count
     */
    login_failure_times?: number | null

    /**
     * Passwird expiration date
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    password_expire?: string | null

    /**
     * Account status
     * 
     * - `00`: Unavailable
     * - `01`: Available
     */
    account_status: "00" | "01"

    /**
     * Invitation status
     * 
     * - `01`: Now inviting
     * - `02`: Joined
     */
    invitation_status: "01" | "02"

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
 * Request object for Updating tenant shop
 */
export type UpdatingTenantRequest = {
    /**
     * Examination master ID
     * 
     * - `vm`: Visa/Mastercard
     * - `jad`: JCB/American Express/Diners
     * - `konbini`: Konbini
     */
    id?: Shop.ExaminationMaster | null

    /**
     * Platform rate
     */
    platform_rate?: string | null

    /**
     * Fixed fee
     */
    fixed_fee?: string | null

    /**
     * API key display flag
     * 
     * - `0`: Not displayed on dashboard
     * - `1`: Displayed on dashboard
     */
    api_key_display_flag?: "0" | "1" | null
}

/**
 * Request object for Requesting tenant shop examination
 */
export type RequestingExaminationRequest = {
    /**
     * Shop ID
     */
    shop_id: string

    /**
     * Challange to use VISA / Mastercard immediately 
     */
    enable_immediate_use: boolean
}

/**
 * Response object for Requesting tenant shop examination
 */
export type RequestingExaminationResponse = {
    /**
     * Shop ID
     */
    shop_id: string

    /**
     * Result of challange to use VISA / Mastercard immediately
     * 
     * - `1`: Success
     * - `2`: Failure
     * - `3`: Pending
     */
    enable_immediate_use: 1 | 2 | 3
}

/**
 * Request object for Updating tenant shop examination 
 */
export type UpdatingExaminationInfoRequest = {
    /**
     * Whether or not to update contract_detail
     */
    update_contract_detail?: boolean | null

    /**
     * Whether or not to update shop
     */
    update_shop?: boolean | null

    /**
     * Whether or not to update bank_account
     */
    update_bank_account?: boolean | null

    /**
     * Whether or not to update deposit_cycle
     */
    update_deposit_cycle?: boolean | null

    /**
     * Deposit cycle master ID
     * 
     * - `1`: 1 time closing per month  with payment on the last day of the following month
     * - `2`: 2 times closing per month with payment 15 days after each closing
     * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
     * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
     * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
     */
    deoisut_cycle_master_id?: Shop.DepositCycleMasterId | null

    /**
     * Contract detail
     */
    contract_detail?: Partial<Contract.ContractDetail> & Partial<Shop.SpecifiedCommercialTransactionActInfo> | null

    /**
     * Shop item detail
     */
    shop_item_detail?: Partial<Shop.ShopItemDetail>[] | null

    /**
     * Bank account
     */
    bank_account?: Partial<Contract.ContractBankAccount> | null
}

/**
 * 
 * Examination information object (v1)
 */
export type ExaminationInfo = {
    /**
     * Shop ID
     */
    shop_id: string

    /**
     * Platform ID
     */
    platform_id: string

    /**
     * Shop Type
     * 
     * - `null`: Standard shop
     * - `platform`: Platform shop (includes Platform Sub shop)
     * - `tenant`: Tenant shop (child shop of Platform)
     */
    shop_type: Shop.ShopType

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
    status_code: Contract.ContractStatus

    /**
     * Deposit cycle master ID
     * 
     * - `1`: 1 time closing per month  with payment on the last day of the following month
     * - `2`: 2 times closing per month with payment 15 days after each closing
     * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
     * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
     * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
     */
    deposit_cycle_master_id: Shop.DepositCycleMasterId

    /**
     * Contract detail
     */
    contract_detail: Contract.ContractDetail & Shop.SpecifiedCommercialTransactionActInfo

    /**
     * Shop item detail
     */
    shop_item_detail: Shop.ShopItemDetail[]

    /**
     * Bank account
     */
    contract_bank_account: Contract.ContractBankAccount

    /**
     * Contract initial statuses
     */
    contract_input_status: {
        /**
         * Status code
         * 
         * - `301`: No fields are input
         * - `302`: Some fields are input
         * - `303`: All fields are input
         * - `304`: Examination claiming has been completed
         */
        status_code: 301 | 302 | 303 | 304

        /**
         * Whether or not contract info has been input
         */
        contract_info_input: boolean

        /**
         * Whether or not shop info has been input
         */
        shop_info_input: boolean

        /**
         * Whether or not bank account info has been input
         */
        account_info_input: boolean

        /**
         * Whether or not card info for being billed has been input
         */
        card_info_input: boolean
    }
}

/**
 * Request object for Updating tenant shop examination (v2)
 */
export type UpdatingExaminationInfoRequest_V2 = {
    /**
     * Contract informatioin
     */
    contract_info?: Partial<Contract.ContractInformation_V2> | null

    /**
     * Shop information
     */
    shop_info?: Partial<Shop.ShopInformation_V2> | null

    /**
     * Bank account information
     */
    bank_account_info?: Partial<Contract.ContractBankAccount> | null

    /**
     * Deposit cycle information
     */
    deposit_cycle_info?: Partial<{
        /**
         * Deposit cycle master ID
         * 
         * - `1`: 1 time closing per month  with payment on the last day of the following month
         * - `2`: 2 times closing per month with payment 15 days after each closing
         * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
         * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
         * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
         */
        deposit_cycle_master_id?: Shop.DepositCycleMasterId | null
    }> | null

    /**
     * Merchant Category Code (MCC)
     * (If fincode Team request to fill in this field, please fill in the value.)
     */
    merchant_category_code?: string | null
}
/**
 * Examination information object (v2)
 */
export type ExaminationInfo_V2 = {
    /**
     * Contract status code
     */
    status_code: Contract.ContractStatus_V2

    /**
     * Contract information
     */
    contract_info: Contract.ContractInformation_V2

    /**
     * Shop information
     */
    shop_info: Shop.ShopInformation_V2

    /**
     * Bank account information
     */
    bank_account_info?: Contract.ContractBankAccount

    /**
     * Deposit cycle information
     */
    deposit_cycle_info: {
        /**
         * Deposit cycle master ID
         * 
         * - `1`: 1 time closing per month  with payment on the last day of the following month
         * - `2`: 2 times closing per month with payment 15 days after each closing
         * - `3`: 3 times closing per month with payment 10 days after each closing (required to contact fincode support)
         * - `4`: 6 times closing per month with payment 5 days after each closing (required to contact fincode support)
         * - `5`: Daily closing with payment 3 business days after each closing (required to contact fincode support)
         */
        deposit_cycle_master_id: Shop.DepositCycleMasterId
    }
}