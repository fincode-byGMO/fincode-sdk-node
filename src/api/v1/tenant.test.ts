import { HttpsProxyAgent } from "https-proxy-agent"
import {
    CreatingTenantWithExistingUserRequest,
    CreatingTenantWithNewUserRequest,
    UpdatingExaminationInfoRequest_V2,
} from "./../../types"
import { createFincode } from "./fincode.js"
import dotenv from "dotenv"
import path from "path"
import { generateUUIDv4 } from "../../utils/random"

const env = dotenv.config({
    path: path.resolve(__dirname, "./../../../.env.test")
}).parsed
if (!env) throw new Error("dotenv is not defined")

const secretKey = env.FINCODE_API_SECRET_KEY
if (!secretKey) throw new Error("FINCODE_API_SECRET_KEY is not defined")

const proxy = env.FINCODE_HTTP_PROXY
const agent: HttpsProxyAgent<string> | undefined = proxy ? new HttpsProxyAgent(proxy) : undefined

const tenantURLId = env.FINCODE_TENANT_INVITATION_URL_ID
if (!tenantURLId) throw new Error("FINCODE_TENANT_INVITATION_URL_ID is not defined")

const getExamReqBody = (): UpdatingExaminationInfoRequest_V2 => {
    return {
        contract_info: {
            corporate: true,
            corporate_info: {
                corporate_number: "1234567890123",
                corporate_name: "あああ",
                corporate_name_kana: "アアア",
                // hp: "",
                company_prefecture: "福岡県",
                company_prefecture_kana: "フクオカケン",
                company_address_municipality: "福岡市",
                company_address_municipality_kana: "フクオカシ",
                company_address_section: "博多区",
                company_address_section_kana: "ハカタク",
                company_address_chrome: "博多駅前",
                company_address_chrome_kana: "ハカタエキマエ",
                company_address_building_name: "博多ビル",
                company_address_building_name_kana: "ハカタビル",
                company_tel: "05000000000",
                company_postal_code: "000-0000",

                established_at: "2020/01/01",
                yearly_sales: 100000000,
                capital: 100000000,
                business_details: "test",
            },
            representative_first_name: "あああ",
            representative_first_name_kana: "アアア",
            representative_last_name: "あああ",
            representative_last_name_kana: "アアア",
            representative_postal_code: "000-0000",
            representative_prefecture: "あああ",
            representative_prefecture_kana: "アアア",
            representative_address_municipality: "あああ",
            representative_address_municipality_kana: "アアア",
            representative_address_section: "あああ",
            representative_address_section_kana: "アアア",
            representative_address_chrome: "あああ",
            representative_address_chrome_kana: "アアア",
            representative_address_building_name: "あああ",
            representative_address_building_name_kana: "アアア",
            representative_tel: "05000000000",
            representative_birthday: "2020/01/01",
            representative_gender: 1,

            staff1_first_name: "Hiroki",
            staff1_first_name_kana: "ヒロキ",
            staff1_last_name: "Nakatani",
            staff1_last_name_kana: "ナカタニ",
            staff1_company_name: "GMO Epslion",
            staff1_belongs: "Fincode",
            staff1_tel: "05000000000",
            staff1_mail: "test@example.com",
        },
    }
}

