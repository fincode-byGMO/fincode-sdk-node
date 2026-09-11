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

    it("Sort must be a single comma-separated value", () => {
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

        expect(result).toBe("pay_type=Card&page=2&limit=10&sort=created_at+desc%2Cupdated_at+asc")
    })

    it("A list must be a single comma-separated value", () => {
        const queryParams: RetrievingPaymentListQueryParams = {
            pay_type: "Card",
            status: ["CAPTURED", "CANCELED"],
        }
        const result = buildQueryString(queryParams)

        expect(result).toBe("pay_type=Card&status=CAPTURED%2CCANCELED")
    })

    it("null and undefined must be left out", () => {
        const result = buildQueryString({
            pay_type: "Card",
            page: null,
            limit: undefined,
            keyword: "",
        })
        expect(result).toBe("pay_type=Card&keyword=")
    })

    it("An empty list must be left out", () => {
        const result = buildQueryString({ pay_type: "Card", status: [] })
        expect(result).toBe("pay_type=Card")
    })

    it("A list containing null must drop the null", () => {
        const result = buildQueryString({ pay_type: "Card", status: ["CAPTURED", null] })
        expect(result).toBe("pay_type=Card&status=CAPTURED")
    })

    it("Booleans and numbers must be stringified", () => {
        const result = buildQueryString({ count_only: true, total_amount_min: 0 })
        expect(result).toBe("count_only=true&total_amount_min=0")
    })

    it("A non-object must produce an empty string", () => {
        expect(buildQueryString(null)).toBe("")
        expect(buildQueryString(undefined)).toBe("")
    })

    it("An unexpected object must throw", () => {
        expect(() => buildQueryString({ foo: { bar: 1 } })).toThrow(/Unexpected object in query parameter "foo"/)
    })
})
