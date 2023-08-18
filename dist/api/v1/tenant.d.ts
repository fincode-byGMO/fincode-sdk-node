import { ContractObject, CreatingTenantWithExistingUserRequest, CreatingTenantWithExistingUserResponse, ExaminationInfo, ListResponse, CreatingTenantWithNewUserRequest, CreatingTenantWithNewUserResponse, RequestingExaminationRequest, RequestingExaminationResponse, RetrievingTenantShopListPagination, ShopObject, TenantShopsSearchParams, UpdatingExaminationInfoRequest, UpdatingTenantRequest, ExaminationInfo_V2, UpdatingExaminationInfoRequest_V2 } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
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
     *
     * **Create a tenant with existing platform user**
     *
     * corresponds to `POST /v1/join_tenants`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantWithExistingUserRequest} body
     * @param {FincodePartialRequestHeader} [header]
     */
    createWithExistingUser(body: CreatingTenantWithExistingUserRequest, header?: FincodePartialRequestHeader): Promise<CreatingTenantWithExistingUserResponse>;
    /**
     * **Create a tenant with new user**
     *
     * corresponds to `POST /v1/tenant_entries`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantWithExistingUserRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<CreatingTenantWithExistingUserResponse>}
     */
    createWithNewUser(body: CreatingTenantWithNewUserRequest, header?: FincodePartialRequestHeader): Promise<CreatingTenantWithNewUserResponse>;
    /**
     * @deprecated Use `updateExaminationInfoV2` instead
     *
     * **Update contract examination information of a tenant**
     *
     * corresponds to `PUT /v1/contracts/examinations/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingExaminationInfoRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ExaminationInfo>}
     */
    updateExaminationInfo(id: string, body: UpdatingExaminationInfoRequest, header?: FincodePartialRequestHeader): Promise<ExaminationInfo>;
    /**
     * @deprecated Use `retrieveExaminationInfoV2` instead
     *
     * **Retrieve contract examination information of a tenant**
     *
     * corresponds to `GET /v1/contracts/examinations/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ExaminationInfo>}
     */
    retrieveExaminationInfo(id: string, header?: FincodePartialRequestHeader): Promise<ExaminationInfo>;
    /**
     * **Requesting a contract examination**
     *
     * corresponds to `POST /v1/contracts/examinations`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RequestingExaminationRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<RequestingExaminationResponse>}
     */
    requestExamination(body: RequestingExaminationRequest, header?: FincodePartialRequestHeader): Promise<RequestingExaminationResponse>;
    /**
     * **Retrieve contract information of a tenant**
     *
     * corresponds to `GET /v1/contracts/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<>}
     */
    retrieveContract(id: string, header?: FincodePartialRequestHeader): Promise<ContractObject>;
    /**
     * **Update a tenant**
     *
     * corresponds to `PUT /v1/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {UpdatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ShopObject>}
     */
    update(id: string, body: UpdatingTenantRequest, header?: FincodePartialRequestHeader): Promise<ShopObject>;
    /**
     * **Retrieve a tenant**
     *
     * corresponds to `GET /v1/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id - tenant shop id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ShopObject>}
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<ShopObject>;
    /**
     * **Retrieve tenant list**
     *
     * corresponds to `GET /v1/tenants`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RetrievingTenantShopListPagination} [pagination]
     * @param {TenantShopsSearchParams} [searchParams]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<ShopObject>>}
     */
    retrieveList(pagination?: RetrievingTenantShopListPagination, searchParams?: TenantShopsSearchParams, header?: FincodePartialRequestHeader): Promise<ListResponse<ShopObject>>;
    /**
     * **Retrieve contract examination information of a tenant**
     *
     * corresponds to `GET /v1/contracts/examinations_v2/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    retrieveExaminationInfoV2(id: string, header?: FincodePartialRequestHeader): Promise<ExaminationInfo_V2>;
    /**
     * **Update contract examination information of a tenant**
     *
     * corresponds to `PUT /v1/contracts/examinations_v2/tenants/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     */
    updateExaminationInfoV2(id: string, body: UpdatingExaminationInfoRequest_V2, header?: FincodePartialRequestHeader): Promise<ExaminationInfo_V2>;
}
export { Tenant };
