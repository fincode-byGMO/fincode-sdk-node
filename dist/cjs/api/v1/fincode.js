"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFincode = exports.Fincode = void 0;
const bulk_payment_js_1 = require("./bulk.payment.js");
const card_js_1 = require("./card.js");
const customer_js_1 = require("./customer.js");
const payment_js_1 = require("./payment.js");
const plan_js_1 = require("./plan.js");
const platform_js_1 = require("./platform.js");
const platform_account_js_1 = require("./platform_account.js");
const session_cardRegistration_js_1 = require("./session.cardRegistration.js");
const session_payment_js_1 = require("./session.payment.js");
const subscription_js_1 = require("./subscription.js");
const tenant_js_1 = require("./tenant.js");
const webhookSetting_js_1 = require("./webhookSetting.js");
const account_js_1 = require("./account.js");
class Fincode {
    config;
    /**
     * @param apiKey - API key (secret key)
     */
    constructor(initArgs) {
        if (!initArgs.apiKey) {
            throw new Error("API key is required");
        }
        if (typeof initArgs.isLiveMode !== "boolean") {
            throw new Error("isLiveMode should be a boolean value");
        }
        const config = {
            isLiveMode: initArgs.isLiveMode,
            apiKey: initArgs.apiKey,
            options: initArgs.options ?? {},
        };
        this.config = config;
        this._customers = new customer_js_1.Customer(this.config);
        this._cards = new card_js_1.Card(this.config);
        this._payments = new payment_js_1.Payment(this.config);
        this._plans = new plan_js_1.Plan(this.config);
        this._subscriptions = new subscription_js_1.Subscription(this.config);
        this._paymentSessions = new session_payment_js_1.PaymentSession(this.config);
        this._cardRegistrationSessions = new session_cardRegistration_js_1.CardRegistrationSession(this.config);
        this._paymentBulks = new bulk_payment_js_1.PaymentBulk(this.config);
        this._platforms = new platform_js_1.Platform(this.config);
        this._platformAccounts = new platform_account_js_1.PlatformAccount(this.config);
        this._tenants = new tenant_js_1.Tenant(this.config);
        this._webhookSettings = new webhookSetting_js_1.WebhookSetting(this.config);
        this._accounts = new account_js_1.Account(this.config);
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
 * @param {object} initArgs - initialization arguments
 * @param {string} initArgs.apiKey - fincode API key (secret key)
 * @param {boolean} initArgs.isLiveMode - whether to use the fincode production environment. If `false`, the test environment will be used.
 * @param {object} initArgs.options - fincode options
 */
const createFincode = (initArgs) => {
    const isLiveMode = initArgs.isLiveMode ?? false;
    const fincode = new Fincode({
        ...initArgs,
        isLiveMode: isLiveMode,
    });
    return fincode;
};
exports.createFincode = createFincode;
