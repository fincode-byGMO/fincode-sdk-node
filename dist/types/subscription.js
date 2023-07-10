/**
 * Pagination object for Retrieving a list of subscriptions. (used for `GET /v1/subscriptions`)
 */
export class RetrievingSubscriptionListPagination {
    /**
     * Payment method used for this subscription.
     */
    pay_type;
    /**
     * Subscription ID
     */
    id;
    /**
     * Plan ID
     */
    plan_id;
    /**
     * Minimam total amount
     */
    total_amount_min;
    /**
     * Maximum total amount
     */
    total_amount_max;
    /**
     * Interval Pattern.
     */
    interval_pattern;
    /**
     * Start date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    start_date_from;
    /**
     * Start date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    start_date_to;
    /**
     * Stop date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date_from;
    /**
     * Stop date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    stop_date_to;
    /**
     * Next charge date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    next_charge_date_from;
    /**
     * Next charge date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    next_charge_date_to;
    /**
     * Update date (from).
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_from;
    /**
     * Update date (to).
     *
     * Format: `yyyy/MM/dd`
     */
    update_date_to;
    /**
     * Status.
     *
     * - `ACTIVE`: Active
     * - `RUNNING`: Running
     * - `CANCELED`: Canceled or Failed
     * - `INCOMPLETE`: Incomplete to register subscription
     */
    status;
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
    constructor(pay_type, args) {
        this.pay_type = pay_type;
        if (args) {
            this.id = args.id;
            this.plan_id = args.plan_id;
            this.total_amount_min = args.total_amount_min;
            this.total_amount_max = args.total_amount_max;
            this.interval_pattern = args.interval_pattern;
            this.start_date_from = args.start_date_from;
            this.start_date_to = args.start_date_to;
            this.stop_date_from = args.stop_date_from;
            this.stop_date_to = args.stop_date_to;
            this.next_charge_date_from = args.next_charge_date_from;
            this.next_charge_date_to = args.next_charge_date_to;
            this.update_date_from = args.update_date_from;
            this.update_date_to = args.update_date_to;
            this.status = args.status;
            this.limit = args.limit;
            this.page = args.page;
            this.count_only = args.count_only;
            this.sort = args.sort;
        }
    }
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "status") {
                const v = value.join(",");
                return [key, v];
            }
            else if (key === "sort") {
                const v = value.map((s) => `${s.key} ${s.order}`).join(",");
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
/**
 * Pagination object for Retrieving subscription result list (used for `GET /v1/subscriptions/{id}/result`)
 */
export class RetrievingSubscriptionResultListPagination {
    /**
     * Payment method used for this subscription.
     */
    pay_type;
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
    constructor(pay_type, args) {
        this.pay_type = pay_type;
        if (args) {
            this.limit = args.limit;
            this.page = args.page;
            this.count_only = args.count_only;
            this.sort = args.sort;
        }
    }
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort") {
                const v = value.map((s) => `${s.key} ${s.order}`).join(",");
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
