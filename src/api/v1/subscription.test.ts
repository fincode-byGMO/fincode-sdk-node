import {
    CreatingSubscriptionRequest,
    SubscriptionObject,
    UpdatingSubscriptionRequest,
} from "./../../types"
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

const customerId = env.FINCODE_CUSTOMER_ID_TESTING_SUBSCRIPTION
if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_SUBSCRIPTION is not defined")

const cardId = env.FINCODE_CARD_ID_TESTING_SUBSCRIPTION
if (!cardId) throw new Error("FINCODE_CARD_ID_TESTING_SUBSCRIPTION is not defined")

const planId = env.FINCODE_PLAN_ID_TESTING_SUBSCRIPTION
if (!planId) throw new Error("FINCODE_PLAN_ID_TESTING_SUBSCRIPTION is not defined")

const createCreatingSubscriptionRequest = (): CreatingSubscriptionRequest => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const yyyy = tomorrow.getFullYear()
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0")
    const dd = String(tomorrow.getDate()).padStart(2, "0")
    const tomorrowStr = `${yyyy}/${mm}/${dd}`

    const req: CreatingSubscriptionRequest = {
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

    return req
}

describe("Subscription API testing", () => {

    it("Create subscription", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const req = createCreatingSubscriptionRequest()
        const res = await fincode.subscriptions.create(req)

        expect(res.id).toBeDefined()
        expect(res.pay_type).toBeDefined()
        expect(res.pay_type).toBe(req.pay_type)
        expect(res.customer_id).toBeDefined()
        expect(res.customer_id).toBe(req.customer_id)
        expect(res.plan_id).toBeDefined()
        expect(res.plan_id).toBe(req.plan_id)
        expect(res.start_date).toBeDefined()
        expect(res.start_date).toBe(`${req.start_date} 00:00:00.000`)
        if (res.stop_date) {
            expect(res.stop_date).toBe(`${req.stop_date} 00:00:00.000`)
        } else {
            expect(res.stop_date).toBeNull()
        }
        expect(res.card_id).toBeDefined()
        expect(res.card_id).toBe(req.card_id)
        expect(res.client_field_1).toBeDefined()
        expect(res.client_field_1).toBe(req.client_field_1)
        expect(res.initial_amount).toBeDefined()
        expect(res.initial_amount).toBe(Number(req.initial_amount))
        expect(res.initial_tax).toBeDefined()
        expect(res.initial_tax).toBe(Number(req.initial_tax))

        expect(res.status).toBe("ACTIVE")

        await fincode.subscriptions.cancel(res.id, { pay_type: "Card" })
    })

    it("Update subscription", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingReq = createCreatingSubscriptionRequest()
        const creatingRes = await fincode.subscriptions.create(creatingReq)

        const lastDay = new Date()
        lastDay.setMonth(lastDay.getMonth() + 1)
        lastDay.setDate(0)
        const yyyy2 = lastDay.getFullYear()
        const mm2 = String(lastDay.getMonth() + 1).padStart(2, "0")
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const dd2 = String(tomorrow.getDate()).padStart(2, "0")
        const lastDayStr = `${yyyy2}/${mm2}/${dd2}`

        const updatingReq: UpdatingSubscriptionRequest = {
            pay_type: "Card",
            stop_date: lastDayStr,
        }

        const res = await fincode.subscriptions.update(creatingRes.id, updatingReq)

        expect(res.id).toBeDefined()
        expect(res.pay_type).toBeDefined()
        expect(res.pay_type).toBe(updatingReq.pay_type)
        expect(res.stop_date).toBeDefined()
        expect(res.stop_date).toBe(`${updatingReq.stop_date} 00:00:00.000`)
        expect(res.status).toBe("ACTIVE")

        await fincode.subscriptions.cancel(res.id, { pay_type: "Card" })
    })

    it("Retrieve subscription", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingReq = createCreatingSubscriptionRequest()
        const creatingRes = await fincode.subscriptions.create(creatingReq)

        const res = await fincode.subscriptions.retrieve(creatingRes.id, { pay_type: "Card" })

        expect(res.id).toBeDefined()
        expect(res.id).toBe(creatingRes.id)
        expect(res.plan_id).toBe(creatingRes.plan_id)
        expect(res.customer_id).toBe(creatingRes.customer_id)
        expect(res.pay_type).toBe(creatingRes.pay_type)
        expect(res.start_date).toBe(creatingRes.start_date)
        if (res.stop_date) {
            expect(res.stop_date).toBe(`${creatingRes.stop_date} 00:00:00.000`)
        } else {
            expect(res.stop_date).toBeNull()
        }
        expect(res.card_id).toBe(creatingRes.card_id)
        expect(res.client_field_1).toBe(creatingRes.client_field_1)
        expect(res.initial_amount).toBe(creatingRes.initial_amount)
        expect(res.initial_tax).toBe(creatingRes.initial_tax)
        expect(res.status).toBe("ACTIVE")

        await fincode.subscriptions.cancel(res.id, { pay_type: "Card" })
    })

    it("Retrieve subscription list", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingReq = createCreatingSubscriptionRequest()
        const creatingRes = await fincode.subscriptions.create(creatingReq)

        const res = await fincode.subscriptions.retrieveList({ pay_type: "Card", sort: [{ field: "updated", order: "desc" }] })

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
        let subscription: SubscriptionObject | undefined
        res.list?.forEach((item) => {
            if (item.id === creatingRes.id) {
                subscription = item
            }
        })
        expect(subscription).toBeDefined()
        if (!subscription) {
            throw new Error("Subscription is not created")
        }
        expect(subscription.id).toBe(creatingRes.id)
        expect(subscription.plan_id).toBe(creatingRes.plan_id)
        expect(subscription.customer_id).toBe(creatingRes.customer_id)
        expect(subscription.pay_type).toBe(creatingRes.pay_type)
        expect(subscription.start_date).toBe(creatingRes.start_date)
        if (subscription.stop_date) {
            expect(subscription.stop_date).toBe(`${creatingRes.stop_date} 00:00:00.000`)
        } else {
            expect(subscription.stop_date).toBeNull()
        }
        expect(subscription.card_id).toBe(creatingRes.card_id)
        expect(subscription.client_field_1).toBe(creatingRes.client_field_1)
        expect(subscription.initial_amount).toBe(creatingRes.initial_amount)
        expect(subscription.initial_tax).toBe(creatingRes.initial_tax)
        expect(subscription.status).toBe("ACTIVE")

        await fincode.subscriptions.cancel(subscription.id, { pay_type: "Card" })
    })

    it("Delete subscription", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingReq = createCreatingSubscriptionRequest()
        const creatingRes = await fincode.subscriptions.create(creatingReq)

        const res = await fincode.subscriptions.cancel(creatingRes.id, { pay_type: "Card" })

        expect(res.id).toBeDefined()
        expect(res.id).toBe(creatingRes.id)
        expect(res.status).toBe("CANCELED")
    })
})