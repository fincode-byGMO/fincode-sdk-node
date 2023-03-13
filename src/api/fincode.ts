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
        this.payment = new Payment(config)
    }

    public readonly payment: Payment
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