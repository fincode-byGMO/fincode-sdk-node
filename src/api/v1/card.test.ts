import { CardObject, FincodeError, RegisteringCardRequest, UpdatingCardRequest } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Card API testing", () => {
    const customerId = "fincode-node-customer"
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    const cardToken = "37643132613564643039353439613864333631326565366466643032356535393663333965336465356632656435643836633064636635386434653535333161"
    if (!cardToken) {
        throw new Error("Please provide card token")
    }

    let card: CardObject | undefined
    it("Register card", async () => {
        const req: RegisteringCardRequest = {
            default_flag: "1",
            token: cardToken,
        }

        const res = await fincode.card.register(customerId, req)

        expect(res.id).toBeDefined()
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")

        card = res
    })

    const updatingReqBody: UpdatingCardRequest = {
        default_flag: "1",
        expire: "4409",
        holder_name: "John Doe",
    }
    it("Update card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.update(customerId, card.id, updatingReqBody)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe("1")
        expect(res.expire).toBe("4409")
        expect(res.holder_name).toBe("John Doe")
    })

    it("Retrieve card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.retrieve(customerId, card.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.default_flag).toBe(updatingReqBody.default_flag)
        expect(res.expire).toBe(updatingReqBody.expire)
        expect(res.holder_name).toBe(updatingReqBody.holder_name)
    })

    it("Retrieve card list", async () => {
        const res = await fincode.card.retrieveList(customerId)

        expect(res.list?.length).toBeGreaterThan(0)
        expect(res.list?.length).toBeLessThanOrEqual(5)
    })

    it("Delete card", async () => {
        if (!card) {
            throw new Error("Card is not registered")
        }

        const res = await fincode.card.delete(customerId, card.id)

        expect(res.id).toBeDefined()
        expect(res.id).toBe(card.id)
        expect(res.customer_id).toBe(customerId)
        expect(res.delete_flag).toBe("1")

        try {
            await fincode.card.retrieve(customerId, card.id)
        } catch (e) {
            expect(e).toBeInstanceOf(FincodeError)
            const err = e as FincodeError
            expect(err.errors[0].type).toBe('RESOURCE_NOT_FOUND')
        }
    })
})