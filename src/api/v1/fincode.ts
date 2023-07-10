import { RequestInit } from "node-fetch"

import { PaymentBulk } from "./bulk.payment"
import { Card } from "./card"
import { Customer } from "./customer"
import { Payment } from "./payment"
import { Plan } from "./plan"
import { Platform } from "./platform"
import { PlatformAccount } from "./platform_account"
import { CardRegistrationSession } from "./session.cardRegistration"
import { PaymentSession } from "./session.payment"
import { Subscription } from "./subscription"
import { Tenant } from "./tenant"
import { Webhook } from "./webhook"

type FincodeConfig = {
    version: string | undefined
    isTest: boolean
    apiKey: string
}

class Fincode {
    public readonly config: FincodeConfig
    public readonly agent?: RequestInit["agent"]

    constructor(apiKey: string, isTest: boolean = true, version?: string, agent?: RequestInit["agent"]) {
        const config = {
            version,
            isTest,
            apiKey,
        }

        this.config = config
        this.agent = agent
    }


    private _customer?: Customer
    get customer(): Customer {
        if (!this._customer) { this._customer = new Customer(this.config, this.agent) }
        return this._customer
    }

    private _card?: Card
    get card(): Card {
        if (!this._card) { this._card = new Card(this.config, this.agent) }
        return this._card
    }

    private _payment?: Payment
    get payment(): Payment {
        if (!this._payment) { this._payment = new Payment(this.config, this.agent) }
        return this._payment
    }

    private _plan?: Plan
    get plan(): Plan {
        if (!this._plan) { this._plan = new Plan(this.config, this.agent) }
        return this._plan
    }

    private _subscription?: Subscription
    get subscription(): Subscription {
        if (!this._subscription) { this._subscription = new Subscription(this.config, this.agent) }
        return this._subscription
    }

    private _paymentSession?: PaymentSession
    get paymentSession(): PaymentSession {
        if (!this._paymentSession) { this._paymentSession = new PaymentSession(this.config, this.agent) }
        return this._paymentSession
    }

    private _cardRegistrationSession?: CardRegistrationSession
    get cardRegistrationSession(): CardRegistrationSession {
        if (!this._cardRegistrationSession) { this._cardRegistrationSession = new CardRegistrationSession(this.config, this.agent) }
        return this._cardRegistrationSession
    }

    private _paymentBulk?: PaymentBulk
    get paymentBulk(): PaymentBulk {
        if (!this._paymentBulk) { this._paymentBulk = new PaymentBulk(this.config, this.agent) }
        return this._paymentBulk
    }

    private _platform?: Platform
    get platform(): Platform {
        if (!this._platform) { this._platform = new Platform(this.config, this.agent) }
        return this._platform
    }

    private _platformAccount?: PlatformAccount
    get platformAccount(): PlatformAccount {
        if (!this._platformAccount) { this._platformAccount = new PlatformAccount(this.config, this.agent) }
        return this._platformAccount
    }

    private _tenant?: Tenant
    get tenant(): Tenant {
        if (!this._tenant) { this._tenant = new Tenant(this.config, this.agent) }
        return this._tenant
    }

    private _webhook?: Webhook
    get webhook(): Webhook {
        if (!this._webhook) { this._webhook = new Webhook(this.config, this.agent) }
        return this._webhook
    }
}
export { Fincode, FincodeConfig }

type FincodeInitConfig = {
    isTest?: boolean
    version?: string
    agent?: RequestInit["agent"]
}
export type { FincodeInitConfig }

const createFincode = (apiKey: string, config?: FincodeInitConfig): Fincode => {
    const fincode = new Fincode(apiKey, config?.isTest, config?.version, config?.agent)
    return fincode
}
export { createFincode }