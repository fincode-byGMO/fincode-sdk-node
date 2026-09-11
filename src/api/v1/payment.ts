import {
    CancelingPaymentRequest,
    CapturingPaymentRequest,
    ChangingPaymentAmountRequest,
    Executing3DSecureAuthRequest,
    Executing3DSecureAuthResponse,
    ExecutingPaymentAfter3DSecureRequest,
    ExecutingPaymentRequest,
    ListResponse,
    PaymentObject,
    ReauthorizingPaymentRequest,
    CreatingPaymentRequest,
    Retrieving3DSecureAuthResponse,
    GeneratingKonbiniPaymentBarcodeRequest,
    RetrievingPaymentListQueryParams,
    PayType,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Payment {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

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
    public create(
        body: CreatingPaymentRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "POST", "/v1/payments", {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public execute(
        id: string,
        body: ExecutingPaymentRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public retrieveList(
        queryParams?: RetrievingPaymentListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<PaymentObject>> {
        return executeRequest<ListResponse<PaymentObject>>(this._config, "GET", "/v1/payments", {
            headers,
            queryParams,
        })
    }

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
    public retrieve(
        id: string,
        queryParams: { pay_type: PayType },
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "GET", `/v1/payments/${id}`, {
            headers,
            queryParams,
        })
    }

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
    public capture(
        id: string,
        body: CapturingPaymentRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/capture`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public cancel(
        id: string,
        body: CancelingPaymentRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/cancel`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public reauthorize(
        id: string,
        body: ReauthorizingPaymentRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/auth`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public changeAmount(
        id: string,
        body: ChangingPaymentAmountRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/change`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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

    public executeAfter3DSecureAuth(
        id: string,
        body: ExecutingPaymentAfter3DSecureRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/secure`, {
            body: JSON.stringify(body),
            headers,
        })
    }

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
    public execute3DSecureAuth(
        accessId: string,
        body: Executing3DSecureAuthRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<Executing3DSecureAuthResponse> {
        return executeRequest<Executing3DSecureAuthResponse>(this._config, "PUT", `/v1/secure2/${accessId}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve a 3D Secure authentication result**
     * 
     * corresponds to `GET /v1/secure2/:access_id`
     * 
     * @param {string} accessId - access id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<Retrieving3DSecureAuthResponse>} - retrieved 3D Secure authentication result
     */
    public retrieve3DSecureAuthResult(
        accessId: string,
        headers?: FincodeRequestHeaders,
    ): Promise<Retrieving3DSecureAuthResponse> {
        return executeRequest<Retrieving3DSecureAuthResponse>(this._config, "GET", `/v1/secure2/${accessId}`, {
            headers,
        })
    }

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
    public generateKonbiniPaymentBarcode(
        id: string,
        body: GeneratingKonbiniPaymentBarcodeRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<PaymentObject> {
        return executeRequest<PaymentObject>(this._config, "PUT", `/v1/payments/${id}/barcode`, {
            body: JSON.stringify(body),
            headers,
        })
    }
}
export { Payment }
