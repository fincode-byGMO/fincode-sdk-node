export type Pagination = {
    /**
     * Maximum number of items to return.
     */
    limit?: string | number | null

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