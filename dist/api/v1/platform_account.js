import { FincodeAPIError, FincodeSDKError, } from "../../types/index.js";
import { createFincodeRequestFetch } from "./http.js";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js";
class PlatformAccount {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Retrieve platform-account list **
     *
     * corresponds to `POST /v1/platform_accounts`
     *
     * @param {RetrievingPlatformAccountListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PlatformAccountObject>>} - platform-account object list
     *
    */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/platform_accounts", undefined, headers, queryParams);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
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
     * **Retrieve a platform-account**
     *
     * corresponds to `GET /v1/platform_accounts/:id`
     *
     * @param {string} id - platform-account id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlatformAccountObject>} - platform-account object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/platform_accounts/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const platformAccount = json;
                        resolve(platformAccount);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
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
     * **Retrieve a platform-account summary*
     *
     * corresponds to `GET /v1/platform_accounts/:id/summary`
     *
     * @param {string} id - platform-account id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlatformAccountObject>} - platform-account object
     */
    retrieveSummaryList(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/platform_accounts/${id}/summary`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json;
                        resolve(list);
                    }
                    else {
                        const errRes = json;
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message);
                        reject(e);
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
export { PlatformAccount };
