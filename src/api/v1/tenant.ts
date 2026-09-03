import {
    ContractObject,
    CreatingTenantWithExistingUserRequest,
    CreatingTenantWithExistingUserResponse,
    ExaminationInfo,
    ListResponse,
    CreatingTenantWithNewUserRequest,
    CreatingTenantWithNewUserResponse,
    RequestingExaminationRequest,
    RequestingExaminationResponse,
    ShopObject,
    UpdatingExaminationInfoRequest,
    UpdatingTenantRequest,
    ExaminationInfo_V2,
    UpdatingExaminationInfoRequest_V2,
    RetrievingTenantShopListQueryParams,
    UploadingExaminationFileRequest,
    UploadingExaminationFileResponse,
    ReservingProviderRequest,
    ReservingProviderResponse,
} from "../../types/index"
import { FormData } from "undici"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

/**
 * @typedef {object} Tenant
 * @property {Function} createWithExistingUser - Create a tenant with existing platform user
 * @property {Function} createWithNewUser - Create a tenant with new user
 * @property {Function} updateExaminationInfo - *deprecated* Use `updateExaminationInfoV2` instead
 * @property {Function} retrieveExaminationInfo - *deprecated* Use `retrieveExaminationInfoV2` instead
 * @property {Function} requestExamination - Requesting a contract examination
 * @property {Function} retrieveContract - Retrieve contract information of a tenant
 * @property {Function} update - Update a tenant
 * @property {Function} retrieve - Retrieve a tenant
 * @property {Function} retrieveList - Retrieve tenant list
 * @property {Function} retrieveExaminationInfoV2 - Retrieve contract examination information of a tenant
 */
