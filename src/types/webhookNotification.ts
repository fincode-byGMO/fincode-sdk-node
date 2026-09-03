import { PaymentBulkStatus } from "./bulk.payment"
import { ContractAcquirer, ExaminationStatusCode } from "./contract"
import { Modify } from "../utils/utilTypes"
import { ChargebackStatusCode } from "./chargeback"
import { DirectDebitApplicationType, PaymentMethodStatus, PaymentMethodVirtualAccount } from "./paymentMethod"
import { CardPayTimes, PayType, PaymentObject } from "./payment"
import { SubscriptionStatus } from "./subscription"
import { WebhookEvent } from "./webhookSetting"

export type WebhookListenerResponse = {
    receive: "0" | "1"
}

/**
 * Fields every payment notification carries, whatever the payment method.
 */
type PaymentWebhookCommonFields = Modify<
    Partial<Pick<PaymentObject,
        | "shop_id"
        | "access_id"
        | "status"
        | "customer_id"
        | "client_field_1"
        | "client_field_2"
        | "client_field_3"
        | "error_code"
    >>,
    {
        /**
         * Order ID of the payment.
         */
        order_id?: string | null

        /**
         * Amount. A string here, unlike the number the payment API answers with.
         */
        amount?: string | null

        /**
         * Tax and shipping fee. A string here, unlike the number the payment
         * API answers with.
         */
        tax?: string | null
    }
>

/**
 * Fields the card, Apple Pay and Google Pay notifications share.
 */
type CardLikePaymentWebhookFields = Modify<
    Partial<Pick<PaymentObject, "job_code" | "forward" | "transaction_id" | "transaction_date" | "approve" | "method">>,
    {
        /**
         * Currency of the payment.
         */
        currency?: "JPY" | null
    }
>

/**
 * Webhook Notification for Payment API
 * 
 * for
 * - `payments.**` (except `payments.bulk.**`)
 * 
 * The payment methods carry different fields, so branch on `pay_type` before
 * reading anything but what they all share: `shop_id`, `order_id`,
 * `access_id`, `status`, `customer_id`, `client_field_1` to `client_field_3`,
 * `amount`, `tax`, `error_code`, `pay_type` and `event`.
 */
export type PaymentWebhookNotification =
    | CardPaymentWebhookNotification
    | ApplePayPaymentWebhookNotification
    | GooglePayPaymentWebhookNotification
    | KonbiniPaymentWebhookNotification
    | PayPayPaymentWebhookNotification
    | DirectDebitPaymentWebhookNotification
    | VirtualAccountPaymentWebhookNotification

/**
 * Webhook Notification for a card payment
 * 
 * for
 * - `payments.card.**`
 */
export type CardPaymentWebhookNotification = PaymentWebhookCommonFields & CardLikePaymentWebhookFields & {
    pay_type: Extract<PayType, "Card">
    event?: Extract<WebhookEvent, `payments.card.${string}`> | null
} & Modify<
    Partial<Pick<PaymentObject, "subscription_id" | "bulk_payment_id">>,
    {
        /**
         * How many installments the payment is split into. A string here,
         * unlike the number the payment API answers with.
         */
        pay_times?: CardPayTimes | null
    }
>

/**
 * Webhook Notification for an Apple Pay payment
 * 
 * for
 * - `payments.applepay.**`
 */
export type ApplePayPaymentWebhookNotification = PaymentWebhookCommonFields & CardLikePaymentWebhookFields & {
    pay_type: Extract<PayType, "Applepay">
    event?: Extract<WebhookEvent, `payments.applepay.${string}`> | null
}

/**
 * Webhook Notification for a Google Pay payment
 * 
 * for
 * - `payments.googlepay.**`
 */
export type GooglePayPaymentWebhookNotification = PaymentWebhookCommonFields & CardLikePaymentWebhookFields & {
    pay_type: Extract<PayType, "Googlepay">
    event?: Extract<WebhookEvent, `payments.googlepay.${string}`> | null

    /**
     * How many installments the payment is split into. A string here, unlike
     * the number the payment API answers with.
     */
    pay_times?: CardPayTimes | null
}

/**
 * Webhook Notification for a konbini payment
 * 
 * for
 * - `payments.konbini.**`
 */
export type KonbiniPaymentWebhookNotification = PaymentWebhookCommonFields & Partial<Pick<PaymentObject,
    | "process_date"
    | "payment_term"
    | "payment_date"
    | "konbini_code"
    | "konbini_store_code"
    | "order_serial"
    | "invoice_id"
    | "overpayment_flag"
    | "cancel_overpayment_flag"
