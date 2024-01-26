import { PaymentBulk } from "./bulk.payment";
import { Card } from "./card";
import { Customer } from "./customer";
import { Payment } from "./payment";
import { Plan } from "./plan";
import { Platform } from "./platform";
import { PlatformAccount } from "./platform_account";
import { CardRegistrationSession } from "./session.cardRegistration";
import { PaymentSession } from "./session.payment";
import { Subscription } from "./subscription";
import { Tenant } from "./tenant";
import { WebhookSetting } from "./webhookSetting";
import { Account } from "./account";
class Fincode {
    config;
    /**
     * @param apiKey - API key (secret key)
     */
    constructor(apiKey, fincodeEnv = "test", initOptions) {
        const config = {
            fincodeEnv: fincodeEnv,
            apiKey: apiKey,
            options: initOptions ?? {}
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
const createFincode = (apiKey, fincodeEnv, options) => {
    const fincode = new Fincode(apiKey, fincodeEnv, options);
    return fincode;
};
export { createFincode };
