import { Response } from "undici"
import { FincodeAPIError, FincodeSDKError } from "../../types/index"
import { FincodeConfig } from "./fincode"
import * as http from "./http"
import { executeRequest } from "./_request"

jest.mock("./http", () => ({
    ...jest.requireActual("./http"),
    createFincodeRequestFetch: jest.fn(),
}))

const config: FincodeConfig = {
    baseUrl: "https://api.test.fincode.jp",
    getApiKey: () => "m_test_dummy",
    options: {},
}

/** Make the next request answer with `response`, or fail with `thrown`. */
const answerWith = (result: { response?: Response, thrown?: unknown }) => {
    (http.createFincodeRequestFetch as jest.Mock).mockReturnValue(
        () => result.thrown ? Promise.reject(result.thrown) : Promise.resolve(result.response)
    )
}

const failureOf = async (promise: Promise<unknown>): Promise<FincodeSDKError | FincodeAPIError> => {
    try {
        await promise
    } catch (e: unknown) {
        return e as FincodeSDKError | FincodeAPIError
    }
    throw new Error("expected the request to fail")
}

describe("Sending a request", () => {
    it("resolves with the parsed response body", async () => {
        answerWith({ response: new Response(JSON.stringify({ id: "cus_1" }), { status: 200 }) })

        await expect(executeRequest<{ id: string }>(config, "GET", "/v1/customers/cus_1")).resolves.toEqual({ id: "cus_1" })
    })

    it("rejects with FincodeAPIError carrying the status when the API answers with an error", async () => {
        answerWith({
            response: new Response(
                JSON.stringify({ errors: [{ error_code: "E0002003002", error_message: "顧客情報が存在しません。" }] }),
                { status: 400 },
            ),
        })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers/nope"))
        expect(err).toBeInstanceOf(FincodeAPIError)
        expect((err as FincodeAPIError).status).toBe(400)
        expect(err.message).toBe("顧客情報が存在しません。")
    })

    it("keeps the status when the response body is not JSON", async () => {
        // What something in front of fincode returns when it cannot reach it.
        answerWith({ response: new Response("<html><body>503 Service Unavailable</body></html>", { status: 503 }) })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers")) as FincodeSDKError
        expect(err).toBeInstanceOf(FincodeSDKError)
        expect(err.kind).toBe("response_body")
        expect(err.status).toBe(503)
    })

    it("reports a timeout as such", async () => {
        // What AbortSignal.timeout rejects with.
        answerWith({ thrown: new DOMException("The operation was aborted due to timeout", "TimeoutError") })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers")) as FincodeSDKError
        expect(err.kind).toBe("timeout")
        expect(err.status).toBeUndefined()
        expect(err.message).toBe("Request timed out")
    })

    it("reports a connection failure as a network error", async () => {
        // What undici throws when it cannot reach the host.
        answerWith({ thrown: new TypeError("fetch failed", { cause: new Error("connect ECONNREFUSED") }) })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers")) as FincodeSDKError
        expect(err.kind).toBe("network")
    })

    it("falls back to unknown for anything else", async () => {
        // A TypeError with no cause is a bad argument, not a transport failure.
        answerWith({ thrown: new TypeError("Failed to parse URL") })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers")) as FincodeSDKError
        expect(err.kind).toBe("unknown")
        expect(err.message).toBe("Error fetching data")
    })

    it("throws real Errors, so they carry a stack and survive instanceof", async () => {
        answerWith({ thrown: new TypeError("fetch failed", { cause: new Error("boom") }) })
        const sdkErr = await failureOf(executeRequest(config, "GET", "/v1/customers"))

        answerWith({ response: new Response(JSON.stringify({ errors: [] }), { status: 400 }) })
        const apiErr = await failureOf(executeRequest(config, "GET", "/v1/customers"))

        for (const err of [sdkErr, apiErr]) {
            expect(err).toBeInstanceOf(Error)
            expect(err.stack).toBeTruthy()
        }
    })

    it("passes the original thrown object through as child", async () => {
        const thrown = new TypeError("fetch failed", { cause: new Error("boom") })
        answerWith({ thrown })

        const err = await failureOf(executeRequest(config, "GET", "/v1/customers")) as FincodeSDKError
        expect(err.child).toBe(thrown)
    })
})
