import { HttpsProxyAgent } from "https-proxy-agent"
import {
    RegisteringSubscriptionRequest,
    RetrievingSubscriptionListPagination,
    SubscriptionObject,
    UpdatingSubscriptionRequest,
} from "./../../types"
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

const customerId = env.FINCODE_CUSTOMER_ID_TESTING_SUBSCRIPTION
if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_SUBSCRIPTION is not defined")

const cardId = env.FINCODE_CARD_ID_TESTING_SUBSCRIPTION
if (!cardId) throw new Error("FINCODE_CARD_ID_TESTING_SUBSCRIPTION is not defined")

const planId = env.FINCODE_PLAN_ID_TESTING_SUBSCRIPTION
if (!planId) throw new Error("FINCODE_PLAN_ID_TESTING_SUBSCRIPTION is not defined")

describe("Subscription API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
    const fincode = createFincode(secretKey, config)

    let subscription: SubscriptionObject | undefined


    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yyyy = tomorrow.getFullYear()
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0")
    const dd = String(tomorrow.getDate()).padStart(2, "0")
    const tomorrowStr = `${yyyy}/${mm}/${dd}`


    it("Create subscription", async () => {
        const req: RegisteringSubscriptionRequest = {
            pay_type: "Card",
            customer_id: customerId,
            plan_id: planId,
            start_date: tomorrowStr,
            stop_date: null,
            card_id: cardId,
            client_field_1: "fincode-node test",
            initial_amount: "9999",
            initial_tax: "1",
            end_month_flag: "0",
        }

        const res = await fincode.subscription.register(req)

        expect(res.id).toBeDefined()
        expect(res.pay_type).toBeDefined()
        expect(res.pay_type).toBe(req.pay_type)
        expect(res.customer_id).toBeDefined()
        expect(res.customer_id).toBe(req.customer_id)
        expect(res.plan_id).toBeDefined()
        expect(res.plan_id).toBe(req.plan_id)
        expect(res.start_date).toBeDefined()
        expect(res.start_date).toBe(`${req.start_date} 00:00:00.000`)
        expect(res.stop_date).toBe(req.stop_date)
        expect(res.card_id).toBeDefined()
        expect(res.card_id).toBe(req.card_id)
        expect(res.client_field_1).toBeDefined()
        expect(res.client_field_1).toBe(req.client_field_1)
        expect(res.initial_amount).toBeDefined()
        expect(res.initial_amount).toBe(Number(req.initial_amount))
        expect(res.initial_tax).toBeDefined()
        expect(res.initial_tax).toBe(Number(req.initial_tax))

        expect(res.status).toBe("ACTIVE")

        subscription = res
    })

    const lastDay = new Date()
    lastDay.setMonth(lastDay.getMonth() + 1)
    lastDay.setDate(0)
    const yyyy2 = lastDay.getFullYear()
    const mm2 = String(lastDay.getMonth() + 1).padStart(2, "0")
    const lastDayStr = `${yyyy2}/${mm2}/${dd}`

    const updatingReq: UpdatingSubscriptionRequest = {
        pay_type: "Card",
        stop_date: lastDayStr,
    }

    it("Update subscription", async () => {
        if (!subscription) {
            throw new Error("Subscription is not created")
        }

        const res = await fincode.subscription.update(subscription.id, updatingReq)

        expect(res.id).toBeDefined()
        expect(res.pay_type).toBeDefined()
        expect(res.pay_type).toBe(updatingReq.pay_type)
        expect(res.stop_date).toBeDefined()
        expect(res.stop_date).toBe(`${updatingReq.stop_date} 00:00:00.000`)
    })

    it("Retrieve subscription", async () => {
        if (!subscription) {
            throw new Error("Subscription is not created")
        }

        const res = await fincode.subscription.retrieve(subscription.id, "Card")

        expect(res.id).toBeDefined()
        expect(res.id).toBe(subscription.id)
        expect(res.plan_id).toBe(subscription.plan_id)
        expect(res.customer_id).toBe(subscription.customer_id)
        expect(res.pay_type).toBe(updatingReq.pay_type)
        expect(res.start_date).toBe(subscription.start_date)
        expect(res.stop_date).toBe(`${updatingReq.stop_date} 00:00:00.000`)
        expect(res.card_id).toBe(subscription.card_id)
        expect(res.client_field_1).toBe(subscription.client_field_1)
        expect(res.initial_amount).toBe(subscription.initial_amount)
        expect(res.initial_tax).toBe(subscription.initial_tax)
    })

    it("Retrieve subscription list", async () => {
        const pagination = new RetrievingSubscriptionListPagination("Card")

        const res = await fincode.subscription.retrieveList(pagination)

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })

    it("Delete subscription", async () => {
        if (!subscription) {
            throw new Error("Subscription is not created")
        }

        const res = await fincode.subscription.cancel(subscription.id, "Card")

        expect(res.id).toBeDefined()
        expect(res.id).toBe(subscription.id)
        expect(res.status).toBe("CANCELED")
    })
})