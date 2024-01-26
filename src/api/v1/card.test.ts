import { HttpsProxyAgent } from "https-proxy-agent"
import { FincodeAPIError, CreatingCardRequest, UpdatingCardRequest } from "./../../types"
import { createFincode } from "./fincode.js"
import dotenv from "dotenv"
import path from "path"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

const customerId = env.FINCODE_CUSTOMER_ID_TESTING_CARD
if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_CARD is not defined")

describe("Card API testing", () => {

    it("Register card", async () => {
        const cardToken = env.FINCODE_CARD_TOKEN_TESTING_CREATING_CARD
        if (!cardToken) throw new Error("FINCODE_CARD_TOKEN_TESTING_CREATE_CARD is not defined")

        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const req: CreatingCardRequest = {
            default_flag: "1",
            token: cardToken,
        }
        const res = await fincode.cards.create(customerId, req)

        expect(res.id).toBeDefined()
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")

        await fincode.cards.delete(customerId, res.id)
    })

    it("Update card", async () => {
        const cardToken = env.FINCODE_CARD_TOKEN_TESTING_UPDATING_CARD
        if (!cardToken) throw new Error("FINCODE_CARD_TOKEN_TESTING_UPDATING_CARD is not defined")

        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingCardRequest = {
            default_flag: "1",
            token: cardToken,
        }
        const creatingRes = await fincode.cards.create(customerId, creatingReq)


        const req: UpdatingCardRequest = {
            default_flag: "1",
            expire: "4409",
            holder_name: "John Doe",
        }
        const res = await fincode.cards.update(customerId, creatingRes.id, req)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(creatingRes.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")
        expect(res.expire).toBe("4409")
        expect(res.holder_name).toBe("John Doe")

        await fincode.cards.delete(customerId, res.id)
    })

    it("Retrieve card", async () => {

        const cardToken = env.FINCODE_CARD_TOKEN_TESTING_RETRIEVING_CARD
        if (!cardToken) throw new Error("FINCODE_CARD_TOKEN_TESTING_RETRIEVING_CARD is not defined")

        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingCardRequest = {
            default_flag: "1",
            token: cardToken,
        }
        const creatingRes = await fincode.cards.create(customerId, creatingReq)

        const res = await fincode.cards.retrieve(customerId, creatingRes.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(creatingRes.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe(creatingRes.default_flag)
        expect(res.expire).toBe(creatingRes.expire)
        expect(res.holder_name).toBe(creatingRes.holder_name)

        await fincode.cards.delete(customerId, res.id)
    })

    it("Retrieve card list", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

        const res = await fincode.cards.retrieveList(customerId)

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
        expect(res.list?.length).toBeLessThanOrEqual(5)
    })

    it("Delete card", async () => {
        const cardToken = env.FINCODE_CARD_TOKEN_TESTING_DELETING_CARD
        if (!cardToken) throw new Error("FINCODE_CARD_TOKEN_TESTING_DELETING_CARD is not defined")

        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingCardRequest = {
            default_flag: "1",
            token: cardToken,
        }
        const creatingRes = await fincode.cards.create(customerId, creatingReq)

        const res = await fincode.cards.delete(customerId, creatingRes.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(creatingRes.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.delete_flag).toBe("1")

        try {
            await fincode.cards.retrieve(customerId, creatingRes.id)
        } catch (e) {
            expect(e).toBeInstanceOf(FincodeAPIError)
            const err = e as FincodeAPIError
            expect(err.status).toBe(400)
        }
    })
})