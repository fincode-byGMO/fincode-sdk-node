import * as Shop from "./shop"
/**
     * Contract object
     */
export type ContractOnject = {
    /**
     * Shop ID
     */
    shop_id: string

    /**
     * Platform ID
     */
    platform_id: string

    /**
     * Shop type
     * 
     * - `null`: Standard
     * - `platform`: Platform
     * - `tenant`: Tenant
     */
    shop_type: Shop.ShopType

    /**
     * Contract status
     * 
     * - `101`: Before contract
     * - `102`: Under examination
     * - `103`: Under examination (Visa/Mastercard is temporary available)
     * - `105`: Left
     * - `106`: Contract failed
     * - `107`: Contract succeeded
     */
    status_code: ContractStatus

    /**
     * Available status code
     * 
     * - `201`: Available only for test environment
     * - `202`: Available for production environment
     */
    available_status_code: 201 | 202

    /**
     * Created date of the shop member 
     *  
     * Format: `yyyy/MM/dd`
     */
    create_date: string

    /**
     * Date the shop member applied for the contract
     * 
     * Format: `yyyy/MM/dd`
     */
    contracted_at?: string | null

    /**
     * First charge date
     * 
     * Format: `yyyy/MM/dd`
     */
    start_charging_at?: string | null

    /**
     * Expired date
     * 
     * Format: `yyyy/MM/dd`
     */
    expired_at?: string | null

    /**
     * Sales deposit status code
     */
    sales_deposit_status_code?: SalesDepositStatusCode | null

    /**
     * Denied contract date
     * 
     * Format: `yyyy/MM/dd`
     */
    denied_at?: string | null

    /**
     * Flag billing was suspended
     */
    suspended_billing?: boolean | null

    /**
     * Date tha flag billing was suspended
     */
    suspended_billing_date?: string | null

    /**
     * Flag the payment was suspeded
    */
    suspended_payment?: boolean | null

    /**
     * Supended payment date
     * 
     * Format: `yyyy/MM/dd`
    */
    suspended_payment_date?: string | null

    /**
     * Flag the immediate-use was suspeded 
     */
    suspended_immediate_use?: boolean | null

    /**
     * Supended immediate-use date
     * 
     * Format: `yyyy/MM/dd`
     */
    suspended_immediate_use_date?: string | null

    /**
     * Stop cancelation memo
     */
    stop_cancel_memo?: string | null

    /**
     * Obligations notice
     */
    obligations_notice?: string | null

    /**
     * Shop name (for user)
     */
    user_shop_name?: string | null

    /**
     * Registered Email
     */
    register_mail?: string | null

    /**
     * Contract detail
     */
    contract_detail?: ContractDetail | null

    /**
     * Contract bank account
     */
    contract_bank_account?: ContractBankAccount | null

    /**
     * Contract virtual bank account
     */
    contract_virtual_bank?: Omit<ContractBankAccount, "bank_name_kana" | "bank_code" | "branch_code" | "branch_name_kana" | "account_kind"> | null

    /**
     * Examination information
     */
    examination?: Examination[] | null

    /**
     * Contract card destination
     */
    contract_card_destination?: ContractDestination | null

    /**
     * Card payment setting
     */
    credit_card_setting?: CardPaymentSetting | null
}

