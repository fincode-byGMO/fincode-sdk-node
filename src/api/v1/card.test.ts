import { HttpsProxyAgent } from "https-proxy-agent"
import { CardObject, FincodeAPIError, RegisteringCardRequest, UpdatingCardRequest } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"
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

const cardToken = env.FINCODE_CARD_TOKEN
if (!cardToken) throw new Error("FINCODE_CARD_TOKEN is not defined")

const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT
if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT is not defined")

describe("Card API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
    const fincode = createFincode(secretKey, config)

    let card: CardObject | undefined
    it("Register card", async () => {
        const req: RegisteringCardRequest = {
            default_flag: "1",
            token: cardToken,
        }

        const res = await fincode.card.register(customerId, req)

        expect(res.id).toBeDefined()
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")

        card = res
    })

    const updatingReqBody: UpdatingCardRequest = {
        default_flag: "1",
        expire: "4409",
        holder_name: "John Doe",
    }
    it("Update card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.update(customerId, card.id, updatingReqBody)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")
        expect(res.expire).toBe("4409")
        expect(res.holder_name).toBe("John Doe")
    })

    it("Retrieve card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.retrieve(customerId, card.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe(updatingReqBody.default_flag)
        expect(res.expire).toBe(updatingReqBody.expire)
        expect(res.holder_name).toBe(updatingReqBody.holder_name)
    })

    it("Retrieve card list", async () => {
        const res = await fincode.card.retrieveList(customerId)

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
        expect(res.list?.length).toBeLessThanOrEqual(5)
    })

    it("Delete card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.delete(customerId, card.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.delete_flag).toBe("1")

        try {
            await fincode.card.retrieve(customerId, card.id)
        } catch (e) {
            expect(e).toBeInstanceOf(FincodeAPIError)
            const err = e as FincodeAPIError
            expect(err.status).toBe(400)
        }
    })
})