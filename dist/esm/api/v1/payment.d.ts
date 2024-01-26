import { CancelingPaymentRequest, CapturingPaymentRequest, ChangingPaymentAmountRequest, Executing3DSecureAuthRequest, Executing3DSecureAuthResponse, ExecutingPaymentAfter3DSecureRequest, ExecutingPaymentRequest, ListResponse, PaymentObject, ReauthorizingPaymentRequest, CreatingPaymentRequest, Retrieving3DSecureAuthResponse, GeneratingKonbiniPaymentBarcodeRequest, RetrievingPaymentListQueryParams, PayType } from "../../types/index.js";
import { FincodeConfig } from "./fincode.js";
import { FincodeRequestHeaders } from "./http.js";
declare class Payment {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Register a payment**
     *
     * corresponds to `POST /v1/payments`
     *
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - created payment object
     */
    create(body: CreatingPaymentRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Execute a payment**
     *
     * corresponds to `PUT /v1/payments/:id`
     *
     * @param {string} id - payment id
     * @param {ExecutingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - executed payment object
     */
    execute(id: string, body: ExecutingPaymentRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Retrieve payment list**
     *
     * corresponds to `GET /v1/payments`
     *
     * @param {RetrievingPaymentListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PaymentObject>>} - retrieved payment object list
     */
    retrieveList(queryParams?: RetrievingPaymentListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<PaymentObject>>;
    /**
     * **Retrieve a payment**
     *
     * corresponds to `GET /v1/payments/:id`
     *
     * @param {string} id - payment id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - retrieved payment object
     */
    retrieve(id: string, queryParams: {
        pay_type: PayType;
    }, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Capture a payment**
     *
     * corresponds to `PUT /v1/payments/:id/capture`
     *
     * @param {string} id - payment id
     * @param {CapturingPaymentRequest} body - request body
     *
     * @returns {Promise<PaymentObject>} - captured payment object
     */
    capture(id: string, body: CapturingPaymentRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Cancel a payment**
     *
     * corresponds to `PUT /v1/payments/:id/cancel`
     *
     * @param {string} id - payment id
     * @param {CancelingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - canceled payment object
     */
    cancel(id: string, body: CancelingPaymentRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Re-authorize a payment**
     *
     * corresponds to `PUT /v1/payments/:id/auth`
     *
     * @param {string} id - payment id
     * @param {ReauthorizingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - re-authorized payment object
     */
    reauthorize(id: string, body: ReauthorizingPaymentRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Change amount of a payment**
     *
     * corresponds to `PUT /v1/payments/:id/change`
     *
     * @param {string} id - payment id
     * @param {ChangingPaymentAmountRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - changed payment object
     */
    changeAmount(id: string, body: ChangingPaymentAmountRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Execute a payment after 3D Secure authentication**
     *
     * corresponds to `PUT /v1/payments/:id/secure`
     *
     * @param {string} id - payment id
     * @param {ExecutingPaymentAfter3DSecureRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - executed payment object
     */
    executeAfter3DSecureAuth(id: string, body: ExecutingPaymentAfter3DSecureRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
    /**
     * **Execute a 3D Secure authentication for a payment**
     *
     * corresponds to `PUT /v1/secure2/:access_id`
     *
     * @param {string} accessId - access id
     * @param {Executing3DSecureAuthRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Executing3DSecureAuthResponse} - executed 3D Secure authentication result
     */
    execute3DSecureAuth(accessId: string, body: Executing3DSecureAuthRequest, headers?: FincodeRequestHeaders): Promise<Executing3DSecureAuthResponse>;
    /**
     * **Retrieve a 3D Secure authentication result**
     *
     * corresponds to `GET /v1/secure2/:access_id`
     *
     * @param {string} accessId - access id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<Retrieving3DSecureAuthResultResponse>} - retrieved 3D Secure authentication result
     */
    retrieve3DSecureAuthResult(accessId: string, headers?: FincodeRequestHeaders): Promise<Retrieving3DSecureAuthResponse>;
    /**
     * **Generating a Konbini payment barcode**
     *
     * corresponds to `PUT /v1/payments/:id/barcode`
     *
     * @param {string} id - payment id
     * @param {GeneratingKonbiniPaymentBarcodeRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentObject>} - barcode-generated payment object
     */
    generateKonbiniPaymentBarcode(id: string, body: GeneratingKonbiniPaymentBarcodeRequest, headers?: FincodeRequestHeaders): Promise<PaymentObject>;
}
export { Payment };