export type ContractDetail = {
    /**
     * Business type.
     * 
     * - `true`: Company
     * - `false`: Sole proprietorship
     */
    corporate?: boolean | null

    /**
     * Corporate number.
     */
    corporate_number?: string | null

    /**
     * Payment method.
     * 
     * - `0`: Credit card
     * - `1`: Bank transfer
     */
    pay_by?: 0 | 1 | null

    /**
     * Corporate name
     * 
     * (for `company` examination)
     */
    corporate_name?: string | null

    /**
     * Corporate name (kana)
     * 
     * (for `company` examination)
     */
    corporate_name_kana?: string | null

    /**
     * Homepage URL
     * 
     * (for `company` examination)
     */
    hp?: string | null

    /**
     * Capital
     * 
     * (for `company` examination)
     */
    capital?: string | null

    /**
     * Establishment date
     * 
     * Format: `yyyy/MM/dd`
     * 
     * (for `company` examination)
     */
    established_at?: string | null

    /**
     * Yearly sales
     * 
     * (for `company` examination)
     */
    yearly_sales?: string | null

    /**
     * Business description
     * 
     * (for `company` examination)
     */
    business_details?: string | null

    /**
     * Company address: Postal code
     * 
     * (for `company` examination)
     */
    company_postal_code?: string | null

    /**
     * Company address: Prefecture
     * 
     * (for `company` examination)
     */
    company_prefecture?: string | null

    /**
     * Company address (kana): Prefecture
     * 
     * (for `company` examination)
     */
    company_prefecture_kana?: string | null

    /**
     * Company address: Municipality / City
     * 
     * (for `company` examination)
     */
    company_address_municipality?: string | null

    /**
     * Company address (kana): Municipality / City
     * 
     * (for `company` examination)
     */
    company_address_municipality_kana?: string | null

    /**
     * Company address: Section / Line 1
     * 
     * (for `company` examination)
     */
    company_address_section?: string | null

    /**
     * Company address (kana): Section / Line 1
     * 
     * (for `company` examination)
     */
    company_address_section_kana?: string | null

    /**
     * Company address: Chrome / Line 2
     * 
     * (for `company` examination)
     */
    company_address_chrome?: string | null

    /**
     * Company address (kana): Chrome / Line 2
     * 
     * (for `company` examination)
     */
    company_address_chrome_kana?: string | null

    /**
     * Company address: Building name
     * 
     * (for `company` examination)
     */
    company_address_building_name?: string | null

    /**
     * Company address (kana): Building name
     * 
     * (for `company` examination)
     */
    company_address_building_name_kana?: string | null

    /**
     * Company info: TEL
     * 
     * (for `company` examination)
     */
    company_tel?: string | null

    /**
     * Representative name: Last name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_last_name?: string | null

    /**
     * Representative name (kana): Last name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_last_name_kana?: string | null

    /**
     * Representative name: First name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_first_name?: string | null

    /**
     * Representative name (kana): First name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_first_name_kana?: string | null

    /**
     * Representative info: Birthday
     * 
     * Format: `yyyy/MM/dd`
     * 
     * (for `sole proprietorship` examination)
     */
    representative_birthday?: string | null

    /**
     * Representative info: Gender
     * 
     * - `0`: Male
     * - `1`: Female 
     */
    representative_gender?: 0 | 1 | null

    /**
     * Representative address: Postal code
     * 
     * (for `sole proprietorship` examination)
     */
    representative_postal_code?: string | null

    /**
     * Representative address: Prefecture
     * 
     * (for `sole proprietorship` examination)
     */
    representative_prefecture?: string | null

    /**
     * Representative address (kana): Prefecture
     * 
     * (for `sole proprietorship` examination)
     */
    representative_prefecture_kana?: string | null

    /**
     * Representative address: Municipality / City
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_municipality?: string | null

    /**
     * Representative address (kana): Municipality / City
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_municipality_kana?: string | null

    /**
     * Representative address: Section / Line 1
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_section?: string | null

    /**
     * Representative address (kana): Section / Line 1
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_section_kana?: string | null

    /**
     * Representative address: Chrome / Line 2
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_chrome?: string | null

    /**
     * Representative address (kana): Chrome / Line 2
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_chrome_kana?: string | null

    /**
     * Representative address: Building name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_building_name?: string | null

    /**
     * Representative address (kana): Building name
     * 
     * (for `sole proprietorship` examination)
     */
    representative_address_building_name_kana?: string | null

    /**
     * Representative info: TEL
     * 
     * (for `sole proprietorship` examination)
     */
    representative_tel?: string | null

    /**
     * Staff 1 name: Last name
     */
    staff1_last_name?: string | null

    /**
     * Staff 1 name (kana): Last name
     */
    staff1_last_name_kana?: string | null

    /**
     * Staff 1 name: First name
     */
    staff1_first_name?: string | null

    /**
     * Staff 1 name (kana): First name
     */
    staff1_first_name_kana?: string | null

    /**
     * Staff 1 info: Company name
     */
    staff1_company_name?: string | null

    /**
     * Staff 1 info: Department name
     */
    staff1_belongs?: string | null

    /**
     * Staff 1 info: TEL
     */
    staff1_tel?: string | null

    /**
     * Staff 1 info: E-mail
     */
    staff1_mail?: string | null

    /**
     * Staff 2 name: Last name
     */
    staff2_last_name?: string | null

    /**
     * Staff 2 name (kana): Last name
     */
    staff2_last_name_kana?: string | null

    /**
     * Staff 2 name: First name
     */
    staff2_first_name?: string | null

    /**
     * Staff 2 name (kana): First name
     */
    staff2_first_name_kana?: string | null

    /**
     * Staff 2 info: Company name
     */
    staff2_company_name?: string | null

    /**
     * Staff 2 info: Department name
     */
    staff2_belongs?: string | null

    /**
     * Staff 2 info: TEL
     */
    staff2_tel?: string | null

    /**
     * Staff 2 info: E-mail
     */
    staff2_mail?: string | null

    /**
     * Usage: use fincode on Web
     * 
     * - `true`: Yes, this shop uses fincode on Web
     * - `false`: No
     */
    used_on_web?: boolean | null

    /**
     * Usage: use fincode on Native App
     * 
     * - `true`: Yes, this shop uses fincode on Native App
     * - `false`: No
     */
    used_on_app?: boolean | null

    /**
     * Usage: use fincode on Other environment
     * 
     * - `true`: Yes, this shop uses fincode on Other environment
     * - `false`: No
     */
    used_on_other?: boolean | null

    /**
     * Service website exists before contract
     * 
     * - `0`: Yes, exists.
     * - `1`: Yes, exists, but not yet open.
     * - `2`: No, not yet exists.
     */
    site_existing?: 0 | 1 | 2 | null

    /**
     * Homepage URL
     */
    url?: string | null

    /**
     * Credential information for examination
     */
    site_credential?: string | null

    /**
     * Shop name displayed on statement
     */
    shop_name?: string | null

    /**
     * Shop name displayed on statement (kana)
     */
    shop_name_kana?: string | null

    /**
     * Shop name displayed on statement (English)
     */
    shop_name_en?: string | null

    /**
     * Platform name
     */
    platform_name?: string | null

    /**
     * Support info: TEL
     */
    support_tel?: string | null

    /**
     * Support info: E-mail
     */
    support_mail?: string | null

    /**
     * This shop provides some products or not.
     */
    provides_product?: boolean | null

    /**
     * This shop provides some services or not.
     */
    provides_service?: boolean | null

    /**
     * This shop provides some digital contents or not.
     */
    provides_digital_contents?: boolean | null

    /**
     * This shop has point system or not.
     */
    prepaid?: boolean | null

    /**
     * Unit price
     */
    unit_price?: number | null

    /**
     * Content category master ID
     */
    content_category_master_id?: number | null

    /**
     * Content description
     */
    content_description?: string | null

    /**
     * Point expiration term 
     */
    expiration_date_of_point?: string | null

    /**
     * Usage of point
     */
    usage_of_point?: string | null

    /**
     * Whether or not the shop has a history of losing lawsuits based on the revised Installment Sales Act in Japan.
     */
    lost_trial?: boolean | null

    /**
     * Whether or not the shop sells insecure contents.
     */
    deals_insecure_content?: boolean | null

    /**
     * Whether or not the shop sells contents that fincode needs long time to examine.
     */
    deals_long_apply_content?: boolean | null
}

