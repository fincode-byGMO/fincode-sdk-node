import { APIRawErrorResponse, CreatingPlanRequest, DeletingPlanResponse, ListResponse, PlanObject, RetrievingPlanListPagination, UpdatingPlanRequest, createUnknownError, formatErrorResponse } from "../../types/index.js"
import { FincodeConfig } from "./fincode.js"
import { createFincodeRequestFetch, FincodePartialRequestHeader } from "./http.js"

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
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const payment = json as PlanObject
                        resolve(payment)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
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
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const list = json as ListResponse<PlanObject>
                        resolve(list)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
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
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const plan = json as PlanObject
                        resolve(plan)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
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
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const plan = json as PlanObject
                        resolve(plan)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
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
                {},
            )

            fetch().then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        const resp = json as DeletingPlanResponse
                        resolve(resp)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                } else {
                    res.json().then((json) => {
                        const errRes = json as APIRawErrorResponse
                        const err = formatErrorResponse(errRes)
                        reject(err)
                    }).catch((e) => {
                        const message = (e instanceof Error) ? e.message : undefined
                        const err = createUnknownError(message)
                        reject(err)
                    })
                }
            }).catch((e) => {
                const message = (e instanceof Error) ? e.message : undefined
                const err = createUnknownError(message)
                reject(err)
            })
        })
    }

}

export { Plan }