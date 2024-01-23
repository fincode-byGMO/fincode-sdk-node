import fetch, { BodyInit, RequestInit } from "node-fetch"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestHeader } from "../../types/http"
import { Sort } from "~/src/types"

const BASE_URL = "https://api.fincode.jp"
const BASE_URL_TEST = "https://api.test.fincode.jp"

export const buildQueryString = (queryParams: any) => {
    const urlSearchParams = new URLSearchParams()
    interpretQueryParams(urlSearchParams, null, queryParams)

    return urlSearchParams.toString()
}

const interpretQueryParams = (urlSearchParams: URLSearchParams, key: string | null, value: any) => {
    switch (typeof value) {
        case "object":
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    if (key) {
                        interpretQueryParams(urlSearchParams, key, v)
                    } else {
                        throw new Error("key is not defined")
                    }
                })
            } else {
                if (
                    value.field &&
                    value.order
                ) {
                    const sort = value as Sort
                    if (key) {
                        urlSearchParams.append(key, `${sort.field} ${sort.order}`)
                    } else {
                        throw new Error("key is not defined")
                    }
                } else {
                    Object.keys(value).forEach((k) => {
                        interpretQueryParams(urlSearchParams, k, value[k])
                    })
                }
            }
            break
        case "boolean":
        case "number":
        case "string":
            if (key) {
                urlSearchParams.append(key, value.toString())
            } else {
                throw new Error("key is not defined")
            }
            break
        case "undefined":
            break
        default:
            throw new Error(`Unexpected type of query parameter: ${typeof value}`)
    }
}

const createFincodeRequestURL = (
    config: FincodeConfig,
    path: string,
    queryParams?: {
        [key: string]: any
    }
): string => {

    const baseUrl = config.fincodeEnv == "test" ? BASE_URL_TEST : BASE_URL

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

export type FincodeRequestHeaders = Parameters<typeof createFincodeRequestFetch>[4]