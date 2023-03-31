import { } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"
const accountId = "sales_p_22080408940_230331_00001"

describe("Platform account API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    it("Retrieve a platform account", async () => {
        const res = await fincode.platformAccount.retrieve(accountId)

        expect(res.id).toBe(accountId)
        expect(res.status_code).toBeDefined()
    })
    it("Retrieve a platform account list", async () => {
        const res = await fincode.platformAccount.retrieveList()

        expect(res.list?.length).toBeGreaterThan(0)
    })
    it("Retrieve a platform account summary list", async () => {
        const res = await fincode.platformAccount.retrieveSummaryList(accountId)

        expect(res.list?.length).toBeGreaterThan(0)
    })
})