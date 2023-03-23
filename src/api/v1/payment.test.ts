import {
    CapturingPaymentRequest,
    ExecutingPaymentRequest,
    FincodeError,
    RegisteringPaymentRequest
} from '../../types'
import {
    FincodeInitConfig,
    createFincode
} from './fincode'

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"
const customerId = "Postman_Customer"
const cardId = "cs_HjUZoLb8RRK9p4uzCbvxJQ"

describe("Payment API testing", () => {
    const config: FincodeInitConfig = {
        isTest: true,
    }

    if (
        !secretKey ||
        !customerId ||
        !cardId
    ) {
        throw new Error("missing environment variables")
    }

    const fincode = createFincode(secretKey, config)

    describe("payment with 3D secure", () => {
        it("the payment should be success", async () => {
            try {
                const registerReq: RegisteringPaymentRequest = {
                    pay_type: "Card",
                    job_code: "AUTH",
                    amount: "100",
                }
                const registerRes = await fincode.payment.register(registerReq)

                expect(registerRes.id).toBeDefined()
                expect(registerRes.access_id).toBeDefined()
                expect(registerRes.pay_type).toBe("Card")
                expect(registerRes.status).toBe("UNPROCESSED")
                expect(registerRes.amount).toBe(100)

                const executeReq: ExecutingPaymentRequest = {
                    access_id: registerRes.access_id,
                    pay_type: "Card",
                    method: "1",
                    customer_id: customerId,
                    card_id: cardId,
                }
                const executeRes = await fincode.payment.execute(registerRes.id, executeReq)

                expect(executeRes.id).toBeDefined()
                expect(executeRes.id).toBe(registerRes.id)
                expect(executeRes.access_id).toBeDefined()
                expect(executeRes.access_id).toBe(registerRes.access_id)
                expect(executeRes.pay_type).toBe("Card")
                expect(executeRes.status).toBe("AUTHORIZED")
                expect(executeRes.amount).toBe(100)

                const captureReq: CapturingPaymentRequest = {
                    access_id: executeRes.access_id,
                    pay_type: "Card",
                }
                const captureRes = await fincode.payment.capture(registerRes.id, captureReq)

                expect(captureRes.id).toBeDefined()
                expect(captureRes.id).toBe(registerRes.id)
                expect(captureRes.access_id).toBeDefined()
                expect(captureRes.access_id).toBe(registerRes.access_id)
                expect(captureRes.pay_type).toBe("Card")
                expect(captureRes.status).toBe("CAPTURED")
                expect(captureRes.amount).toBe(100)

            } catch (e) {
                if (e instanceof FincodeError) {
                    e.errors.forEach(err => {
                        console.error(err.raw.error_code, err.raw.error_message)
                    })
                } else if (e instanceof Error) {
                    console.error("error:", e.message)
                } else {
                    console.error("unknown erro:", e)
                }

                throw e
            }
        })
    })
})