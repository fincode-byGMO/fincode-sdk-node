import { ContractObject, CreatingTenantWithExistingUserRequest, CreatingTenantWithExistingUserResponse, ExaminationInfo, ListResponse, CreatingTenantWithNewUserRequest, CreatingTenantWithNewUserResponse, RequestingExaminationRequest, RequestingExaminationResponse, ShopObject, UpdatingExaminationInfoRequest, UpdatingTenantRequest, ExaminationInfo_V2, UpdatingExaminationInfoRequest_V2, RetrievingTenantShopListQueryParams } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
/**
 * @typedef {Object} Tenant
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
declare class Tenant {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    createWithExistingUser(body: CreatingTenantWithExistingUserRequest, headers?: FincodeRequestHeaders): Promise<CreatingTenantWithExistingUserResponse>;
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
    createWithNewUser(body: CreatingTenantWithNewUserRequest, headers?: FincodeRequestHeaders): Promise<CreatingTenantWithNewUserResponse>;
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
    updateExaminationInfo(id: string, body: UpdatingExaminationInfoRequest, headers?: Omit<FincodeRequestHeaders, "tenantShopId">): Promise<ExaminationInfo>;
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
    retrieveExaminationInfo(id: string, headers?: Omit<FincodeRequestHeaders, "tenantShopId">): Promise<ExaminationInfo>;
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
    requestExamination(body: RequestingExaminationRequest, headers?: FincodeRequestHeaders): Promise<RequestingExaminationResponse>;
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
    retrieveContract(id: string, headers?: Omit<FincodeRequestHeaders, "tenantShopId">): Promise<ContractObject>;
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
    update(id: string, body: UpdatingTenantRequest, headers?: FincodeRequestHeaders): Promise<ShopObject>;
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
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<ShopObject>;
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
    retrieveList(queryParams?: RetrievingTenantShopListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<ShopObject>>;
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
    retrieveExaminationInfoV2(id: string, headers?: Omit<FincodeRequestHeaders, "tenantShopId">): Promise<ExaminationInfo_V2>;
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
    updateExaminationInfoV2(id: string, body: UpdatingExaminationInfoRequest_V2, headers?: Omit<FincodeRequestHeaders, "tenantShopId">): Promise<ExaminationInfo_V2>;
}
export { Tenant };
