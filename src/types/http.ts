export type FincodeRequestHeader = Record<string, string | undefined>

export const createFincodeRequestHeader = (params?: {
    apiVersion?: string
    authorization?: string
    idempotentKey?: string
    tenantShopId?: string
}): FincodeRequestHeader => {
    return {
        "Api-Version": params?.apiVersion,
        "Authorization": params?.authorization,
        "Tenant-Shop-Id": params?.tenantShopId,
        "idempotent_key": params?.idempotentKey,
        "Content-Type": "application/json; charset=utf-8",
    }
}