import { createFincode } from "./fincode.js"
import dotenv from "dotenv"
import path from "path"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY

const accountId = env.FINCODE_PLATFORM_ACCOUNT_ID_TESTING_PLATFORM_ACCOUNT
if (!accountId) throw new Error("FINCODE_PLATFORM_ACCOUNT_ID_TESTING_PLATFORM_ACCOUNT is not defined")

describe("Platform account API testing", () => {

    it("Retrieve a platform account", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })
        const res = await fincode.platformAccounts.retrieve(accountId)

        expect(res.id).toBe(accountId)
        expect(res.status_code).toBeDefined()
    })
    it("Retrieve a platform account list", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })
        const res = await fincode.platformAccounts.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Retrieve a platform account summary list", async () => {
        const fincode = createFincode({
            apiKey: secretKey,
            isLiveMode: false,
            options: { proxyAgent: proxy }
        })
        const res = await fincode.platformAccounts.retrieveSummaryList(accountId)

        expect(res.list).toBeDefined()
    })
})