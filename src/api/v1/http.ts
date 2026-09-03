import fetch, { BodyInit, FetchError, RequestInit } from "node-fetch"
import { FincodeConfig } from "./fincode"
import { FincodeSDKErrorKind } from "../../types/index"
import { createFincodeRequestHeader } from "../../types/http"
import { Sort } from "./../../types/index"
import { HttpsProxyAgent } from "https-proxy-agent"

const BASE_URL = "https://api.fincode.jp"
const BASE_URL_TEST = "https://api.test.fincode.jp"

/**
 * Timeout applied when `options.timeout` is not set, in milliseconds.
 * 
 * Without a timeout a request can hang indefinitely, which leaves the caller
 * unable to tell whether a payment went through. Pass `0` to disable.
 */
const DEFAULT_TIMEOUT_MS = 60_000


/**
 * Build a query string from a query parameter object.
 * 
 * fincode expects a list to be a single comma-separated value. Repeating the
 * same key keeps only the first value, so the list must be joined instead of
 * appended one by one.
 * 
 * `null` and `undefined` values are left out of the query string.
 */
export const buildQueryString = (queryParams: unknown): string => {
    const urlSearchParams = new URLSearchParams()

    if (queryParams === null || typeof queryParams !== "object" || Array.isArray(queryParams)) {
        return ""
    }

    Object.entries(queryParams as Record<string, unknown>).forEach(([key, value]) => {
        const serialized = serializeQueryValue(key, value)
        if (serialized !== undefined) {
            urlSearchParams.append(key, serialized)
        }
    })

    return urlSearchParams.toString()
}

const isSort = (value: object): value is Sort =>
    "field" in value && "order" in value

/**
 * Turn one query parameter value into the string fincode expects.
 * 
 * Returns `undefined` when the value should be left out entirely.
 */
const serializeQueryValue = (key: string, value: unknown): string | undefined => {
    if (value === null || value === undefined) {
        return undefined
    }

    if (Array.isArray(value)) {
        const parts = value
            .map((v) => serializeQueryValue(key, v))
            .filter((v): v is string => v !== undefined)

        return parts.length > 0 ? parts.join(",") : undefined
    }

    switch (typeof value) {
        case "object":
            if (isSort(value)) {
                return `${value.field} ${value.order}`
            }
            throw new Error(`Unexpected object in query parameter "${key}"`)
        case "boolean":
        case "number":
        case "string":
            return String(value)
        default:
            throw new Error(`Unexpected type of query parameter "${key}": ${typeof value}`)
    }
}

const createFincodeRequestURL = (
    config: FincodeConfig,
    path: string,
    queryParams?: {
        [key: string]: any
    }
): string => {

    const baseUrl = config.isLiveMode ? BASE_URL : BASE_URL_TEST

    const queryStr = queryParams ? `?${buildQueryString(queryParams)}` : ""

    return `${baseUrl}${path}${queryStr}`
}
export { createFincodeRequestURL }

const createFincodeRequestFetch = (
    config: FincodeConfig,
    method: "POST" | "GET" | "PUT" | "DELETE",
    path: string,
    data?: BodyInit,
    headers?: {
        idempotentKey?: string
        tenantShopId?: string
        contentType?: string
    },
    queryParams?: {
        [key: string]: any
    }
) => {

    const url = createFincodeRequestURL(config, path, queryParams)

    const _headers = createFincodeRequestHeader({
        apiVersion: config.options.version,
        authorization: `Bearer ${config.getApiKey()}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
        contentType: headers?.contentType || "application/json",
    })

    const options: RequestInit = {
        method: method,
        headers: _headers,
        body: data,
        agent: config.options.proxyAgent ? new HttpsProxyAgent(config.options.proxyAgent) : undefined,
        timeout: config.options.timeout ?? DEFAULT_TIMEOUT_MS,

    }
    return () => fetch(url, options)
}

export { createFincodeRequestFetch }

export type FincodeRequestHeaders = Parameters<typeof createFincodeRequestFetch>[4]

/**
 * Work out why a request failed.
 * 
 * The `type` values below belong to node-fetch, so this sits next to the
 * fetch that produces them. `fallback` is used when the thrown object says
 * nothing usable.
 */
export const classifyRequestError = (e: unknown, fallback: FincodeSDKErrorKind): FincodeSDKErrorKind => {
    if (!(e instanceof FetchError)) {
        return fallback
    }

    switch (e.type) {
        case "request-timeout":
        case "body-timeout":
            return "timeout"
        case "system":
            return "network"
        case "invalid-json":
            return "response_body"
        default:
            return fallback
    }
}
