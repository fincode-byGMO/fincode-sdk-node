import { ContractBankAccount, ContractDetail } from "./contract"

/**
 * Fields of the contract that a change request can carry.
 * 
 * These come from the tenant's contract details. The ones the contract has but
 * a change request does not are left out.
 */
type ChangeRequestContractFields = Partial<Omit<ContractDetail,
    | "pay_by"
    | "site_existing"
    | "platform_name"
    | "content_category_master_id"
    | "expiration_date_of_point"
    | "usage_of_point"
    | "lost_trial"
    | "deals_insecure_content"
    | "deals_long_apply_content"
>>

/**
 * Bank account the sales are deposited into.
 */
type ChangeRequestDepositAccount = Partial<ContractBankAccount>

/**
 * Bank account of the business operator.
 */
type ChangeRequestBusinessOperatorAccount = {
    /**
     * Bank name.
     */
    business_operator_bank_name?: string | null

    /**
     * Bank name in katakana.
     */
    business_operator_bank_name_kana?: string | null

    /**
     * Bank code.
     */
    business_operator_bank_code?: string | null

    /**
     * Branch name.
     */
    business_operator_branch_name?: string | null

    /**
     * Branch name in katakana.
     */
    business_operator_branch_name_kana?: string | null

    /**
     * Branch code.
     */
    business_operator_branch_code?: string | null

    /**
     * Account type
     * 
     * - `0`: Savings account (普通預金)
     * - `1`: Current account (当座預金)
     */
    business_operator_account_kind?: 0 | 1 | null

    /**
     * Account number.
     */
    business_operator_account_number?: string | null

    /**
     * Account holder name in katakana.
     */
    business_operator_account_name?: string | null
}

/**
 * Request body of Registering a change request (used for POST /v1/change_requests)
 * 
 * Every field other than `shop_id` and `need_change_examination` is optional;
 * give only what should change.
 */
export type RegisteringChangeRequestRequest =
    ChangeRequestContractFields
    & ChangeRequestDepositAccount
    & ChangeRequestBusinessOperatorAccount
    & {
        /**
         * Shop ID of the tenant the change applies to.
         */
        shop_id: string

        /**
         * Whether the change has to go through an examination.
         * 
         * - `true`: file a change request for examination.
         * - `false`: apply the change directly without filing one.
         */
        need_change_examination: boolean

        /**
         * Note for the fincode team.
         */
        memo?: string | null
    }

/**
 * Change Request Object
 * 
 * Registering with `need_change_examination: false` applies the change
 * directly and answers with `shop_id` alone; the submitted values are not
 * echoed back.
 */
export type ChangeRequestObject = Partial<RegisteringChangeRequestRequest> & {
    /**
     * Change request ID.
     */
    id?: string | null

    /**
     * Status of this change request.
     */
    status_code?: number | null
}
