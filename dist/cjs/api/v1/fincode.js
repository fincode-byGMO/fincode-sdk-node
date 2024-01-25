"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFincode = exports.Fincode = void 0;
const bulk_payment_1 = require("./bulk.payment");
const card_1 = require("./card");
const customer_1 = require("./customer");
const payment_1 = require("./payment");
const plan_1 = require("./plan");
const platform_1 = require("./platform");
const platform_account_1 = require("./platform_account");
const session_cardRegistration_1 = require("./session.cardRegistration");
const session_payment_1 = require("./session.payment");
const subscription_1 = require("./subscription");
const tenant_1 = require("./tenant");
const webhookSetting_1 = require("./webhookSetting");
const account_1 = require("./account");
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
        this._customers = new customer_1.Customer(this.config);
        this._cards = new card_1.Card(this.config);
        this._payments = new payment_1.Payment(this.config);
        this._plans = new plan_1.Plan(this.config);
        this._subscriptions = new subscription_1.Subscription(this.config);
        this._paymentSessions = new session_payment_1.PaymentSession(this.config);
        this._cardRegistrationSessions = new session_cardRegistration_1.CardRegistrationSession(this.config);
        this._paymentBulks = new bulk_payment_1.PaymentBulk(this.config);
        this._platforms = new platform_1.Platform(this.config);
        this._platformAccounts = new platform_account_1.PlatformAccount(this.config);
        this._tenants = new tenant_1.Tenant(this.config);
        this._webhookSettings = new webhookSetting_1.WebhookSetting(this.config);
        this._accounts = new account_1.Account(this.config);
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
exports.Fincode = Fincode;
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
exports.createFincode = createFincode;
