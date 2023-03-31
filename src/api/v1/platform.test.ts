import { ShopObject, UpdatingPlatformRequest } from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"
const shopId = "s_22080402900"

describe("Platform API testing", () => {
    const config: FincodeInitConfig = { isTest: true }
    const fincode = createFincode(secretKey, config)

    let platform: ShopObject | undefined

    it("Retrieve a platform", async () => {
        const res = await fincode.platform.retrieve(shopId)

        expect(res.id).toBe(shopId)
        expect(res.shop_type).toBe("platform")

        platform = res
    })
    it("Retrieve shop list of platform", async () => {
        if (!platform) {
            throw new Error("platform is undefined")
        }

        const res = await fincode.platform.retrieveList()

        expect(res.list?.length).toBeGreaterThan(0)
    })

    const updatingReqBody: UpdatingPlatformRequest = {
        examination_master_id: "vm",
        platform_rate: `${Math.floor(Math.random() * (50 - 4 + 1) + 4)}`
    }
    it("Update a platform", async () => {
        if (!platform) {
            throw new Error("platform is undefined")
        }

        const res = await fincode.platform.update(shopId, updatingReqBody)

        expect(res.id).toBe(shopId)
        expect(res.shop_type).toBe("platform")
        res.platform_rate_list?.forEach((item) => {
            if (item.id === "vm") {
                expect(item.platform_rate).toBe(Number(updatingReqBody.platform_rate))
            }
        })
    })
})