import { CreatingPlanRequest, DeletingPlanResponse, ListResponse, PlanObject, RetrievingPlanListQueryParams, UpdatingPlanRequest } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodeRequestHeaders } from "./http";
declare class Plan {
    private readonly _config;
    constructor(config: FincodeConfig);
    /**
     * **Register a plan**
     *
     * corresponds to `POST /v1/plans`
     *
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - created plan object
     */
    create(body: CreatingPlanRequest, headers?: FincodeRequestHeaders): Promise<PlanObject>;
    /**
     * **Retrieve plan list**
     *
     * corresponds to `GET /v1/plans`
     *
     * @param {RetrievingPlanListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<ListResponse<PlanObject>>}
     */
    retrieveList(queryParams?: RetrievingPlanListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<PlanObject>>;
    /**
     * **Retrieve a plan**
     *
     * corresponds to `GET /v1/plans/:id`
     *
     * @param {string} id - plan id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - retrieved plan object
     */
    retrieve(id: string, headers?: FincodeRequestHeaders): Promise<PlanObject>;
    /**
     * **Update a plan**
     *
     * corresponds to `PUT /v1/plans/:id`
     *
     * @param {string} id - plan id
     * @param {UpdatingPlanRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<PlanObject>} - updated plan object
     */
    update(id: string, body: UpdatingPlanRequest, headers?: FincodeRequestHeaders): Promise<PlanObject>;
    /**
     * **Delete a plan**
     *
     * corresponds to `DELETE /v1/plans/:id`
     *
     * @param {string} id - plan id
     * @param {FincodeRequestHeaders} [headers] - request header
     *
     * @returns {Promise<DeletingPlanResponse>} - deleting result
     */
    delete(id: string, headers?: FincodeRequestHeaders): Promise<DeletingPlanResponse>;
}
export { Plan };