export type ContractBankAccount = {
    /**
     * Bank name
     */
    bank_name?: string | null

    /**
     * Bank name (kana)
     */
    bank_name_kana?: string | null

    /**
     * Bank code
     */
    bank_code?: string | null

    /**
     * Branch name
     */
    branch_name?: string | null

    /**
     * Branch name (kana)
     */
    branch_name_kana?: string | null

    /**
     * Branch code
     */
    branch_code?: string | null

    /**
     * Account type
     * 
     * - `0`: Deposit account
     * - `1`: Current account
     */
    account_kind?: 0 | 1 | null

    /**
     * Account number
     */
    account_number?: string | null

    /**
     * Account holder name (kana)
     */
    account_name?: string | null
}

export type Examination = {
    /**
     * Examination master ID
     * 
     * - `1`: VISA / Mastercard (UC Card)
     * - `2`: JCB / American Express / Diners Club
     * - `3`: VISA / Mastercard (Toyota Finance)
     * - `101`: Konbini (Densan System)
     */
    examination_master_id?: 1 | 2 | 3 | 101 | null

    /**
     * Status code
     * 
     * - `1`: Examination is now in progress.
     * - `2`: Examination has been successfully completed.
     * - `3`: Examination has been failed.
     */
    status_code?: 1 | 2 | 3 | null

    /**
     * Marchant Member code
     */
    member_code?: string | null

    /**
     * Whether or not 3D Secure is enabled.
     */
    tds_available?: boolean | null

    /**
     * Whether or not Installments payment is enabled.
     */
    installments_payment_available?: boolean | null

    /**
     * Date when examination is completed.
     * 
     * Format: `yyyy/MM/dd`
     */
    cut_over_at?: string | null
}

