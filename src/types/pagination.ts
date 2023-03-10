export type Pagination = {
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


}

export type Sort = {
    /**
     * Sort key.
     */
    key?: string | null

    /**
     * Sort order.
     */
    order?: "asc" | "desc" | null
}
