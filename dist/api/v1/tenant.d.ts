import { RequestInit } from "node-fetch";
import { ContractObject, CreatingTenantRequest, CreatingTenantResponse, ExaminationInfo, ListResponse, RegisteringTenantRequest, RegisteringTenantResponse, RequestingExaminationRequest, RequestingExaminationResponse, RetrievingTenantShopListPagination, ShopObject, TenantShopsSearchParams, UpdatingExaminationInfoRequest, UpdatingTenantRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Tenant {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Create a tenant**
     *
     * corresponds to `POST /v1/join_tenants`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     */
    create(body: CreatingTenantRequest, header?: FincodePartialRequestHeader): Promise<CreatingTenantResponse>;
    /**
     * **Register a tenant**
     *
     * corresponds to `POST /v1/tenant_entries`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {CreatingTenantRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<CreatingTenantResponse>}
     */
    register(body: RegisteringTenantRequest, header?: FincodePartialRequestHeader): Promise<RegisteringTenantResponse>;
    /**
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
}
export { Tenant };
