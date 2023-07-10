import { HttpsProxyAgent } from "https-proxy-agent"
import {
    RegisteringTenantRequest,
    UpdatingExaminationInfoRequest,
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

const tenantURLId = env.FINCODE_TENANT_INVITATION_URL_ID
if (!tenantURLId) throw new Error("FINCODE_TENANT_INVITATION_URL_ID is not defined")

describe("Tenant API testing", () => {
    const config: FincodeInitConfig = { isTest: true, agent: agent }
    const fincode = createFincode(secretKey, config)

    let tenantShopId: string | undefined

    it("Retrieve tenant list", async () => {
        const res = await fincode.tenant.retrieveList()

        expect(res.list?.length).toBeGreaterThanOrEqual(0)
    })
    it("Register a tenant", async () => {
        const req: RegisteringTenantRequest = {
            email: `test-${Date.now()}@example.com`,
            password: "Na12345678",
            name: "Test Initial User",
            tenant_url_id: tenantURLId
        }

        const res = await fincode.tenant.register(req)
        expect(res.user_data?.default_shop_id).toBeDefined()

        tenantShopId = res.user_data?.default_shop_id
    })
    it("Retrieve a tenant", async () => {
        if (!tenantShopId) {
            throw new Error("tenant is undefined")
        }

        const res = await fincode.tenant.retrieve(tenantShopId)
        expect(res.id).toBe(tenantShopId)
        expect(res.shop_type).toBe("tenant")
    })

    const examReqBody: UpdatingExaminationInfoRequest = {
        update_contract_detail: true,
        contract_detail: {
            corporate: true,
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
            yearly_sales: "100000000",
            capital: "100000000",
            business_details: "test",

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
        }
    }
    it("Update an examination info", async () => {
        if (!tenantShopId) {
            throw new Error("tenant is undefined")
        }

        const res = await fincode.tenant.updateExaminationInfo(tenantShopId, examReqBody)
        expect(res.contract_detail?.corporate).toBeDefined()
        expect(res.contract_detail?.corporate).toBe(examReqBody.contract_detail?.corporate)
        expect(res.contract_detail?.yearly_sales).toBeDefined()
        expect(res.contract_detail?.yearly_sales).toBe(Number(examReqBody.contract_detail?.yearly_sales))
        expect(res.contract_detail?.staff1_first_name).toBeDefined()
        expect(res.contract_detail?.staff1_first_name).toBe(examReqBody.contract_detail?.staff1_first_name)
        expect(res.contract_detail?.staff1_last_name).toBeDefined()
        expect(res.contract_detail?.staff1_last_name).toBe(examReqBody.contract_detail?.staff1_last_name)
    })
    it("Retrieve an examination info", async () => {
        if (!tenantShopId) {
            throw new Error("tenant is undefined")
        }

        const res = await fincode.tenant.retrieveExaminationInfo(tenantShopId)
        expect(res.contract_detail?.corporate).toBeDefined()
        expect(res.contract_detail?.corporate).toBe(examReqBody.contract_detail?.corporate)
        expect(res.contract_detail?.yearly_sales).toBeDefined()
        expect(res.contract_detail?.yearly_sales).toBe(Number(examReqBody.contract_detail?.yearly_sales))
        expect(res.contract_detail?.staff1_first_name).toBeDefined()
        expect(res.contract_detail?.staff1_first_name).toBe(examReqBody.contract_detail?.staff1_first_name)
        expect(res.contract_detail?.staff1_last_name).toBeDefined()
        expect(res.contract_detail?.staff1_last_name).toBe(examReqBody.contract_detail?.staff1_last_name)
    })

    it("Retrieve a contract", async () => {
        if (!tenantShopId) {
            throw new Error("tenant is undefined")
        }

        const res = await fincode.tenant.retrieveContract(tenantShopId)

        expect(res.status_code).toBe(107)
    })
})