import { BodyInit } from "node-fetch";
import { FincodeConfig } from "./fincode";
import { Pagination } from "../../types/pagination";
import { SearchParams } from "../../types/searchParams";
declare const createFincodeRequestURL: (config: FincodeConfig, path: string, query?: {
    pagination?: Pagination;
    searchParams?: SearchParams;
    keyValues?: Record<string, string | number | boolean | null | undefined>;
}) => string;
export { createFincodeRequestURL };
declare const createFincodeRequestFetch: (config: FincodeConfig, method: "POST" | "GET" | "PUT" | "DELETE", path: string, data?: BodyInit, headers?: {
    idempotentKey?: string;
    tenantShopId?: string;
    contentType?: string;
}, query?: {
    pagination?: Pagination;
    searchParams?: SearchParams;
    keyValues?: Record<string, string | number | boolean | null | undefined>;
}) => () => Promise<import("node-fetch").Response>;
export { createFincodeRequestFetch };
export type FincodePartialRequestHeader = Parameters<typeof createFincodeRequestFetch>[4];
