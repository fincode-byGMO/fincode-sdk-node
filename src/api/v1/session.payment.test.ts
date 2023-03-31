import {
    CreatingPaymentSessionRequest,
    FincodeError, PaymentSessionObject,
} from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Payment Session API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    let paymentSession: PaymentSessionObject | undefined

    it("Create payment session", async () => {

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

        const res = await fincode.paymentSession.create(reqBody)

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