export class PlatformAccountSearchParams {
    /**
     * Month the account was fixed at
     */
    processed;
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
    status;
    /**
     * deposit scheduled date
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled;
    /**
     * deposit scheduled date (from)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_from;
    /**
     * deposit scheduled date (to)
     *
     * Format: `yyyy/MM/dd`
     */
    scheduled_to;
    buildParams() {
        const params = new URLSearchParams();
        Object.entries(this)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            return [key, value.toString()];
        })
            .forEach(([key, value]) => params.append(key, value));
        return params;
    }
    constructor(args) {
        if (args) {
            this.processed = args.processed;
            this.status = args.status;
            this.scheduled = args.scheduled;
            this.scheduled_from = args.scheduled_from;
            this.scheduled_to = args.scheduled_to;
        }
    }
}
