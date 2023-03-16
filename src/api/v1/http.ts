import fetch, { RequestInit } from "node-fetch"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestHeader } from "../../types/http.js"
import { Pagination } from "../../types/pagination.js"
import { SearchParams } from "../../types/searchParams.js"

const BASE_URL = "https://api.fincode.jp"
const BASE_URL_TEST = "https://api.test.fincode.jp"

const createFincodeRequestURL = (
    config: FincodeConfig,
    path: string,
    query?: {
        pagination?: Pagination
        searchParams?: SearchParams
        pay_type?: string
        process_plan_date?: string
    }
): string => {

    const baseUrl = config.isTest ? BASE_URL_TEST : BASE_URL

    let queryStr = ""
    if (query) {
        const { pagination, searchParams, ...rest } = query
        const pgnParams = pagination?.buildParams()
        const sParams = searchParams?.buildParams()
        const restParams = new URLSearchParams(rest)

        const params = new URLSearchParams({
            ...Object.fromEntries(pgnParams?.entries() || []),
            ...Object.fromEntries(sParams?.entries() || []),
            ...Object.fromEntries(restParams.entries()),
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
    data?: string,
    headers?: {
        idempotentKey?: string
        tenantShopId?: string
    },
    query?: {
        pagination?: Pagination
        pay_type?: string
        process_plan_date?: string
    }
) => {

    const url = createFincodeRequestURL(config, path, query)

    const _headers = createFincodeRequestHeader({
        apiVersion: config.version,
        authorization: `Bearer ${config.apiKey}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
    })

    const options: RequestInit = {
        method: method,
        headers: _headers,
        body: data,
    }

    console.log({
        url,
        options,
    })

    return () => fetch(url, options)
}

export { createFincodeRequestFetch }

export type FincodePartialRequestHeader = Parameters<typeof createFincodeRequestFetch>[4]