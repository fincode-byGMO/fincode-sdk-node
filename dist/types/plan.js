/**
 * Pagination object of Retrieving a list of plans. (used for `GET /v1/plans`)
 */
export class RetrievingPlanListPagination {
    /**
     * Plan Name.
     */
    plan_name;
    /**
     * Delete Flag.
     */
    delete_flag;
    /**
     * Minimum total amount.
     */
    total_amount_min;
    /**
     * Maximum total amount.
     */
    total_amount_max;
    /**
     * Interval Pattern.
     */
    interval_pattern;
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
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort") {
                return [key, value.map((sort) => `${sort.key} ${sort.order}`).join(",")];
            }
            else {
                return [key, value];
            }
        })
            .forEach(([key, value]) => params.append(key, value));
        return params;
    }
}
