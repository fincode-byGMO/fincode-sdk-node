import { HttpsProxyAgent } from "https-proxy-agent"
import {
    PaymentBulkObject,
    RetrievingPaymentBulkDetailPagination
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

describe("Payment Bulk API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
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
    }, 100000)

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
        expect(res.list?.length).toBeGreaterThanOrEqual(0)
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