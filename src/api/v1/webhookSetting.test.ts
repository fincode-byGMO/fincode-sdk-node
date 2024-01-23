import dotenv from "dotenv"
import { HttpsProxyAgent } from "https-proxy-agent"
import path from "path"
import { FincodeInitOptions, createFincode } from "./fincode"
import { CreatingWebhookSettingRequest, WebhookEvent, UpdatingWebhookSettingRequest } from "../../types"
import { generateUUIDv4 } from "../../utils/random"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

const options: FincodeInitOptions = {
    proxyAgent: agent,
}

const webhookReceiverURL = env.FINCODE_WEBHOOK_RECEIVER_URL_TESTING_WEBHOOK_SETTING
if (!webhookReceiverURL) throw new Error("FINCODE_WEBHOOK_RECEIVER_URL_TESTING_WEBHOOK_SETTING is not defined")

describe("Webhook Setting API testing", () => {



    it("Create a webhook setting", async () => {
        const fincode = createFincode(secretKey, "test", options)

        const event: WebhookEvent = "payments.card.exec"
        const url = new URL(webhookReceiverURL)
        const signature = generateUUIDv4()

        const req: CreatingWebhookSettingRequest = {
            url: url.href,
            event: event,
            signature: signature,
        }
        const res = await fincode.webhookSettings.create(req)
        expect(res.id).toBeDefined()
        expect(res.url).toBe(webhookReceiverURL)
        expect(res.event).toBe(req.event)
        expect(res.signature).toBe(signature)

        await fincode.webhookSettings.delete(res.id)
    })
    it("Retrieve a webhook setting", async () => {
        const fincode = createFincode(secretKey, "test", options)
        const creatingReq: CreatingWebhookSettingRequest = {
            url: (new URL(webhookReceiverURL)).href,
            event: "payments.card.exec",
            signature: generateUUIDv4(),
        }
        const creatingRes = await fincode.webhookSettings.create(creatingReq)

        const res = await fincode.webhookSettings.retrieve(creatingRes.id)
        expect(res.id).toBe(creatingRes.id)
        expect(res.url).toBe(creatingRes.url)
        expect(res.event).toBe(creatingRes.event)
        expect(res.signature).toBe(creatingRes.signature)

        await fincode.webhookSettings.delete(res.id)
    })

    it("Retrieve webhook setting list", async () => {
        const fincode = createFincode(secretKey, "test", options)
        const res = await fincode.webhookSettings.retrieveList()

        expect(res.list).toBeDefined()
    })

    it("Update a webhook setting", async () => {
        const fincode = createFincode(secretKey, "test", options)
        const creatingReq: CreatingWebhookSettingRequest = {
            url: (new URL(webhookReceiverURL)).href,
            event: "payments.card.exec",
            signature: generateUUIDv4(),
        }
        const creatingRes = await fincode.webhookSettings.create(creatingReq)

        const url = new URL(webhookReceiverURL)
        url.searchParams.append("update", "true")

        const req: UpdatingWebhookSettingRequest = {
            event: "subscription.card.update",
            url: url.href,
            signature: generateUUIDv4(),
        }
        const res = await fincode.webhookSettings.update(creatingRes.id, req)
        expect(res.id).toBe(creatingRes.id)
        expect(res.url).toBe(url.href)
        expect(res.event).toBe(req.event)
        expect(res.signature).toBe(req.signature)

        await fincode.webhookSettings.delete(res.id)
    })

    it("Delete a webhook setting", async () => {
        const fincode = createFincode(secretKey, "test", options)
        const creatingReq: CreatingWebhookSettingRequest = {
            url: (new URL(webhookReceiverURL)).href,
            event: "payments.card.exec",
            signature: generateUUIDv4(),
        }
        const creatingRes = await fincode.webhookSettings.create(creatingReq)

        const res = await fincode.webhookSettings.delete(creatingRes.id)
        expect(res.id).toBe(creatingRes.id)
        expect(res.delete_flag).toBe("1")

    })
})