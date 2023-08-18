import { PaymentBulkStatus } from "./bulk.payment"
import { ContractAquirer, ExaminationStatusCode } from "./contract"
import { KonbiniCode, PayType, PaymentJobCode, PaymentStatus } from "./payment"
import { SubscriptionStatus } from "./subscription"

export type WebhookListenerResponse = {
    receive: "0" | "1"
}

/**
 * Webhook Notification for Payment API
 * 
 * for
 * - `payments.**.**` (except `payments.bulk.**.**`)
 * - `konbini.**.**`
 * - `paypay.**.**`
 */
export type PaymentWebhookNotification = {
    shop_id?: string | null
    access_id?: string | null
    order_id?: string | null
    pay_type?: PayType | null
    status?: PaymentStatus | null
    amount?: string | null
    tax?: string | null
    currency?: "JPY" | null
    customer_id?: string | null
    job_code?: PaymentJobCode | null
    transaction_id?: string | null
    transaction_date?: string | null
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null
    bulk_payment_id?: string | null
    error_code?: string | null
    event?: string | null

    // ---
    // Card payment / Apple Pay payment
    // ---
    forward?: string | null
    method?: "1" | "2" | "5"
    approve?: string | null
    pay_times?: string | null

    // ---
    // Konbini payment
    // ---
    order_serial?: string | null
    invoice_id?: string | null
    konbini_code?: KonbiniCode | null
    konbini_store_code?: string | null
    overpayment_flag?: "0" | "1" | null

    // ---
    // PayPay payment
    // ---
    code_expiry_date?: string | null
    auth_max_date?: string | null
    order_description?: string | null
    payment_id?: string | null
    merchant_payment_id?: string | null
    merchant_capture_id?: string | null
    merchant_revert_id?: string | null
    merchant_update_id?: string | null
    merchant_refund_id?: string | null
    payment_date?: string | null
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
    order_id?: string | null
    customer_group_id?: string | null
    card_id?: string | null
    process_date?: string | null
    card_no_display?: string | null
    expire_display?: string | null
    default_flag?: "0" | "1" | null
    pay_type?: Extract<PayType, "Card"> | null
    error_code?: string | null
    event?: string | null
}

/**
 * Webhook Notification for Subscription API
 * 
 * for
 * - `subscription.**.**`
 */
export type SubscriptionWebhookNotification = {
    status?: SubscriptionStatus | null
    shop_id?: string | null
    subscription_id?: string | null
    process_date?: string | null
    plan_id?: string | null
    customer_id?: string | null
    card_id?: string | null
    default_card_flag?: "0" | "1" | null
    start_date?: string | null
    stop_date?: string | null
    next_charge_date?: string | null
    end_month_flag?: "0" | "1" | null
    client_field_1?: string | null
    client_field_2?: string | null
    client_field_3?: string | null
    pay_type?: Extract<PayType, "Card"> | null
    event?: string | null
}

/**
 * Webhook Notification for Subscription API (Recurring process)
 * 
 * for
 * - `recurring.card.batch`
 */
export type RecurringWebhookNotification = {
    succeeded?: number | null
    failed?: number | null
    total?: number | null
    shop_id?: string | null
    process_date?: string | null
    charge_date?: string | null
    pay_type?: Extract<PayType, "Card"> | null
    event?: string | null
}

/**
 * Webhook Notification for Payment Bulk API
 */
export type PaymentBulkWebhookNotification = {
    bulk_payment_id?: string | null
    shop_id?: string | null
    file_name?: string | null
    process_plan_date?: string | null
    status?: PaymentBulkStatus | null

    error_total_count?: number | null
    regist_total_count?: number | null

    succeeded_count?: number | null
    failed_count?: number | null
    total_count?: number | null

    error_code?: string | null
    bulk_search_url?: string | null
    pay_type?: Extract<PayType, "Card"> | null
    event?: string | null
}

/**
 * Webhook Notification for Contract process
 */
export type ContractWebhookNotification = {
    shop_id?: string | null
    event?: string | null
    body?: ContractInformation[] | null
}

export type ContractInformation = {
    acquirer?: ContractAquirer | null
    examination_task?: string | null
    status_code?: ExaminationStatusCode | null
    is_updated?: boolean | null
}