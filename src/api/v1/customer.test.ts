import { CreatingCustomerRequest, FincodeError, UpdatingCustomerRequest } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Customer API testing", () => {

    let customerId = `test-${Date.now().toString()}`
    const config: FincodeInitConfig = { isTest: true }

    const fincode = createFincode(secretKey, config)
    it("create a customer", async () => {
        const reqBody: CreatingCustomerRequest = {
            id: customerId,
        }

        const res = await fincode.customer.create(reqBody)

        expect(res.id).toBe(customerId)
    })

    const updatingReqBody: UpdatingCustomerRequest = {
        name: "Hiroki Nakatani",
        email: "test@email.com",
        phone_cc: "81",
        phone_no: "1234567890",
        addr_country: "392",
        addr_line_1: "1-1-1",
        addr_line_2: "Shinjuku",
        addr_line_3: "Shinjuku-ku",
        addr_post_code: "1234567",
        addr_state: "000",
        addr_city: "Tokyo",
    }
    it("update a customer", async () => {

        const res = await fincode.customer.update(customerId, updatingReqBody)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(updatingReqBody.name)
        expect(res.email).toBe(updatingReqBody.email)
        expect(res.phone_cc).toBe(updatingReqBody.phone_cc)
        expect(res.phone_no).toBe(updatingReqBody.phone_no)
        expect(res.addr_country).toBe(updatingReqBody.addr_country)
        expect(res.addr_line_1).toBe(updatingReqBody.addr_line_1)
        expect(res.addr_line_2).toBe(updatingReqBody.addr_line_2)
        expect(res.addr_line_3).toBe(updatingReqBody.addr_line_3)
        expect(res.addr_post_code).toBe(updatingReqBody.addr_post_code)
        expect(res.addr_state).toBe(updatingReqBody.addr_state)
        expect(res.addr_city).toBe(updatingReqBody.addr_city)
    })
    it("get a customer", async () => {

        const res = await fincode.customer.retrieve(customerId)

        expect(res.id).toBe(customerId)
        expect(res.name).toBe(updatingReqBody.name)
        expect(res.email).toBe(updatingReqBody.email)
        expect(res.phone_cc).toBe(updatingReqBody.phone_cc)
        expect(res.phone_no).toBe(updatingReqBody.phone_no)
        expect(res.addr_country).toBe(updatingReqBody.addr_country)
        expect(res.addr_line_1).toBe(updatingReqBody.addr_line_1)
        expect(res.addr_line_2).toBe(updatingReqBody.addr_line_2)
        expect(res.addr_line_3).toBe(updatingReqBody.addr_line_3)
        expect(res.addr_post_code).toBe(updatingReqBody.addr_post_code)
        expect(res.addr_state).toBe(updatingReqBody.addr_state)
        expect(res.addr_city).toBe(updatingReqBody.addr_city)
    })
    it("delete a customer", async () => {
        const res = await fincode.customer.delete(customerId)
        expect(res.id).toBe(customerId)
        expect(res.delete_flag).toBe("1")
        try {
            await fincode.customer.retrieve(customerId)
        } catch (e) {
            expect(e).toBeInstanceOf(FincodeError)

            const err = e as FincodeError
            expect(err.errors[0].type).toBe('RESOURCE_NOT_FOUND')
        }
    })
})