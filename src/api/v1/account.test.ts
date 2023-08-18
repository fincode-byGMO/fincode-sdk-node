import { HttpsProxyAgent } from "https-proxy-agent"
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

const accountId = env.FINCODE_ACCOUNT_ID_TESTING_ACCOUNT
if (!accountId) throw new Error("FINCODE_ACCOUNT_ID_TESTING_ACCOUNT is not defined")

describe("Account API testing", () => {

    const options: FincodeInitOptions = {
        proxyAgent: agent,
    }

    const fincode = createFincode(secretKey, true, options)

    it("Retrieve a Account", async () => {
        const res = await fincode.accounts.retrieve(accountId)

        expect(res.id).toBe(accountId)
        expect(res.status_code).toBeDefined()
    })
    it("Retrieve a Account list", async () => {
        const res = await fincode.accounts.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Retrieve a Account detail list", async () => {
        const res = await fincode.accounts.retrieveDetailList(accountId)
        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
})