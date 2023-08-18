/**
     * Payment session object
     */
export type PaymentSessionObject = {
    /** 
     * ID
     */
    id: string

    /**
     * Redirect target URL
     */
    link_url: string

    /**
     * Return URL (for successful payment)
     */
    success_url: string

    /**
     * Return URL (for canceled payment)
     */
    cancel_url?: string | null

    /**
     * Status
     */
    status: PaymentSessionStatus

    /**
     * Expire date
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    expire: string

    /**
     * Shop service name displayed on the payment session page.
     */
    shop_service_name: string

    /**
     * Reciever's email address.
     */
    receiver_mail?: string | null

    /**
     * Customer name displayed on the email.
     */
    mail_customer_name?: string | null

    /**
     * Flag to send guide email or not.
     * 
     * - `0`: No, don't send guide email. (default)
     * - `1`: Yes, send guide email.
     */
    guide_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send complete email or not.
     * 
     * - `0`: No, don't send complete email. (default)
     * - `1`: Yes, send complete email.
     */
    thanks_mail_send_flag?: "0" | "1" | null

    /**
     * Mail template ID.
     */
    shop_mail_template_id?: string | null

    /**
     * Transaction (Order) object
     */
    transaction: {
        /**
         * Payment method types used for this session.
         */
        pay_type: ("Card" | "Konbini" | "PayPay")[]

        /**
         * Order ID.
         */
        order_id: string

        /**
         * Amount.
         */
        amount: number

        /**
         * Tax
         */
        tax: number

        /**
         * Fields where merchants can freely set values
         */
        client_field_1?: string | null
        client_field_2?: string | null
        client_field_3?: string | null

        /**
         * Webhook URL
         */
        send_url?: string | null
    }

    /**
     * Card payment object
     */
    card: {
        /**
         * Job code
         * 
         * - `AUTH`: Authorization
         * - `CAPTURE`: Capture
         */
        job_code?: "AUTH" | "CAPTURE" | null

        /**
         * Item code
         */
        item_code?: string | null

        /**
         * Defines the behavior of 3D Secure 2.0
         * 
         * - `0`: Not use 3D Secure 2.0.
         * - `2`: Use 3D Secure 2.0 Authentication
         */
        tds_type?: "0" | "2" | null

        /**
         * Defines the behavior payment when the card used in this payment does not support 3D Secure 2.0 
         * 
         * - `2`: fincode API will return HTTP Error(400) and not execute this payment.
         * - `3`: fincode API will execute this payment without 3D Secure 2.0 authentication. 
         */
        tds2_type?: "2" | "3" | null

        /**
         * The value will be used as your business name in redirect page of 3D Secure. 
         */
        td_tenant_name?: string | null
    }

    /**
     * Konbini payment object
     */
    konbini: {
        /**
         * Payment URL
         */
        konbini_reception_url?: string | null

        /**
         * Offset days from the date payment request has succeeded.
         */
        payment_term_day?: number | null

        /**
         * Flag to send barcode payment email or not.
         */
        konbini_receipt_mail_send_flag?: "0" | "1" | null
    }

    /**
     * PayPay payment object
     */
    paypay: {
        /**
         * Job code 
         */
        job_code?: "AUTH" | "CAPTURE" | null

        /**
         * Order description of PayPay payment that will be displayed on PayPay app.
         */
        order_description?: string | null
    }
}

/**
 * Request object for Creating a payment session
 */
