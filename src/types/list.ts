export type ListResponse<T> = {
    total_count?: number

    last_page?: number

    current_page?: number

    limit?: number

    link_next?: string

    link_previous?: string

    list?: T[]
}