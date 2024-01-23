import { HttpsProxyAgent } from "https-proxy-agent"
import { createFincode } from "./fincode"
import dotenv from "dotenv"
import path from "path"
import { generateRandomString } from "./../../utils/random"

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

const createProcessDate = (offset: number): string => {
    const today = new Date()
    const processDay = new Date(today.getTime() + offset)
    const processYear = processDay.getFullYear()
    const processMonth = String(processDay.getMonth() + 1).padStart(2, "0")
    const processDate = String(processDay.getDate()).padStart(2, "0")
    // process str will be YYYY/MM/DD
    const processStr = `${processYear}/${processMonth}/${processDate}`
    return processStr
}

const createPaymentBulkData = (): { data: unknown[] } => {
    return {
        data: [
            {
                id: `f_node-${generateRandomString(23)}`,
                amount: "1000",
                tax: "100",
                customer_id: customerId,
                client_field_1: "fincode Node.js Payment Bulk 1",
            },
            {
                id: `f_node-${generateRandomString(23)}`,
                amount: "8000",
                tax: "800",
                customer_id: customerId,
                client_field_1: "fincode Node.js Payment Bulk 2",
            },
        ]
    }
}

describe("Payment Bulk API testing", () => {
    it("Register payment-bulk", async () => {
        const fincode = createFincode(
            secretKey,
            "test",
            { proxyAgent: agent, }
        )

        const paymentBulkData = createPaymentBulkData()
        const file = JSON.stringify(paymentBulkData)
        const processStr = createProcessDate(60 * 60 * 24 * 2 * 1000) // + 2 day

        const paymentBulk = await fincode.paymentBulks.create(
            {
                pay_type: "Card",
                process_plan_date: processStr,
            },
            {
                file: file,
                fileName: `test-${generateRandomString(10)}.json`,
            },
        )

        expect(paymentBulk.id).toBeDefined()
        expect(paymentBulk.process_plan_date).toBe(processStr)
        expect(paymentBulk.status).toBe("CHECKING")
    }, 100000)

    it("Retrieve payment-bulk detail list", async () => {
        const fincode = createFincode(
            secretKey,
            "test",
            { proxyAgent: agent, }
        )

        const paymentBulkData = createPaymentBulkData()
        const processStr = createProcessDate(60 * 60 * 24 * 2 * 1000) // + 2 day

        const file = JSON.stringify(paymentBulkData)

        const creatingRes = await fincode.paymentBulks.create(
            {
                pay_type: "Card",
                process_plan_date: processStr,
            },
            {
                file: file,
                fileName: `test-${generateRandomString(10)}.json`,
            },
        )

        const res = await fincode.paymentBulks.retrieveDetailList(creatingRes.id, { pay_type: "Card" })

        expect(res.list).toBeDefined()
        expect(res.list?.length).toBe(paymentBulkData.data.length)
    })

    it("Retrieve payment-bulk list", async () => {

        const fincode = createFincode(
            secretKey,
            "test",
            { proxyAgent: agent, }
        )
        const res = await fincode.paymentBulks.retrieveList()

        expect(res.list).toBeDefined()
        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })

    it("Delete payment-bulk", async () => {
        const fincode = createFincode(
            secretKey,
            "test",
            { proxyAgent: agent, }
        )

        const paymentBulkData = createPaymentBulkData()
        const processStr = createProcessDate(60 * 60 * 24 * 2 * 1000) // + 2 day

        const file = JSON.stringify(paymentBulkData)
        const creatingRes = await fincode.paymentBulks.create({
            pay_type: "Card",
            process_plan_date: processStr,
        }, {
            file: file,
        })

        const res = await fincode.paymentBulks.delete(creatingRes.id)

        expect(res.id).toBe(creatingRes.id)
        expect(res.delete_flag).toBe("1")
    })
})