>> & {
    pay_type: Extract<PayType, "Konbini">
    event?: Extract<WebhookEvent, `payments.konbini.${string}`> | null
}

/**
 * Webhook Notification for a PayPay payment
 * 
 * for
 * - `payments.paypay.**`
 */
export type PayPayPaymentWebhookNotification = PaymentWebhookCommonFields & Partial<Pick<PaymentObject,
    | "process_date"
    | "job_code"
    | "code_expiry_date"
    | "auth_max_date"
    | "order_description"
    | "code_id"
    | "payment_id"
    | "payment_date"
    | "merchant_payment_id"
    | "merchant_update_id"
    | "merchant_revert_id"
    | "merchant_refund_id"
>> & {
    pay_type: Extract<PayType, "Paypay">
    event?: Extract<WebhookEvent, `payments.paypay.${string}`> | null
}

/**
 * Webhook Notification for a direct debit payment
 * 
 * for
 * - `payments.directdebit.**`
 */
export type DirectDebitPaymentWebhookNotification = PaymentWebhookCommonFields & Partial<Pick<PaymentObject,
    | "process_date"
    | "payment_method_id"
    | "result_code"
    | "target_date"
    | "withdrawal_date"
    | "request_accept_end_date"
    | "transfer_return_date"
    | "remarks"
    | "subscription_id"
>> & {
    pay_type: Extract<PayType, "Directdebit">
    event?: Extract<WebhookEvent, `payments.directdebit.${string}`> | null
}

/**
 * Webhook Notification for a bank transfer (virtual account) payment
 * 
 * for
 * - `payments.virtualaccount.**`
 */
export type VirtualAccountPaymentWebhookNotification = PaymentWebhookCommonFields & Partial<Pick<PaymentObject,
    | "customer_group_id"
    | "process_date"
    | "billing_total_amount"
    | "payment_term_day"
    | "payment_term"
    | "payment_method_id"
    | "va_branch_code"
    | "va_branch_name"
    | "va_account_number"
    | "va_account_name"
    | "account_assignment_date"
    | "virtual_account_id"
    | "transaction_date"
    | "value_date"
    | "remitter_bank_name"
    | "remitter_branch_name"
    | "remitter_account_name"
    | "overpayment_flag"
    | "cancel_overpayment_flag"
    | "expire_overpayment_flag"
    | "bulk_payment_id"
    | "use_static_virtual_account"
    | "use_exact_deposit_amount"
>> & {
    pay_type: Extract<PayType, "Virtualaccount">
    event?: Extract<WebhookEvent, `payments.virtualaccount.${string}`> | null

    /**
     * Billing amount. A string here, unlike the number the payment API answers
     * with.
     */
    billing_amount?: string | null

    /**
     * Tax and shipping fee of the billing amount. A string here, unlike the
     * number the payment API answers with.
     */
    billing_tax?: string | null
}

/**
 * Webhook Notification for Card API
 * 
 * for
 * - `card.**`
 */
export type CardWebhookNotification = {
    forward?: string | null
    shop_id?: string | null
    customer_group_id?: string | null
    customer_id?: string | null
    card_id?: string | null
    process_date?: string | null
    card_no_display?: string | null
    expire_display?: string | null
    default_flag?: "0" | "1" | null
    pay_type?: Extract<PayType, "Card"> | null

    /**
     * Whether this notification is for a registration or an update.
     * 
     * - `I`: The card was registered.
     * - `U`: The card was updated.
     */
    process_type?: "I" | "U" | null

    /**
     * - `card.regist`: the card was registered.
     * - `card.update`: the card was updated.
     */
    event?: Extract<WebhookEvent, "card.regist" | "card.update"> | null
}

/**
 * Fields both subscription notifications carry.
 */
type SubscriptionWebhookCommonFields = {
    shop_id?: string | null
    subscription_id?: string | null
    plan_id?: string | null
    customer_id?: string | null
    status?: SubscriptionStatus | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    start_date?: string | null
    stop_date?: string | null
    next_charge_date?: string | null

    /**
     * Whether the charge falls on the last day of the month.
     */
    end_month_flag?: "0" | "1" | null
}

/**
 * Webhook Notification for Subscription API
 * 
 * for
 * - `subscription.**`
 * 
 * A card subscription and a direct debit one are delivered to separate
 * endpoints and carry different fields, so branch on `pay_type`.
 */
export type SubscriptionWebhookNotification =
    | CardSubscriptionWebhookNotification
    | DirectDebitSubscriptionWebhookNotification

