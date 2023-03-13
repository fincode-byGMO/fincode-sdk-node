export type FincodeRequestHeader = Record<string, string>

export const createFincodeRequestHeader = (params?: {
    apiVersion?: string
    authorization?: string
    idempotentKey?: string
    tenantShopId?: string
}): FincodeRequestHeader => {
    const header: FincodeRequestHeader = {}

    if (params?.apiVersion) { header["API-Version"] = params.apiVersion }
    if (params?.authorization) { header["Authorization"] = params.authorization }
    if (params?.idempotentKey) { header["idempotent_key"] = params.idempotentKey }
    if (params?.tenantShopId) { header["tenant_shop_id"] = params.tenantShopId }

    return header
}