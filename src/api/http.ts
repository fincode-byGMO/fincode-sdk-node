import * as https from "https"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestHeader } from "../types/http"
import { Pagination } from "../types/pagination"

const BASE_URL_V1 = "https://api.fincode.jp/v1"
const BASE_URL_V1_TEST = "https://api.fincode.jp/test/v1"

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
        payType?: string
    }
) => {

    const baseUrl = config.isTest ? BASE_URL_V1_TEST : BASE_URL_V1

    let queryStr = ""
    if (query) {
        const { pagination, ...rest } = query
        const pgnParams = pagination?.buildParams()
        const restParams = new URLSearchParams(rest)

        const params = new URLSearchParams({
            ...Object.fromEntries(pgnParams?.entries() || []),
            ...Object.fromEntries(restParams.entries()),
        })
        queryStr = `?${params.toString()}`
    }

    const url = `${baseUrl}${path}${queryStr}`

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