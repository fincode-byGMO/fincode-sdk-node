import { RetrievingPaymentListQueryParams } from "../../types"
import { buildQueryString } from "./http"

describe("Building query string", () => {
    it("Result must be empty string", () => {
        const result = buildQueryString({})
        expect(result).toBe("")
    })
    it("Result must be page=2", () => {
        const result = buildQueryString({ page: 2 })
        expect(result).toBe("page=2")
    })
    it("Result must be pay_type=Card&page=2&limit=10&sort=created_at+desc&sort=updated_at+asc", () => {
        const queryParams: RetrievingPaymentListQueryParams = {
            pay_type: "Card",
            page: 2,
            limit: 10,
            sort: [
                {
                    field: "created_at",
                    order: "desc",
                },
                {
                    field: "updated_at",
                    order: "asc",
                }
            ]
        }
        const result = buildQueryString(queryParams)

        expect(result).toBe("pay_type=Card&page=2&limit=10&sort=created_at+desc&sort=updated_at+asc")
    })
})