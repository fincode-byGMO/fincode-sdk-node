import { CardBrand, CardType, CardUpdaterMode } from "./card";
import { DirectDebitResultCode, PayType, ThreeDSecure2Status } from "./payment";

export type PaymentMethodObject = {
    /**
     * ID of this payment method
     */
    id: string;

    /**
     * type of this payment method. 
     * 
     * - `Card`: this payment method is a card
     * - `Directdebit`: this payment method is a bank account for direct debit payment
     * - `Virtualaccount`: this payment method is a bank transfer (virtual account)
     */
    pay_type: PaymentMethodPayType;

    /**
     * Customer ID that this payment method belongs to
     */
    customer_id?: string 

    /**
     * The ate some process (e.g. activation) is done on this payment method.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    process_date?: string | null;

    /**
     * Status of this payment method
     * 
     * - `INACTIVATED`: This payment method cannot be used for payments yet.
     * - `AWAITING_CUSTOMER_ACTION`: This payment method has not been approved by the purchaser for registration. This payment method cannot be used for payments yet.
     * - `ACTIVATED`: This payment method can be used for payments.
     * - `FAILED`: This payment method cannot be used for payments.
     */
    status: PaymentMethodStatus

    /**
     * Redirect URL.
     * By providing this URL to the purchaser, the purchaser can perform an action to activate a payment method with the status AWAITING_CUSTOMER_ACTION.
     * 
     * - (Direct Debit) For bank account registration: The purchaser accesses this URL to approve the registration of the bank account. This URL can be accessed only once.
     * - (Card) For card registration: The purchaser accesses this URL to perform 3D secure authentication.
     */
    redirect_url?: string | null;

    /**
     * Flag to indicate whether the redirect URL has been accessed.
     * 
     * - `0`: The redirect URL has not been accessed.
     * - `1`: The redirect URL has been accessed.
     */
    redirect_url_accessed_flag?: "0" | "1";

    /**
     * URL to redirect upon successful registration.
     * 
     * The URL to which the purchaser is redirected upon successful completion of the action and registration of the payment method.
     * The redirect is performed using the POST method.
     */
    return_url?: string | null;

    /**
     * URL to redirect upon registration failure.
     * 
     * The URL to which the purchaser is redirected upon completion of the action and failure to register the payment method.
     * The redirect is performed using the POST method.
     */
    return_url_on_failure?: string | null;

    /**
     * Flag that means the customer uses this payment method by default or not.
     * 
     * - `0`: OFF
     * - `1`: ON
     */
    default_flag?: "0" | "1";

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Flag that means this payment method is deleted or not.
     * 
     * - `0`: Not deleted
     * - `1`: Deleted
     */
    delete_flag?: "0" | "1";

    /**
     * Date this payment method was created.
     * 
     * Format: yyyy/MM/dd HH:mm:ss.SSS
     */
    created?: string | null

    /**
     * Date this payment method was updated.
     * 
     * Format: yyyy/MM/dd HH:mm:ss.SSS
     */
    updated?: string | null

    /**
     * Card information.
     * 
     * If this payment method is a card, this field will be filled.
     */
    card?: PaymentMethodCard | null

    /**
     * Bank account information.
     * 
     * If this payment method is a bank account for direct debit payment, this field will be filled.
     */
    directdebit?: PaymentMethodDirectDebit | null

    /**
     * Virtual account information.
     * 
     * If this payment method is a bank transfer (virtual account), this field
     * will be filled.
     */
    virtualaccount?: PaymentMethodVirtualAccount | null
}

