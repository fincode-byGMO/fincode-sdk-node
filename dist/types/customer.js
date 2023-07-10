/**
 * Pagination object of Retrieving a list of customers. (used for GET /v1/customers)
 */
export class RetrievingCustomerListPagination {
    /**
     * Customer ID
     */
    id;
    /**
     * Customer's name
     */
    name;
    /**
     * Customer's email
     */
    email;
    /**
     * Created date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    created_from;
    /**
     * Created date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    created_to;
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
    constructor(arg) {
        if (arg) {
            this.id = arg.id;
            this.name = arg.name;
            this.email = arg.email;
            this.created_from = arg.created_from;
            this.created_to = arg.created_to;
            this.limit = arg.limit;
            this.page = arg.page;
            this.count_only = arg.count_only;
            this.sort = arg.sort;
        }
    }
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (key === "sort") {
                const v = value.map(sort => `${sort.key} ${sort.order}`).join(",");
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
