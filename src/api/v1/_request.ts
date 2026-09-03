import type { BodyInit } from "undici"
import { APIErrorResponse, FincodeAPIError, FincodeSDKError } from "../../types/index"
import { FincodeConfig } from "./fincode"
import { classifyRequestError, createFincodeRequestFetch, FincodeRequestHeaders } from "./http"
import { getRequestErrorMessage } from "./_errorMessages"

type RequestOptions = {
    /** Serialized request body. */
    body?: BodyInit

    headers?: FincodeRequestHeaders

    /** Query parameters. Omit to send no query string at all. */
    queryParams?: object
}

/**
 * Send a request to the fincode API and return the parsed response body.
 * 
 * Rejects with {@link FincodeAPIError} when the API answers with an error
 * status, and with {@link FincodeSDKError} when the request itself fails or
 * the response body is not valid JSON. `FincodeSDKError.kind` says which,
 * and carries the HTTP status whenever a response arrived.
 */
export const executeRequest = async <T>(
    config: FincodeConfig,
    method: "POST" | "GET" | "PUT" | "DELETE",
    path: string,
    options?: RequestOptions,
): Promise<T> => {

    const sendRequest = createFincodeRequestFetch(
        config,
        method,
        path,
        options?.body,
        options?.headers,
        options?.queryParams,
    )

    let res: Awaited<ReturnType<typeof sendRequest>>
    try {
        res = await sendRequest()
    } catch (e: unknown) {
        const kind = classifyRequestError(e, "unknown")
        throw new FincodeSDKError(getRequestErrorMessage(kind), kind, { child: e })
    }

    let json: unknown
    try {
        json = await res.json()
    } catch (e: unknown) {
        const kind = classifyRequestError(e, "response_body")
        throw new FincodeSDKError(getRequestErrorMessage(kind), kind, { status: res.status, child: e })
    }

    if (!res.ok) {
        const errRes = json as APIErrorResponse
        throw new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
    }

    return json as T
}