type PaymentMethodCard = {
    /**
     * Masked card number used in this payment. (e.g. `************9999`)
     */
    card_no: string

    /**
     * The expiring date of the card used in this payment. 
     * Format: `yymm`, e.g. `3011` means 2030/11
     * 
     * If any card have not been used in this payment yet, this field will be null.
     */
    expire?: string | null

    /**
     * Holder name of the card used in this payment.
     * 
     * If any card have not been used in this payment yet, this field will be null.
     */
    holder_name?: string | null

    /**
     * hashed card number the card used in this payment.
     * 
     * If any card have not been used in this payment yet, this field will be null.
     */
    card_no_hash: string

    /**
     * Card types
     * 
     * - `0`: Unknown card type.
     * - `1`: Debit card.
     * - `2`: Prepaid card.
     * - `3`: Credit card.
     */
    type?: CardType | null

    /**
     * Card brands user can use in fincode.
     * 
     * - `VISA`: Visa card.
     * - `MASTER`: Mastercard card.
     * - `JCB`: JCB card.
     * - `AMEX`: American Express card.
     * - `DINERS`: DinersClub card.
     * - `DISCOVER`: Discover card.
     * - `(empty string)`: Unknown card brand and Test card.
     */
    brand?: CardBrand | null


    /**
     * Defines the behavior of 3D Secure 2
     * 
     * - `0`: Not use 3D Secure 2 in this payment method registration.
     * - `2`: Use 3D Secure 2 Authentication in this payment method registration.
     */
    tds_type?: "0" | "2" | null

    /**
     * Defines the behavior payment when the card used in this payment does not support 3D Secure 2 
     * 
     * - `2`: fincode API will return HTTP Error(400) and not execute this payment method registration.
     * - `3`: fincode API will execute payment method registration without 3D Secure 2 authentication. 
     */
    tds2_type?: "2" | "3" | null

    /**
     * The processing status of 3D Secure 2 authentication.
     * 
     * - `AUTHENTICATING`: Authentication is in progress.
     * - `CHALLENGE`: Challenge authentication is required.
     * - `AUTHENTICATED`: Authentication has completed.
     */
    tds2_status?: ThreeDSecure2Status | null

    /**
     * Merchant name that will be displayed on the 3D Secure 2 authentication screen.
     */
    merchant_name?: string | null

    /**
     * Access ID
     */
    access_id?: string | null

    /**
     * Whether the ACS was called during 3D Secure authentication.
     */
    acs?: string | null

    /**
     * Whether the card updater keeps this card's details up to date.
     */
    card_updater_mode?: CardUpdaterMode | null

    /**
     * Date the card details were last updated successfully.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    card_updater_last_success_date?: string | null

    /**
     * Date an update of the card details was last attempted.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    card_updater_last_attempt_date?: string | null
}

type PaymentMethodVirtualAccount = {
    /**
     * Branch code of this virtual account.
     */
    va_branch_code?: string | null

    /**
     * Branch name of this virtual account.
     */
    va_branch_name?: string | null

    /**
     * Account number of this virtual account.
     */
    va_account_number?: string | null

    /**
     * Account holder name of this virtual account.
     */
    va_account_name?: string | null

    /**
     * Virtual account identifier.
     */
    virtual_account_id?: string | null

    /**
     * The date this virtual account was assigned.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    account_assignment_date?: string | null

    /**
     * The date this virtual account was activated most recently.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    last_activated_date?: string | null

    /**
     * The date of the most recent transaction on this virtual account.
     * 
     * Format: `yyyy/MM/dd`
     */
    latest_transaction_date?: string | null
}

