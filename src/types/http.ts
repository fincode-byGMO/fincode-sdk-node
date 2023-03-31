export type FincodeRequestHeader = Record<string, string>

export const createFincodeRequestHeader = (params?: {
    apiVersion?: string
    authorization?: string
    idempotentKey?: string
    tenantShopId?: string
    contentType?: string
}): FincodeRequestHeader => {
    const header: FincodeRequestHeader = {
        "Content-Type": "application/json;charset=UTF-8",
    }

    if (params?.apiVersion) { header["API-Version"] = params.apiVersion }
    if (params?.authorization) { header["Authorization"] = params.authorization }
    if (params?.idempotentKey) { header["idempotent_key"] = params.idempotentKey }
    if (params?.tenantShopId) { header["Tenant-Shop-Id"] = params.tenantShopId }
    if (params?.contentType) { header["Content-Type"] = params.contentType }

    return header
}