class Tenant {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a tenant with existing platform user**
     * 
     * corresponds to `POST /v1/join_tenants`
     * 
     * @param {CreatingTenantWithExistingUserRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CreatingTenantWithExistingUserResponse>} - created tenant object
     */
    public createWithExistingUser(
        body: CreatingTenantWithExistingUserRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CreatingTenantWithExistingUserResponse> {
        return executeRequest<CreatingTenantWithExistingUserResponse>(this._config, "POST", `/v1/join_tenants`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Create a tenant with new user**
     * 
     * corresponds to `POST /v1/tenant_entries`
     * 
     * @param {CreatingTenantWithExistingUserRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CreatingTenantWithExistingUserResponse>} - created tenant object
     */
    public createWithNewUser(
        body: CreatingTenantWithNewUserRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CreatingTenantWithNewUserResponse> {
        return executeRequest<CreatingTenantWithNewUserResponse>(this._config, "POST", `/v1/tenant_entries`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * @deprecated Use `updateExaminationInfoV2` instead
     * 
     * **Update contract examination information of a tenant**
     * 
     * corresponds to `PUT /v1/contracts/examinations/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ExaminationInfo>} - updated examination info object
     */
    public updateExaminationInfo(
        id: string,
        body: UpdatingExaminationInfoRequest,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo> {
        return executeRequest<ExaminationInfo>(this._config, "PUT", `/v1/contracts/examinations/tenants/${id}`, {
            body: JSON.stringify(body),
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * @deprecated Use `retrieveExaminationInfoV2` instead
     * 
     * **Retrieve contract examination information of a tenant**
     * 
     * corresponds to `GET /v1/contracts/examinations/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ExaminationInfo>} - examination info object
     */
    public retrieveExaminationInfo(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo> {
        return executeRequest<ExaminationInfo>(this._config, "GET", `/v1/contracts/examinations/tenants/${id}`, {
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * **Requesting a contract examination**
     * 
     * corresponds to `POST /v1/contracts/examinations`
     * 
     * @param {RequestingExaminationRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<RequestingExaminationResponse>} - created examination object
     */
    public requestExamination(
        body: RequestingExaminationRequest,
        headers?: FincodeRequestHeaders
    ): Promise<RequestingExaminationResponse> {
        return executeRequest<RequestingExaminationResponse>(this._config, "POST", `/v1/contracts/examinations`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve contract information of a tenant**
     * 
     * corresponds to `GET /v1/contracts/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ContractObject>} - contract object
     */
    public retrieveContract(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ContractObject> {
        return executeRequest<ContractObject>(this._config, "GET", `/v1/contracts/${id}`, {
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * **Update a tenant**
     * 
     * corresponds to `PUT /v1/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {UpdatingTenantRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ShopObject>} - updated tenant object
     */
    public update(
        id: string,
        body: UpdatingTenantRequest,
        headers?: FincodeRequestHeaders
    ): Promise<ShopObject> {
        return executeRequest<ShopObject>(this._config, "PUT", `/v1/tenants/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve a tenant**
     * 
     * corresponds to `GET /v1/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ShopObject>} - tenant object
     */
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders
    ): Promise<ShopObject> {
        return executeRequest<ShopObject>(this._config, "GET", `/v1/tenants/${id}`, {
            headers,
        })
    }

    /**
     * **Retrieve tenant list**
     * 
     * corresponds to `GET /v1/tenants`
     * 
     * @param {RetrievingTenantShopListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<ShopObject>>} - tenant list
     */
    public retrieveList(
        queryParams?: RetrievingTenantShopListQueryParams,
        headers?: FincodeRequestHeaders
    ): Promise<ListResponse<ShopObject>> {
        return executeRequest<ListResponse<ShopObject>>(this._config, "GET", "/v1/tenants", {
            headers,
            queryParams,
        })
    }

    /**
     * **Upload an examination file of a tenant**
     * 
     * corresponds to `POST /v1/contracts/examinations/tenants/:id/files`
     * 
     * Submits an image to the fincode examination team. Which files can be
     * uploaded depends on the tenant's examination status.
     * 
     * @param {string} id - tenant shop id
     * @param {UploadingExaminationFileRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<UploadingExaminationFileResponse>} - accepted file
     */
    public uploadExaminationFile(
        id: string,
        body: UploadingExaminationFileRequest,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<UploadingExaminationFileResponse> {

        // multipart/form-data
        const formData = new FormData()
        formData.append("type", body.type)
        formData.append(
            "data",
            new Blob([body.data], { type: body.contentType ?? "application/octet-stream" }),
            body.fileName,
        )

        return executeRequest<UploadingExaminationFileResponse>(this._config, "POST", `/v1/contracts/examinations/tenants/${id}/files`, {
            body: formData,
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * **Apply for payment methods of a tenant**
     * 
     * corresponds to `POST /v1/contracts/examinations/tenants/:id/providers/reserve`
     * 
     * Applies for the payment methods to be added to a tenant. It can take up
     * to a day for the application to show up in the dashboard.
     * 
     * @param {string} id - tenant shop id
     * @param {ReservingProviderRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ReservingProviderResponse>} - payment methods under application
     */
    public reserveProvider(
        id: string,
        body: ReservingProviderRequest,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ReservingProviderResponse> {
        return executeRequest<ReservingProviderResponse>(this._config, "POST", `/v1/contracts/examinations/tenants/${id}/providers/reserve`, {
            body: JSON.stringify(body),
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * **Retrieve contract examination information of a tenant**
     * 
     * corresponds to `GET /v1/contracts/examinations_v2/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ExaminationInfo_V2>} - examination info object
     */
    public retrieveExaminationInfoV2(
        id: string,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo_V2> {
        return executeRequest<ExaminationInfo_V2>(this._config, "GET", `/v1/contracts/examinations_v2/tenants/${id}`, {
            headers: { ...headers, tenantShopId: id },
        })
    }

    /**
     * **Update contract examination information of a tenant**
     * 
     * corresponds to `PUT /v1/contracts/examinations_v2/tenants/:id`
     * 
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest_V2} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ExaminationInfo_V2>} - updated examination info object
     */
    public updateExaminationInfoV2(
        id: string,
        body: UpdatingExaminationInfoRequest_V2,
        headers?: Omit<FincodeRequestHeaders, "tenantShopId">
    ): Promise<ExaminationInfo_V2> {
        return executeRequest<ExaminationInfo_V2>(this._config, "PUT", `/v1/contracts/examinations_v2/tenants/${id}`, {
            body: JSON.stringify(body),
            headers: { ...headers, tenantShopId: id },
        })
    }

}
export { Tenant }
