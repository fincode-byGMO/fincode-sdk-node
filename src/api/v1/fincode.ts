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
import { WebhookSetting } from "./webhookSetting"
import { Account } from "./account"


/**
 * @typedef {Object} FincodeInitOptions
 * @property {string} version - Fincode API version
 * @property {RequestInit["agent"]} proxyAgent - Proxy agent for Fincode API requests
 * @property {number} timeout - Timeout for Fincode API requests
 */
export type FincodeInitOptions = {
    version?: string
    proxyAgent?: RequestInit["agent"]
    timeout?: number
}

/**
 * @typedef {Object} FincodeConfig
 * @property {boolean} isTest - Whether to use the fincode test environment
 * @property {string} apiKey - API key (secret key)
 * @property {FincodeInitOptions} options - Fincode initialization options
 */
type FincodeConfig = {
    fincodeEnv: FincodeEnvironment
    apiKey: string
    options: FincodeInitOptions
}

type FincodeEnvironment = "test" | "live"

class Fincode {
    public readonly config: FincodeConfig

    /**
     * @param apiKey - API key (secret key)
     */
    constructor(apiKey: string, fincodeEnv: FincodeEnvironment = "test", initOptions?: FincodeInitOptions) {
        const config = {
            fincodeEnv: fincodeEnv,
            apiKey: apiKey,
            options: initOptions ?? {}
        }
        this.config = config

        this._customers = new Customer(this.config)
        this._cards = new Card(this.config)
        this._payments = new Payment(this.config)
        this._plans = new Plan(this.config)
        this._subscriptions = new Subscription(this.config)
        this._paymentSessions = new PaymentSession(this.config)
        this._cardRegistrationSessions = new CardRegistrationSession(this.config)
        this._paymentBulks = new PaymentBulk(this.config)
        this._platforms = new Platform(this.config)
        this._platformAccounts = new PlatformAccount(this.config)
        this._tenants = new Tenant(this.config)
        this._webhookSettings = new WebhookSetting(this.config)
        this._accounts = new Account(this.config)
    }

    private _accounts: Account
    get accounts(): Account {
        return this._accounts
    }

    private _customers: Customer
    get customers(): Customer {
        return this._customers
    }

    private _cards: Card
    get cards(): Card {
        return this._cards
    }

    private _payments: Payment
    get payments(): Payment {
        return this._payments
    }

    private _plans: Plan
    get plans(): Plan {
        return this._plans
    }

    private _subscriptions: Subscription
    get subscriptions(): Subscription {
        return this._subscriptions
    }

    private _paymentSessions: PaymentSession
    get paymentSessions(): PaymentSession {
        return this._paymentSessions
    }

    private _cardRegistrationSessions: CardRegistrationSession
    get cardRegistrationSessions(): CardRegistrationSession {
        return this._cardRegistrationSessions
    }

    private _paymentBulks: PaymentBulk
    get paymentBulks(): PaymentBulk {
        return this._paymentBulks
    }

    private _platforms: Platform
    get platforms(): Platform {
        return this._platforms
    }

    private _platformAccounts: PlatformAccount
    get platformAccounts(): PlatformAccount {
        return this._platformAccounts
    }

    private _tenants: Tenant
    get tenants(): Tenant {
        return this._tenants
    }

    private _webhookSettings: WebhookSetting
    get webhookSettings(): WebhookSetting {
        return this._webhookSettings
    }
}
export { Fincode, FincodeConfig }

/**
 * create `Fincode` instance
 * 
 * @param apiKey - fincode API key (secret key)
 * @param fincodeEnv - fincode environment, `"test"` or `"live"`
 * @param options - fincode options
 */
const createFincode = (apiKey: string, fincodeEnv: FincodeEnvironment, options: FincodeInitOptions): Fincode => {
    const fincode = new Fincode(apiKey, fincodeEnv, options)
    return fincode
}
export { createFincode }