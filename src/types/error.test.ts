import { APIErrorType, lookupErrorType } from "./error"

describe("lookupErrorType", () => {
    it("E9994001001: APIキーが指定されていません。 => FINCODE_AUTH_ERROR", () => {
        expect(lookupErrorType("E9994001001")).toBe("FINCODE_AUTH_ERROR")
    })
})