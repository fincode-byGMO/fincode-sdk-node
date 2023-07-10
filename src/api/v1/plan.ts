import { RequestInit } from "node-fetch"
import {
    CreatingPlanRequest,
    DeletingPlanResponse,
    ListResponse,
    PlanObject,
    RetrievingPlanListPagination,
    UpdatingPlanRequest,

    APIErrorResponse,
    FincodeAPIError,
    FincodeSDKError,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http"
import { getFetchErrorMessage, getResponseJSONParseErrorMessage } from "./_errorMessages"

class Plan {

    private readonly _config: FincodeConfig
    private readonly _agent: RequestInit["agent"]

    constructor(config: FincodeConfig, agent?: RequestInit["agent"]) {
        this._config = config
        this._agent = agent
    }

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
    public create(
        body: CreatingPlanRequest,
        header?: FincodePartialRequestHeader
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "POST",
                "/v1/plans",
                JSON.stringify(body),
                header,
                undefined,
                this._agent,
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
                }).catch((e) => { reject(e) })
            }).catch((e) => { reject(e) })
        })
    }

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
    public retrieveList(
        pagination?: RetrievingPlanListPagination,
        header?: FincodePartialRequestHeader,
    ): Promise<ListResponse<PlanObject>> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                "/v1/plans",
                undefined,
                header,
                { pagination: pagination },
                this._agent,
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
                }).catch((e) => { reject(e) })
            }).catch((e) => { reject(e) })
        })
    }

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
    public retrieve(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "GET",
                `/v1/plans/${id}`,
                undefined,
                header,
                undefined,
                this._agent,
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
                }).catch((e) => { reject(e) })
            }).catch((e) => { reject(e) })
        })
    }

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
    public update(
        id: string,
        body: UpdatingPlanRequest,
        header?: FincodePartialRequestHeader,
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "PUT",
                `/v1/plans/${id}`,
                JSON.stringify(body),
                header,
                undefined,
                this._agent,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
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
     * if the Promise is rejected, the error is an instance of `FincodeError`
     * 
     * @param {string} id
     * @param {FincodePartialRequestHeader} [header]
     * 
     * @returns {Promise<DeletingPlanResponse>}
     */
    public delete(
        id: string,
        header?: FincodePartialRequestHeader,
    ): Promise<DeletingPlanResponse> {
        return new Promise((resolve, reject) => {
            const fetch = createFincodeRequestFetch(
                this._config,
                "DELETE",
                `/v1/plans/${id}`,
                undefined,
                header,
                undefined,
                this._agent,
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
                }).catch((e) => {
                    const err = new FincodeSDKError(getResponseJSONParseErrorMessage(), e)
                    reject(err)
                })
            }).catch((e) => {
                const err = new FincodeSDKError(getFetchErrorMessage(), e)
                reject(err)
            })
        })
    }

}

export { Plan }