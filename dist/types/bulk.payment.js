/**
 * Pagination object for Retrieving bulk payments
 */
export class RetrievingPaymentBulkPagination {
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
     * Date the process is planned. (from)
     *
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_from;
    /**
     * Date the process is planned. (to)
     *
     * Format: `yyyy/MM/dd`
     */
    process_plan_date_to;
    /**
     * Status of bulk payment
     *
     * - `CHECKING`: Checking.
     * - `CHECKED`: Checked.
     * - `RUNNING`: Running.
     * - `COMPLETED`: Completed.
     * - `ERROR`: Some error occurred.
     */
    status;
    /**
     * Payment method type.
     */
    pay_type;
    /**
     * File name.
     */
    file_name;
    /**
     * Delete flag.
     *
     * - `0`: Not deleted.
     * - `1`: Deleted.
     * - `(empty string)`: All.
     */
    delete_flag;
    /**
     * Created timestamp. (from)
     *
     * Format: `yyyy/MM/dd`
     */
    created_from;
    /**
     * Created timestamp. (to)
     *
     * Format: `yyyy/MM/dd`
     */
    created_to;
    constructor(args) {
        if (args) {
            this.limit = args.limit;
            this.page = args.page;
            this.count_only = args.count_only;
            this.sort = args.sort;
            this.process_plan_date_from = args.process_plan_date_from;
            this.process_plan_date_to = args.process_plan_date_to;
            this.status = args.status;
            this.pay_type = args.pay_type;
            this.file_name = args.file_name;
            this.delete_flag = args.delete_flag;
            this.created_from = args.created_from;
            this.created_to = args.created_to;
        }
    }
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort" && value) {
                const v = value.map((s) => `${s.key} ${s.order}`).join(",");
                return [key, v];
            }
            else if (key === "status" && value) {
                const v = value.join(",");
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
 * Pagination object for Retrieving bulk payment details
 */
export class RetrievingPaymentBulkDetailPagination {
    /**
     * Payment method types
     */
    pay_type;
    /**
     * Order ID.
     */
    order_id;
    /**
     * Status of a payment
     *
     * - `CHECKED`: Checked.
     * - `SUCCEEDED`: Succeeded.
     * - `FAILED`: Failed.
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
            this.order_id = args.order_id;
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
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort" && value) {
                const v = value.map((s) => `${s.key} ${s.order}`).join(",");
                return [key, v];
            }
            else if (key === "status" && value) {
                const v = value.join(",");
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
