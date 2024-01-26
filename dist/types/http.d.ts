export type FincodeRequestHeader = Record<string, string>;
export declare const createFincodeRequestHeader: (params?: {
    apiVersion?: string;
    authorization?: string;
    idempotentKey?: string;
    tenantShopId?: string;
    contentType?: string;
}) => FincodeRequestHeader;
