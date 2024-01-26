import { APIErrorObject } from "./error.js";
export type ListResponse<T> = {
    total_count?: number | null;
    last_page?: number | null;
    current_page?: number | null;
    limit?: number | null;
    link_next?: string | null;
    link_previous?: string | null;
    list?: T[] | null;
};
export type ListWithErrors<T> = {
    total_count?: number | null;
    last_page?: number | null;
    current_page?: number | null;
    limit?: number | null;
    link_next?: string | null;
    link_previous?: string | null;
    error_code?: string | null;
    error_detail?: {
        number?: string;
        order_id?: string;
        errors?: APIErrorObject[];
    }[] | null;
    list?: T[] | null;
};
