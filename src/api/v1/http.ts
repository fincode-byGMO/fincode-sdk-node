import fetch, { BodyInit, RequestInit } from "node-fetch"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestHeader } from "../../types/http"
import { Pagination } from "../../types/pagination"
import { SearchParams } from "../../types/searchParams"

const BASE_URL = "https://api.fincode.jp"
const BASE_URL_TEST = "https://api.test.fincode.jp"

const createFincodeRequestURL = (
    config: FincodeConfig,
    path: string,
    query?: {
        pagination?: Pagination
        searchParams?: SearchParams

        keyValues?: Record<string, string | number | boolean | null | undefined>
    }
): string => {

    const baseUrl = config.fincodeEnv == "test" ? BASE_URL_TEST : BASE_URL

    let queryStr = ""
    if (query) {
        const { pagination, searchParams, keyValues } = query
        const pgnParams = pagination?.buildParams()
        const sParams = searchParams?.buildParams()
        const kvParams = keyValues ? (() => {
            const params = new URLSearchParams()
            for (const [key, value] of Object.entries(keyValues)) {
                if (value === undefined || value === null) {
                    continue
                }
                params.append(key, String(value))
            }
            return params
        })() : undefined

        const params = new URLSearchParams({
            ...Object.fromEntries(pgnParams?.entries() || []),
            ...Object.fromEntries(sParams?.entries() || []),
            ...Object.fromEntries(kvParams?.entries() || []),
        })
        queryStr = params.toString() ? `?${params.toString()}` : ""
    }

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
    query?: {
        pagination?: Pagination
        searchParams?: SearchParams

        keyValues?: Record<string, string | number | boolean | null | undefined>
    },
) => {

    const url = createFincodeRequestURL(config, path, query)

    const _headers = createFincodeRequestHeader({
        apiVersion: config.options.version,
        authorization: `Bearer ${config.apiKey}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
        contentType: headers?.contentType || "application/json",
    })

    const options: RequestInit = {
        method: method,
        headers: _headers,
        body: data,
        agent: config.options.proxyAgent,
        timeout: config.options.timeout,

    }
    return () => fetch(url, options)
}

export { createFincodeRequestFetch }

export type FincodePartialRequestHeader = Parameters<typeof createFincodeRequestFetch>[4]