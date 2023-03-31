import { ExecutingPaymentRequest, PaymentBulkObject, RegisteringPaymentRequest, RetrievingPaymentBulkDetailPagination } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Payment Bulk API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    let paymentBulk: PaymentBulkObject | undefined

    const testJson: {
        data: Object[]
    } = {
        data: [
            {
                id: `f-node-pb-${Date.now()}-1`,
                amount: "1000",
                tax: "100",
                customer_id: "fincode-node-customer",
                client_field_1: "fincode Node.js Payment Bulk 1",
            },
            {
                id: `f-node-pb-${Date.now()}-2`,
                amount: "8000",
                tax: "800",
                customer_id: "Postman_Customer",
                client_field_1: "fincode Node.js Payment Bulk 2",
            },
        ]
    }

    it("Register payment-bulk", async () => {

        // process date format: yyyy/MM/dd
        const today = new Date()
        const processDay = new Date(today.getTime() + (60 * 60 * 24 * 1000)) // + 1 day
        const processYear = processDay.getFullYear()
        const processMonth = String(processDay.getMonth() + 1).padStart(2, "0")
        const processDate = String(processDay.getDate()).padStart(2, "0")
        const processStr = `${processYear}/${processMonth}/${processDate}`

        const file = JSON.stringify(testJson)
        const res = await fincode.paymentBulk.register("Card", processStr, file, `test-${Date.now()}.json`)

        expect(res.id).toBeDefined()
        expect(res.process_plan_date).toBe(processStr)
        expect(res.status).toBe("CHECKING")

        paymentBulk = res
    })

    it("Retrieve payment-bulk detail list", async () => {
        if (!paymentBulk) {
            throw new Error("paymentBulk is undefined")
        }

        const pagination = new RetrievingPaymentBulkDetailPagination(paymentBulk.id, "Card")

        const res = await fincode.paymentBulk.retrieveDetailList(paymentBulk.id, pagination)

        expect(res.list).toBeDefined()
        expect(res.list?.length).toBe(testJson.data.length)
    })

    it("Retrieve payment-bulk list", async () => {
        const res = await fincode.paymentBulk.retrieveList()

        expect(res.list).toBeDefined()
        expect(res.list?.length).toBeGreaterThan(0)
    })

    it("Delete payment-bulk", async () => {
        if (!paymentBulk) {
            throw new Error("paymentBulk is undefined")
        }

        const res = await fincode.paymentBulk.delete(paymentBulk.id)

        expect(res.id).toBe(paymentBulk.id)
        expect(res.delete_flag).toBe("1")

    })
})