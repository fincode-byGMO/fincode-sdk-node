import { FincodeConfig } from "./fincode"
import { createFincodeRequestHeader } from "../../types/http"
import { Pagination } from "../../types/pagination"
import { SearchParams } from "../../types/searchParams"
import { HttpsProxyAgent } from "https-proxy-agent"
import fetch, { BodyInit, RequestInit } from "node-fetch"

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

    const baseUrl = config.isTest ? BASE_URL_TEST : BASE_URL

    let queryStr = ""
    if (query) {
        const { pagination, searchParams, keyValues } = query
        const pgnParams = pagination?.buildParams()
        const sParams = searchParams?.buildParams()
        const kvParams = keyValues ? new URLSearchParams(Object.entries(keyValues).toString()) : undefined

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
    },
    query?: {
        pagination?: Pagination
        searchParams?: SearchParams

        keyValues?: Record<string, string | number | boolean | null | undefined>
    }
) => {

    const url = createFincodeRequestURL(config, path, query)

    const _headers = createFincodeRequestHeader({
        apiVersion: config.version,
        authorization: `Bearer ${config.apiKey}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
    })

    let proxyAgent: HttpsProxyAgent | undefined = undefined
    if (process.env.HTTPS_PROXY) {
        proxyAgent = new HttpsProxyAgent(process.env.HTTPS_PROXY)
    }

    const options: RequestInit = {
        method: method,
        headers: _headers,
        body: data,
        agent: proxyAgent
    }
    return () => fetch(url, options)
}

export { createFincodeRequestFetch }

export type FincodePartialRequestHeader = Parameters<typeof createFincodeRequestFetch>[4]