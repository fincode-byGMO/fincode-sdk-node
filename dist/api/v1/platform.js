import { FincodeAPIError, FincodeSDKError, } from "../../types/index";
import { createFincodeRequestFetch } from "./http";
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages";
class Platform {
    _config;
    constructor(config) {
        this._config = config;
    }
    /**
     * **Retrieve platform shop list**
     *
     * corresponds to `POST /v1/platforms`
     *
     * @param {RetrievingPlatformShopListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<ShopObject>>} - platform shop object list
     */
    retrieveList(queryParams, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", "/v1/platforms", undefined, headers, queryParams);
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
     * **Retrieve a platform shop**
     *
     * corresponds to `GET /v1/platforms/:id`
     *
     * @param {string} id - platform shop ID
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ShopObject>} - retrieved platform shop object
     */
    retrieve(id, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "GET", `/v1/platforms/${id}`, undefined, headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const shop = json;
                        resolve(shop);
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
     * **Update a platform shop**
     *
     * corresponds to `PUT /v1/platforms/:id`
     *
     * @param {string} id - platform shop ID
     *
     * @returns {Promise<ShopObject>} - updated platform shop object
     */
    update(id, body, headers) {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(this._config, "PUT", `/v1/platforms/${id}`, JSON.stringify(body), headers, undefined);
            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const shop = json;
                        resolve(shop);
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
export { Platform };
