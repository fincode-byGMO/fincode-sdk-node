export type Pagination = {
    /**
     * Maximum number of items to return.
     * 
     * Must be between 10 and 100; the API rejects other values.
     * Defaults to 10.
     */
    limit?: number | null

    /**
     * Number of this page.
     */
    page?: string | number | null

    /**
     * Flag to retrieve only the total number of items.
     */
    count_only?: boolean | null

    /**
     * Sort 
     */
    sort?: Sort[] | null
}

export type Sort = {
    /**
     * Sort field.
     */
    field?: string | null

    /**
     * Sort order.
     */
    order?: "asc" | "desc" | null
}