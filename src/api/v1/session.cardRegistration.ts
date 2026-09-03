import {
    CreatingCardRegistrationSessionRequest,
    CardRegistrationSessionObject,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class CardRegistrationSession {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a card registration session**
     * 
     * corresponds to `POST /v1/card_sessions`
     * 
     * @param {CreatingCardRegistrationSessionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<PaymentSessionObject>} - created card registration session object
     */
    public create(
        body: CreatingCardRegistrationSessionRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CardRegistrationSessionObject> {
        return executeRequest<CardRegistrationSessionObject>(this._config, "POST", "/v1/card_sessions", {
            body: JSON.stringify(body),
            headers,
        })
    }
}

export { CardRegistrationSession }