export type ContractDestination = {
    contract_card_info_master_id?: number | null
    examination_master_id?: number | null
    destination?: string | null
    destination_type?: string | null
}

export type CardPaymentSetting = {
    /**
     * Whether or not 3D Secure is available on VISA / Mastercard. 
     */
    vm_tds_available?: boolean | null

    /**
     * Whether or not 3D Secure is required on VISA / Mastercard.
     */
    vm_tds_required?: boolean | null

    /**
     * Whether or not 3D Secure is available on JCB / American Express
     */
    ja_tds_available?: boolean | null

    /**
     * Whether or not 3D Secure is required on JCB / American Express
     */
    ja_tds_required?: boolean | null

    /**
     * Whether or not Installments payment is available.
     */
    install_payment_available?: boolean | null
}

/**
 * Contract status
 * 
 * - `101`: Before contract
 * - `102`: Under examination
 * - `103`: Under examination (Visa/Mastercard is temporary available)
 * - `105`: Contract canceled
 * - `106`: Contract failed
 * - `107`: Contract succeeded
 */
export type ContractStatus = 101 | 102 | 103 | 105 | 106 | 107

/**
 * Sales deposit status code
 * 
 * - `501`: Before procedure
 * - `502`: Receivable
 * - `503`: Withholding
 */
export type SalesDepositStatusCode = 501 | 502 | 503

/**
 * Status updated notification
 */
export type StatusUpdatedNotification = {
    /**
     * Aquirer
     * 
     * - `UC`: UC Card (VISA / Mastercard)
     * - `TFC`: Toyota Finance (VISA / Mastercard)
     * - `JCB/AMEX`: JCB (JCB / American Express)
     * - `DINERS`: Diners Club (JCB)
     * - `PAYSLE`: Konbini (Denan System)
     */
    aquirer?: 'UC' | 'TFC' | 'JCB/AMEX' | 'DINERS' | 'PAYSLE' | null

    /**
     * Examination task
     * 
     * - `決済事業者審査: VISA/MASTER-UC` means VISA / Mastercard (UC Card)
     * - `決済事業者審査: VISA/MASTER-TFC` means VISA / Mastercard (Toyota Finance)
     * - `決済事業者審査: JCB/AMEX` means JCB / American Express (JCB)
     * - `決済事業者審査: DINERS` means Diners Club (JCB)
     * - `決済事業者審査: PAYSLE` means Konbini (Densan System)
     */
    examination_task?: string | null

    /**
     * Status code
     * 
     * - `701`: This shop has not applied yet.
     * - `702`: This shop has applied.
     * - `703`: Waiting examination.
     * - `704`: Examination is now in progress.
     * - `705`: Examination is pending.
     * - `706`: Examination has been successfully completed.
     * - `707`: Available for use.
     * - `708`: Examination has been failed.
     * - `709`: This shop has been canceled.
     */
    status_code?: 701 | 702 | 703 | 704 | 705 | 706 | 707 | 708 | 709 | null

    /**
     * Status title
     * 
     * - `申込なし` - 701
     * - `審査受付` - 702
     * - `審査待ち` - 703
     * - `審査中` - 704
     * - `審査保留` - 705
     * - `審査OK` - 706
     * - `利用可能` - 707
     * - `審査NG` - 708
     * - `申込中止` - 709
     */
    status?: string | null

    /**
     * Whether or not update has been occurred.
     */
    is_updated?: boolean | null
}