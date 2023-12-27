import FormData from "form-data";
import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class PaymentBulk {
    _config;
    constructor(config) {
        this._config = config;
    }
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
    create(payType, processPlanDate, file, fileName, header) {
        // multipart-form-data
        const formData = new FormData();
        formData.append("file", file, {
            filename: fileName,
            contentType: "application/json"
        });
        const fetch = createFincodeRequestFetch(this._config, "POST", "/v1/payments/bulk", formData, {
            ...header,
            contentType: `multipart/form-data; boundary=${formData.getBoundary()}`
        }, {
            keyValues: {
                pay_type: payType,
                process_plan_date: processPlanDate,
            }
        });
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulk = json;
                        resolve(bulk);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e);
                reject(err);
            });
        });
    }
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
    retrieveList(pagination, header) {
        const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/payments/bulk", undefined, header, { pagination: pagination });
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkList = json;
                        resolve(bulkList);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e);
                reject(err);
            });
        });
    }
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
    retrieveDetailList(id, pagination, header) {
        const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/payments/bulk/${id}`, undefined, header, { pagination: pagination });
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkDetailList = json;
                        resolve(bulkDetailList);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e);
                reject(err);
            });
        });
    }
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
    delete(id, header) {
        const fetch = createFincodeRequestFetch(this._config, "DELETE", `/v1/payments/bulk/${id}`, undefined, header, undefined);
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const deleteResult = json;
                        resolve(deleteResult);
                    }
                    else {
                        const errRes = json;
                        const err = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e);
                reject(err);
            });
        });
    }
}
export { PaymentBulk };