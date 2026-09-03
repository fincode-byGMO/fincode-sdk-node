import {
    CreatingInvoiceRequest,
    DeletingInvoiceResponse,
    InvoiceObject,
    InvoiceListItemObject,
    ListResponse,
    MarkingInvoicePaidExternallyRequest,
    OpeningInvoiceRequest,
    RetrievingInvoiceListQueryParams,
    UpdatingInvoiceRequest,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Invoice {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register an invoice**
     * 
     * corresponds to `POST /v1/invoices`
     * 
     * The invoice starts as a draft. Open it to bill the customer.
     * 
     * @param {CreatingInvoiceRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - registered invoice object
     */
    public create(
        body: CreatingInvoiceRequest,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "POST", "/v1/invoices", {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve invoice list**
     * 
     * corresponds to `GET /v1/invoices`
     * 
     * @param {RetrievingInvoiceListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<InvoiceListItemObject>>} - retrieved invoice object list
     */
    public retrieveList(
        queryParams?: RetrievingInvoiceListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<InvoiceListItemObject>> {
        return executeRequest<ListResponse<InvoiceListItemObject>>(this._config, "GET", "/v1/invoices", {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve an invoice**
     * 
     * corresponds to `GET /v1/invoices/:id`
     * 
     * @param {string} id - invoice id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - retrieved invoice object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "GET", `/v1/invoices/${id}`, {
            headers,
        })
    }

    /**
     * **Update an invoice**
     * 
     * corresponds to `PUT /v1/invoices/:id`
     * 
     * @param {string} id - invoice id
     * @param {UpdatingInvoiceRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - updated invoice object
     */
    public update(
        id: string,
        body: UpdatingInvoiceRequest,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "PUT", `/v1/invoices/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Delete an invoice**
     * 
     * corresponds to `DELETE /v1/invoices/:id`
     * 
     * Only a draft can be deleted. Once an invoice has been opened it stays on
     * the shop, whether it was paid or canceled.
     * 
     * @param {string} id - invoice id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<DeletingInvoiceResponse>} - deleting result
     */
    public delete(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<DeletingInvoiceResponse> {
        return executeRequest<DeletingInvoiceResponse>(this._config, "DELETE", `/v1/invoices/${id}`, {
            headers,
        })
    }

    /**
     * **Open an invoice**
     * 
     * corresponds to `PUT /v1/invoices/:id/open`
     * 
     * Turns a draft into a bill the customer can pay. The mail flags given
     * here take precedence over the ones set when registering or updating.
     * 
     * @param {string} id - invoice id
     * @param {OpeningInvoiceRequest} [body] - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - opened invoice object
     */
    public open(
        id: string,
        body?: OpeningInvoiceRequest,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "PUT", `/v1/invoices/${id}/open`, {
            body: JSON.stringify(body ?? {}),
            headers,
        })
    }

    /**
     * **Cancel an invoice**
     * 
     * corresponds to `PUT /v1/invoices/:id/cancel`
     * 
     * Only an invoice waiting for payment can be canceled.
     * 
     * @param {string} id - invoice id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - canceled invoice object
     */
    public cancel(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "PUT", `/v1/invoices/${id}/cancel`, {
            // The API rejects a request without a body.
            body: JSON.stringify({}),
            headers,
        })
    }

    /**
     * **Mark an invoice as paid outside fincode**
     * 
     * corresponds to `PUT /v1/invoices/:id/paid_externally`
     * 
     * @param {string} id - invoice id
     * @param {MarkingInvoicePaidExternallyRequest} [body] - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - marked invoice object
     */
    public markPaidExternally(
        id: string,
        body?: MarkingInvoicePaidExternallyRequest,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "PUT", `/v1/invoices/${id}/paid_externally`, {
            body: JSON.stringify(body ?? {}),
            headers,
        })
    }

    /**
     * **Reissue the virtual account of an invoice**
     * 
     * corresponds to `PUT /v1/invoices/:id/virtual_account/refresh`
     * 
     * @param {string} id - invoice id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<InvoiceObject>} - invoice object with the reissued virtual account
     */
    public refreshVirtualAccount(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<InvoiceObject> {
        return executeRequest<InvoiceObject>(this._config, "PUT", `/v1/invoices/${id}/virtual_account/refresh`, {
            // The API rejects a request without a body.
            body: JSON.stringify({}),
            headers,
        })
    }
}

export { Invoice }
