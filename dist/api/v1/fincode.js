import { PaymentBulk } from "./bulk.payment.js";
import { Card } from "./card.js";
import { Customer } from "./customer.js";
import { Payment } from "./payment.js";
import { Plan } from "./plan.js";
import { Platform } from "./platform.js";
import { PlatformAccount } from "./platform_account.js";
import { CardRegistrationSession } from "./session.cardRegistration.js";
import { PaymentSession } from "./session.payment.js";
import { Subscription } from "./subscription.js";
import { Tenant } from "./tenant.js";
import { WebhookSetting } from "./webhookSetting.js";
import { Account } from "./account.js";
class Fincode {
    config;
    /**
     * @param apiKey - API key (secret key)
     */
    constructor(initArgs) {
        if (!initArgs.apiKey) {
            throw new Error("API key is required");
        }
        if (typeof initArgs.productionMode !== "boolean") {
            throw new Error("productionMode should be a boolean value");
        }
        const config = {
            productionMode: initArgs.productionMode,
            apiKey: initArgs.apiKey,
            options: initArgs.options ?? {},
        };
        this.config = config;
        this._customers = new Customer(this.config);
        this._cards = new Card(this.config);
        this._payments = new Payment(this.config);
        this._plans = new Plan(this.config);
        this._subscriptions = new Subscription(this.config);
        this._paymentSessions = new PaymentSession(this.config);
        this._cardRegistrationSessions = new CardRegistrationSession(this.config);
        this._paymentBulks = new PaymentBulk(this.config);
        this._platforms = new Platform(this.config);
        this._platformAccounts = new PlatformAccount(this.config);
        this._tenants = new Tenant(this.config);
        this._webhookSettings = new WebhookSetting(this.config);
        this._accounts = new Account(this.config);
    }
    _accounts;
    get accounts() {
        return this._accounts;
    }
    _customers;
    get customers() {
        return this._customers;
    }
    _cards;
    get cards() {
        return this._cards;
    }
    _payments;
    get payments() {
        return this._payments;
    }
    _plans;
    get plans() {
        return this._plans;
    }
    _subscriptions;
    get subscriptions() {
        return this._subscriptions;
    }
    _paymentSessions;
    get paymentSessions() {
        return this._paymentSessions;
    }
    _cardRegistrationSessions;
    get cardRegistrationSessions() {
        return this._cardRegistrationSessions;
    }
    _paymentBulks;
    get paymentBulks() {
        return this._paymentBulks;
    }
    _platforms;
    get platforms() {
        return this._platforms;
    }
    _platformAccounts;
    get platformAccounts() {
        return this._platformAccounts;
    }
    _tenants;
    get tenants() {
        return this._tenants;
    }
    _webhookSettings;
    get webhookSettings() {
        return this._webhookSettings;
    }
}
export { Fincode };
/**
 * create `Fincode` instance
 *
 * @param apiKey - fincode API key (secret key)
 * @param fincodeEnv - fincode environment, `"test"` or `"live"`
 * @param options - fincode options
 */
const createFincode = (initArgs) => {
    const fincode = new Fincode(initArgs);
    return fincode;
};
export { createFincode };
