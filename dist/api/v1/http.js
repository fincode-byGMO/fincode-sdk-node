import fetch from "node-fetch";
import { createFincodeRequestHeader } from "../../types/http";
const BASE_URL = "https://api.fincode.jp";
const BASE_URL_TEST = "https://api.test.fincode.jp";
const createFincodeRequestURL = (config, path, query) => {
    const baseUrl = config.isTest ? BASE_URL_TEST : BASE_URL;
    let queryStr = "";
    if (query) {
        const { pagination, searchParams, keyValues } = query;
        const pgnParams = pagination?.buildParams();
        const sParams = searchParams?.buildParams();
        const kvParams = keyValues ? (() => {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(keyValues)) {
                if (value === undefined || value === null) {
                    continue;
                }
                params.append(key, String(value));
            }
            return params;
        })() : undefined;
        const params = new URLSearchParams({
            ...Object.fromEntries(pgnParams?.entries() || []),
            ...Object.fromEntries(sParams?.entries() || []),
            ...Object.fromEntries(kvParams?.entries() || []),
        });
        queryStr = params.toString() ? `?${params.toString()}` : "";
    }
    return `${baseUrl}${path}${queryStr}`;
};
export { createFincodeRequestURL };
const createFincodeRequestFetch = (config, method, path, data, headers, query, agent) => {
    const url = createFincodeRequestURL(config, path, query);
    const _headers = createFincodeRequestHeader({
        apiVersion: config.version,
        authorization: `Bearer ${config.apiKey}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
        contentType: headers?.contentType || "application/json",
    });
    const options = {
        method: method,
        headers: _headers,
        body: data,
        agent: agent
    };
    return () => fetch(url, options);
};
export { createFincodeRequestFetch };
