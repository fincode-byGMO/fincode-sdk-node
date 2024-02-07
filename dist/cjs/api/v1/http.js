"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFincodeRequestFetch = exports.createFincodeRequestURL = exports.buildQueryString = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_js_1 = require("../../types/http.js");
const https_proxy_agent_1 = require("https-proxy-agent");
const BASE_URL = "https://api.fincode.jp";
const BASE_URL_TEST = "https://api.test.fincode.jp";
const buildQueryString = (queryParams) => {
    const urlSearchParams = new URLSearchParams();
    interpretQueryParams(urlSearchParams, null, queryParams);
    return urlSearchParams.toString();
};
exports.buildQueryString = buildQueryString;
const interpretQueryParams = (urlSearchParams, key, value) => {
    switch (typeof value) {
        case "object":
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    if (key) {
                        interpretQueryParams(urlSearchParams, key, v);
                    }
                    else {
                        throw new Error("key is not defined");
                    }
                });
            }
            else {
                if (value.field &&
                    value.order) {
                    const sort = value;
                    if (key) {
                        urlSearchParams.append(key, `${sort.field} ${sort.order}`);
                    }
                    else {
                        throw new Error("key is not defined");
                    }
                }
                else {
                    Object.keys(value).forEach((k) => {
                        interpretQueryParams(urlSearchParams, k, value[k]);
                    });
                }
            }
            break;
        case "boolean":
        case "number":
        case "string":
            if (key) {
                urlSearchParams.append(key, value.toString());
            }
            else {
                throw new Error("key is not defined");
            }
            break;
        case "undefined":
            break;
        default:
            throw new Error(`Unexpected type of query parameter: ${typeof value}`);
    }
};
const createFincodeRequestURL = (config, path, queryParams) => {
    const baseUrl = config.productionMode ? BASE_URL : BASE_URL_TEST;
    const queryStr = queryParams ? `?${(0, exports.buildQueryString)(queryParams)}` : "";
    return `${baseUrl}${path}${queryStr}`;
};
exports.createFincodeRequestURL = createFincodeRequestURL;
const createFincodeRequestFetch = (config, method, path, data, headers, queryParams) => {
    const url = createFincodeRequestURL(config, path, queryParams);
    const _headers = (0, http_js_1.createFincodeRequestHeader)({
        apiVersion: config.options.version,
        authorization: `Bearer ${config.apiKey}`,
        idempotentKey: headers?.idempotentKey,
        tenantShopId: headers?.tenantShopId,
        contentType: headers?.contentType || "application/json",
    });
    const options = {
        method: method,
        headers: _headers,
        body: data,
        agent: config.options.proxyAgent ? new https_proxy_agent_1.HttpsProxyAgent(config.options.proxyAgent) : undefined,
        timeout: config.options.timeout,
    };
    return () => (0, node_fetch_1.default)(url, options);
};
exports.createFincodeRequestFetch = createFincodeRequestFetch;
