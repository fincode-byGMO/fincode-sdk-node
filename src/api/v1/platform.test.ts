import { HttpsProxyAgent } from "https-proxy-agent"
import { ShopObject, UpdatingPlatformRequest } from "./../../types"
import { FincodeInitOptions, createFincode } from "./fincode"
import dotenv from "dotenv"
import path from "path"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

const shopId = env.FINCODE_SHOP_ID_KEY_OWNER
if (!shopId) throw new Error("FINCODE_SHOP_ID_KEY_OWNER is not defined")


describe("Platform API testing", () => {

    const options: FincodeInitOptions = {
        proxyAgent: agent,
    }

    const fincode = createFincode(secretKey, true, options)

    let platform: ShopObject | undefined

    it("Retrieve a platform", async () => {
        const res = await fincode.platforms.retrieve(shopId)

        expect(res.id).toBe(shopId)
        expect(res.shop_type).toBe("platform")

        platform = res
    })
    it("Retrieve shop list of platform", async () => {
        if (!platform) {
            throw new Error("platform is undefined")
        }

        const res = await fincode.platforms.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })

    const updatingReqBody: UpdatingPlatformRequest = {
        examination_master_id: "vm",
        platform_rate: `${Math.floor(Math.random() * (50 - 4 + 1) + 4)}`
    }
    it("Update a platform", async () => {
        if (!platform) {
            throw new Error("platform is undefined")
        }

        const res = await fincode.platforms.update(shopId, updatingReqBody)

        expect(res.id).toBe(shopId)
        expect(res.shop_type).toBe("platform")
        res.platform_rate_list?.forEach((item) => {
            if (item.id === "vm") {
                expect(item.platform_rate).toBe(Number(updatingReqBody.platform_rate))
            }
        })
    })
})