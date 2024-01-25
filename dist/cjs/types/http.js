"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFincodeRequestHeader = void 0;
const createFincodeRequestHeader = (params) => {
    const header = {
        "Content-Type": "application/json;charset=UTF-8",
    };
    if (params?.apiVersion) {
        header["API-Version"] = params.apiVersion;
    }
    if (params?.authorization) {
        header["Authorization"] = params.authorization;
    }
    if (params?.idempotentKey) {
        header["idempotent_key"] = params.idempotentKey;
    }
    if (params?.tenantShopId) {
        header["Tenant-Shop-Id"] = params.tenantShopId;
    }
    if (params?.contentType) {
        header["Content-Type"] = params.contentType;
    }
    return header;
};
exports.createFincodeRequestHeader = createFincodeRequestHeader;