export type CreatingPaymentSessionRequest = {
    /**
     * Return URL (for successful payment)
     * 
     * If this value is not set, customer will be redirected to URL fincode provides.
     */
    success_url?: string | null

    /**
     * Return URL (for canceled payment)
     * 
     * If this value is not set, customer will be redirected to URL fincode provides.
     */
    cancel_url?: string | null

    /**
     * Expire date
     * 
     * Format: `yyyy/MM/dd HH:mm:ss`
     */
    expire?: string | null

    /**
     * Shop service name displayed on the payment session page.
     */
    shop_service_name?: string | null

    /**
     * Reciever's email address.
     */
    receiver_mail?: string | null

    /**
     * Flag to send guide email or not.
     * 
     * - `0`: No, don't send guide email. (default)
     * - `1`: Yes, send guide email.
     */
    guide_mail_send_flag?: "0" | "1" | null

    /**
     * Flag to send complete email or not.
     */
    thanks_mail_send_flag?: "0" | "1" | null

    /**
     * Mail template ID.
     */
    shop_mail_template_id?: string | null

    /**
     * Transaction (Order) object
     */
    transaction: {
        /**
         * Payment method types used for this session.
         * 
         * - `Card`: Card payment
         * - `Konbini`: Konbini payment
         * - `PayPay`: PayPay payment
         */
        pay_type?: ("Card" | "Konbini" | "PayPay")[] | null

        /**
         * Order ID.
         */
        order_id?: string | null

        /**
         * Amount.
         */
        amount: string

        /**
         * Tax.
         */
        tax?: string | null

        /**
         * Fields where merchants can freely set values
         */
        client_field_1?: string | null
        client_field_2?: string | null
        client_field_3?: string | null
    }

    /**
     * Card payment object
     */
    card?: {
        /**
         * Job code
         * 
         * - `AUTH`: Authorization (default)
         * - `CAPTURE`: Capture
         */
        job_code?: "AUTH" | "CAPTURE" | null

        /**
         * Defines the behavior of 3D Secure 2.0
         * 
         * - `0`: Not use 3D Secure 2.0.
         * - `2`: Use 3D Secure 2.0 Authentication
         */
        tds_type?: "0" | "2" | null

        /**
         * Defines the behavior payment when the card used in this payment does not support 3D Secure 2.0 
         * 
         * - `2`: fincode API will return HTTP Error(400) and not execute this payment.
         * - `3`: fincode API will execute this payment without 3D Secure 2.0 authentication. 
         */
        tds2_type?: "2" | "3" | null

        /**
         * The value will be used as your business name in redirect page of 3D Secure. 
         */
        td_tenant_name?: string | null


        /**
         * Date the account who requests 3D Secure 2.0 was last updated.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ch_acc_change?: string | null

        /**
         * Date the account who requests 3D Secure 2.0 was created.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_ch_acc_date?: string | null

        /**
         * Date the password of the account who requests 3D Secure 2.0 was changed.
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
        tds2_three_ds_req_auth_method?: "01" | "02" | "03" | "04" | "05" | null

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
         * 
         */
        tds2_pre_order_purchaselnd?: string | null

        /**
         * 
         */
        tds2_reorder_items_ind?: string | null

        /**
         * 
         */
        tds2_ship_ind?: string | null

        /**
         * Expiring date of recurring billing.
         * 
         * Format: `yyyyMMdd`
         */
        tds2_recuring_expiry?: string | null

        /**
         * Minimum interval days of recurring billing.
         */
        tds2_recuring_frequency?: string | null
    }

    /**
     * Konbini payment object
     */
    konbini?: {
        /**
         * The term payment is available in Konbini.
         * 
         * - min: `"0"`
         * - max: `"14"`
         */
        payment_term_day?: string | null

        /**
         * Flag to send reception email.
         * 
         * - `0`: Not send. (default)
         * - `1`: Send.
         */
        konbini_reception_mail_flag?: "0" | "1" | null
    }

    /**
     * PayPay payment object
     */
    paypay?: {
        /**
         * Job code
         * 
         * - `AUTH`: Authorization (default)
         * - `CAPTURE`: Capture
         */
        job_code?: "AUTH" | "CAPTURE" | null

        /**
         * Order description of PayPay payment.
         */
        order_description?: string | null
    }
}

/**
 * Status
 * 
 * - `CREATE`: The URL has just been created.
 * - `PAYSTART`: Customer has started payment session.
 * - `REQSUCCESS`: Payment request has succeeded and waiting for payment.
 * - `PAYSUCCESS`: Payment has succeeded.
 * - `ERROR`: Error has occurred or the payment has been canceled.
 */
export type PaymentSessionStatus = "CREATE" | "PAYSTART" | "REQSUCCESS" | "PAYSUCCESS" | "ERROR"