type PaymentMethodDirectDebit = {
    /**
     * Direct debit application type
     * 
     * - `ONLINE`: Online application
     * - `PAPER`: Paper application
     */
    application_type: DirectDebitApplicationType

    /**
     * Transfer service this bank account is registered with.
     */
    settlement_route?: DirectDebitSettlementRoute | null

    /**
     * Expected billable date.
     * 
     * The date and time when payment requests are expected to be possible after account registration.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    expected_billable_date?: string | null

    /**
     * Last withdrawal date.
     * 
     * The date and time of the last withdrawal from the bank account.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    last_withdrawal_date?: string | null

    /**
     * Last result code of the direct debit payment that used this bank account.
     * 
     * 
     * - `0`: Success.
     * - `1`: Failed due to insufficient balance.
     * - `2`: Failed because the bank account does not exist.
     * - `3`: Failed due to buyer's action.
     * - `4`: Failed due to missing or incomplete request form. This occurs when the direct debit request form is not registered with the financial institution.
     * - `8`: Failed because there are something wrong with the requester shop.
     * - `9|E|N`: Failed because of some abnormal error. (Please contact fincode support.)
     */
    last_result_code?: DirectDebitResultCode | null

    /**
     * Direct debit bank type
     * 
     * - "0": Bank that is not JP Bank (Yucho Bank)
     * - "1": JP Bank (Yucho Bank)
     */
    bank_type?: DirectDebitBankType | null

    /**
     * Bank code
     * 
     * Example: `0001`
     */
    bank_code?: string | null

    /**
     * Bank name
     */
    bank_name?: string | null

    /**
     * Branch code
     * 
     * Example: `001`
     */
    branch_code?: string | null

    /**
     * Branch name
     */
    branch_name?: string | null

    /**
     * Account type
     * 
     * - `1`: Savings account (普通預金)
     * - `2`: Current account (当座預金)
     */
    account_type?: "1" | "2" | null

    /**
     * Account number
     * 
     * Example: `1234567`
     */
    account_number?: string | null

    /**
     * Postal account number 1
     * 
     * Account number 1 of JP Bank (Yucho Bank) account.
     */
    postal_account_number_1?: string | null

    /**
     * Postal account number 2
     * 
     * Account number 2 of JP Bank (Yucho Bank) account.
     */
    postal_account_number_2?: string | null

    /**
     * Account holder name
     */
    account_name?: string | null

    /**
     * Account holder name kana
     */
    account_name_kana?: string | null

    /**
     * Paper application info
     */
    paper_application?: {
        /**
         * Date this bank account was preregistered.
         * 
         * Format: `yyyy/MM/dd HH:mm:ss.SSS`
         */
        preregistered_date?: string | null

        /**
         * Request form ID
         * 
         * ID of the paper request form that was used to register this bank account.
         */
        request_form_id?: string | null

        /**
         * Failure reason of the paper application
         */
        paper_failure_description?: string | null
    } | null
}

/**
 * Status of this payment method
 * 
 * - `INACTIVATED`: This payment method cannot be used for payments yet.
 * - `AWAITING_CUSTOMER_ACTION`: This payment method has not been approved by the purchaser for registration. This payment method cannot be used for payments yet.
 * - `ACTIVATED`: This payment method can be used for payments.
 * - `FAILED`: This payment method cannot be used for payments.
 */
export type PaymentMethodStatus = "INACTIVATED" | "AWAITING_CUSTOMER_ACTION" | "ACTIVATED" | "FAILED";

/**
 * Payment method types the payment method API works with.
 * 
 * - `Card`: Card
 * - `Directdebit`: Direct Debit
 * - `Virtualaccount`: Bank transfer (virtual account)
 */
export type PaymentMethodPayType = Extract<PayType, "Card" | "Directdebit" | "Virtualaccount">

/**
 * Direct Debit Application Type
 * 
 * - `ONLINE`: Online application
 * - `PAPER`: Paper application
 */
export type DirectDebitApplicationType = "ONLINE" | "PAPER"

/**
 * Direct debit bank type
 * 
 * - "0": Bank that is not JP Bank (Yucho Bank)
 * - "1": JP Bank (Yucho Bank)
 */
export type DirectDebitBankType = "0" | "1"

/**
 * Transfer service the bank account is registered with.
 * 
 * The service determines the days of the month on which the debit is taken.
 * 
 * - `1`: Direct debit on the 5th, 6th, 23rd and 27th.
 * - `2`: Direct debit on the 1st, 5th, 20th and 26th.
 */
export type DirectDebitSettlementRoute = "1" | "2"

/**
 * Request Body of Creating Payment Method (used for POST /v1/customers/{customer_id}/payment_methods)
 */
