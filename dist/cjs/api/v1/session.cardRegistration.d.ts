import { CreatingCardRegistrationSessionRequest, CardRegistrationSessionObject } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class CardRegistrationSession {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Create a card registration session**
     *
     * corresponds to `POST /v1/sessions`
     *
     * @param {CreatingCardRegistrationSessionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentSessionObject>} - created card registration session object
     */
    create(body: CreatingCardRegistrationSessionRequest, headers?: FincodeRequestHeaders): Promise<CardRegistrationSessionObject>;
}
export { CardRegistrationSession };
