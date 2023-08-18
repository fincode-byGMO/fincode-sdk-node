import { CancelingPaymentRequest, CapturingPaymentRequest, ChangingPaymentAmountRequest, Executing3DSecureAuthRequest, Executing3DSecureAuthResponse, ExecutingPaymentAfter3DSecureRequest, ExecutingPaymentRequest, ListResponse, PaymentObject, ReauthorizingPaymentRequest, CreatingPaymentRequest, Retrieving3DSecureAuthResponse, GeneratingKonbiniPaymentBarcodeRequest, RetrievingPaymentListPagination } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Payment {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Register a payment**
     *
     * corresponds to `POST /v1/payments`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    create(body: CreatingPaymentRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Execute a payment**
     *
     * corresponds to `PUT /v1/payments/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {ExecutingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    execute(id: string, body: ExecutingPaymentRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Retrieve payment list**
     *
     * corresponds to `GET /v1/payments`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingPaymentListPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PaymentObject>>}
     */
    retrieveList(pagination?: RetrievingPaymentListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<PaymentObject>>;
    /**
     * **Retrieve a payment**
     *
     * corresponds to `GET /v1/payments/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Capture a payment**
     *
     * corresponds to `PUT /v1/payments/:id/capture`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {CapturingPaymentRequest} body
     *
     * @returns {Promise<PaymentObject>}
     */
    capture(id: string, body: CapturingPaymentRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Cancel a payment**
     *
     * corresponds to `PUT /v1/payments/:id/cancel`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {CancelingPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    cancel(id: string, body: CancelingPaymentRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Re-authorize a payment**
     *
     * corresponds to `PUT /v1/payments/:id/auth`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    reauthorize(id: string, body: ReauthorizingPaymentRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Change amount of a payment**
     *
     * corresponds to `PUT /v1/payments/:id/change`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    changeAmount(id: string, body: ChangingPaymentAmountRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Execute a payment after 3D Secure authentication**
     *
     * corresponds to `PUT /v1/payments/:id/secure`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {ExecutingPaymentAfter3DSecureRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    executeAfter3DSecureAuth(id: string, body: ExecutingPaymentAfter3DSecureRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
    /**
     * **Execute a 3D Secure authentication for a payment**
     *
     * corresponds to `PUT /v1/secure2/:access_id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} accessId
     * @param {Executing3DSecureAuthRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Executing3DSecureAuthResponse}
     */
    execute3DSecureAuth(accessId: string, body: Executing3DSecureAuthRequest, header?: FincodePartialRequestHeader): Promise<Executing3DSecureAuthResponse>;
    /**
     * **Retrieve a 3D Secure authentication result**
     *
     * corresponds to `GET /v1/secure2/:access_id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} accessId
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<Retrieving3DSecureAuthResultResponse>}
     */
    retrieve3DSecureAuthResult(accessId: string, header?: FincodePartialRequestHeader): Promise<Retrieving3DSecureAuthResponse>;
    /**
     * **Generating a Konbini payment barcode**
     *
     * corresponds to `PUT /v1/payments/:id/barcode`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {GeneratingKonbiniPaymentBarcodeRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentObject>}
     */
    generateKonbiniPaymentBarcode(id: string, body: GeneratingKonbiniPaymentBarcodeRequest, header?: FincodePartialRequestHeader): Promise<PaymentObject>;
}
export { Payment };