export type CreatingPaymentMethodRequest = {
    // ---
    // Common Fields
    // ---

    /**
     * Payment method type
     * 
     * - `Card`: Card
     * - `Directdebit`: Direct Debit
     * - `Virtualaccount`: Bank transfer (virtual account)
     */
    pay_type: PaymentMethodPayType

    /**
     * Default flag
     * 
     * Flag that means the customer uses this payment method by default or not.
     * 
     * - `0`: OFF
     * - `1`: ON
     */
    default_flag: "0" | "1"

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * URL to redirect upon successful registration.
     * 
     * The URL to which the purchaser is redirected upon successful completion of the action and registration of the payment method.
     * The redirect is performed using the POST method.
     */
    return_url?: string | null

    /**
     * URL to redirect upon registration failure.
     * 
     * The URL to which the purchaser is redirected upon completion of the action and failure to register the payment method.
     * The redirect is performed using the POST method.
     */
    return_url_on_failure?: string | null

    // ---
    // Card Registration
    // ---

    /**
     * Card information.
     */
    card?: {
        /**
         * Card token responded from fincodeJS (Fincode.tokens(...))
         */
        token: string

        /**
         * Whether the card updater should keep this card's details up to date.
         */
        card_updater_mode?: CardUpdaterMode | null

        /**
         * Defines the behavior of 3D Secure 2 on this payment method registration.
         * 
         * - `0`: Not use.
         * - `2`: Use 3D Secure 2 Authentication
         */
        tds_type?: "0" | "2" | null

        /**
         * Defines the behavior of payment method registration when the card that will be registered does not support 3D Secure 2 
         * 
         * - `2`: fincode API will return HTTP Error(400) and not execute this payment.
         * - `3`: fincode API will execute this payment without 3D Secure 2 authentication. 
         */
        tds2_type?: "2" | "3" | null

        /**
         * The value will be used as your business name in redirect page of 3D Secure. 
         */
        td_tenant_name?: string | null

        /**
         * Date the account who requests 3D Secure 2 was last updated.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ch_acc_change?: string | null

        /**
         * Date the account who requests 3D Secure 2 was created.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ch_acc_date?: string | null

        /**
         * Date the password of the account who requests 3D Secure 2 was changed.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ch_acc_pw_change?: string | null

        /**
         * Number of purchases made by the customer in the past 6 months.
         */
        tds2_nb_purchase_account?: string | null

        /**
         * Date the card was registered.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_payment_acc_age?: string | null

        /**
         * Number of attempts to add cards in the past 24 hours.
         */
        tds2_provision_attempts_day?: string | null

        /**
         * Date of first use of shipping address.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ship_address_usage?: string | null

        /**
         * Customer name owning the card used in this payment and ship-to name matches or not.
         * 
         * - `01`: Matches
         * - `02`: Not match
         */
        tds2_ship_name_ind?: "01" | "02" | null

        /**
         * There is misconduct of the customer or not.
         * 
         * - `01`: There is no misconduct.
         * - `02`: There are some misconduct.
         */
        tds2_suspicious_acc_activity?: "01" | "02" | null

        /**
         * Number of transactions in the last 24 hours.
         */
        tds2_txn_activity_day?: string | null

        /**
         * Number of transactions in the previous year.
         */
        tds2_txn_activity_year?: string | null

        /**
         * Login trails.
         */
        tds2_three_ds_req_auth_data?: string | null

        /**
         * Login method of the customer.
         * 
         * - `01`: Without authoization (user as guest.)
         * - `02`: With custom authorization.
         * - `03`: With SSO.
         * - `04`: With authorization by card issuer.
         * - `05`: With 3rd Party authoriztion.
         * - `06`: With FIDO authorization.
         */
        tds2_three_ds_req_auth_method?: "01" | "02" | "03" | "04" | "05" | "06" | null

        /**
         * Date the customer logged in.
         * 
         * Format: `yyyyMMddHHmm`
         */
        tds2_three_ds_req_auth_timestamp?: string | null

        /**
         * Billing address and shipping address match or not.
         * 
         * - `Y`: Match.
         * - `N`: Not Match.
         */
        tds2_addr_match?: "Y" | "N" | null

        /**
         * City of the cardholder's billing address.
         */
        tds2_bill_addr_city?: string | null

        /**
         * ISO 3166-1 numeric country code of the cardholder's billing address.
         */
        tds2_bill_addr_country?: string | null

        /**
         * 1st line of the cardholder's billing address.
         */
        tds2_bill_addr_line_1?: string | null

        /**
         * 2nd line of the cardholder's billing address.
         */
        tds2_bill_addr_line_2?: string | null

        /**
         * 3rd line of the cardholder's billing address.
         */
        tds2_bill_addr_line_3?: string | null

        /**
         * Postal code of the cardholder's billing address.
         */
        tds2_bill_addr_post_code?: string | null

        /**
         * ISO 3166-2 state code of the cardholder's billing address.
         */
        tds2_bill_addr_state?: string | null

        /**
         * the cardholder's email.
         */
        tds2_email?: string | null

        /**
         * Country Code of cardholder's home phone.
         */
        tds2_home_phone_cc?: string | null

        /**
         * Number of cardholder's home phone.
         */
        tds2_home_phone_no?: string | null

        /**
         * Country Code of cardholder's mobile phone.
         */
        tds2_mobile_phone_cc?: string | null

        /**
         * Number of cardholder's mobile phone.
         */
        tds2_mobile_phone_no?: string | null

        /**
         * Country Code of cardholder's phone for work.
         */
        tds2_work_phone_cc?: string | null

        /**
         * Number of cardholder's phone for work.
         */
        tds2_work_phone_no?: string | null

        /**
         * City of the cardholder's shipping address.
         */
        tds2_ship_addr_city?: string | null

        /**
         * ISO 3166-1 numeric country code of the cardholder's shipping address.
         */
        tds2_ship_addr_country?: string | null

        /**
         * 1st line of the cardholder's shipping address.
         */
        tds2_ship_addr_line_1?: string | null

        /**
         * 2nd line of the cardholder's shipping address.
         */
        tds2_ship_addr_line_2?: string | null

        /**
         * 3rd line of the cardholder's shipping address.
         */
        tds2_ship_addr_line_3?: string | null

        /**
         * Postal code of the cardholder's shipping address.
         */
        tds2_ship_addr_post_code?: string | null

        /**
         * ISO 3166-2 state code of the cardholder's shipping address.
         */
        tds2_ship_addr_state?: string | null

        /**
         * the cardholder's email.
         */
        tds2_delivery_email_address?: string | null

        /**
         * Product Delivery Timeframe.
         * 
         * - `01`: electronic delivery.
         * - `02`: ship today.
         * - `03`: ship at next day.
         * - `04`: ship after 2 days or later.
         */
        tds2_delivery_timeframe?: "01" | "02" | "03" | "04" | null

        /**
         * Total amount of purchased prepaid or gift card.
         */
        tds2_gift_card_amount?: string | null

        /**
         * Count of purchased prepaid or gift card.
         */
        tds2_gift_card_count?: string | null

        /**
         * ISO 4217 currency code of purchased prepaid or gift card.
         */
        tds2_gift_card_curr?: string | null

        /**
         * Estimated date of product release.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_pre_order_date?: string | null

        /**
         * Whether the product is already on sale or is a pre-order.
         * 
         * - `01`: Already on sale.
         * - `02`: Pre-order.
         */
        tds2_pre_order_purchase_ind?: "01" | "02" | null

        /**
         * Whether this is a first-time order or a reorder.
         * 
         * - `01`: First-time order.
         * - `02`: Reorder.
         */
        tds2_reorder_items_ind?: "01" | "02" | null

        /**
         * Shipping method of the purchased product.
         * 
         * - `01`: Ship to the cardholder's billing address.
         * - `02`: Ship to an address the merchant has on file and has verified. (not the billing address)
         * - `03`: Ship to an address that differs from the cardholder's billing address.
         * - `04`: Ship to a store. (the store address is given as the shipping address)
         * - `05`: Digital goods, including online services, electronic gift cards and redemption codes.
         * - `06`: No shipping. (travel and event tickets)
         * - `07`: Other, such as games, digital services that are not shipped, and digital media subscriptions.
         */
        tds2_ship_ind?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | null

        /**
         * Expiring date of recurring billing.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_recurring_expiry?: string | null

        /**
         * Minimum interval days of recurring billing.
         */
        tds2_recurring_frequency?: string | null
    }

    /**
     * Bank account information.
     */
    directdebit?: {
        /**
         * Direct debit application type
         * 
         * - `ONLINE`: Online application
         * - `PAPER`: Paper application
         */
        application_type: DirectDebitApplicationType

        /**
         * Transfer service to register the bank account with.
         * 
         * The service determines the days of the month on which the debit is
         * taken. Leave it out to register with the shop's default service,
         * which is the one whose examination completed most recently.
         * 
         * - `1`: Direct debit on the 5th, 6th, 23rd and 27th.
         * - `2`: Direct debit on the 1st, 5th, 20th and 26th.
         */
        settlement_route?: DirectDebitSettlementRoute | null

        /**
         * Bank code
         * 
         * Example: `0001`
         */
        bank_code: string

        /**
         * Branch code
         * 
         * required if `directdebit.bank_code` is not `9900`(JP Bank) 
         * 
         * Example: `001`
         */
        branch_code?: string | null

        /**
         * Account type
         * 
         * required if `directdebit.bank_code` is not `9900`(JP Bank)
         * 
         * - `1`: Savings account (普通預金)
         * - `2`: Current account (当座預金)
         */
        account_type?: "1" | "2" | null

        /**
         * Account number
         * 
         * required if `directdebit.bank_code` is not `9900`(JP Bank)
         * 
         * Example: `1234567`
         */
        account_number?: string | null

        /**
         * Account holder name
         */
        account_name?: string | null

        /**
         * Account holder name kana
         * 
         * You can use the following characters:
         * - Half/Full width Alphabets
         * - Half/Full width Numbers
         * - Half/Full width Katakana
         * - Half/Full width Space
         * - Some Symbols: `.`, `(`, `)`, `-`, `． `, `（`, `）`, `ー`
         */
        account_name_kana: string

        /**
         * Paper application info
         */
        paper_application?: {
            /**
             * Request form ID
             * 
             * ID of the paper request form that was used to register this bank account.
             */
            request_form_id: string

            
            /**
             * Postal account number 1
             * 
             * Account number 1 of JP Bank (Yucho Bank) account.
             */
            postal_account_number_1?: string | null

            /**
             * Postal account number 2
             * 
             * Account number 2 of JP Bank (Yucho Bank) account.
             */
            postal_account_number_2?: string | null
        } | null
    }
}

