import exp from "constants"
import { CreatingPaymentMethodRequest } from "./../../types"
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

describe("Payment Method API testing", () => {

    it("Create a payment method (Card)", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })

        const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD
        if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD is not defined")

        const token = env.FINCODE_CARD_TOKEN_TESTING_CREATING_PAYMENT_METHOD
        if (!token) throw new Error("FINCODE_CARD_TOKEN_TESTING_CREATING_PAYMENT_METHOD is not defined")
        
        const req: CreatingPaymentMethodRequest = {
            pay_type: "Card",
            default_flag: "1",
            card: {
                token: token,
            }
        }
        const res = await fincode.paymentMethods.create( customerId, req )
        expect(res.customer_id).toBe(customerId)
        expect(res.pay_type).toBe("Card")
        expect(res.status).toBe("ACTIVATED")
        expect(res.card).toBeDefined()

        await fincode.cards.delete(customerId, res.id)
    })

    it("Create a payment method (Direct debit)", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })

        const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD
        if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD is not defined")

        const req: CreatingPaymentMethodRequest = {
            pay_type: "Directdebit",
            default_flag: "1",
            directdebit: {
                application_type: "ONLINE",
                bank_code: "0001",
                branch_code: "001",
                account_number: "1234567",
                account_name_kana: "イプタロウ",
                account_type: "1",
            }
        }
        const res = await fincode.paymentMethods.create( customerId, req )
        expect(res.customer_id).toBe(customerId)
        expect(res.pay_type).toBe("Directdebit")
        expect(res.status).toBe("AWAITING_CUSTOMER_ACTION")
        expect(res.directdebit).toBeDefined()

        await fincode.paymentMethods.delete(customerId, res.id)
    })
    it("Retrieve payment method list of a customer", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })

        const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD
        if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD is not defined")

        const res = await fincode.paymentMethods.retrieveList(customerId, { pay_type: "Directdebit" })

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Retrieve a payment method of a customer", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })

        const customerId = env.FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD
        if (!customerId) throw new Error("FINCODE_CUSTOMER_ID_TESTING_PAYMENT_METHOD is not defined")

        const creatingReq: CreatingPaymentMethodRequest = {
            pay_type: "Directdebit",
            default_flag: "1",
            directdebit: {
                application_type: "ONLINE",
                bank_code: "0001",
                branch_code: "001",
                account_number: "1234567",
                account_name_kana: "イプタロウ",
                account_type: "1",
            }
        }
        const paymentMethod = await fincode.paymentMethods.create( customerId, creatingReq )

        const retrieveResult = await fincode.paymentMethods.retrieve(customerId, paymentMethod.id, {pay_type: "Directdebit"})

        expect(retrieveResult.id).toBe(paymentMethod.id)
        expect(retrieveResult.customer_id).toBe(customerId)

        await fincode.paymentMethods.delete(customerId, paymentMethod.id)
    })
})
