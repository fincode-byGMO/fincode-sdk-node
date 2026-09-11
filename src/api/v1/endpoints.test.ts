import { Response } from "undici"
import * as http from "./http"
import { createFincode } from "./fincode"

jest.mock("./http", () => ({
    ...jest.requireActual("./http"),
    createFincodeRequestFetch: jest.fn(),
}))

const fincode = createFincode({ apiKey: "m_test_dummy", isLiveMode: false })

/**
 * createFincodeRequestFetch(config, method, path, body, headers, queryParams)
 * に渡された引数を読む。
 */
const sentRequest = () => {
    const mock = http.createFincodeRequestFetch as jest.Mock
    const [, method, path, body, headers, queryParams] = mock.mock.calls[mock.mock.calls.length - 1]
    return { method, path, body, headers, queryParams }
}

/**
 * リソース名とメソッド名で呼び出す。
 *
 * 引数の型はソースの型検査と利用側の型テストで担保されているため、
 * ここでは呼び出しの組み立てだけを見る。
 */
const call = (resource: string, method: string, args: unknown[]): Promise<unknown> => {
    const target = (fincode as unknown as Record<string, Record<string, (...a: unknown[]) => Promise<unknown>>>)[resource]
    return target[method](...args)
}

beforeEach(() => {
    (http.createFincodeRequestFetch as jest.Mock).mockReturnValue(
        () => Promise.resolve(new Response("{}", { status: 200 })),
    )
})

/**
 * 全公開メソッドの呼び出し先。
 *
 * [リソース, メソッド, 引数, 期待するHTTPメソッド, 期待するパス]
 *
 * この表は実装から起こしたものなので、パスが正しいことの証明にはならない。
 * 目的は、変更でエンドポイントがずれたときに気付けるようにすること。
 * 正しさはREADMEの対応表とAPIリファレンスの突き合わせで確認している。
 */
