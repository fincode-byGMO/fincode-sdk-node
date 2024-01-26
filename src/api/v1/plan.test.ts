import {
    CreatingPlanRequest,
    UpdatingPlanRequest,
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

describe("Plan API testing", () => {
    it("Create plan", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const req: CreatingPlanRequest = {
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        }

        const res = await fincode.plans.create(req)

        expect(res.id).toBeDefined()
        expect(res.plan_name).toBe(req.plan_name)
        expect(res.amount).toBe(Number(req.amount))
        expect(res.tax).toBeDefined()
        expect(res.tax).toBe(Number(req.tax))
        expect(res.description).toBeDefined()
        expect(res.description).toBe(req.description)
        expect(res.interval_pattern).toBeDefined()
        expect(res.interval_pattern).toBe(req.interval_pattern)
        expect(res.interval_count).toBeDefined()
        expect(res.interval_count).toBe(Number(req.interval_count))

        await fincode.plans.delete(res.id)
    })

    it("Update plan", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingRes = await fincode.plans.create({
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        })

        const updatingReq: UpdatingPlanRequest = {
            plan_name: "Test plan updated",
            amount: "10000",
            tax: "100",
            description: "fincode-node test plan updated",
            interval_pattern: "year",
            interval_count: "1",
        }

        const res = await fincode.plans.update(creatingRes.id, updatingReq)

        expect(res.id).toBeDefined()
        expect(res.plan_name).toBe(updatingReq.plan_name)
        expect(res.amount).toBe(Number(updatingReq.amount))
        expect(res.tax).toBeDefined()
        expect(res.tax).toBe(Number(updatingReq.tax))
        expect(res.description).toBeDefined()
        expect(res.description).toBe(updatingReq.description)
        expect(res.interval_pattern).toBeDefined()
        expect(res.interval_pattern).toBe(updatingReq.interval_pattern)
        expect(res.interval_count).toBeDefined()
        expect(res.interval_count).toBe(Number(updatingReq.interval_count))

        await fincode.plans.delete(res.id)
    })

    it("Retrieve plan", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingRes = await fincode.plans.create({
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        })

        const res = await fincode.plans.retrieve(creatingRes.id)

        expect(res.id).toBeDefined()
        expect(res.plan_name).toBe(creatingRes.plan_name)
        expect(res.amount).toBe(Number(creatingRes.amount))
        expect(res.tax).toBeDefined()
        expect(res.tax).toBe(Number(creatingRes.tax))
        expect(res.description).toBeDefined()
        expect(res.description).toBe(creatingRes.description)
        expect(res.interval_pattern).toBeDefined()
        expect(res.interval_pattern).toBe(creatingRes.interval_pattern)
        expect(res.interval_count).toBeDefined()
        expect(res.interval_count).toBe(Number(creatingRes.interval_count))

        await fincode.plans.delete(res.id)
    })

    it("Retrieve plan list", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingRes = await fincode.plans.create({
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        })

        const res = await fincode.plans.retrieveList({
            sort: [{ field: "updated", order: "desc" }]
        })

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
        expect(res.list?.find((plan) => plan.id === creatingRes.id)).toBeDefined()

        await fincode.plans.delete(creatingRes.id)
    })

    it("Delete plan", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: proxy })

        const creatingRes = await fincode.plans.create({
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        })

        const res = await fincode.plans.delete(creatingRes.id)

        expect(res.id).toBe(creatingRes.id)
        expect(res.delete_flag).toBe("1")
    })
})