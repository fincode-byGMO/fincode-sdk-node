import { RequestInit } from "node-fetch";
import { CreatingPaymentSessionRequest, PaymentSessionObject } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class PaymentSession {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Create a payment session**
     *
     * corresponds to `POST /v1/sessions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingPaymentSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentSessionObject>}
     */
    create(body: CreatingPaymentSessionRequest, header?: FincodePartialRequestHeader): Promise<PaymentSessionObject>;
}
export { PaymentSession };
