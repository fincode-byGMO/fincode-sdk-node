import { HttpsProxyAgent } from "https-proxy-agent"
import { CreatingCustomerRequest, FincodeAPIError, UpdatingCustomerRequest } from "./../../types"
import { FincodeInitOptions, createFincode } from "./fincode"
import dotenv from "dotenv"
import path from "path"
import crypto from "crypto"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

describe("Customer API testing", () => {

    const customerId = crypto.randomUUID()

    const options: FincodeInitOptions = {
        proxyAgent: agent,
    }

    const fincode = createFincode(secretKey, "test", options)

    it("Create a customer", async () => {
        const reqBody: CreatingCustomerRequest = {
            id: customerId,
        }

        const res = await fincode.customers.create(reqBody)

        expect(res.id).toBe(customerId)
    })

    const updatingReqBody: UpdatingCustomerRequest = {
        name: "Hiroki Nakatani",
        email: "test@email.com",
        phone_cc: "81",
        phone_no: "1234567890",
        addr_country: "392",
        addr_line_1: "1-1-1",
        addr_line_2: "Shinjuku",
        addr_line_3: "Shinjuku-ku",
        addr_post_code: "1234567",
        addr_state: "000",
        addr_city: "Tokyo",
    }
    it("Update a customer", async () => {

        const res = await fincode.customers.update(customerId, updatingReqBody)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(updatingReqBody.name)
        expect(res.email).toBe(updatingReqBody.email)
        expect(res.phone_cc).toBe(updatingReqBody.phone_cc)
        expect(res.phone_no).toBe(updatingReqBody.phone_no)
        expect(res.addr_country).toBe(updatingReqBody.addr_country)
        expect(res.addr_line_1).toBe(updatingReqBody.addr_line_1)
        expect(res.addr_line_2).toBe(updatingReqBody.addr_line_2)
        expect(res.addr_line_3).toBe(updatingReqBody.addr_line_3)
        expect(res.addr_post_code).toBe(updatingReqBody.addr_post_code)
        expect(res.addr_state).toBe(updatingReqBody.addr_state)
        expect(res.addr_city).toBe(updatingReqBody.addr_city)
    })
    it("Retrieve a customer", async () => {

        const res = await fincode.customers.retrieve(customerId)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(updatingReqBody.name)
        expect(res.email).toBe(updatingReqBody.email)
        expect(res.phone_cc).toBe(updatingReqBody.phone_cc)
        expect(res.phone_no).toBe(updatingReqBody.phone_no)
        expect(res.addr_country).toBe(updatingReqBody.addr_country)
        expect(res.addr_line_1).toBe(updatingReqBody.addr_line_1)
        expect(res.addr_line_2).toBe(updatingReqBody.addr_line_2)
        expect(res.addr_line_3).toBe(updatingReqBody.addr_line_3)
        expect(res.addr_post_code).toBe(updatingReqBody.addr_post_code)
        expect(res.addr_state).toBe(updatingReqBody.addr_state)
        expect(res.addr_city).toBe(updatingReqBody.addr_city)
    })
    it("Retrieve customer list", async () => {
        const res = await fincode.customers.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Delete a customer", async () => {
        const res = await fincode.customers.delete(customerId)
        expect(res.id).toBe(customerId)
        expect(res.delete_flag).toBe("1")
        try {
            await fincode.customers.retrieve(customerId)
        } catch (e) {
            expect(e).toBeInstanceOf(FincodeAPIError)

            const err = e as FincodeAPIError
            expect(err.status).toBe(400)
        }
    })
})