import { Modify } from "../utils/utilTypes"
import { Pagination } from "./pagination"

/**
 * Customer object
 */
export type CustomerObject = {
    /**
     * Customer ID
     */
    id: string

    /**
     * Customer's name
     */
    name?: string | null

    /**
     * Customer's email
     */
    email?: string | null

    /**
     * Country Code of customer's phone.
     */
    phone_cc?: string | null

    /**
     * Number of customer's phone.
     */
    phone_no?: string | null

    /**
     * City of the customer's billing address.
     */
    addr_city?: string | null

    /**
     * ISO 3166-1 numeric country code of the customer's billing address.
     */
    addr_country?: string | null

    /**
     * 1st line of the customer's billing address.
     */
    addr_line_1?: string | null

    /**
     * 2nd line of the customer's billing address.
     */
    addr_line_2?: string | null

    /**
     * 3rd line of the customer's billing address.
     */
    addr_line_3?: string | null

    /**
     * Postal code of the customer's billing address.
     */
    addr_post_code?: string | null

    /**
     * ISO 3166-2 state code of the customer's billing address.
     */
    addr_state?: string | null

    /**
     * Date this customer was created.
     * 
     * Format: yyyy/MM/dd HH:mm:ss.SSS
     */
    created: string

    /**
     * Date this customer was updated.
     * 
     * Format: yyyy/MM/dd HH:mm:ss.SSS
     */
    updated?: string | null

    /**
     * Some card (payment method) has been registered for this customer or not.
     * 
     * - `0`: There is no card (payment method).
     * - `1`: Some card (payment method) have already been registered.
     */
    card_registration: "0" | "1"
}

/**
 * Request object of Creating customer (used for POST /v1/customers)
 */
export type CreatingCustomerRequest = {
    /**
     * Customer ID
     */
    id?: string | null

    /**
     * Customer's name
     */
    name?: string | null

    /**
     * Customer's email
     */
    email?: string | null

    /**
     * Country Code of customer's phone.
     */
    phone_cc?: string | null

    /**
     * Number of customer's phone.
     */
    phone_no?: string | null

    /**
     * City of the customer's billing address.
     */
    addr_city?: string | null

    /**
     * ISO 3166-1 numeric country code of the customer's billing address.
     */
    addr_country?: string | null

    /**
     * 1st line of the customer's billing address.
     */
    addr_line_1?: string | null

    /**
     * 2nd line of the customer's billing address.
     */
    addr_line_2?: string | null

    /**
     * 3rd line of the customer's billing address.
     */
    addr_line_3?: string | null

    /**
     * Postal code of the customer's billing address.
     */
    addr_post_code?: string | null

    /**
     * ISO 3166-2 state code of the customer's billing address.
     */
    addr_state?: string | null
}

/**
 * Pagination object of Retrieving a list of customers. (used for GET /v1/customers)
 */
export type RetrievingCustomerListQueryParams = Modify<Pagination, {
    /**
     * Customer ID
     */
    id?: string | null

    /**
     * Customer's name
     */
    name?: string | null

    /**
     * Customer's email
     */
    email?: string | null

    /**
     * Created date (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_from?: string | null

    /**
     * Created date (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    created_to?: string | null
}>

/**
 * Request object of Updating customer (used for PUT /v1/customers/{id})
 */
export type UpdatingCustomerRequest = {
    /**
     * Customer's name
     */
    name?: string | null

    /**
     * Customer's email
     */
    email?: string | null

    /**
     * Country Code of customer's phone.
     */
    phone_cc?: string | null

    /**
     * Number of customer's phone.
     */
    phone_no?: string | null

    /**
     * City of the customer's billing address.
     */
    addr_city?: string | null

    /**
     * ISO 3166-1 numeric country code of the customer's billing address.
     */
    addr_country?: string | null

    /**
     * 1st line of the customer's billing address.
     */
    addr_line_1?: string | null

    /**
     * 2nd line of the customer's billing address.
     */
    addr_line_2?: string | null

    /**
     * 3rd line of the customer's billing address.
     */
    addr_line_3?: string | null

    /**
     * Postal code of the customer's billing address.
     */
    addr_post_code?: string | null

    /**
     * ISO 3166-2 state code of the customer's billing address.
     */
    addr_state?: string | null
}

/**
 * Response object of Deleting customer (used for DELETE /v1/customers/{id})
 */
export type DeletingCustomerResponse = {
    /**
     * Customer ID that has been deleted.
     */
    id: string

    /**
     * Flag this customer has already been deleted or not.
     * 
     * - `0`: Not deleted. This customer is still available.
     * - `1`: Deleted. This customer is no longer available.
     */
    delete_flag: "0" | "1"
}