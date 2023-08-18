import {
    CapturingPaymentRequest,
    ExecutingPaymentRequest,
    PaymentObject,
    CreatingPaymentRequest
} from '../../types'
import {
    FincodeInitOptions,
    createFincode
} from './fincode'
import { HttpsProxyAgent } from 'https-proxy-agent'
import dotenv from "dotenv"
import path from 'path'

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT
if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT is not defined")

const cardId = env.FINCODE_CARD_ID_TESTING_PAYMENT
if (!cardId) throw new Error("FINCODE_CARD_ID_TESTING_PAYMENT is not defined")

describe("Payment API testing", () => {

    const options: FincodeInitOptions = {
        proxyAgent: agent,
    }

    const fincode = createFincode(secretKey, "test", options)

    let payment: PaymentObject | undefined

    describe("payment without 3D secure", () => {
        it("Creating payment", async () => {
            const registerReq: CreatingPaymentRequest = {
                pay_type: "Card",
                job_code: "AUTH",
                amount: "100",
                client_field_1: "fincode-node test",
            }
            const registerRes = await fincode.payments.create(registerReq)

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
            const executeRes = await fincode.payments.execute(payment.id, executeReq)

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
            const captureRes = await fincode.payments.capture(payment.id, captureReq)

            expect(captureRes.id).toBeDefined()
            expect(captureRes.id).toBe(payment.id)
            expect(captureRes.access_id).toBe(payment.access_id)
            expect(captureRes.pay_type).toBe("Card")
            expect(captureRes.status).toBe("CAPTURED")
            expect(captureRes.amount).toBe(100)
        })
    })
})