/**
 * Webhook Notification for a card subscription
 */
export type CardSubscriptionWebhookNotification = SubscriptionWebhookCommonFields & {
    pay_type: Extract<PayType, "Card">

    /**
     * Card ID used by the subscription.
     */
    card_id?: string | null

    /**
     * Whether the subscription uses the customer's default card.
     */
    default_card_flag?: "0" | "1" | null

    process_date?: string | null

    event?: Extract<WebhookEvent, `subscription.card.${string}`> | null
}

/**
 * Webhook Notification for a direct debit subscription
 */
export type DirectDebitSubscriptionWebhookNotification = SubscriptionWebhookCommonFields & {
    pay_type: Extract<PayType, "Directdebit">

    /**
     * Payment method ID of the bank account the debit is taken from.
     */
    payment_method_id?: string | null

    /**
     * Whether the subscription uses the customer's default payment method.
     */
    default_flag?: "0" | "1" | null

    /**
     * Usage details that will be displayed on the customer's bank statement.
     */
    remarks?: string | null

    event?: Extract<WebhookEvent, `subscription.directdebit.${string}`> | null
}

/**
 * Fields both recurring batch notifications carry.
 */
type RecurringWebhookCommonFields = {
    shop_id?: string | null

    /**
     * How many charges succeeded.
     */
    succeeded?: string | null

    /**
     * How many charges failed.
     */
    failed?: string | null

    /**
     * How many charges the batch attempted.
     */
    total?: string | null

    process_date?: string | null

    /**
     * Date the batch charged for.
     */
    charge_date?: string | null
}
/**
 * Webhook Notification for the recurring charge batch
 * 
 * for
 * - `recurring.**`
 * 
 * Only the card batch reports whether a retry is scheduled, so branch on
 * `pay_type` to read it.
 */
export type RecurringWebhookNotification =
    | CardRecurringWebhookNotification
    | DirectDebitRecurringWebhookNotification


/**
 * Webhook Notification for the card recurring charge batch
 */
export type CardRecurringWebhookNotification = RecurringWebhookCommonFields & {
    pay_type: Extract<PayType, "Card">

    /**
     * Whether a retry is scheduled for the charges that failed.
     */
    retry_scheduled?: string | null

    event?: Extract<WebhookEvent, `recurring.card.${string}`> | null
}

/**
 * Webhook Notification for the direct debit recurring charge batch
 */
export type DirectDebitRecurringWebhookNotification = RecurringWebhookCommonFields & {
    pay_type: Extract<PayType, "Directdebit">

    event?: Extract<WebhookEvent, `recurring.directdebit.${string}`> | null
}

/**
 * Fields both bulk payment notifications carry.
 */
type PaymentBulkWebhookCommonFields = {
    shop_id?: string | null
    bulk_payment_id?: string | null

    /**
     * Name of the uploaded file.
     */
    file_name?: string | null

    status?: PaymentBulkStatus | null

    /**
     * Payment method of the bulk payment.
     */
    pay_type?: Extract<PayType, "Card" | "Virtualaccount"> | null
}
/**
 * Webhook Notification for Bulk Payment API
 * 
 * for
 * - `payments.bulk.**`
 * 
 * Registering a file and running the batch report different counts, so branch
 * on `event`. Unlike the other notifications, the shape here follows the
 * operation rather than `pay_type`.
 */
export type PaymentBulkWebhookNotification =
    | RegisteringPaymentBulkWebhookNotification
    | BatchPaymentBulkWebhookNotification


/**
 * Webhook Notification for registering a bulk payment file
 * 
 * for
 * - `payments.bulk.card.regist`
 * - `payments.bulk.virtualaccount.regist`
 */
export type RegisteringPaymentBulkWebhookNotification = PaymentBulkWebhookCommonFields & {
    /**
     * How many payments were registered from the file.
     */
    regist_total_count?: string | null

    /**
     * How many rows of the file were rejected.
     */
    error_total_count?: string | null

    /**
     * URL that lists the registered payments.
     */
    bulk_search_url?: string | null

    error_code?: string | null

    event?: Extract<WebhookEvent, `payments.bulk.${string}.regist`> | null
}

/**
 * Webhook Notification for running a bulk payment batch
 * 
 * for
 * - `payments.bulk.card.batch`
 * - `payments.bulk.virtualaccount.batch`
 */
