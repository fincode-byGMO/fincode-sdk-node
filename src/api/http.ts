import * as https from "https"
import { FincodeInstance } from "./fincode"
import { createFincodeRequestHeader } from "./../types/http"

const BASE_URL_V1 = "https://api.fincode.jp/v1"
const BASE_URL_V1_TEST = "https://api.fincode.jp/test/v1"

const createRequest = (
    fincode: FincodeInstance,
    method: "POST" | "GET" | "PUT" | "DELETE",
    path: string,
    headers: {
        idempotentKey?: string
        tenantShopId?: string
    }
) => {

    const baseUrl = fincode.isTest ? BASE_URL_V1_TEST : BASE_URL_V1
    const url = `${baseUrl}${path}`

    const options: https.RequestOptions = {
        method: method,
        headers: {
            "Api-Version": fincode.version,
            "Authorization": `Bearer ${fincode.apiKey}`,
            "Content-Type": "application/json;charset=utf-8",
            "idempotent_key": headers.idempotentKey,
            "Tenant-Shop-Id": headers.tenantShopId,
        }
    }

    return https.request(url, options)
}