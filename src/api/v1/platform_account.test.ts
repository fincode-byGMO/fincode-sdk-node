import { HttpsProxyAgent } from "https-proxy-agent"
import { } from "./../../types"
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

const accountId = env.FINCODE_PLATFORM_ACCOUNT_ID_TESTING_PLATFORM_ACCOUNT
if (!accountId) throw new Error("FINCODE_PLATFORM_ACCOUNT_ID_TESTING_PLATFORM_ACCOUNT is not defined")

describe("Platform account API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
    const fincode = createFincode(secretKey, config)

    it("Retrieve a platform account", async () => {
        const res = await fincode.platformAccount.retrieve(accountId)

        expect(res.id).toBe(accountId)
        expect(res.status_code).toBeDefined()
    })
    it("Retrieve a platform account list", async () => {
        const res = await fincode.platformAccount.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Retrieve a platform account summary list", async () => {
        const res = await fincode.platformAccount.retrieveSummaryList(accountId)

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
})