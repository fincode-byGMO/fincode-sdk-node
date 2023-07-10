import { HttpsProxyAgent } from "https-proxy-agent"
import {
    CardRegistrationSessionObject,
    CreatingCardRegistrationSessionRequest,
} from "./../../types"
import { FincodeInitConfig, createFincode } from "./fincode"
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

describe("Card-Registration Session API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
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