import { PlatformDepositStatusCode } from "./platform_account"
import { QueryBuilder } from "./queryBuilder"
export interface SearchParams extends QueryBuilder {
}

export class PlatformAccountSearchParams implements SearchParams {

    /**
     * Month the account was fixed at
     */
    processed?: string | null

    /**
     * deposit status
     * 
     * - `3001`: before deposit amount is confirmed
     * - `3002`: after deposit amount is confirmed
     * - `3003`: already deposited
     * - `3004`: depositing was stopped
     * - `3005`: some errors has occurred during deposit
     * - `3006`: under invoice
     * - `3007`: some errors has occurred during invoice
     * - `3008`: invoice was stopped
     * - `3009`: already invoiced
     * - `3010`: identity verification document is not uploaded
     * - `3011`: deposit has already been completed
     * - `3012`: before deposit
     * - `3013`: contract failed 
     */
    status?: PlatformDepositStatusCode | null

    /**
     * deposit scheduled date
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled?: string | null

    /**
     * deposit scheduled date (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_from?: string | null

    /**
     * deposit scheduled date (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    scheduled_to?: string | null

    buildParams(): URLSearchParams {
        const params = new URLSearchParams()

        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map<[string, string]>(([key, value]) => {
                return [key, value.toString()]
            })
            .forEach(([key, value]) => params.append(key, value))

        return params
    }

    constructor(args?: {
        processed?: string | null
        status?: PlatformDepositStatusCode | null
        scheduled?: string | null
        scheduled_from?: string | null
        scheduled_to?: string | null
    }) {
        if (args) {
            this.processed = args.processed
            this.status = args.status
            this.scheduled = args.scheduled
            this.scheduled_from = args.scheduled_from
            this.scheduled_to = args.scheduled_to
        }
    }
}