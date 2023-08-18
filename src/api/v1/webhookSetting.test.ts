import dotenv from "dotenv"
import { HttpsProxyAgent } from "https-proxy-agent"
import path from "path"
import { FincodeInitOptions, createFincode } from "./fincode"
import { CreatingWebhookSettingRequest, WebhookEvent, UpdatingWebhookSettingRequest, WebhookSettingObject } from "../../types"
import crypto from "crypto"

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

    const fincode = createFincode(secretKey, "test", options)

    let webhookSetting: WebhookSettingObject | undefined


    it("Create a webhook setting", async () => {
        const event: WebhookEvent = "payments.card.exec"
        const url = new URL(webhookReceiverURL)
        const signature = crypto.randomUUID()

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

        webhookSetting = res
    })
    it("Retrieve a webhook setting", async () => {
        if (!webhookSetting) {
            throw new Error("webhookSetting is undefined")
        }

        const res = await fincode.webhookSettings.retrieve(webhookSetting.id)
        expect(res.id).toBe(webhookSetting.id)
        expect(res.url).toBe(webhookSetting.url)
        expect(res.event).toBe(webhookSetting.event)
        expect(res.signature).toBe(webhookSetting.signature)
    })

    it("Retrieve webhook setting list", async () => {
        const res = await fincode.webhookSettings.retrieveList()
        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })

    it("Update a webhook setting", async () => {
        if (!webhookSetting) {
            throw new Error("webhookSetting is undefined")
        }

        const event: WebhookEvent = "subscription.card.update"

        const url = new URL(webhookReceiverURL)
        url.searchParams.append("update", "true")

        const signature = crypto.randomUUID()

        const req: UpdatingWebhookSettingRequest = {
            event: event,
            url: url.href,
            signature: signature,
        }
        const res = await fincode.webhookSettings.update(webhookSetting?.id, req)
        expect(res.id).toBe(webhookSetting.id)
        expect(res.url).toBe(url.href)
        expect(res.event).toBe(req.event)
        expect(res.signature).toBe(signature)
    })

    it("Delete a webhook setting", async () => {
        if (!webhookSetting) {
            throw new Error("webhookSetting is undefined")
        }

        const res = await fincode.webhookSettings.delete(webhookSetting.id)
        expect(res.id).toBe(webhookSetting.id)
    })
})