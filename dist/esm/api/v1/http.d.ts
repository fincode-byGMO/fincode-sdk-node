import fetch, { BodyInit } from "node-fetch";
import { FincodeConfig } from "./fincode.js";
export declare const buildQueryString: (queryParams: any) => string;
declare const createFincodeRequestURL: (config: FincodeConfig, path: string, queryParams?: {
    [key: string]: any;
} | undefined) => string;
export { createFincodeRequestURL };
declare const createFincodeRequestFetch: (config: FincodeConfig, method: "POST" | "GET" | "PUT" | "DELETE", path: string, data?: BodyInit, headers?: {
    idempotentKey?: string;
    tenantShopId?: string;
    contentType?: string;
}, queryParams?: {
    [key: string]: any;
} | undefined) => () => Promise<fetch.Response>;
export { createFincodeRequestFetch };
export type FincodeRequestHeaders = Parameters<typeof createFincodeRequestFetch>[4];
