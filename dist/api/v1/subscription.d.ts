import { RequestInit } from "node-fetch";
import { RegisteringSubscriptionRequest, CancelingSubscriptionResponse, ListResponse, SubscriptionObject, RetrievingSubscriptionListPagination, UpdatingSubscriptionRequest, SubscriptionResultObject, RetrievingSubscriptionResultListPagination } from "../../types/index";
import { FincodeConfig } from "./fincode";
import { FincodePartialRequestHeader } from "./http";
declare class Subscription {
    private readonly _config;
    private readonly _agent;
    constructor(config: FincodeConfig, agent?: RequestInit["agent"]);
    /**
     * **Register a subscription**
     *
     * corresponds to `POST /v1/subscriptions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {RegisteringPaymentRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    register(body: RegisteringSubscriptionRequest, header?: FincodePartialRequestHeader): Promise<SubscriptionObject>;
    /**
     * **Retrieve subscription list**
     *
     * corresponds to `GET /v1/subscriptions`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<SubscriptionObject>>}
     */
    retrieveList(pagination: RetrievingSubscriptionListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<SubscriptionObject>>;
    /**
     * **Retrieve a subscription**
     *
     * corresponds to `GET /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {string} payType
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    retrieve(id: string, payType: "Card", header?: FincodePartialRequestHeader): Promise<SubscriptionObject>;
    /**
     * **Update a subscription**
     *
     * corresponds to `PUT /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {UpdatingSubscriptionRequest} body
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<SubscriptionObject>}
     */
    update(id: string, body: UpdatingSubscriptionRequest, header?: FincodePartialRequestHeader): Promise<SubscriptionObject>;
    /**
     * **Cancel a subscription**
     *
     * corresponds to `DELETE /v1/subscriptions/:id`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {string} payType
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<DeletingSubscriptionResponse>}
     */
    cancel(id: string, payType: "Card", header?: FincodePartialRequestHeader): Promise<CancelingSubscriptionResponse>;
    /**
     * **Retrieve subscription result list**
     *
     * corresponds to `GET /v1/subscriptions/:id/result`
     *
     * if the Promise is rejected, the error is an instance of `FincodeError`
     *
     * @param {string} id
     * @param {RetrievingSubscriptionResultListPagination} [pagination]
     * @param {FincodePartialRequestHeader} [header]
     *
     * @returns {Promise<ListResponse<SubscriptionResultObject>>}
     */
    retrieveResultList(id: string, pagination?: RetrievingSubscriptionResultListPagination, header?: FincodePartialRequestHeader): Promise<ListResponse<SubscriptionResultObject>>;
}
export { Subscription };
