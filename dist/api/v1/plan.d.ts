import { RequestInit } from "node-fetch";
import { CreatingPlanRequest, DeletingPlanResponse, ListResponse, PlanObject, RetrievingPlanListPagination, UpdatingPlanRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Plan {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Register a plan**
     *
     * corresponds to `POST /v1/plans`
     * w
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RegisteringPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    create(body: CreatingPlanRequest, header?: FincodePartialRequestHeader): Promise<PlanObject>;
    /**
     * **Retrieve plan list**
     *
     * corresponds to `GET /v1/plans`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<PlanObject>>}
     */
    retrieveList(pagination?: RetrievingPlanListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<PlanObject>>;
    /**
     * **Retrieve a plan**
     *
     * corresponds to `GET /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    retrieve(id: string, header?: FincodePartialRequestHeader): Promise<PlanObject>;
    /**
     * **Update a plan**
     *
     * corresponds to `PUT /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {UpdatingPlanRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<PlanObject>}
     */
    update(id: string, body: UpdatingPlanRequest, header?: FincodePartialRequestHeader): Promise<PlanObject>;
    /**
     * **Delete a plan**
     *
     * corresponds to `DELETE /v1/plans/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<DeletingPlanResponse>}
     */
    delete(id: string, header?: FincodePartialRequestHeader): Promise<DeletingPlanResponse>;
}
export { Plan };
