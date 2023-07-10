/**
 * Search Params object for Retrieving platform shops list
 */
export class PlatformShopsSearchParams {
    id;
    shop_name;
    shop_mail_address;
    created_from;
    created_to;
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
/**
 * Pagination object for Retrieving platform shops list
 */
export class RetrievingPlatformShopListPagination {
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
    buildParams() {
        const param = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => {
            if (key === "sort") {
                const v = value.map(s => `${s.key} ${s.order}`).join(",");
                return [key, v];
            }
            else {
                return [key, value];
            }
        })
            .forEach(([key, value]) => param.append(key, value));
        return param;
    }
}