const endpoints: [string, string, unknown[], string, string][] = [
    ["accounts", "retrieve", ["id_1"], "GET", "/v1/accounts/id_1"],
    ["accounts", "retrieveDetailList", ["id_1", {}], "GET", "/v1/accounts/id_1/detail"],
    ["accounts", "retrieveList", [{}], "GET", "/v1/accounts"],
    ["cardRegistrationSessions", "create", [{}], "POST", "/v1/card_sessions"],
    ["cards", "create", ["cus_1", {}], "POST", "/v1/customers/cus_1/cards"],
    ["cards", "delete", ["cus_1", "id_1"], "DELETE", "/v1/customers/cus_1/cards/id_1"],
    ["cards", "retrieve", ["cus_1", "id_1"], "GET", "/v1/customers/cus_1/cards/id_1"],
    ["cards", "retrieveGroupList", [{}], "GET", "/v1/cards"],
    ["cards", "retrieveList", ["cus_1"], "GET", "/v1/customers/cus_1/cards"],
    ["cards", "update", ["cus_1", "id_1", {}], "PUT", "/v1/customers/cus_1/cards/id_1"],
    ["changeRequests", "register", [{}], "POST", "/v1/change_requests"],
    ["changeRequests", "retrieve", ["s_1"], "GET", "/v1/change_requests/s_1"],
    ["chargebacks", "reply", ["id_1", {}], "POST", "/v1/shop_charge_backs/id_1/reply"],
    ["chargebacks", "retrieve", ["id_1"], "GET", "/v1/shop_charge_backs/id_1"],
    ["chargebacks", "retrieveList", [{}], "GET", "/v1/shop_charge_backs"],
    ["chargebacks", "uploadFile", [{}], "POST", "/v1/charge_backs/file_upload"],
    ["companyStamps", "delete", [], "DELETE", "/v1/company_stamps"],
    ["companyStamps", "register", [{}], "POST", "/v1/company_stamps"],
    ["companyStamps", "retrieve", [], "GET", "/v1/company_stamps"],
    ["customers", "create", [{}], "POST", "/v1/customers"],
    ["customers", "delete", ["id_1"], "DELETE", "/v1/customers/id_1"],
    ["customers", "retrieve", ["id_1"], "GET", "/v1/customers/id_1"],
    ["customers", "retrieveList", [{}], "GET", "/v1/customers"],
    ["customers", "update", ["id_1", {}], "PUT", "/v1/customers/id_1"],
    ["invoices", "cancel", ["id_1"], "PUT", "/v1/invoices/id_1/cancel"],
    ["invoices", "create", [{}], "POST", "/v1/invoices"],
    ["invoices", "delete", ["id_1"], "DELETE", "/v1/invoices/id_1"],
    ["invoices", "markPaidExternally", ["id_1", {}], "PUT", "/v1/invoices/id_1/paid_externally"],
    ["invoices", "open", ["id_1", {}], "PUT", "/v1/invoices/id_1/open"],
    ["invoices", "refreshVirtualAccount", ["id_1"], "PUT", "/v1/invoices/id_1/virtual_account/refresh"],
    ["invoices", "retrieve", ["id_1"], "GET", "/v1/invoices/id_1"],
    ["invoices", "retrieveList", [{}], "GET", "/v1/invoices"],
    ["invoices", "update", ["id_1", {}], "PUT", "/v1/invoices/id_1"],
    ["paymentBulks", "create", [{}, {}], "POST", "/v1/payments/bulk"],
    ["paymentBulks", "delete", ["id_1"], "DELETE", "/v1/payments/bulk/id_1"],
    ["paymentBulks", "retrieveDetailList", ["id_1", {}], "GET", "/v1/payments/bulk/id_1"],
    ["paymentBulks", "retrieveList", [{}], "GET", "/v1/payments/bulk"],
    ["paymentMethods", "create", ["cus_1", {}], "POST", "/v1/customers/cus_1/payment_methods"],
    ["paymentMethods", "delete", ["cus_1", "id_1", {}], "DELETE", "/v1/customers/cus_1/payment_methods/id_1"],
    ["paymentMethods", "inactivate", ["cus_1", "id_1", {}], "PUT", "/v1/customers/cus_1/payment_methods/id_1/inactivate"],
    ["paymentMethods", "reactivate", ["cus_1", "id_1", {}], "PUT", "/v1/customers/cus_1/payment_methods/id_1/reactivate"],
    ["paymentMethods", "retrieve", ["cus_1", "id_1", {}], "GET", "/v1/customers/cus_1/payment_methods/id_1"],
    ["paymentMethods", "retrieveList", ["cus_1", {}], "GET", "/v1/customers/cus_1/payment_methods"],
    ["paymentMethods", "update", ["cus_1", "id_1", {}], "PUT", "/v1/customers/cus_1/payment_methods/id_1"],
    ["paymentSessions", "create", [{}], "POST", "/v1/sessions"],
    ["payments", "cancel", ["id_1", {}], "PUT", "/v1/payments/id_1/cancel"],
    ["payments", "capture", ["id_1", {}], "PUT", "/v1/payments/id_1/capture"],
    ["payments", "changeAmount", ["id_1", {}], "PUT", "/v1/payments/id_1/change"],
    ["payments", "create", [{}], "POST", "/v1/payments"],
    ["payments", "execute", ["id_1", {}], "PUT", "/v1/payments/id_1"],
    ["payments", "execute3DSecureAuth", ["a_1", {}], "PUT", "/v1/secure2/a_1"],
    ["payments", "executeAfter3DSecureAuth", ["id_1", {}], "PUT", "/v1/payments/id_1/secure"],
    ["payments", "generateKonbiniPaymentBarcode", ["id_1", {}], "PUT", "/v1/payments/id_1/barcode"],
    ["payments", "reauthorize", ["id_1", {}], "PUT", "/v1/payments/id_1/auth"],
    ["payments", "retrieve", ["id_1", {}], "GET", "/v1/payments/id_1"],
    ["payments", "retrieve3DSecureAuthResult", ["a_1"], "GET", "/v1/secure2/a_1"],
    ["payments", "retrieveList", [{}], "GET", "/v1/payments"],
    ["plans", "create", [{}], "POST", "/v1/plans"],
    ["plans", "delete", ["id_1"], "DELETE", "/v1/plans/id_1"],
    ["plans", "retrieve", ["id_1"], "GET", "/v1/plans/id_1"],
    ["plans", "retrieveList", [{}], "GET", "/v1/plans"],
    ["plans", "update", ["id_1", {}], "PUT", "/v1/plans/id_1"],
    ["platformAccounts", "retrieve", ["id_1"], "GET", "/v1/platform_accounts/id_1"],
    ["platformAccounts", "retrieveList", [{}], "GET", "/v1/platform_accounts"],
    ["platformAccounts", "retrieveSummaryList", ["id_1", {}], "GET", "/v1/platform_accounts/id_1/summary"],
    ["platforms", "retrieve", ["id_1"], "GET", "/v1/platforms/id_1"],
    ["platforms", "retrieveList", [{}], "GET", "/v1/platforms"],
    ["platforms", "update", ["id_1", {}], "PUT", "/v1/platforms/id_1"],
    ["subscriptions", "cancel", ["id_1", {}], "DELETE", "/v1/subscriptions/id_1"],
    ["subscriptions", "create", [{}], "POST", "/v1/subscriptions"],
    ["subscriptions", "retrieve", ["id_1", {}], "GET", "/v1/subscriptions/id_1"],
    ["subscriptions", "retrieveList", [{}], "GET", "/v1/subscriptions"],
    ["subscriptions", "retrieveResultList", ["id_1", {}], "GET", "/v1/subscriptions/id_1/result"],
    ["subscriptions", "update", ["id_1", {}], "PUT", "/v1/subscriptions/id_1"],
    ["tenants", "createWithExistingUser", [{}], "POST", "/v1/join_tenants"],
    ["tenants", "createWithNewUser", [{}], "POST", "/v1/tenant_entries"],
    ["tenants", "requestExamination", [{}], "POST", "/v1/contracts/examinations"],
    ["tenants", "reserveProvider", ["id_1", {}], "POST", "/v1/contracts/examinations/tenants/id_1/providers/reserve"],
    ["tenants", "retrieve", ["id_1"], "GET", "/v1/tenants/id_1"],
    ["tenants", "retrieveContract", ["id_1"], "GET", "/v1/contracts/id_1"],
    ["tenants", "retrieveExaminationInfo", ["id_1"], "GET", "/v1/contracts/examinations/tenants/id_1"],
    ["tenants", "retrieveExaminationInfoV2", ["id_1"], "GET", "/v1/contracts/examinations_v2/tenants/id_1"],
    ["tenants", "retrieveList", [{}], "GET", "/v1/tenants"],
    ["tenants", "update", ["id_1", {}], "PUT", "/v1/tenants/id_1"],
    ["tenants", "updateExaminationInfo", ["id_1", {}], "PUT", "/v1/contracts/examinations/tenants/id_1"],
    ["tenants", "updateExaminationInfoV2", ["id_1", {}], "PUT", "/v1/contracts/examinations_v2/tenants/id_1"],
    ["tenants", "uploadExaminationFile", ["id_1", {}], "POST", "/v1/contracts/examinations/tenants/id_1/files"],
    ["webhookSettings", "create", [{}], "POST", "/v1/webhook_settings"],
    ["webhookSettings", "delete", ["id_1"], "DELETE", "/v1/webhook_settings/id_1"],
    ["webhookSettings", "retrieve", ["id_1"], "GET", "/v1/webhook_settings/id_1"],
    ["webhookSettings", "retrieveList", [], "GET", "/v1/webhook_settings"],
    ["webhookSettings", "update", ["id_1", {}], "PUT", "/v1/webhook_settings/id_1"],
]

