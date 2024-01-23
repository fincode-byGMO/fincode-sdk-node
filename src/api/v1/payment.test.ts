import {
    CapturingPaymentRequest,
    ExecutingPaymentRequest,
    CreatingPaymentRequest,
    CancelingPaymentRequest,
    ReauthorizingPaymentRequest,
    ChangingPaymentAmountRequest,
    GeneratingKonbiniPaymentBarcodeRequest
} from '../../types'
import {
    createFincode
} from './fincode'
import { HttpsProxyAgent } from 'https-proxy-agent'
import dotenv from "dotenv"
import path from 'path'
import { generateRandomString } from '../../utils/random'

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
    describe("Card (without 3D secure)", () => {
        it("Creating payment", async () => {

            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const req: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "AUTH",
                amount: "100",
                client_field_1: "@fincode/node test: Creating Card payment",
            }
            const res = await fincode.payments.create(req)

            expect(res.id).toBeDefined()
            expect(res.access_id).toBeDefined()
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("UNPROCESSED")
            expect(res.amount).toBe(100)

        })
        it("Retrieving payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

            const orderId = env.FINCODE_ORDER_ID_TESTING_RETRIEVING_CARD_PAYMENT
            if (!orderId) throw new Error("FINCODE_ORDER_ID_TESTING_RETRIEVING_CARD_PAYMENT is not defined")

            const res = await fincode.payments.retrieve(orderId, { pay_type: "Card" })

            expect(res.id).toBeDefined()
            expect(res.id).toBe(orderId)
            expect(res.access_id).toBeDefined()
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("UNPROCESSED")
            expect(res.amount).toBe(100)
        })
        it("Retrieving payment list", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

            const res = await fincode.payments.retrieveList({ pay_type: "Card" })

            expect(res.list).toBeDefined()
        })
        it("Executing payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "AUTH",
                amount: "100",
                client_field_1: "@fincode/node test: Executing Card payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const req: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const res = await fincode.payments.execute(creatingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(creatingRes.id)
            expect(res.access_id).toBe(creatingRes.access_id)
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("AUTHORIZED")
            expect(res.amount).toBe(100)
        })
        it("Capturing payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "AUTH",
                amount: "100",
                client_field_1: "@fincode/node test: Capturing Card payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const req: CapturingPaymentRequest = {
                access_id: executingRes.access_id,
                pay_type: "Card",
            }
            const res = await fincode.payments.capture(executingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(executingRes.id)
            expect(res.access_id).toBe(executingRes.access_id)
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("CAPTURED")
            expect(res.amount).toBe(100)
        })
        it("Canceling payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "CAPTURE",
                amount: "100",
                client_field_1: "@fincode/node test: Canceling Card payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const req: CancelingPaymentRequest = {
                access_id: executingRes.access_id,
                pay_type: "Card",
            }
            const res = await fincode.payments.cancel(executingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(executingRes.id)
            expect(res.access_id).toBe(executingRes.access_id)
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("CANCELED")
        })
        it("Reautorizing payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "CAPTURE",
                amount: "100",
                client_field_1: "@fincode/node test: Reauthorizing Card payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const cancelingReq: CancelingPaymentRequest = {
                access_id: executingRes.access_id,
                pay_type: "Card",
            }
            const cancelingRes = await fincode.payments.cancel(executingRes.id, cancelingReq)

            const req: ReauthorizingPaymentRequest = {
                pay_type: "Card",
                access_id: cancelingRes.access_id,
                method: "1",
            }
            const res = await fincode.payments.reauthorize(cancelingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(cancelingRes.id)
            expect(res.access_id).toBe(cancelingRes.access_id)
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("AUTHORIZED")
        })
        it("Changing payment amount", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Card",
                job_code: "CAPTURE",
                amount: "100",
                client_field_1: "@fincode/node test: Changing amount of Card payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Card",
                method: "1",
                customer_id: customerId,
                card_id: cardId,
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const req: ChangingPaymentAmountRequest = {
                pay_type: "Card",
                access_id: executingRes.access_id,
                amount: "200",
                job_code: "CAPTURE",
            }
            const res = await fincode.payments.changeAmount(executingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(executingRes.id)
            expect(res.access_id).toBe(executingRes.access_id)
            expect(res.pay_type).toBe("Card")
            expect(res.status).toBe("CAPTURED")
            expect(res.amount).toBe(200)
        })
    })

    describe("Konbini", () => {
        it("Creating payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const req: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Konbini",
                amount: "100",
                client_field_1: "@fincode/node test: Creating Konbini payment",
            }
            const res = await fincode.payments.create(req)

            expect(res.id).toBeDefined()
            expect(res.access_id).toBeDefined()
            expect(res.pay_type).toBe("Konbini")
            expect(res.status).toBe("UNPROCESSED")
        })
        it("Executing payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Konbini",
                amount: "100",
                client_field_1: "@fincode/node test: Executing Konbini payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const req: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Konbini",
                device_name: "iPhone",
                win_width: "375",
                win_height: "812",
                pixel_ratio: "3",
                win_size_type: "1",
            }
            const res = await fincode.payments.execute(creatingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(creatingRes.id)
            expect(res.access_id).toBe(creatingRes.access_id)
            expect(res.pay_type).toBe("Konbini")
            expect(res.status).toBe("AWAITING_CUSTOMER_PAYMENT")
            expect(res.barcode).toBeDefined()
        })
        it("Canceling payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Konbini",
                amount: "100",
                client_field_1: "@fincode/node test: Canceling Konbini payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Konbini",
                device_name: "iPhone",
                win_width: "375",
                win_height: "812",
                pixel_ratio: "3",
                win_size_type: "1",
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const req: CancelingPaymentRequest = {
                access_id: executingRes.access_id,
                pay_type: "Konbini",
            }
            const res = await fincode.payments.cancel(executingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(executingRes.id)
            expect(res.access_id).toBe(executingRes.access_id)
            expect(res.pay_type).toBe("Konbini")
            expect(res.status).toBe("CANCELED")
        })
        it("Generating barcode image of payment", async () => {
            const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

            const creatingReq: CreatingPaymentRequest = {
                id: `f_node-${generateRandomString(23)}`,
                pay_type: "Konbini",
                amount: "100",
                client_field_1: "@fincode/node test: Generating barcode image of Konbini payment",
            }
            const creatingRes = await fincode.payments.create(creatingReq)

            const executingReq: ExecutingPaymentRequest = {
                access_id: creatingRes.access_id,
                pay_type: "Konbini",
                device_name: "iPhone",
                win_width: "375",
                win_height: "812",
                pixel_ratio: "3",
                win_size_type: "1",
            }
            const executingRes = await fincode.payments.execute(creatingRes.id, executingReq)

            const req: GeneratingKonbiniPaymentBarcodeRequest = {
                pay_type: "Konbini",
                access_id: executingRes.access_id,
                device_name: "iPhone",
                win_width: "376",
                win_height: "812",
                pixel_ratio: "2.4",
                win_size_type: "1",
            }
            const res = await fincode.payments.generateKonbiniPaymentBarcode(executingRes.id, req)

            expect(res.id).toBeDefined()
            expect(res.id).toBe(executingRes.id)
            expect(res.access_id).toBe(executingRes.access_id)
            expect(res.pay_type).toBe("Konbini")
            expect(res.status).toBe("AWAITING_CUSTOMER_PAYMENT")
            expect(res.barcode).toBeDefined()
        })
    })

    describe("PayPay", () => {
        // it("Creating payment", async () => {
        //     const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        //     const req: CreatingPaymentRequest = {
        //         pay_type: "Paypay",
        //         job_code: "CAPTURE",
        //         amount: "100",
        //         tax: "10",
        //     }
        //     const res = await fincode.payments.create(req)

        //     expect(res.id).toBeDefined()
        //     expect(res.access_id).toBeDefined()
        //     expect(res.pay_type).toBe("Paypay")
        //     expect(res.amount).toBe(100)
        //     expect(res.status).toBe("UNPROCESSED")
        // })
        // it("Executing payment", async () => {
        //     const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        //     const creatingReq: CreatingPaymentRequest = {
        //         pay_type: "Paypay",
        //         job_code: "AUTH",
        //         amount: "100",
        //         tax: "10",
        //     }
        //     const creatingRes = await fincode.payments.create(creatingReq)

        //     const req: ExecutingPaymentRequest = {
        //         access_id: creatingRes.access_id,
        //         pay_type: "Paypay",
        //         customer_id: customerId,
        //         redirect_url: "https://fincode.jp",
        //         redirect_type: "1",
        //     }
        //     const res = await fincode.payments.execute(creatingRes.id, req)

        //     expect(res.id).toBeDefined()
        //     expect(res.id).toBe(creatingRes.id)
        //     expect(res.access_id).toBe(creatingRes.access_id)
        //     expect(res.pay_type).toBe("Paypay")
        //     expect(res.amount).toBe(100)
        //     expect(res.status).toBe("AWAITING_CUSTOMER_PAYMENT")
        //     expect(res.code_url).toBeDefined()
        //     expect(res.redirect_url).toBe(req.redirect_url)
        // })
        // it("Capturing payment", async () => {
        //     const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

        //     const orderId = env.FINCODE_ORDER_ID_TESTING_CAPTURING_PAYPAY_PAYMENT
        //     if (!orderId) throw new Error("FINCODE_ORDER_ID_TESTING_CAPTURING_PAYPAY_PAYMENT is not defined")

        //     const payment = await fincode.payments.retrieve(orderId, { pay_type: "Paypay" })
        //     if (payment.status !== "AUTHORIZED") throw new Error("Payment status of FINCODE_ORDER_ID_TESTING_CAPTURING_PAYPAY_PAYMENT is not AUTHORIZED")

        //     const req: CapturingPaymentRequest = {
        //         pay_type: "Paypay",
        //         access_id: payment.access_id,
        //     }
        //     const res = await fincode.payments.capture(payment.id, req)

        //     expect(res.id).toBeDefined()
        //     expect(res.id).toBe(payment.id)
        //     expect(res.access_id).toBe(payment.access_id)
        //     expect(res.pay_type).toBe("Paypay")
        //     expect(res.amount).toBe(100)
        //     expect(res.status).toBe("CAPTURED")
        // })
        // it("Canceling payment", async () => {
        //     const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

        //     const orderId = env.FINCODE_ORDER_ID_TESTING_CANCELING_PAYPAY_PAYMENT
        //     if (!orderId) throw new Error("FINCODE_ORDER_ID_TESTING_CANCELING_PAYPAY_PAYMENT is not defined")

        //     const payment = await fincode.payments.retrieve(orderId, { pay_type: "Paypay" })
        //     if (payment.status !== "AUTHORIZED") throw new Error("Payment status of FINCODE_ORDER_ID_TESTING_CANCELING_PAYPAY_PAYMENT is not AUTHORIZED")

        //     const req: CancelingPaymentRequest = {
        //         pay_type: "Paypay",
        //         access_id: payment.access_id,
        //     }
        //     const res = await fincode.payments.cancel(payment.id, req)

        //     expect(res.id).toBeDefined()
        //     expect(res.id).toBe(payment.id)
        //     expect(res.access_id).toBe(payment.access_id)
        //     expect(res.pay_type).toBe("Paypay")
        //     expect(res.amount).toBe(100)
        //     expect(res.status).toBe("CANCELED")
        // })
        // it("Changing payment amount", async () => {
        //     const fincode = createFincode(secretKey, "test", { proxyAgent: agent })

        //     const orderId = env.FINCODE_ORDER_ID_TESTING_CHANGING_PAYPAY_PAYMENT_AMOUNT
        //     if (!orderId) throw new Error("FINCODE_ORDER_ID_TESTING_CHANGING_PAYPAY_PAYMENT_AMOUNT is not defined")

        //     const payment = await fincode.payments.retrieve(orderId, { pay_type: "Paypay" })
        //     if (payment.status !== "AUTHORIZED") throw new Error("Payment status of FINCODE_ORDER_ID_TESTING_CHANGING_PAYPAY_PAYMENT_AMOUNT is not AUTHORIZED")

        //     const req: ChangingPaymentAmountRequest = {
        //         pay_type: "Paypay",
        //         job_code: "CAPTURE",
        //         access_id: payment.access_id,
        //         amount: `${payment.amount || 100 - 10}`,
        //     }
        //     const res = await fincode.payments.changeAmount(payment.id, req)

        //     expect(res.id).toBeDefined()
        //     expect(res.id).toBe(payment.id)
        //     expect(res.access_id).toBe(payment.access_id)
        //     expect(res.pay_type).toBe("Paypay")
        //     expect(res.amount).toBe(req.amount)
        //     expect(res.status).toBe("CAPTURED")
        // })
    })
})