describe("Tenant API testing", () => {
    it("Create a tenant (with new user)", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const req: CreatingTenantWithNewUserRequest = {
            email: `${generateUUIDv4()}@example.com`,
            password: "0000NakataniHiroki0000",
            name: "Test Initial User",
            tenant_url_id: tenantURLId
        }

        const res = await fincode.tenants.createWithNewUser(req)
        expect(res.user_data?.default_shop_id).toBeDefined()
    })
    it("Create a tenant (with existing user)", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const req: CreatingTenantWithExistingUserRequest = {
            email: env.FINCODE_TENANT_EXISTING_USER_EMAIL,
            password: env.FINCODE_TENANT_EXISTING_USER_PASSWORD,
            tenant_url_id: tenantURLId
        }

        const res = await fincode.tenants.createWithExistingUser(req)
        expect(res.id).toBeDefined()

    })
    it("Retrieve a tenant", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingTenantWithExistingUserRequest = {
            email: env.FINCODE_TENANT_EXISTING_USER_EMAIL,
            password: env.FINCODE_TENANT_EXISTING_USER_PASSWORD,
            tenant_url_id: tenantURLId
        }

        const creatingRes = await fincode.tenants.createWithExistingUser(creatingReq)

        const res = await fincode.tenants.retrieve(creatingRes.id)
        expect(res.id).toBe(creatingRes.id)
        expect(res.shop_type).toBe("tenant")
    })
    it("Retrieve tenant list", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const res = await fincode.tenants.retrieveList()

        expect(res.list).toBeDefined()
    })
    it("Update an examination info", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingTenantWithExistingUserRequest = {
            email: env.FINCODE_TENANT_EXISTING_USER_EMAIL,
            password: env.FINCODE_TENANT_EXISTING_USER_PASSWORD,
            tenant_url_id: tenantURLId
        }

        const creatingRes = await fincode.tenants.createWithExistingUser(creatingReq)

        const req = getExamReqBody()
        const res = await fincode.tenants.updateExaminationInfoV2(creatingRes.id, req)
        expect(res.contract_info?.corporate).toBeDefined()
        expect(res.contract_info?.corporate).toBe(req.contract_info?.corporate)
        expect(res.contract_info?.corporate_info?.yearly_sales).toBeDefined()
        expect(res.contract_info?.corporate_info?.yearly_sales).toBe(Number(req.contract_info?.corporate_info?.yearly_sales))
        expect(res.contract_info?.staff1_first_name).toBeDefined()
        expect(res.contract_info?.staff1_first_name).toBe(req.contract_info?.staff1_first_name)
        expect(res.contract_info?.staff1_last_name).toBeDefined()
        expect(res.contract_info?.staff1_last_name).toBe(req.contract_info?.staff1_last_name)
    })
    it("Retrieve an examination info", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingTenantWithExistingUserRequest = {
            email: env.FINCODE_TENANT_EXISTING_USER_EMAIL,
            password: env.FINCODE_TENANT_EXISTING_USER_PASSWORD,
            tenant_url_id: tenantURLId
        }

        const creatingRes = await fincode.tenants.createWithExistingUser(creatingReq)

        const updatingReq = getExamReqBody()

        const updatingRes = await fincode.tenants.updateExaminationInfoV2(creatingRes.id, updatingReq)

        const res = await fincode.tenants.retrieveExaminationInfoV2(creatingRes.id)
        expect(res.contract_info?.corporate).toBeDefined()
        expect(res.contract_info?.corporate).toBe(updatingRes.contract_info?.corporate)
        expect(res.contract_info?.corporate_info?.yearly_sales).toBeDefined()
        expect(res.contract_info?.corporate_info?.yearly_sales).toBe(Number(updatingRes.contract_info?.corporate_info?.yearly_sales))
        expect(res.contract_info?.staff1_first_name).toBeDefined()
        expect(res.contract_info?.staff1_first_name).toBe(updatingRes.contract_info?.staff1_first_name)
        expect(res.contract_info?.staff1_last_name).toBeDefined()
        expect(res.contract_info?.staff1_last_name).toBe(updatingRes.contract_info?.staff1_last_name)
    })

    it("Retrieve a contract", async () => {
        const fincode = createFincode(secretKey, "test", { proxyAgent: agent })
        const creatingReq: CreatingTenantWithExistingUserRequest = {
            email: env.FINCODE_TENANT_EXISTING_USER_EMAIL,
            password: env.FINCODE_TENANT_EXISTING_USER_PASSWORD,
            tenant_url_id: tenantURLId
        }

        const creatingRes = await fincode.tenants.createWithExistingUser(creatingReq)

        const res = await fincode.tenants.retrieveContract(creatingRes.id)

        expect(res.status_code).toBe(107)
    })
})