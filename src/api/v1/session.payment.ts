import {
    CreatingPaymentSessionRequest,
    PaymentSessionObject,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class PaymentSession {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

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
    public create(
        body: CreatingPaymentSessionRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentSessionObject> {
        return executeRequest<PaymentSessionObject>(this._config, "POST", "/v1/sessions", {
            body: JSON.stringify(body),
            headers,
        })
    }
}

export { PaymentSession }