export type BatchPaymentBulkWebhookNotification = PaymentBulkWebhookCommonFields & {
    /**
     * How many payments succeeded.
     */
    succeeded_count?: string | null

    /**
     * How many payments failed.
     */
    failed_count?: string | null

    /**
     * How many payments the batch attempted.
     */
    total_count?: string | null

    event?: Extract<WebhookEvent, `payments.bulk.${string}.batch`> | null
}

/**
 * Webhook Notification for Contract process
 */
export type ContractWebhookNotification = {
    shop_id?: string | null
    /**
     * - `contracts.status_code.updated`: the contract status changed.
     */
    event?: Extract<WebhookEvent, "contracts.status_code.updated"> | null
    body?: ContractInformation[] | null
}

export type ContractInformation = {
    acquirer?: ContractAcquirer | null
    examination_task?: string | null
    status_code?: ExaminationStatusCode | null
    is_updated?: boolean | null
}

/**
 * Webhook Notification for the card updater
 * 
 * for
 * - `card.updater.complete`
 */
export type CardUpdaterCompleteWebhookNotification = {
    shop_id?: string | null

    /**
     * Customer information sharing group ID.
     */
    customer_group_id?: string | null

    /**
     * Month the card updater ran.
     * 
     * Format: `yyyyMM`
     */
    card_updater_process_month?: string | null

    /**
     * How many cards were updated successfully.
     */
    success_count?: number | null

    /**
     * How many cards the updater attempted.
     */
    processed_count?: number | null

    event?: Extract<WebhookEvent, "card.updater.complete"> | null
}

/**
 * Webhook Notification for Invoice API
 * 
 * for
 * - `invoice.**`
 */
export type InvoiceWebhookNotification = {
    shop_id?: string | null

    /**
     * ID of the invoice the event happened on.
     * 
     * Retrieving the invoice with it gives the current state.
     */
    invoice_id?: string | null

    /**
     * - `invoice.create`: the invoice was created.
     * - `invoice.update`: the invoice was updated.
     * - `invoice.open`: the invoice was opened and the customer was billed.
     * - `invoice.cancel`: the invoice was canceled.
     * - `invoice.delete`: the invoice was deleted.
     * - `invoice.expired`: the invoice passed its due date.
     * - `invoice.paid`: the invoice was paid.
     */
    event?: Extract<WebhookEvent,
        | "invoice.create"
        | "invoice.update"
        | "invoice.open"
        | "invoice.cancel"
        | "invoice.delete"
        | "invoice.expired"
        | "invoice.paid"
    > | null
}

/**
 * Webhook Notification for Chargeback API
 * 
 * for
 * - `charge_backs.**`
 */
export type ChargebackWebhookNotification = {
    /**
     * Shop ID the chargeback belongs to.
     */
    shop_id?: string | null

    /**
     * ID of the chargeback the event happened on.
     * 
     * Retrieving the chargeback with it gives the current state.
     */
    charge_back_id?: string | null

    /**
     * Status of the chargeback at the time of the notification.
     * 
     * The same value as `status_code` on the chargeback itself.
     */
    status?: ChargebackStatusCode | null

    /**
     * - `charge_backs.regist`: the chargeback was disclosed to the shop for the first time.
     * - `charge_backs.update`: the status of a disclosed chargeback changed.
     */
    event?: Extract<WebhookEvent, "charge_backs.regist" | "charge_backs.update"> | null
}

/**
 * Webhook Notification for Change Request API
 * 
 * for
 * - `change_requests.**`
 */
export type ChangeRequestWebhookNotification = {
    /**
     * Shop ID the change request belongs to.
     */
    shop_id?: string | null

    /**
     * ID of the change request the event happened on.
     * 
     * Retrieving the change request with it and the shop ID gives the current
     * state.
     */
    change_request_id?: string | null

    /**
     * - `change_requests.regist`: a change request was filed.
     * - `change_requests.update`: the status of a change request changed.
     */
    event?: Extract<WebhookEvent, "change_requests.regist" | "change_requests.update"> | null
}

/**
 * Bank account details carried by a direct debit payment method notification.
 * 
 * A smaller shape than the `directdebit` object of the payment method API,
 * which nests `request_form_id` and `paper_failure_description` under
 * `paper_application`.
 */
export type WebhookPaymentMethodDirectDebit = {
    /**
     * Direct debit application type
     * 
     * - `ONLINE`: Online application
     * - `PAPER`: Paper application
     */
    application_type?: DirectDebitApplicationType | null

    /**
     * ID the registrant gave the paper application form.
     */
    request_form_id?: string | null

    /**
     * Why registering the paper application failed.
     */
    paper_failure_description?: string | null
}

