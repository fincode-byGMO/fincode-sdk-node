/**
 * Pagination object of Retrieving a list of payments. (used for GET /v1/payments)
 */
export class RetrievingPaymentListPagination {
    /**
     * Maximum number of items to return.
     */
    limit;
    /**
     * Number of this page.
     */
    page;
    /**
     * Flag to retrieve only the total number of items.
     */
    count_only;
    /**
     * Sort
     */
    sort;
    /**
     * Payment method
     *
     * - `Card`: Card payment
     * - `Konbini`: Konbini payment
     * - `Paypay`: PayPay payment
     * - `Applepay`: Apple Pay payment
     */
    pay_type;
    /**
     * Search string for
     *
     * - `client_field_1`
     * - `client_field_2`
     * - `client_field_3`
     *
     * (partial match)
     */
    keyword;
    /**
     * Minimum total amount of payment.
     */
    total_amount_min;
    /**
     * Maximum total amount of payment.
     */
    total_amount_max;
    /**
     * Customer ID
     */
    customer_id;
    /**
     * Process date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    process_date_from;
    /**
     * Process date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    process_date_to;
    /**
     * Authorization Expiration date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    auth_max_date_from;
    /**
     * Authorization Expiration date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    auth_max_date_to;
    /**
     * Update date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_from;
    /**
     * Update date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_to;
    /**
     * Status
     */
    status;
    /**
     * Payment Pattern
     */
    pay_pattern;
    /**
     * Subscription ID
     */
    subscription_id;
    constructor(pay_type, args) {
        this.pay_type = pay_type;
        if (args) {
            this.limit = args.limit;
            this.page = args.page;
            this.count_only = args.count_only;
            this.sort = args.sort;
            this.keyword = args.keyword;
            this.total_amount_min = args.total_amount_min;
            this.total_amount_max = args.total_amount_max;
            this.customer_id = args.customer_id;
            this.process_date_from = args.process_date_from;
            this.process_date_to = args.process_date_to;
            this.auth_max_date_from = args.auth_max_date_from;
            this.auth_max_date_to = args.auth_max_date_to;
            this.update_date_from = args.update_date_from;
            this.update_date_to = args.update_date_to;
            this.status = args.status;
            this.pay_pattern = args.pay_pattern;
            this.subscription_id = args.subscription_id;
        }
    }
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort") {
                const v = value.map(s => `${s.key} ${s.order}`).join(",");
                return [key, v];
            }
            else {
                return [key, value];
            }
        })
            .forEach(([key, value]) => params.append(key, value));
        return params;
    }
}
