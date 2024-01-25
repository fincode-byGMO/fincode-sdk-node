import { CreatingPaymentSessionRequest, PaymentSessionObject } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class PaymentSession {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Create a payment session**
     *
     * corresponds to `POST /v1/sessions`
     *
     * @param {CreatingPaymentSessionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentSessionObject>} - created payment session object
     */
    create(body: CreatingPaymentSessionRequest, headers?: FincodeRequestHeaders): Promise<PaymentSessionObject>;
}
export { PaymentSession };