/**
 * Webhook Notification for Payment Method API
 * 
 * for
 * - `customers.payment_methods.**`
 * 
 * The three payment method types carry different fields, name the payment
 * method differently and give `status` a different meaning, so branch on
 * `pay_type` before reading anything but the fields all three share:
 * `shop_id`, `customer_id`, `process_date`, `status`, `client_field_1` to
 * `client_field_3`, `pay_type` and `event`.
 * 
 * Only a virtual account fires all five events. A card or a bank account only
 * ever fires `customers.payment_methods.updated`.
 */
export type PaymentMethodWebhookNotification =
    | PaymentMethodCardWebhookNotification
    | PaymentMethodDirectDebitWebhookNotification
    | PaymentMethodVirtualAccountWebhookNotification

/**
 * Webhook Notification for a card payment method
 * 
 * for
 * - `customers.payment_methods.updated`
 */
export type PaymentMethodCardWebhookNotification = {
    pay_type: Extract<PayType, "Card">

    shop_id?: string | null

    /**
     * Order ID of the payment the registration ran as.
     */
    order_id?: string | null

    /**
     * Status of this payment method.
     */
    card_status?: PaymentMethodStatus | null

    /**
     * Customer information sharing group ID.
     */
    customer_group_id?: string | null

    customer_id?: string | null

    /**
     * Card ID. The payment method is named `card_id` here rather than `id`.
     */
    card_id?: string | null

    process_date?: string | null

    /**
     * Whether this notification is for a registration or an update.
     * 
     * - `I`: The card was registered.
     * - `U`: The card was updated.
     */
    process_type?: "I" | "U" | null

    /**
     * Masked card number.
     */
    card_no_display?: string | null

    /**
     * The expiring date of the card. Format: `yymm`
     */
    expire_display?: string | null

    /**
     * Forwarding destination of the registration.
     */
    forward?: string | null

    default_flag?: "0" | "1" | null

    /**
     * State of the 3D Secure 2 authentication, not of the payment method.
     * 
     * `card_status` is the one that carries the payment method's state.
     * 
     * - `AUTHENTICATED`: authenticating. Also sent when authentication failed.
     * - `CHECK`: authentication finished.
     * 
     * `null` when 3D Secure is not used.
     */
    status?: "AUTHENTICATED" | "CHECK" | null

    access_id?: string | null

    transaction_id?: string | null

    approve?: string | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    error_code?: string | null

    event?: Extract<WebhookEvent, "customers.payment_methods.updated"> | null
}

/**
 * Webhook Notification for a direct debit payment method
 * 
 * for
 * - `customers.payment_methods.updated`
 */
export type PaymentMethodDirectDebitWebhookNotification = {
    pay_type: Extract<PayType, "Directdebit">

    shop_id?: string | null

    customer_id?: string | null

    /**
     * Payment method ID.
     */
    payment_method_id?: string | null

    process_date?: string | null

    /**
     * Status of this payment method.
     */
    status?: PaymentMethodStatus | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    /**
     * Bank account details.
     */
    directdebit?: WebhookPaymentMethodDirectDebit | null

    event?: Extract<WebhookEvent, "customers.payment_methods.updated"> | null
}

/**
 * Webhook Notification for a virtual account payment method
 * 
 * for
 * - `customers.payment_methods.created`
 * - `customers.payment_methods.updated`
 * - `customers.payment_methods.inactivated`
 * - `customers.payment_methods.activated`
 * - `customers.payment_methods.deleted`
 */
export type PaymentMethodVirtualAccountWebhookNotification = {
    pay_type: Extract<PayType, "Virtualaccount">

    shop_id?: string | null

    /**
     * Payment method ID.
     */
    id?: string | null

    customer_id?: string | null

    process_date?: string | null

    /**
     * Status of this payment method.
     */
    status?: PaymentMethodStatus | null

    default_flag?: "0" | "1" | null

    delete_flag?: "0" | "1" | null

    /**
     * Fields where merchants can freely set values
     */
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null

    created?: string | null

    updated?: string | null

    /**
     * Virtual account details. The same eight fields the payment method API
     * returns under `virtualaccount`.
     */
    virtual_account?: PaymentMethodVirtualAccount | null

    event?: Extract<WebhookEvent,
        | "customers.payment_methods.created"
        | "customers.payment_methods.updated"
        | "customers.payment_methods.inactivated"
        | "customers.payment_methods.activated"
        | "customers.payment_methods.deleted"
    > | null
}
