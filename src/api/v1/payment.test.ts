import {
    CapturingPaymentRequest,
    ExecutingPaymentRequest,
    PaymentObject,
    RegisteringPaymentRequest
} from '../../types'
import {
    FincodeInitConfig,
    createFincode
} from './fincode'

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"
const customerId = "fincode-node-customer"
const cardId = "cs_ghyasqnBSS-nT0HzFJ_t5w"

describe("Payment API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    let payment: PaymentObject | undefined

    describe("payment without 3D secure", () => {
        it("Registering payment", async () => {
            const registerReq: RegisteringPaymentRequest = {
                pay_type: "Card",
                job_code: "AUTH",
                amount: "100",
                client_field_1: "fincode-node test",
            }
            const registerRes = await fincode.payment.register(registerReq)

            expect(registerRes.id).toBeDefined()
            expect(registerRes.access_id).toBeDefined()
            expect(registerRes.pay_type).toBe("Card")
            expect(registerRes.status).toBe("UNPROCESSED")
            expect(registerRes.amount).toBe(100)

            payment = registerRes
        })

        it("Executing payment", async () => {
            if (!payment) {
                throw new Error("Payment is not registered")
            }

            const executeReq: ExecutingPaymentRequest = {
                access_id: payment.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const executeRes = await fincode.payment.execute(payment.id, executeReq)

            expect(executeRes.id).toBeDefined()
            expect(executeRes.id).toBe(payment.id)
            expect(executeRes.access_id).toBe(payment.access_id)
            expect(executeRes.pay_type).toBe("Card")
            expect(executeRes.status).toBe("AUTHORIZED")
            expect(executeRes.amount).toBe(100)
        })
        it("Capturing payment", async () => {
            if (!payment) {
                throw new Error("Payment is not registered")
            }

            const captureReq: CapturingPaymentRequest = {
                access_id: payment.access_id,
                pay_type: "Card",
            }
            const captureRes = await fincode.payment.capture(payment.id, captureReq)

            expect(captureRes.id).toBeDefined()
            expect(captureRes.id).toBe(payment.id)
            expect(captureRes.access_id).toBe(payment.access_id)
            expect(captureRes.pay_type).toBe("Card")
            expect(captureRes.status).toBe("CAPTURED")
            expect(captureRes.amount).toBe(100)
        })
    })
})