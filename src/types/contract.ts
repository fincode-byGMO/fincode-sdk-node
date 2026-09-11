import * as Shop from "./shop"
/**
 * Contract object
 */
export type ContractObject = {
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
    stop_cancelaltion_memo?: string | null

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
    contract_virtual_bank?: ContractBankAccount | null

    /**
     * Examination information
     */
    examination?: Examination[] | null

    /**
     * Contract card destination
     */
    contract_card_destination?: ContractDestination[] | null

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
    capital?: number | null

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
    yearly_sales?: number | null

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

/**
 * Bank account information accepted when updating the V2 examination info.
 * 
 * The API takes only these five fields and requires all of them. Responses
 * carry the bank and branch names as well. See `ContractBankAccount`.
 */
export type BankAccountInformation_V2 = {
    /**
     * Bank code
     */
    bank_code: string

    /**
     * Branch code
     */
    branch_code: string

    /**
     * Account type
     * 
     * - `0`: Savings account (普通預金)
     * - `1`: Current account (当座預金)
     */
    account_kind: 0 | 1

    /**
     * Account number
     */
    account_number: string

    /**
     * Account holder name
     */
    account_name: string
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
     * - `0`: Savings account (普通預金)
     * - `1`: Current account (当座預金)
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
     * Examination master ID.
     */
    examination_master_id?: ContractExaminationMasterId | null

    /**
     * Result of this payment provider's examination.
     */
    status_code?: ExaminationStatus | null

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
    destination_type?: number | null
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
 * Status of the identity verification required before sales can be deposited.
 * 
 * - `501`: The procedure required for deposits has not been completed.
 * - `502`: Deposits are available.
 */
export type SalesDepositStatusCode = 501 | 502

/**
 * Status updated notification
 */
export type StatusUpdatedNotification = {
    /**
     * Acquirer of this examination.
     * 
     * - `UC`: UC Card (VISA / Mastercard)
     * - `TFC`: Toyota Finance (VISA / Mastercard)
     * - `JCB/AMEX`: JCB (JCB / American Express)
     * - `DINERS`: Diners Club (JCB)
     * - `PAYSLE`: Konbini (Denan System)
     */
    acquirer?: ContractAcquirer | null

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
    status_code?: ExaminationStatusCode | null

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

/**
 * Examination status code
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
export type ExaminationStatusCode = 701 | 702 | 703 | 704 | 705 | 706 | 707 | 708 | 709

/**
 * The acquirer or payment provider that an examination targets.
 * 
 * - `UC`: VISA / Mastercard (UC Card)
 * - `TFC`: VISA / Mastercard (Toyota Finance)
 * - `ORICO`: VISA / Mastercard (Orient Corporation)
 * - `AFS`: VISA / Mastercard (AEON Financial Service)
 * - `MUN`: VISA / Mastercard (Mitsubishi UFJ Nicos)
 * - `JCB/AMEX`: JCB / American Express (JCB)
 * - `DINERS`: Diners Club (JCB)
 * - `APPLE PAY UC`: Apple Pay (UC Card)
 * - `APPLE PAY JCB/AMEX`: Apple Pay (JCB)
 * - `GOOGLE PAY UC`: Google Pay (UC Card)
 * - `GOOGLE PAY TFC`: Google Pay (Toyota Finance)
 * - `GOOGLE PAY ORICO`: Google Pay (Orient Corporation)
 * - `GOOGLE PAY AFS`: Google Pay (AEON Financial Service)
 * - `GOOGLE PAY MUN`: Google Pay (Mitsubishi UFJ Nicos)
 * - `GOOGLE PAY JCB/AMEX`: Google Pay (JCB)
 * - `GOOGLE PAY DINERS`: Google Pay (Diners Club)
 * - `PAYSLE`: Konbini (Densan System)
 * - `PAYPAY`: Konbini (PayPay)
 * - `DIRECT DEBIT`: Direct Debit (withdrawal on the 5th, 6th, 23rd and 27th)
 * - `DIRECT DEBIT MIZUHO`: Direct Debit (withdrawal on the 1st, 5th, 20th and 26th)
 * - `VIRTUAL ACCOUNT`: Bank transfer (Virtual Account)
 * - `VIRTUAL ACCOUNT BULK`: Bulk payment (Virtual Account)
 * - `CARD UPDATER`: Card Updater
 */
export type ContractAcquirer =
    | "UC"
    | "TFC"
    | "ORICO"
    | "AFS"
    | "MUN"
    | "JCB/AMEX"
    | "DINERS"
    | "APPLE PAY UC"
    | "APPLE PAY JCB/AMEX"
    | "GOOGLE PAY UC"
    | "GOOGLE PAY TFC"
    | "GOOGLE PAY ORICO"
    | "GOOGLE PAY AFS"
    | "GOOGLE PAY MUN"
    | "GOOGLE PAY JCB/AMEX"
    | "GOOGLE PAY DINERS"
    | "PAYSLE"
    | "PAYPAY"
    | "DIRECT DEBIT"
    | "DIRECT DEBIT MIZUHO"
    | "VIRTUAL ACCOUNT"
    | "VIRTUAL ACCOUNT BULK"
    | "CARD UPDATER"

/**
 * Examination status of a payment provider.
 * 
 * - `1`: In progress. This payment method cannot accept payments yet.
 * - `2`: Passed. This payment method can accept payments.
 * - `3`: Rejected. This payment method cannot accept payments.
 */
export type ExaminationStatus = 1 | 2 | 3

/**
 * Examination master ID. Identifies which payment method an examination is for.
 * 
 * - `1`: Card (VISA / Mastercard, UC Card)
 * - `2`: Card (JCB / American Express / Diners Club / Discover)
 * - `3`: Card (VISA / Mastercard, Toyota Finance)
 * - `4`: Card (VISA / Mastercard, Orient Corporation)
 * - `5`: Card (VISA / Mastercard, AEON Financial Service)
 * - `6`: Card (VISA / Mastercard, Mitsubishi UFJ Nicos)
 * - `51`: Apple Pay (VISA / Mastercard, UC Card)
 * - `52`: Apple Pay (JCB / American Express)
 * - `56`: Google Pay (VISA / Mastercard, UC Card)
 * - `57`: Google Pay (JCB / American Express / Diners Club)
 * - `58`: Google Pay (VISA / Mastercard, Toyota Finance)
 * - `59`: Google Pay (VISA / Mastercard, Orient Corporation)
 * - `60`: Google Pay (VISA / Mastercard, AEON Financial Service)
 * - `61`: Google Pay (VISA / Mastercard, Mitsubishi UFJ Nicos)
 * - `101`: Konbini
 * - `201`: PayPay
 * - `301`: Direct Debit (withdrawal on the 5th, 6th, 23rd and 27th)
 * - `302`: Direct Debit (withdrawal on the 1st, 5th, 20th and 26th)
 * - `401`: Bank transfer (Virtual Account)
 * - `403`: Bulk payment (Virtual Account)
 * - `701`: Card Updater
 */
export type ContractExaminationMasterId =
    | 1 | 2 | 3 | 4 | 5 | 6
    | 51 | 52
    | 56 | 57 | 58 | 59 | 60 | 61
    | 101
    | 201
    | 301 | 302
    | 401 | 403
    | 701

/**
 * Contract status (v2)
 * 
 * - `101`: Before contract
 * - `102`: Under examination
 * - `103`: Under examination (Visa/Mastercard is temporary available)
 * - `105`: Contract canceled
 * - `106`: Contract failed
 * - `107`: Contract succeeded
 */
export type ContractStatus_V2 = 101 | 102 | 103 | 105 | 106 | 107

/**
 * Contract information object (v2)
 */
export type ContractInformation_V2 = {
    /**
     * Representative name: Last name
     */
    representative_last_name?: string | null

    /**
     * Representative name (kana): Last name
     */
    representative_last_name_kana?: string | null

    /**
     * Representative name: First name
     */
    representative_first_name?: string | null

    /**
     * Representative name (kana): First name
     */
    representative_first_name_kana?: string | null

    /**
     * Representative address: Postal code
     * 
     * Format: `xxx-xxxx`
     */
    representative_postal_code?: string | null

    /**
     * Representative address: Prefecture
     */
    representative_prefecture?: string | null

    /**
     * Representative address (kana): Prefecture
     */
    representative_prefecture_kana?: string | null

    /**
     * Representative address: Municipality / City
     */
    representative_address_municipality?: string | null

    /**
     * Representative address (kana): Municipality / City
     */
    representative_address_municipality_kana?: string | null

    /**
     * Representative address: Section / Line 1
     */
    representative_address_section?: string | null

    /**
     * Representative address (kana): Section / Line 1
     */
    representative_address_section_kana?: string | null

    /**
     * Representative address: Chrome / Line 2
     */
    representative_address_chrome?: string | null

    /**
     * Representative address (kana): Chrome / Line 2
     */
    representative_address_chrome_kana?: string | null

    /**
     * Representative address: Building name
     */
    representative_address_building_name?: string | null

    /**
     * Representative address (kana): Building name
     */
    representative_address_building_name_kana?: string | null

    /**
     * Representative birthday
     * 
     * Format: `yyyy/MM/dd`
     */
    representative_birthday?: string | null

    /**
     * Representative gender
     * 
     * - `0`: Male
     * - `1`: Female
     */
    representative_gender?: 0 | 1 | null

    /**
     * Representative TEL
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
     * Business type
     * - `true`: Company
     * - `false`: Sole proprietorship 
     */
    corporate?: boolean | null

    /**
     * Corporate informatioin
     */
    corporate_info?: CorporateInformation_V2 | null
}
/**
 * Corporate information object (v2, but there is no `CorporateInformation` type for v1)
 */
export type CorporateInformation_V2 = {
    /**
     * Corporate number
     */
    corporate_number?: string | null

    /**
     * Corporate name
     */
    corporate_name?: string | null

    /**
     * Corporate name (kana)
     */
    corporate_name_kana?: string | null

    /**
     * Homepage URL
     */
    hp?: string | null

    /**
     * Capital
     */
    capital?: number | null

    /**
     * Establishment date
     * 
     * Format: `yyyy/MM/dd`
     */
    established_at?: string | null

    /**
     * Yearly sales
     */
    yearly_sales?: number | null

    /**
     * Business description
     */
    business_details?: string | null

    /**
     * Company address: Postal code
     */
    company_postal_code?: string | null

    /**
     * Company address: Prefecture
     */
    company_prefecture?: string | null

    /**
     * Company address (kana): Prefecture
     */
    company_prefecture_kana?: string | null

    /**
     * Company address: Municipality / City
     */
    company_address_municipality?: string | null

    /**
     * Company address (kana): Municipality / City
     */
    company_address_municipality_kana?: string | null

    /**
     * Company address: Section / Line 1
     */
    company_address_section?: string | null

    /**
     * Company address (kana): Section / Line 1
     */
    company_address_section_kana?: string | null

    /**
     * Company address: Chrome / Line 2
     */
    company_address_chrome?: string | null

    /**
     * Company address (kana): Chrome / Line 2
     */
    company_address_chrome_kana?: string | null

    /**
     * Company address: Building name
     */
    company_address_building_name?: string | null

    /**
     * Company address (kana): Building name
     */
    company_address_building_name_kana?: string | null

    /**
     * Company info: TEL
     */
    company_tel?: string | null
}

/**
 * Kind of file submitted to the fincode examination team.
 * 
 * - `DRIVER_LICENSE_FRONT`: Identity document; driver's license (front). The back has to be submitted too.
 * - `DRIVER_LICENSE_BACK`: Identity document; driver's license (back). The front has to be submitted too.
 * - `SEAL_REGISTRATION_FRONT`: Identity document; seal registration certificate.
 * - `RESIDENT_CARD_FRONT`: Identity document; residence card (front). The back has to be submitted too.
 * - `RESIDENT_CARD_BACK`: Identity document; residence card (back). The front has to be submitted too.
 * - `SPECIAL_PERMANENT_RESIDENT_FRONT`: Identity document; special permanent resident certificate (front). The back has to be submitted too.
 * - `SPECIAL_PERMANENT_RESIDENT_BACK`: Identity document; special permanent resident certificate (back). The front has to be submitted too.
 * - `CERTIFICATE_OF_RESIDENCE_FRONT`: Identity document; certificate of residence.
 * - `MY_NUMBER_CARD_FRONT`: Identity document; My Number card.
 * - `PRODUCT_IMAGE_1`: Goods examination; image for `product_content_info.content1_*`.
 * - `PRODUCT_IMAGE_2`: Goods examination; image for `product_content_info.content2_*`.
 * - `PRODUCT_IMAGE_3`: Goods examination; image for `product_content_info.content3_*`.
 * - `APP_IMAGE_TOP`: App examination; screenshot of the app's top screen. For a native app with no website at the time of examination.
 * - `APP_IMAGE_ICON`: App examination; the app's icon.
 * - `SALES_LICENSE_1`: Sales license. Some goods and services need one, and it has to be held in the contracting name.
 * - `SALES_LICENSE_2`: Sales license, second file.
 * - `SALES_LICENSE_3`: Sales license, third file.
 */
export type ExaminationFileType =
    | "DRIVER_LICENSE_FRONT"
    | "DRIVER_LICENSE_BACK"
    | "SEAL_REGISTRATION_FRONT"
    | "RESIDENT_CARD_FRONT"
    | "RESIDENT_CARD_BACK"
    | "SPECIAL_PERMANENT_RESIDENT_FRONT"
    | "SPECIAL_PERMANENT_RESIDENT_BACK"
    | "CERTIFICATE_OF_RESIDENCE_FRONT"
    | "MY_NUMBER_CARD_FRONT"
    | "PRODUCT_IMAGE_1"
    | "PRODUCT_IMAGE_2"
    | "PRODUCT_IMAGE_3"
    | "APP_IMAGE_TOP"
    | "APP_IMAGE_ICON"
    | "SALES_LICENSE_1"
    | "SALES_LICENSE_2"
    | "SALES_LICENSE_3"

/**
 * Request body of Uploading an examination file
 * (used for POST /v1/contracts/examinations/tenants/{id}/files)
 */
export type UploadingExaminationFileRequest = {
    /**
     * Kind of file being uploaded.
     */
    type: ExaminationFileType

    /**
     * File to upload.
     */
    data: Buffer | string

    /**
     * File name of the `data`, including the extension.
     */
    fileName: string

    /**
     * MIME type of the `data`.
     * 
     * Defaults to `application/octet-stream`.
     */
    contentType?: string
}

/**
 * Response object of Uploading an examination file
 * (used for POST /v1/contracts/examinations/tenants/{id}/files)
 */
export type UploadingExaminationFileResponse = {
    /**
     * Files accepted for the examination.
     */
    examination_files?: {
        /**
         * Shop ID the file was accepted for.
         */
        shop_id?: string | null

        /**
         * Kind of the uploaded file, as the numeric code the API answers with.
         * 
         * The request takes the name (`DRIVER_LICENSE_FRONT`) while the
         * response gives the code (`200`).
         */
        type?: number | null

        /**
         * File name including the extension.
         */
        filename?: string | null

        /**
         * File size in bytes.
         */
        filesize?: number | null
    }[] | null
}

/**
 * Payment method a tenant can apply for.
 * 
 * - `PAYSLE`: Konbini
 * - `PAYPAY`: PayPay
 * - `APPLE_PAY_UC`: Apple Pay (VISA / Mastercard, UC Card)
 * - `APPLE_PAY_JCB_AMEX`: Apple Pay (JCB / American Express)
 * - `GOOGLE_PAY_UC`: Google Pay (VISA / Mastercard, UC Card)
 * - `GOOGLE_PAY_TFC`: Google Pay (VISA / Mastercard, Toyota Finance)
 * - `GOOGLE_PAY_ORICO`: Google Pay (VISA / Mastercard, Orient Corporation)
 * - `GOOGLE_PAY_AFS`: Google Pay (VISA / Mastercard, AEON Financial Service)
 * - `GOOGLE_PAY_MUN`: Google Pay (VISA / Mastercard, Mitsubishi UFJ Nicos)
 * - `GOOGLE_PAY_JCB_AMEX`: Google Pay (JCB / American Express)
 * - `GOOGLE_PAY_DINERS`: Google Pay (Diners Club)
 * - `DIRECT_DEBIT`: Direct debit on the 5th, 6th, 23rd and 27th
 * - `DIRECT_DEBIT_MIZUHO`: Direct debit on the 1st, 5th, 20th and 26th
 * - `VIRTUAL_ACCOUNT`: Bank transfer (virtual account)
 * - `VIRTUAL_ACCOUNT_BULK`: Bulk payment (virtual account)
 * - `CARD_UPDATER`: Card updater
 */
export type PaymentProvider =
    | "PAYSLE"
    | "PAYPAY"
    | "APPLE_PAY_UC"
    | "APPLE_PAY_JCB_AMEX"
    | "GOOGLE_PAY_UC"
    | "GOOGLE_PAY_TFC"
    | "GOOGLE_PAY_ORICO"
    | "GOOGLE_PAY_AFS"
    | "GOOGLE_PAY_MUN"
    | "GOOGLE_PAY_JCB_AMEX"
    | "GOOGLE_PAY_DINERS"
    | "DIRECT_DEBIT"
    | "DIRECT_DEBIT_MIZUHO"
    | "VIRTUAL_ACCOUNT"
    | "VIRTUAL_ACCOUNT_BULK"
    | "CARD_UPDATER"

/**
 * Request body of Applying for payment methods
 * (used for POST /v1/contracts/examinations/tenants/{id}/providers/reserve)
 */
export type ReservingProviderRequest = {
    /**
     * Payment methods to apply for.
     */
    provider: PaymentProvider[]
}

/**
 * Response object of Applying for payment methods
 * (used for POST /v1/contracts/examinations/tenants/{id}/providers/reserve)
 */
export type ReservingProviderResponse = {
    /**
     * Payment methods currently under application.
     */
    reservation_list?: {
        /**
         * Application ID.
         */
        reservation_id?: number | null

        /**
         * Shop ID the application is for.
         */
        shop_id?: string | null

        /**
         * Payment method applied for.
         */
        provider?: PaymentProvider | null
    }[] | null
}
