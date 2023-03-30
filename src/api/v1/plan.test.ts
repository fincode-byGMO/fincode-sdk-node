import {
    CreatingPlanRequest,
    FincodeError, PlanObject, UpdatingPlanRequest,
} from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Plan API testing", () => {
    const customerId = "fincode-node-customer"
    const config: FincodeInitConfig = { isTest: true }
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

        expect(res.list?.length).toBeGreaterThan(0)
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