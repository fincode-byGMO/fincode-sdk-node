/**
 * Pagination object for Retrieving tenant shops list
 */
export class RetrievingTenantShopListPagination {
    /**
     * Shop ID
     */
    id;
    /**
     * Shop name
     */
    shop_name;
    /**
     * Shop email address
     */
    shop_mail_address;
    /**
     * Created timestamp (from)
     *
     * Format: `yyyy/MM/dd`
     */
    created_from;
    /**
     * Created timestamp (to)
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
    constructor(args) {
        if (args) {
            this.id = args.id;
            this.shop_name = args.shop_name;
            this.shop_mail_address = args.shop_mail_address;
            this.created_from = args.created_from;
            this.created_to = args.created_to;
            this.limit = args.limit;
            this.page = args.page;
            this.count_only = args.count_only;
            this.sort = args.sort;
        }
    }
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
/**
 * Search Params object for Retrieving tenant shops list
 */
export class TenantShopsSearchParams {
    id;
    shop_name;
    shop_mail_address;
    created_from;
    created_to;
    constructor(args) {
        if (args) {
            this.id = args.id;
            this.shop_name = args.shop_name;
            this.shop_mail_address = args.shop_mail_address;
            this.created_from = args.created_from;
            this.created_to = args.created_to;
        }
    }
    buildParams() {
        const param = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => {
            return [key, value];
        })
            .forEach(([key, value]) => {
            param.append(key, value);
        });
        return param;
    }
}
