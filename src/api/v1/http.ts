import { fetch, FormData, ProxyAgent } from "undici"
import type { BodyInit, Dispatcher, RequestInit } from "undici"
import { FincodeConfig } from "./fincode"
import { FincodeSDKErrorKind } from "../../types/index"
import { createFincodeRequestHeader } from "../../types/http"
import { Sort } from "./../../types/index"

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

const proxyDispatchers = new Map<string, ProxyAgent>()

/**
 * Reuse one dispatcher per proxy URL.
 * 
 * A `ProxyAgent` owns a connection pool. Building one per request throws the
 * pool away each time, so every call pays for a new TLS handshake.
 */
const getProxyDispatcher = (proxyAgent?: string | URL): Dispatcher | undefined => {
    if (!proxyAgent) {
        return undefined
    }

    const uri = String(proxyAgent)
    const cached = proxyDispatchers.get(uri)
    if (cached) {
        return cached
    }

    const dispatcher = new ProxyAgent(uri)
    proxyDispatchers.set(uri, dispatcher)
    return dispatcher
}

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

    if (data instanceof FormData) {
        // undici writes Content-Type itself so that it carries the multipart
        // boundary it generated.
        delete _headers["Content-Type"]
    }

    const timeout = config.options.timeout ?? DEFAULT_TIMEOUT_MS

    const options: RequestInit = {
        method: method,
        headers: _headers,
        body: data,
        dispatcher: getProxyDispatcher(config.options.proxyAgent),
    }

    // The signal is created here rather than above so that the timeout starts
    // when the request is sent, not when it is built.
    return () => fetch(url, {
        ...options,
        signal: timeout > 0 ? AbortSignal.timeout(timeout) : undefined,
    })
}

export { createFincodeRequestFetch }

export type FincodeRequestHeaders = Parameters<typeof createFincodeRequestFetch>[4]

/**
 * Work out why a request failed.
 * 
 * The shapes below belong to undici, so this sits next to the fetch that
 * produces them. `fallback` is used when the thrown object says nothing
 * usable.
 */
const nameOf = (e: unknown): string | undefined =>
    typeof e === "object" && e !== null && "name" in e && typeof e.name === "string"
        ? e.name
        : undefined

export const classifyRequestError = (e: unknown, fallback: FincodeSDKErrorKind): FincodeSDKErrorKind => {
    // AbortSignal.timeout rejects with a DOMException named TimeoutError.
    // DOMException is not an Error subclass in Node, so read the name instead
    // of narrowing by class.
    if (nameOf(e) === "TimeoutError") {
        return "timeout"
    }

    // undici reports every transport failure as TypeError("fetch failed") and
    // puts the underlying error in `cause`. A TypeError without a cause came
    // from a bad argument instead.
    if (e instanceof TypeError && e.cause !== undefined) {
        return "network"
    }

    if (e instanceof SyntaxError) {
        return "response_body"
    }

    return fallback
}
