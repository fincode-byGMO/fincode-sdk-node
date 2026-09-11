import { createFincode, Fincode } from "./fincode"

const baseUrlOf = (fincode: Fincode) => fincode.config.baseUrl

describe("接続先の決定", () => {
    it("environment で環境を選ぶ", () => {
        expect(baseUrlOf(createFincode({ apiKey: "m_test_x", environment: "test" })))
            .toBe("https://api.test.fincode.jp")
        expect(baseUrlOf(createFincode({ apiKey: "m_prod_x", environment: "prod" })))
            .toBe("https://api.fincode.jp")
    })

    it("environment を省略するとテスト環境になる", () => {
        expect(baseUrlOf(createFincode({ apiKey: "m_test_x" })))
            .toBe("https://api.test.fincode.jp")
    })

    it("environment に想定外の値を渡すと落とす", () => {
        expect(() =>
            createFincode({ apiKey: "m_test_x", environment: "production" as never }),
        ).toThrow(/environment must be "test" or "prod"/)
    })

    describe("isLiveMode（非推奨）", () => {
        it("引き続き使える", () => {
            expect(baseUrlOf(createFincode({ apiKey: "m_prod_x", isLiveMode: true })))
                .toBe("https://api.fincode.jp")
            expect(baseUrlOf(createFincode({ apiKey: "m_test_x", isLiveMode: false })))
                .toBe("https://api.test.fincode.jp")
        })

        it("environment と両方あれば environment が勝つ", () => {
            expect(baseUrlOf(createFincode({
                apiKey: "m_test_x",
                environment: "test",
                isLiveMode: true,
            }))).toBe("https://api.test.fincode.jp")
        })

        it("boolean でなければ落とす", () => {
            expect(() =>
                createFincode({ apiKey: "m_test_x", isLiveMode: "true" as never }),
            ).toThrow("isLiveMode should be a boolean value")
        })
    })

    describe("options.baseUrl", () => {
        it("指定した接続先をそのまま使う", () => {
            expect(baseUrlOf(createFincode({
                apiKey: "m_test_x",
                options: { baseUrl: "https://api.example.com" },
            }))).toBe("https://api.example.com")
        })

        it("末尾のスラッシュを落とす", () => {
            expect(baseUrlOf(createFincode({
                apiKey: "m_test_x",
                options: { baseUrl: "https://api.example.com/" },
            }))).toBe("https://api.example.com")
        })

        it("environment と同時に指定すると落とす", () => {
            // 消し忘れた baseUrl が environment の指す環境を黙って上書きするのを防ぐ
            expect(() =>
                createFincode({
                    apiKey: "m_prod_x",
                    environment: "prod",
                    options: { baseUrl: "https://api.example.com" },
                }),
            ).toThrow(/cannot be combined with environment or isLiveMode/)
        })

        it("isLiveMode と同時に指定しても落とす", () => {
            expect(() =>
                createFincode({
                    apiKey: "m_prod_x",
                    isLiveMode: true,
                    options: { baseUrl: "https://api.example.com" },
                }),
            ).toThrow(/cannot be combined with environment or isLiveMode/)
        })

        it.each([
            ["http://api.example.com", /must use https/],
            ["ftp://api.example.com", /must use https/],
            ["https://user:pw@api.example.com", /must not carry credentials/],
            ["api.example.com", /is not a valid URL/],
        ])("%s は落とす", (baseUrl, message) => {
            expect(() =>
                createFincode({ apiKey: "m_test_x", options: { baseUrl } }),
            ).toThrow(message)
        })
    })
})
