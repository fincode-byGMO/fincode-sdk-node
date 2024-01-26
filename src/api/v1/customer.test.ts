import { CreatingCustomerRequest, FincodeAPIError, UpdatingCustomerRequest } from "./../../types"
import { createFincode } from "./fincode.js"
import dotenv from "dotenv"
import path from "path"
import { generateUUIDv4 } from "./../../utils/random"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY

describe("Customer API testing", () => {

    it("Create a customer", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })
        const customerId = generateUUIDv4()

        const req: CreatingCustomerRequest = {
            id: customerId,
        }
        const res = await fincode.customers.create(req)
        expect(res.id).toBe(customerId)

        await fincode.customers.delete(res.id)
    })

    it("Update a customer", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })
        const customerId = generateUUIDv4()

        const creatingReq: CreatingCustomerRequest = {
            id: customerId,
        }
        const creatingRes = await fincode.customers.create(creatingReq)

        const req: UpdatingCustomerRequest = {
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

        const res = await fincode.customers.update(creatingRes.id, req)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(req.name)
        expect(res.email).toBe(req.email)
        expect(res.phone_cc).toBe(req.phone_cc)
        expect(res.phone_no).toBe(req.phone_no)
        expect(res.addr_country).toBe(req.addr_country)
        expect(res.addr_line_1).toBe(req.addr_line_1)
        expect(res.addr_line_2).toBe(req.addr_line_2)
        expect(res.addr_line_3).toBe(req.addr_line_3)
        expect(res.addr_post_code).toBe(req.addr_post_code)
        expect(res.addr_state).toBe(req.addr_state)
        expect(res.addr_city).toBe(req.addr_city)

        await fincode.customers.delete(customerId)
    })
    it("Retrieve a customer", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })
        const customerId = generateUUIDv4()

        const creatingReq: CreatingCustomerRequest = {
            id: customerId,
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
        const creatingRes = await fincode.customers.create(creatingReq)

        const res = await fincode.customers.retrieve(customerId)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(creatingRes.name)
        expect(res.email).toBe(creatingRes.email)
        expect(res.phone_cc).toBe(creatingRes.phone_cc)
        expect(res.phone_no).toBe(creatingRes.phone_no)
        expect(res.addr_country).toBe(creatingRes.addr_country)
        expect(res.addr_line_1).toBe(creatingRes.addr_line_1)
        expect(res.addr_line_2).toBe(creatingRes.addr_line_2)
        expect(res.addr_line_3).toBe(creatingRes.addr_line_3)
        expect(res.addr_post_code).toBe(creatingRes.addr_post_code)
        expect(res.addr_state).toBe(creatingRes.addr_state)
        expect(res.addr_city).toBe(creatingRes.addr_city)

        await fincode.customers.delete(customerId)
    })
    it("Retrieve customer list", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })
        const customerId = generateUUIDv4()

        const creatingReq: CreatingCustomerRequest = {
            id: customerId,
        }
        await fincode.customers.create(creatingReq)

        const res = await fincode.customers.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)

        await fincode.customers.delete(customerId)
    })
    it("Delete a customer", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })
        const customerId = generateUUIDv4()

        const creatingReq: CreatingCustomerRequest = {
            id: customerId,
        }
        const creatingRes = await fincode.customers.create(creatingReq)

        const res = await fincode.customers.delete(creatingRes.id)
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