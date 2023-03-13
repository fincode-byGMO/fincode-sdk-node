import { Customer } from "./customer"
import { Payment } from "./payment"

type FincodeConfig = {
    version: string | undefined
    isTest: boolean
    apiKey: string
}

class Fincode {
    public readonly config: FincodeConfig

    constructor(apiKey: string, isTest: boolean = true, version?: string) {
        const config = {
            version,
            isTest,
            apiKey,
        }

        this.config = config
    }

    private _payment?: Payment
    get payment(): Payment {
        if (!this._payment) { this._payment = new Payment(this.config) }
        return this._payment
    }

    private _customer?: Customer
    get customer(): Customer {
        if (!this._customer) { this._customer = new Customer(this.config) }
        return this._customer
    }
}
export { Fincode, FincodeConfig }

type FincodeInitConfig = {
    isTest?: boolean
    version?: string
}
export type { FincodeInitConfig }

const createFincode = (apiKey: string, config?: FincodeInitConfig): Fincode => {
    const fincode = new Fincode(apiKey, config?.isTest, config?.version)
    return fincode
}
export { createFincode }