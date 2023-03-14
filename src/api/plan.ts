import {
    APIRawErrorResponse,
    DeletingPlanResponse,
    ListResponse,
    PlanObject,
    RegisteringPlanRequest,
    RetrievingPlantListPagination,
    UpdatingPlanRequest,
    createUnknownError,
    formatErrorResponse
} from "../types"
import { FincodeConfig } from "./fincode"
import { createFincodeRequest } from "./http"

class Plan {
    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a plan**
     * 
     * corresponding to `POST /v1/plans`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public register(
        body: RegisteringPlanRequest,
        headers: Parameters<typeof createFincodeRequest>[4],
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/plans`,
                JSON.stringify(body),
                headers,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const plan = json as PlanObject

                        resolve(plan)
                    } else {
                        try {
                            const errRes = json as APIRawErrorResponse
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Retrieve plan list**
     * 
     * corresponding to `GET /v1/plans`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieveList(
        pagination?: RetrievingPlantListPagination,
        headers?: Parameters<typeof createFincodeRequest>[4],
    ): Promise<ListResponse<PlanObject>> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/plans`,
                undefined,
                headers,
                { pagination: pagination },
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const list = json as ListResponse<PlanObject>

                        resolve(list)
                    } else {
                        try {
                            const errRes = json as APIRawErrorResponse
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Retrieve a plan**
     * 
     * corresponding to `GET /v1/plans/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public retrieve(
        id: string,
        headers: Parameters<typeof createFincodeRequest>[4],
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "GET",
                `/v1/plans/${id}`,
                undefined,
                headers,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const plan = json as PlanObject

                        resolve(plan)
                    } else {
                        try {
                            const errRes = json as APIRawErrorResponse
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Update a plan**
     * 
     * corresponding to `PUT /v1/plans/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public update(
        id: string,
        body: UpdatingPlanRequest,
        headers: Parameters<typeof createFincodeRequest>[4],
    ): Promise<PlanObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "PUT",
                `/v1/plans/${id}`,
                JSON.stringify(body),
                headers,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const plan = json as PlanObject

                        resolve(plan)
                    } else {
                        try {
                            const errRes = json as APIRawErrorResponse
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }

    /**
     * **Delete a plan**
     * 
     * corresponding to `DELETE /v1/plans/:id`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public delete(
        id: string,
        headers: Parameters<typeof createFincodeRequest>[4],
    ): Promise<DeletingPlanResponse> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "DELETE",
                `/v1/plans/${id}`,
                undefined,
                headers,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const plan = json as DeletingPlanResponse

                        resolve(plan)
                    } else {
                        try {
                            const errRes = json as APIRawErrorResponse
                            const err = formatErrorResponse(errRes)
                            reject(err)
                        } catch (e) {
                            const message = (e instanceof Error) ? e.message : undefined
                            const err = createUnknownError(message)
                            reject(err)
                        }
                    }
                })
            })
            req.end()
        })
    }
}
export { Plan }