import { HttpsProxyAgent } from "https-proxy-agent"
import {
    CreatingPlanRequest,
    PlanObject, UpdatingPlanRequest,
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

describe("Plan API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
    const fincode = createFincode(secretKey, config)

    let plan: PlanObject | undefined

    it("Create plan", async () => {
        const req: CreatingPlanRequest = {
            plan_name: "Test plan",
            amount: "9999",
            tax: "1",
            description: "fincode-node test plan",
            interval_pattern: "month",
            interval_count: "3",
        }

        const res = await fincode.plan.create(req)

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

        plan = res
    })

    const updatingReq: UpdatingPlanRequest = {
        plan_name: "Test plan updated",
        amount: "9900",
        tax: "100",
        description: "fincode-node test plan updated",
        interval_pattern: "year",
        interval_count: "1",
    }

    it("Update plan", async () => {
        if (!plan) {
            throw new Error("Plan is not created")
        }

        const res = await fincode.plan.update(plan.id, updatingReq)

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
    })

    it("Retrieve plan", async () => {
        if (!plan) {
            throw new Error("Plan is not created")
        }

        const res = await fincode.plan.retrieve(plan.id)

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
    })

    it("Retrieve plan list", async () => {
        const res = await fincode.plan.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })

    it("Delete plan", async () => {
        if (!plan) {
            throw new Error("Plan is not created")
        }

        const res = await fincode.plan.delete(plan.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(plan.id)
        expect(res.delete_flag).toBe("1")
    })
})