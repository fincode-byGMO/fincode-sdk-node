import {
    CreatingSubscriptionRequest,
    CancelingSubscriptionResponse,
    ListResponse,
    SubscriptionObject,
    UpdatingSubscriptionRequest,
    SubscriptionResultObject,
    RetrievingSubscriptionListQueryParams,
    RetrievingSubscriptionQueryParams,
    CancelingSubscriptionQueryParams,
    RetrievingSubscriptionResultListQueryParams,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class Subscription {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a subscription**
     * 
     * corresponds to `POST /v1/subscriptions`
     * 
     * @param {CreatingPaymentRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - created subscription object
     */
    public create(
        body: CreatingSubscriptionRequest,
        headers?: FincodeRequestHeaders
    ): Promise<SubscriptionObject> {
        return executeRequest<SubscriptionObject>(this._config, "POST", "/v1/subscriptions", {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Retrieve subscription list**
     * 
     * corresponds to `GET /v1/subscriptions`
     * 
     * @param {RetrievingSubscriptionListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<SubscriptionObject>>} - subscription object list
     */
    public retrieveList(
        queryParams: RetrievingSubscriptionListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<SubscriptionObject>> {
        return executeRequest<ListResponse<SubscriptionObject>>(this._config, "GET", "/v1/subscriptions", {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve a subscription**
     * 
     * corresponds to `GET /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - subscription object
     */
    public retrieve(
        id: string,
        queryParams: RetrievingSubscriptionQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<SubscriptionObject> {
        return executeRequest<SubscriptionObject>(this._config, "GET", `/v1/subscriptions/${id}`, {
            headers,
            queryParams,
        })
    }

    /**
     * **Update a subscription**
     * 
     * corresponds to `PUT /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {UpdatingSubscriptionRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<SubscriptionObject>} - updated subscription object
     */
    public update(
        id: string,
        body: UpdatingSubscriptionRequest,
        headers?: FincodeRequestHeaders,
    ): Promise<SubscriptionObject> {
        return executeRequest<SubscriptionObject>(this._config, "PUT", `/v1/subscriptions/${id}`, {
            body: JSON.stringify(body),
            headers,
        })
    }

    /**
     * **Cancel a subscription**
     * 
     * corresponds to `DELETE /v1/subscriptions/:id`
     * 
     * @param {string} id - subscription id
     * @param {CancelingSubscriptionQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CancelingSubscriptionResponse>} - canceled subscription object
     */
    public cancel(
        id: string,
        queryParams: CancelingSubscriptionQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<CancelingSubscriptionResponse> {
        return executeRequest<CancelingSubscriptionResponse>(this._config, "DELETE", `/v1/subscriptions/${id}`, {
            headers,
            queryParams,
        })
    }

    /**
     * **Retrieve subscription result list**
     * 
     * corresponds to `GET /v1/subscriptions/:id/result`
     * 
     * @param {string} id - subscription id
     * @param {RetrievingSubscriptionResultListQueryParams} [queryParams] - query parameters
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<ListResponse<SubscriptionResultObject>>} - subscription result object list
     */
    public retrieveResultList(
        id: string,
        queryParams?: RetrievingSubscriptionResultListQueryParams,
        headers?: FincodeRequestHeaders,
    ): Promise<ListResponse<SubscriptionResultObject>> {
        return executeRequest<ListResponse<SubscriptionResultObject>>(this._config, "GET", `/v1/subscriptions/${id}/result`, {
            headers,
            queryParams,
        })
    }
}

export { Subscription }
