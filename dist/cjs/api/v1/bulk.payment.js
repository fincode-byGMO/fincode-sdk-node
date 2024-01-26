"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBulk = void 0;
const form_data_1 = __importDefault(require("form-data"));
const index_js_1 = require("../../types/index.js");
const http_js_1 = require("./http.js");
const _errorMessages_js_1 = require("./_errorMessages.js");
const random_js_1 = require("./../../utils/random.js");
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
     * @param {CreatingPaymentBulkQueryParams} queryParams - request query parameters
     * @param {CreatingPaymentBulkRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentBulkObject>} - created payment bulk object
     */
    create(queryParams, body, headers) {
        // multipart-form-data
        const formData = new form_data_1.default();
        formData.append("file", body.file, {
            filename: body.fileName || `${(0, random_js_1.generateUUIDv4)()}.json`,
            contentType: "application/json"
        });
        const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "POST", "/v1/payments/bulk", formData, {
            ...headers,
            contentType: `multipart/form-data; boundary=${formData.getBoundary()}`
        }, {
            pay_type: queryParams.pay_type,
            process_plan_date: queryParams.process_plan_date,
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
                        const err = new index_js_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve payment bulk list**
     *
     * corresponds to `GET /v1/payments/bulk`
     *
     * @param {RetrievingPaymentBulkQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PaymentBulkObject>>} - retrieved payment bulk object list
     */
    retrieveList(queryParams, headers) {
        const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", "/v1/payments/bulk", undefined, headers, queryParams);
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkList = json;
                        resolve(bulkList);
                    }
                    else {
                        const errRes = json;
                        const err = new index_js_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Retrieve details of a payment bulk**
     *
     * corresponds to `GET /v1/payments/bulk/:id`
     *
     * @param {string} id - payment bulk id
     * @param {RetrievingPaymentBulkDetailQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PaymentBulkDetailObject>} - retrieved payment bulk detail object
     */
    retrieveDetailList(id, queryParams, headers) {
        const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "GET", `/v1/payments/bulk/${id}`, undefined, headers, queryParams);
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const bulkDetailList = json;
                        resolve(bulkDetailList);
                    }
                    else {
                        const errRes = json;
                        const err = new index_js_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
    /**
     * **Delete a payment bulk**
     *
     * corresponds to `DELETE /v1/payments/bulk/:id`
     *
     * @param {string} id - payment bulk id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<DeletingPaymentBulkResponse>} - deleting result
     */
    delete(id, headers) {
        const fetch = (0, http_js_1.createFincodeRequestFetch)(this._config, "DELETE", `/v1/payments/bulk/${id}`, undefined, headers, undefined);
        return new Promise((resolve, reject) => {
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const deleteResult = json;
                        resolve(deleteResult);
                    }
                    else {
                        const errRes = json;
                        const err = new index_js_1.FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(err);
                    }
                }).catch((e) => {
                    const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getResponseJSONParseErrorMessage)(), e);
                    reject(err);
                });
            }).catch((e) => {
                const err = new index_js_1.FincodeSDKError((0, _errorMessages_js_1.getFetchErrorMessage)(), e);
                reject(err);
            });
        });
    }
}
exports.PaymentBulk = PaymentBulk;