/**
 * Request Query Parameters of Retrieving Payment Method List (used for GET /v1/customers/{customer_id}/payment_methods)
 */
export type RetrievingPaymentMethodListQueryParams = {
    /**
     * Payment method type
     * 
     * - `Card`: Card
     * - `Directdebit`: Direct Debit
     * - `Virtualaccount`: Bank transfer (virtual account)
     */
    pay_type: PaymentMethodPayType
}

/**
 * Request Query Parameters of Retrieving a Payment Method (used for GET /v1/customers/{customer_id}/payment_methods/{id})
 */
export type RetrievingPaymentMethodQueryParams = {
    /**
     * Payment method type
     * 
     * - `Card`: Card
     * - `Directdebit`: Direct Debit
     * - `Virtualaccount`: Bank transfer (virtual account)
     */
    pay_type: PaymentMethodPayType
}

/**
 * Response object of Deleting Payment method (used for DELETE /v1/customers/{customer_id}/payment_methods/{id})
 */
export type DeletingPaymentMethodResponse = {
    /**
     * Payment Method ID that has just been deleted.
     */
    id: string

    /**
     * Flag this card has already been deleted or not.
     * 
     * - `0`: Not deleted. This customer is still available.
     * - `1`: Deleted. This customer is no longer available.
     */
    delete_flag: "0" | "1"
}
