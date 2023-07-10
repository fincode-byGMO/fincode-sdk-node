import { RequestInit } from "node-fetch";
import { CreatingCardRegistrationSessionRequest, CardRegistrationSessionObject } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class CardRegistrationSession {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Create a card registration session**
     *
     * corresponds to `POST /v1/sessions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingCardRegistrationSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentSessionObject>}
     */
    create(body: CreatingCardRegistrationSessionRequest, header?: FincodePartialRequestHeader): Promise<CardRegistrationSessionObject>;
}
export { CardRegistrationSession };
