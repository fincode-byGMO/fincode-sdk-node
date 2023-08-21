import { RequestInit } from "node-fetch";
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
/**
 * @typedef {Object} FincodeInitOptions
 * @property {string} version - Fincode API version
 * @property {RequestInit["agent"]} proxyAgent - Proxy agent for Fincode API requests
 * @property {number} timeout - Timeout for Fincode API requests
 */
export type FincodeInitOptions = {
    version?: string;
    proxyAgent?: RequestInit["agent"];
    timeout?: number;
};
/**
 * @typedef {Object} FincodeConfig
 * @property {boolean} isTest - Whether to use the fincode test environment
 * @property {string} apiKey - API key (secret key)
 * @property {FincodeInitOptions} options - Fincode initialization options
 */
type FincodeConfig = {
    fincodeEnv: FincodeEnvironment;
    apiKey: string;
    options: FincodeInitOptions;
};
type FincodeEnvironment = "test" | "live";
declare class Fincode {
    readonly config: FincodeConfig;
    /**
     * @param apiKey - API key (secret key)
     */
    constructor(apiKey: string, fincodeEnv?: FincodeEnvironment, initOptions?: FincodeInitOptions);
    private _accounts;
    get accounts(): Account;
    private _customers;
    get customers(): Customer;
    private _cards;
    get cards(): Card;
    private _payments;
    get payments(): Payment;
    private _plans;
    get plans(): Plan;
    private _subscriptions;
    get subscriptions(): Subscription;
    private _paymentSessions;
    get paymentSessions(): PaymentSession;
    private _cardRegistrationSessions;
    get cardRegistrationSessions(): CardRegistrationSession;
    private _paymentBulks;
    get paymentBulks(): PaymentBulk;
    private _platforms;
    get platforms(): Platform;
    private _platformAccounts;
    get platformAccounts(): PlatformAccount;
    private _tenants;
    get tenants(): Tenant;
    private _webhookSettings;
    get webhookSettings(): WebhookSetting;
}
export { Fincode, FincodeConfig };
/**
 * create `Fincode` instance
 *
 * @param apiKey - fincode API key (secret key)
 * @param fincodeEnv - fincode environment, `"test"` or `"live"`
 * @param options - fincode options
 */
declare const createFincode: (apiKey: string, fincodeEnv: FincodeEnvironment, options: FincodeInitOptions) => Fincode;
export { createFincode };
