import { Card } from "./card.js"
import { Customer } from "./customer.js"
// import { BulkPayment } from "./bulk.payment"
// import { Payment } from "./payment"
// import { Plan } from "./plan"
// import { CardRegistrationSession } from "./session.cardRegistration"
// import { PaymentSession } from "./session.payment"
// import { Subscription } from "./subscription"

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


    private _customer?: Customer
    get customer(): Customer {
        if (!this._customer) { this._customer = new Customer(this.config) }
        return this._customer
    }

    private _card?: Card
    get card(): Card {
        if (!this._card) { this._card = new Card(this.config) }
        return this._card
    }

    // private _payment?: Payment
    // get payment(): Payment {
    //     if (!this._payment) { this._payment = new Payment(this.config) }
    //     return this._payment
    // }

    // private _plan?: Plan
    // get plan(): Plan {
    //     if (!this._plan) { this._plan = new Plan(this.config) }
    //     return this._plan
    // }

    // private _subscription?: Subscription
    // get subscription(): Subscription {
    //     if (!this._subscription) { this._subscription = new Subscription(this.config) }
    //     return this._subscription
    // }

    // private _paymentSession?: PaymentSession
    // get paymentSession(): PaymentSession {
    //     if (!this._paymentSession) { this._paymentSession = new PaymentSession(this.config) }
    //     return this._paymentSession
    // }

    // private _cardRegistrationSession?: CardRegistrationSession
    // get cardRegistrationSession(): CardRegistrationSession {
    //     if (!this._cardRegistrationSession) { this._cardRegistrationSession = new CardRegistrationSession(this.config) }
    //     return this._cardRegistrationSession
    // }

    // private _bulkPayment?: BulkPayment
    // get bulkPayment(): BulkPayment {
    //     if (!this._bulkPayment) { this._bulkPayment = new BulkPayment(this.config) }
    //     return this._bulkPayment
    // }
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