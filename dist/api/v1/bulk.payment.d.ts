/// <reference types="node" />
import { DeletingPaymentBulkResponse, ListResponse, ListWithErrors, PaymentBulkDetailObject, PaymentBulkObject, RetrievingPaymentBulkDetailPagination, RetrievingPaymentBulkPagination } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class PaymentBulk {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Register a payment bulk**
     *
     * corresponds to `POST /v1/sessions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingCardRegistrationSessionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentBulkObject>}
     */
    create(payType: "Card", processPlanDate: string, file: Buffer | string, fileName: string, header?: FincodePartialRequestHeader): Promise<PaymentBulkObject>;
    /**
     * **Retrieve payment bulk list**
     *
     * corresponds to `GET /v1/payments/bulk`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingPaymentBulkPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PaymentBulkObject>>}
     */
    retrieveList(pagination?: RetrievingPaymentBulkPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<PaymentBulkObject>>;
    /**
     * **Retrieve details of a payment bulk**
     *
     * corresponds to `GET /v1/payments/bulk/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {RetrievingPaymentBulkDetailPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PaymentBulkDetailObject>}
     */
    retrieveDetailList(id: string, pagination: RetrievingPaymentBulkDetailPagination, header?: FincodePartialRequestHeader): Promise<ListWithErrors<PaymentBulkDetailObject>>;
    /**
     * **Delete a payment bulk**
     *
     * corresponds to `DELETE /v1/payments/bulk/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<DeletingPaymentBulkResponse>}
     */
    delete(id: string, header?: FincodePartialRequestHeader): Promise<DeletingPaymentBulkResponse>;
}
export { PaymentBulk };
