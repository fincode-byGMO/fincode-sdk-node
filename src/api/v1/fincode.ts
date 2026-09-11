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
import { ChangeRequest } from "./changeRequest"
import { CompanyStamp } from "./companyStamp"
import { Chargeback } from "./chargeback"
import { Invoice } from "./invoice"
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

    /**
     * Full URL to send API requests to, in place of the fincode environment.
     *
     * Set this to point the SDK somewhere else, such as a mock server used
     * in tests. Only `https` is accepted, and the URL must not carry
     * credentials.
     *
     * This replaces the endpoint entirely, so `environment` and `isLiveMode`
     * cannot be set alongside it.
     *
     * e.g. `https://api.example.com`
     */
    baseUrl?: string;
};

/**
 * fincode environment to send API requests to.
 *
 * - `test`: the test environment, matching a `m_test_` secret key.
 * - `prod`: the production environment, matching a `m_prod_` secret key.
 */
export type FincodeEnvironment = "test" | "prod";

/**
 * Configuration shared by every resource of a `Fincode` instance.
 * 
 * The API key is held behind `getApiKey` rather than as a plain property. A
 * string property would appear in `JSON.stringify(fincode)` and in
 * `console.log(fincode)`, which is how secret keys reach log aggregators by
 * accident.
 */
type FincodeConfig = {
    /**
     * Resolved base URL of the API, without a trailing slash.
     */
    baseUrl: string;

    /**
     * Returns the secret API key.
     */
    getApiKey: () => string;

    options: FincodeInitOptions;
};


const BASE_URL_BY_ENVIRONMENT: Record<FincodeEnvironment, string> = {
    test: "https://api.test.fincode.jp",
    prod: "https://api.fincode.jp",
};

/**
 * Checks a URL given through `options.baseUrl`.
 *
 * The API key travels in the `Authorization` header of every request, so the
 * endpoint decides who receives it. A URL that is not `https`, or that
 * carries credentials of its own, is refused here rather than at send time.
 */
const validateBaseUrl = (baseUrl: string): string => {
    let url: URL;
    try {
        url = new URL(baseUrl);
    } catch {
        throw new Error(`options.baseUrl is not a valid URL: ${baseUrl}`);
    }
    if (url.protocol !== "https:") {
        throw new Error(`options.baseUrl must use https: ${baseUrl}`);
    }
    if (url.username || url.password) {
        throw new Error("options.baseUrl must not carry credentials");
    }
    return baseUrl.replace(/\/+$/, "");
};

/**
 * Works out which endpoint to send requests to.
 *
 * `options.baseUrl` replaces the endpoint outright, so pairing it with an
 * environment is refused: a stale `baseUrl` left beside `environment: "prod"`
 * would otherwise redirect production traffic silently.
 */
const resolveBaseUrl = (initArgs: {
    environment?: FincodeEnvironment;
    isLiveMode?: boolean;
    options?: FincodeInitOptions;
}): string => {
    const baseUrl = initArgs.options?.baseUrl;
    const hasEnvironment = initArgs.environment !== undefined;
    const hasLiveMode = initArgs.isLiveMode !== undefined;

    if (baseUrl !== undefined) {
        if (hasEnvironment || hasLiveMode) {
            throw new Error(
                "options.baseUrl cannot be combined with environment or isLiveMode. " +
                "Drop the environment when the endpoint is given as a URL.",
            );
        }
        return validateBaseUrl(baseUrl);
    }

    if (hasEnvironment) {
        const resolved = BASE_URL_BY_ENVIRONMENT[initArgs.environment as FincodeEnvironment];
        if (!resolved) {
            throw new Error(
                `environment must be "test" or "prod", got: ${String(initArgs.environment)}`,
            );
        }
        return resolved;
    }

    return initArgs.isLiveMode ? BASE_URL_BY_ENVIRONMENT.prod : BASE_URL_BY_ENVIRONMENT.test;
};

class Fincode {
    public readonly config: FincodeConfig;

    /**
     * @param apiKey - API key (secret key)
     */
    constructor(initArgs: {
        apiKey: string;
        environment?: FincodeEnvironment;
        /**
         * @deprecated Use `environment` instead. `true` selects `prod`,
         * `false` selects `test`.
         */
        isLiveMode?: boolean;
        options?: FincodeInitOptions;
    }) {

        if (!initArgs.apiKey) {
            throw new Error("API key is required");
        }
        if (initArgs.isLiveMode !== undefined && typeof initArgs.isLiveMode !== "boolean") {
            throw new Error("isLiveMode should be a boolean value");
        }

        const apiKey = initArgs.apiKey;
        const config: FincodeConfig = {
            baseUrl: resolveBaseUrl(initArgs),
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
        this._invoices = new Invoice(this.config);
        this._chargebacks = new Chargeback(this.config);
        this._changeRequests = new ChangeRequest(this.config);
        this._companyStamps = new CompanyStamp(this.config);
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

    private _invoices: Invoice;
    get invoices(): Invoice {
        return this._invoices;
    }

    private _chargebacks: Chargeback;
    get chargebacks(): Chargeback {
        return this._chargebacks;
    }

    private _changeRequests: ChangeRequest;
    get changeRequests(): ChangeRequest {
        return this._changeRequests;
    }

    private _companyStamps: CompanyStamp;
    get companyStamps(): CompanyStamp {
        return this._companyStamps;
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
 * @param {string} initArgs.environment - fincode environment to send requests to. Defaults to `test`.
 * @param {object} initArgs.options - fincode options
 */
const createFincode = (
    initArgs: {
        apiKey: string;
        environment?: FincodeEnvironment;
        /**
         * @deprecated Use `environment` instead. `true` selects `prod`,
         * `false` selects `test`.
         */
        isLiveMode?: boolean;
        options?: FincodeInitOptions;
    }
): Fincode => new Fincode(initArgs);
export { createFincode };
