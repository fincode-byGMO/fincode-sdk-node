import { HttpsProxyAgent } from "https-proxy-agent"
import {
    CreatingPaymentSessionRequest,
} from "./../../types"
import { createFincode } from "./fincode"
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

describe("Payment Session API testing", () => {

    it("Create payment session", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

        const current = new Date()
        const expire = new Date(current.getTime() + 60 * 60 * 1000) // + 1 hour
        const expireYear = expire.getFullYear()
        const expireMonth = String(expire.getMonth() + 1).padStart(2, "0")
        const expireDate = String(expire.getDate()).padStart(2, "0")
        const expireHour = String(expire.getHours()).padStart(2, "0")
        const expireMinute = String(expire.getMinutes()).padStart(2, "0")
        const expireSecond = String(expire.getSeconds()).padStart(2, "0")
        const expireStr = `${expireYear}/${expireMonth}/${expireDate} ${expireHour}:${expireMinute}:${expireSecond}`

        const orderId = `f-node_${Date.now()}`

        const reqBody: CreatingPaymentSessionRequest = {
            expire: expireStr,
            shop_service_name: "fincode Node.js",
            transaction: {
                order_id: orderId,
                pay_type: ["Card"],
                amount: "1000",
                client_field_1: "fincode Node.js",
            },
            card: {
                job_code: "CAPTURE",
            }
        }

        const res = await fincode.paymentSessions.create(reqBody)

        expect(res.id).toBeDefined()
        expect(res.expire).toBe(`${reqBody.expire}.000`)
        expect(res.shop_service_name).toBe(reqBody.shop_service_name)
        expect(res.transaction.order_id).toBe(reqBody.transaction.order_id)
        expect(res.transaction.pay_type).toEqual(reqBody.transaction.pay_type)
        expect(res.transaction.amount).toBe(Number(reqBody.transaction.amount))
        expect(res.transaction.client_field_1).toBe(reqBody.transaction.client_field_1)
        expect(res.card.job_code).toBe(reqBody.card?.job_code)
        expect(res.status).toBe("CREATE")
        expect(res.link_url).toBeDefined()
    })
})