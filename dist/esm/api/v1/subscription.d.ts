import { CreatingSubscriptionRequest, CancelingSubscriptionResponse, ListResponse, SubscriptionObject, UpdatingSubscriptionRequest, SubscriptionResultObject, RetrievingSubscriptionListQueryParams, RetrievingSubscriptionQueryParams, CancelingSubscriptionQueryParams, RetrievingSubscriptionResultListQueryParams } from "../../types/index.js";
import { FincodeConfig } from "./fincode.js";
import { FincodeRequestHeaders } from "./http.js";
declare class Subscription {
    private readonly _config;
    constructor(config: FincodeConfig);
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
    create(body: CreatingSubscriptionRequest, headers?: FincodeRequestHeaders): Promise<SubscriptionObject>;
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
    retrieveList(queryParams: RetrievingSubscriptionListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<SubscriptionObject>>;
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
    retrieve(id: string, queryParams: RetrievingSubscriptionQueryParams, headers?: FincodeRequestHeaders): Promise<SubscriptionObject>;
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
    update(id: string, body: UpdatingSubscriptionRequest, headers?: FincodeRequestHeaders): Promise<SubscriptionObject>;
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
    cancel(id: string, queryParams: CancelingSubscriptionQueryParams, headers?: FincodeRequestHeaders): Promise<CancelingSubscriptionResponse>;
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
    retrieveResultList(id: string, queryParams?: RetrievingSubscriptionResultListQueryParams, headers?: FincodeRequestHeaders): Promise<ListResponse<SubscriptionResultObject>>;
}
export { Subscription };
