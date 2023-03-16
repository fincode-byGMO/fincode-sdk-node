import { Pagination, Sort } from "./pagination.js"

export type PlanObject = {
    /**
     * Plan ID.
     */
    id: string

    /**
     * Plan name.
     * 
     * Format: alphanumeric, full-width characters, and symbols except for `^`{|}~&<>"'` are allowed.
     */
    plan_name: string

    /**
     * Description of this plan.
     */
    description?: string | null

    /**
     * Amount
     */
    amount: number

    /**
     * Tax
     */
    tax: number

    /**
     * Total amount. (amount + tax)
     * 
     * Finally, this value is periodically charged to the consumer.
     */
    total_amount: number

    /**
     * Shop ID.
     */
    shop_id: string

    /**
     * Interval pattern.
     * 
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern: "month" | "year"

    /**
     * Interval count.
     * 
     * How many intervals are there in a cycle.
     */
    interval_count: 1 | 2 | 3 | 6

    used_flag: "0" | "1"
    delete_flag: "0" | "1"

    /**
     * Date this plan was created.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string

    /**
     * Date this plan was updated.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}

/**
 * Pagination object of Retrieving a list of plans. (used for `GET /v1/plans`)
 */
export class RetrievingPlanListPagination implements Pagination {
    /**
     * Plan Name.
     */
    plan_name?: string | null

    /**
     * Delete Flag.
     */
    delete_flag?: "0" | "1" | null

    /**
     * Minimum total amount.
     */
    total_amount_min?: string | null

    /**
     * Maximum total amount.
     */
    total_amount_max?: string | null

    /**
     * Interval Pattern.
     */
    interval_pattern?: "month" | "year" | null

    /**
     * Update date (from).
     * 
     * Format: `yyyy/MM/dd`
     */
    update_date_from?: string | null

    /**
     * Update date (to).
     * 
     * Format: `yyyy/MM/dd`
     */
    update_date_to?: string | null

    /**
     * Maximum number of items to return.
     */
    limit?: string | null

    /**
     * Number of this page.
     */
    page?: string | null

    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null

    /**
     * Sort 
     */
    sort?: Sort[] | null

    buildParams(): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map<[string, string]>(([key, value]) => {
                if (key === "sort") {
                    return [key, (value as Sort[]).map((sort) => `${sort.key} ${sort.order}`).join(",")]
                } else {
                    return [key, value as string]
                }
            })
            .forEach(([key, value]) => params.append(key, value))


        return params
    }
}

/**
 * Request object of Creating a plan. (used for `POST /v1/plans`)
 */
export type CreatingPlanRequest = {
    /**
     * Plan ID.
     */
    id?: string | null

    /**
     * Plan name.
     * 
     * Format: alphanumeric, full-width characters, and symbols except for `^`{|}~&<>"'` are allowed.
     */
    plan_name: string

    /**
     * Description of this plan.
     */
    description?: string | null

    /**
     * Amount
     */
    amount: number

    /**
     * Tax
     */
    tax?: number | null

    /**
     * Interval pattern.
     * 
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern?: "month" | "year" | null

    /**
     * Interval count.
     * 
     * How many intervals are there in a cycle.
     */
    interval_count?: 1 | 2 | 3 | 6 | null
}

/**
 * Request object of Updating a plan. (used for `PUT /v1/plans/{plan_id}`)
 */
export type UpdatingPlanRequest = {
    /**
     * Plan name.
     */
    plan_name?: string | null

    /**
     * Description of this plan.
     */
    description?: string | null

    /**
     * Amount
     */
    amount?: number | null

    /**
     * Tax
     */
    tax?: number | null

    /**
     * Interval pattern.
     */
    interval_pattern?: "month" | "year" | null

    /**
     * Interval count.
     */
    interval_count?: 1 | 2 | 3 | 6 | null
}

/**
 * Response object of Deleting a plan. (used for `DELETE /v1/plans/{plan_id}`)
 */
export type DeletingPlanResponse = {
    /**
     * Plan ID.
     */
    id: string

    /**
     * Plan name.
     */
    plan_name: string

    /**
     * Description of this plan.
     */
    description?: string | null

    /**
     * Amount
     */
    amount: number

    /**
     * Tax
     */
    tax: number

    /**
     * total amount
     */
    total_amount: number

    /**
     * Interval pattern.
     * 
     * - `month`: Monthly
     * - `year`: Yearly
     */
    interval_pattern: "month" | "year"

    /**
     * Interval count.
     * 
     * How many intervals are there in a cycle.
     */
    interval_count: 1 | 2 | 3 | 6

    /**
     * Whether this plan is used or not.
     */
    used_flag: "0" | "1"

    /**
     * Whether this plan is deleted or not.
     */
    delete_flag: "0" | "1"

    /**
     * Date this plan was created.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    created: string

    /**
     * Date this plan was updated.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    updated?: string | null
}
