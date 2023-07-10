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
import { Webhook } from "./webhook";
class Fincode {
    config;
    agent;
    constructor(apiKey, isTest = true, version, agent) {
        const config = {
            version,
            isTest,
            apiKey,
        };
        this.config = config;
        this.agent = agent;
    }
    _customer;
    get customer() {
        if (!this._customer) {
            this._customer = new Customer(this.config, this.agent);
        }
        return this._customer;
    }
    _card;
    get card() {
        if (!this._card) {
            this._card = new Card(this.config, this.agent);
        }
        return this._card;
    }
    _payment;
    get payment() {
        if (!this._payment) {
            this._payment = new Payment(this.config, this.agent);
        }
        return this._payment;
    }
    _plan;
    get plan() {
        if (!this._plan) {
            this._plan = new Plan(this.config, this.agent);
        }
        return this._plan;
    }
    _subscription;
    get subscription() {
        if (!this._subscription) {
            this._subscription = new Subscription(this.config, this.agent);
        }
        return this._subscription;
    }
    _paymentSession;
    get paymentSession() {
        if (!this._paymentSession) {
            this._paymentSession = new PaymentSession(this.config, this.agent);
        }
        return this._paymentSession;
    }
    _cardRegistrationSession;
    get cardRegistrationSession() {
        if (!this._cardRegistrationSession) {
            this._cardRegistrationSession = new CardRegistrationSession(this.config, this.agent);
        }
        return this._cardRegistrationSession;
    }
    _paymentBulk;
    get paymentBulk() {
        if (!this._paymentBulk) {
            this._paymentBulk = new PaymentBulk(this.config, this.agent);
        }
        return this._paymentBulk;
    }
    _platform;
    get platform() {
        if (!this._platform) {
            this._platform = new Platform(this.config, this.agent);
        }
        return this._platform;
    }
    _platformAccount;
    get platformAccount() {
        if (!this._platformAccount) {
            this._platformAccount = new PlatformAccount(this.config, this.agent);
        }
        return this._platformAccount;
    }
    _tenant;
    get tenant() {
        if (!this._tenant) {
            this._tenant = new Tenant(this.config, this.agent);
        }
        return this._tenant;
    }
    _webhook;
    get webhook() {
        if (!this._webhook) {
            this._webhook = new Webhook(this.config, this.agent);
        }
        return this._webhook;
    }
}
export { Fincode };
const createFincode = (apiKey, config) => {
    const fincode = new Fincode(apiKey, config?.isTest, config?.version, config?.agent);
    return fincode;
};
export { createFincode };