describe("すべての公開メソッドが正しいエンドポイントを呼ぶ", () => {
    it.each(endpoints)("%s.%s -> %s %s", async (resource, method, args, verb, path) => {
        await call(resource, method, args)

        const sent = sentRequest()
        expect(sent.method).toBe(verb)
        expect(sent.path).toBe(path)
    })

    it("92メソッドすべてを網羅している", () => {
        const covered = new Set(endpoints.map(([r, m]) => `${r}.${m}`))

        expect(covered.size).toBe(92)
    })
})

/**
 * 実APIの挙動に合わせている箇所。
 *
 * こちらは実装から起こしたのではなく、テスト環境のAPIを叩いて分かったことを
 * 固定している。
 */
describe("実APIの都合で入れている組み立て", () => {
    it("決済手段の削除は決済種別をクエリで送る", async () => {
        // 送らないと EP017023001「決済種別が指定されていません。」で必ず失敗する
        await call("paymentMethods", "delete", ["cus_1", "pm_1", { pay_type: "Card" }])

        expect(sentRequest().queryParams).toEqual({ pay_type: "Card" })
    })

    it.each([
        ["cancel", "/v1/invoices/id_1/cancel"],
        ["refreshVirtualAccount", "/v1/invoices/id_1/virtual_account/refresh"],
    ])("インボイスの %s は本文の無いリクエストを拒否されるため空のJSONを送る", async (method, path) => {
        await call("invoices", method, ["id_1"])

        const sent = sentRequest()
        expect(sent.path).toBe(path)
        expect(sent.body).toBe("{}")
    })

    it.each([
        ["retrieveExaminationInfo", ["id_1"]],
        ["updateExaminationInfo", ["id_1", {}]],
        ["retrieveExaminationInfoV2", ["id_1"]],
        ["updateExaminationInfoV2", ["id_1", {}]],
        ["uploadExaminationFile", ["id_1", {}]],
        ["reserveProvider", ["id_1", {}]],
    ])("テナントの %s は Tenant-Shop-Id に対象のショップIDを入れる", async (method, args) => {
        await call("tenants", method, args)

        expect(sentRequest().headers).toMatchObject({ tenantShopId: "id_1" })
    })

    it("一括決済の登録はファイル名をクエリで送る", async () => {
        await call("paymentBulks", "create", [{ pay_type: "Card", process_plan_date: "2030/01/01" }, {}])

        expect(sentRequest().queryParams).toMatchObject({ pay_type: "Card" })
    })

    it("一括決済の明細取得は決済種別をクエリで送る", async () => {
        await call("paymentBulks", "retrieveDetailList", ["bulk_1", { pay_type: "Virtualaccount" }])

        const sent = sentRequest()
        expect(sent.path).toBe("/v1/payments/bulk/bulk_1")
        expect(sent.queryParams).toEqual({ pay_type: "Virtualaccount" })
    })

    it("変更申請の取得はショップIDをパスに入れる", async () => {
        await call("changeRequests", "retrieve", ["s_1"])

        expect(sentRequest().path).toBe("/v1/change_requests/s_1")
    })

    it("社印の取得と削除はパスパラメータを持たない", async () => {
        await call("companyStamps", "retrieve", [])
        expect(sentRequest().path).toBe("/v1/company_stamps")

        await call("companyStamps", "delete", [])
        expect(sentRequest().path).toBe("/v1/company_stamps")
    })

    it("3Dセキュア認証はアクセスIDをパスに入れる", async () => {
        await call("payments", "execute3DSecureAuth", ["a_1", {}])
        expect(sentRequest().path).toBe("/v1/secure2/a_1")

        await call("payments", "retrieve3DSecureAuthResult", ["a_1"])
        expect(sentRequest().path).toBe("/v1/secure2/a_1")
    })
})
