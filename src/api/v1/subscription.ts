// import {
//     APIRawErrorResponse,
//     CancelingSubscriptionResponse,
//     ListResponse,
//     RegisteringSubscriptionRequest,
//     RetrievingSubscriptionListPagination,
//     RetrievingSubscriptionResultListPagination,
//     SubscriptionObject,
//     SubscriptionResultObject,
//     UpdatingSubscriptionRequest,
//     createUnknownError,
//     formatErrorResponse
// } from "../../types/index.js"
// import { FincodeConfig } from "./fincode.js"
// import { createFincodeRequest } from "./http.js"


// class Subscription {

//     private readonly _config: FincodeConfig

//     constructor(config: FincodeConfig) {
//         this._config = config
//     }

//     /**
//      * **Create a subscription**
//      *
//      * corresponds to `POST /v1/subscriptions`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public register(
//         customerId: string,
//         body: RegisteringSubscriptionRequest,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<SubscriptionObject> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "POST",
//                 `/v1/customers/${customerId}/subscriptions`,
//                 JSON.stringify(body),
//                 header,
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const payment = json as SubscriptionObject
//                         resolve(payment)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//             })
//             req.end()
//         })
//     }

//     /**
//      * **Retrieve subscription list**
//      *
//      * corresponds to `GET /v1/subscriptions`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public retrieveList(
//         pagination?: RetrievingSubscriptionListPagination,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<ListResponse<SubscriptionObject>> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "GET",
//                 `/v1/subscriptions`,
//                 undefined,
//                 header,
//                 { pagination: pagination }
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const list = json as ListResponse<SubscriptionObject>
//                         resolve(list)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//             })
//             req.end()
//         })
//     }


//     /**
//      * **Retrieve a subscription**
//      *
//      * corresponds to `GET /v1/subscriptions/:id`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public retrieve(
//         id: string,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<SubscriptionObject> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "GET",
//                 `/v1/subscriptions/${id}`,
//                 undefined,
//                 header,
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const payment = json as SubscriptionObject
//                         resolve(payment)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//             })
//             req.end()
//         })
//     }

//     /**
//      * **Update a subscription**
//      *
//      * corresponds to `PUT /v1/subscriptions/:id`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public update(
//         id: string,
//         body: UpdatingSubscriptionRequest,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<SubscriptionObject> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "PUT",
//                 `/v1/subscriptions/${id}`,
//                 JSON.stringify(body),
//                 header,
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const payment = json as SubscriptionObject
//                         resolve(payment)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//                 res.on("error", err => {
//                 })
//             })
//             req.end()
//         })
//     }

//     /**
//      * **Delete a subscription**
//      *
//      * corresponds to `DELETE /v1/subscriptions/:id`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public cancel(
//         id: string,
//         header?: Parameters<typeof createFincodeRequest>[4],
//     ): Promise<CancelingSubscriptionResponse> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "DELETE",
//                 `/v1/subscriptions/${id}`,
//                 undefined,
//                 header,
//                 { pay_type: "Card" }
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const payment = json as CancelingSubscriptionResponse
//                         resolve(payment)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//                 res.on("error", err => {
//                 })
//             })
//             req.end()
//         })
//     }

//     /**
//      * **Retrieve subscription result list**
//      *
//      * corresponds to `GET /v1/subscriptions/:id/result`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public retrieveResultList(
//         id: string,
//         pagination: RetrievingSubscriptionResultListPagination,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<ListResponse<SubscriptionResultObject>> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "GET",
//                 `/v1/subscriptions/${id}/result`,
//                 undefined,
//                 header,
//                 { pagination: pagination }
//             )

//             req.on("response", res => {
//                 const body: string[] = []
//                 res.on("data", chunk => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const list = json as ListResponse<SubscriptionResultObject>
//                         resolve(list)
//                     } else {
//                         try {
//                             const errRes = json as APIRawErrorResponse
//                             const err = formatErrorResponse(errRes)
//                             reject(err)
//                         } catch (e) {
//                             const message = (e instanceof Error) ? e.message : undefined
//                             const err = createUnknownError(message)
//                             reject(err)
//                         }
//                     }
//                 })
//             })
//             req.end()
//         })
//     }
// }

// export { Subscription }