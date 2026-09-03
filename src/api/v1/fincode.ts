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
import { PaymentMethod } from "./paymentMethod";

/**
 * @typedef {object} FincodeInitOptions
 * @property {string} version - Fincode API version
 * @property {string | URL} proxyAgent - Proxy to send Fincode API requests through.
 * @property {number} timeout - Timeout for Fincode API requests
 */
export type FincodeInitOptions = {
    version?: string;

    /**
     * Proxy to send requests through.
     * 
     * When this is not set, the proxy is taken from the `HTTP_PROXY`,
     * `HTTPS_PROXY` and `NO_PROXY` environment variables. With none of those
     * set the requests go out directly.
     */
    proxyAgent?: string | URL;

    /**
     * Request timeout in milliseconds. Defaults to 60000.
     * 
     * Pass `0` to wait indefinitely.
     */
    timeout?: number;
};

/**
 * Configuration shared by every resource of a `Fincode` instance.
 * 
 * The API key is held behind `getApiKey` rather than as a plain property. A
 * string property would appear in `JSON.stringify(fincode)` and in
 * `console.log(fincode)`, which is how secret keys reach log aggregators by
 * accident.
 */
type FincodeConfig = {
    isLiveMode: boolean;

    /**
     * Returns the secret API key.
     */
    getApiKey: () => string;

    options: FincodeInitOptions;
};


class Fincode {
    public readonly config: FincodeConfig;

    /**
     * @param apiKey - API key (secret key)
     */
    constructor(initArgs: {
        apiKey: string;
        isLiveMode: boolean;
        options?: FincodeInitOptions;
    }) {

        if (!initArgs.apiKey) {
            throw new Error("API key is required");
        }
        if (typeof initArgs.isLiveMode !== "boolean") {
            throw new Error("isLiveMode should be a boolean value");
        }

        const apiKey = initArgs.apiKey;
        const config: FincodeConfig = {
            isLiveMode: initArgs.isLiveMode,
            getApiKey: () => apiKey,
            options: initArgs.options ?? {},
        };
        this.config = config;

        this._customers = new Customer(this.config);
        this._cards = new Card(this.config);
        this._payments = new Payment(this.config);
        this._plans = new Plan(this.config);
        this._subscriptions = new Subscription(this.config);
        this._paymentSessions = new PaymentSession(this.config);
        this._cardRegistrationSessions = new CardRegistrationSession(
            this.config
        );
        this._paymentBulks = new PaymentBulk(this.config);
        this._platforms = new Platform(this.config);
        this._platformAccounts = new PlatformAccount(this.config);
        this._tenants = new Tenant(this.config);
        this._webhookSettings = new WebhookSetting(this.config);
        this._accounts = new Account(this.config);
        this._paymentMethods = new PaymentMethod(this.config);
    }

    private _accounts: Account;
    get accounts(): Account {
        return this._accounts;
    }

    private _customers: Customer;
    get customers(): Customer {
        return this._customers;
    }

    private _cards: Card;
    get cards(): Card {
        return this._cards;
    }

    private _payments: Payment;
    get payments(): Payment {
        return this._payments;
    }

    private _plans: Plan;
    get plans(): Plan {
        return this._plans;
    }

    private _subscriptions: Subscription;
    get subscriptions(): Subscription {
        return this._subscriptions;
    }

    private _paymentSessions: PaymentSession;
    get paymentSessions(): PaymentSession {
        return this._paymentSessions;
    }

    private _cardRegistrationSessions: CardRegistrationSession;
    get cardRegistrationSessions(): CardRegistrationSession {
        return this._cardRegistrationSessions;
    }

    private _paymentBulks: PaymentBulk;
    get paymentBulks(): PaymentBulk {
        return this._paymentBulks;
    }

    private _platforms: Platform;
    get platforms(): Platform {
        return this._platforms;
    }

    private _platformAccounts: PlatformAccount;
    get platformAccounts(): PlatformAccount {
        return this._platformAccounts;
    }

    private _tenants: Tenant;
    get tenants(): Tenant {
        return this._tenants;
    }

    private _webhookSettings: WebhookSetting;
    get webhookSettings(): WebhookSetting {
        return this._webhookSettings;
    }

    private _paymentMethods: PaymentMethod;
    get paymentMethods(): PaymentMethod {
        return this._paymentMethods;
    }
}
export { Fincode, FincodeConfig };

/**
 * create `Fincode` instance
 *
 * @param {object} initArgs - initialization arguments
 * @param {string} initArgs.apiKey - fincode API key (secret key)
 * @param {boolean} initArgs.isLiveMode - whether to use the fincode production environment. If `false`, the test environment will be used.
 * @param {object} initArgs.options - fincode options
 */
const createFincode = (
    initArgs: {
        apiKey: string;
        isLiveMode?: boolean;
        options?: FincodeInitOptions;
    }
): Fincode => {
    const isLiveMode = initArgs.isLiveMode ?? false;

    const fincode = new Fincode({
        ...initArgs,
        isLiveMode: isLiveMode,
    });
    return fincode;
};
export { createFincode };
