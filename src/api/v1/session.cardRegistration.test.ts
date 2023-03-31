import {
    CreatingPaymentSessionRequest,
    CardRegistrationSessionObject,
    CreatingCardRegistrationSessionRequest,
} from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

describe("Card-Registration Session API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    let session: CardRegistrationSessionObject | undefined

    it("Create card-registration session", async () => {

        const current = new Date()
        const expire = new Date(current.getTime() + 60 * 60 * 1000) // + 1 hour
        const expireYear = expire.getFullYear()
        const expireMonth = String(expire.getMonth() + 1).padStart(2, "0")
        const expireDate = String(expire.getDate()).padStart(2, "0")
        const expireHour = String(expire.getHours()).padStart(2, "0")
        const expireMinute = String(expire.getMinutes()).padStart(2, "0")
        const expireSecond = String(expire.getSeconds()).padStart(2, "0")
        const expireStr = `${expireYear}/${expireMonth}/${expireDate} ${expireHour}:${expireMinute}:${expireSecond}`

        const reqBody: CreatingCardRegistrationSessionRequest = {
            expire: expireStr,
            shop_service_name: "fincode Node.js",
        }

        const res = await fincode.cardRegistrationSession.create(reqBody)

        expect(res.id).toBeDefined()
        expect(res.expire).toBe(`${reqBody.expire}.000`)
        expect(res.shop_service_name).toBe(reqBody.shop_service_name)
        expect(res.link_url).toBeDefined()

        session = res
    })
})