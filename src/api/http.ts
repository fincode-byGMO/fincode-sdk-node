import * as https from "https"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestHeader } from "../types/http"
import { Pagination } from "../types/pagination"

const BASE_URL = "https://api.fincode.jp"
const BASE_URL_TEST = "https://api.test.fincode.jp"

const createFincodeRequestURL = (
    config: FincodeConfig,
    path: string,
    query?: {
        pagination?: Pagination
        pay_type?: string
        process_plan_date?: string
    }
): string => {

    const baseUrl = config.isTest ? BASE_URL_TEST : BASE_URL

    let queryStr = ""
    if (query) {
        const { pagination, ...rest } = query
        const pgnParams = pagination?.buildParams()
        const restParams = new URLSearchParams(rest)

        const params = new URLSearchParams({
            ...Object.fromEntries(pgnParams?.entries() || []),
            ...Object.fromEntries(restParams.entries()),
        })
        queryStr = params.toString() ? `?${params.toString()}` : ""
    }

    return `${baseUrl}${path}${queryStr}`
}
export { createFincodeRequestURL }

const createFincodeRequest = (
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

    const options: https.RequestOptions = {
        method: method,
        headers: _headers,
    }

    const req = https.request(url, options)
    req.write(data)

    return req
}

export { createFincodeRequest }