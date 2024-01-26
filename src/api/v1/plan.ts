import {
    CreatingPlanRequest,
    DeletingPlanResponse,
    ListResponse,
    PlanObject,
    RetrievingPlanListQueryParams,
    UpdatingPlanRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodeRequestHeaders } from "./http.js"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages.js"

class Plan {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

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
    public create(
        body: CreatingPlanRequest,
        headers?: FincodeRequestHeaders
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/plans",
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json as PlanObject
                        resolve(plan)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
        })
    }

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
    public retrieveList(
        queryParams?: RetrievingPlanListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<PlanObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/plans",
                undefined,
                headers,
                queryParams
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const list = json as ListResponse<PlanObject>
                        resolve(list)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
        })
    }

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
    public retrieve(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/plans/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json as PlanObject
                        resolve(plan)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => { reject(e) })
            }).catch((e: unknown) => { reject(e) })
        })
    }

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
    public update(
        id: string,
        body: UpdatingPlanRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/plans/${id}`,
                JSON.stringify(body),
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json as PlanObject
                        resolve(plan)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

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
    public delete(
        id: string,
        headers?: FincodeRequestHeaders,
    ): Promise<DeletingPlanResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/plans/${id}`,
                undefined,
                headers,
                undefined,
            )

            fetch().then((res) => {
                res.json().then((json) => {
                    if (res.ok) {
                        const plan = json as DeletingPlanResponse
                        resolve(plan)
                    } else {
                        const errRes = json as APIErrorResponse
                        const e = new FincodeAPIError(errRes.errors, res.status, !!errRes.message)
                        reject(e)
                    }
                }).catch((e: unknown) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e: unknown) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

}

export { Plan }