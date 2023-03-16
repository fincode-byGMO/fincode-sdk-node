// import {
//     APIRawErrorResponse,
//     BulkPaymentDetailObject,
//     BulkPaymentDetailPagination,
//     BulkPaymentObject,
//     BulkPaymentPagination,
//     DeletingBulkPaymentResponse,
//     ListResponse,
//     createFincodeRequestHeader,
//     createUnknownError,
//     formatErrorResponse,
// } from "../../types/index"
// import { FincodeConfig } from "./fincode"
// import { createFincodeRequest, createFincodeRequestURL } from "./http"
// import FormData from "form-data"
// import * as https from "https"

// class BulkPayment {

//     private readonly _config: FincodeConfig

//     constructor(config: FincodeConfig) {
//         this._config = config
//     }

//     /**
//      * **Register a bulk card payment**
//      *
//      * corresponds to `POST /v1/payments/bulk`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public register(
//         jsonFile: Buffer,
//         payType: "Card",
//         processDate: string,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<BulkPaymentObject> {

//         return new Promise((resolve, reject) => {

//             const _header = createFincodeRequestHeader({
//                 apiVersion: this._config.version,
//                 authorization: this._config.apiKey,
//                 idempotentKey: header?.idempotentKey,
//                 tenantShopId: header?.tenantShopId,
//             })

//             const form = new FormData()
//             form.append("file", jsonFile, {
//                 contentType: "application/json",
//             })

//             const options: https.RequestOptions = {
//                 method: "POST",
//                 headers: _header,
//             }

//             const url = createFincodeRequestURL(this._config, "/v1/payments/bulk", {
//                 pay_type: payType,
//                 process_plan_date: processDate,
//             })

//             const req = https.request(url, options)
//             req.write(form)
//             req.on("response", (res) => {
//                 const body: string[] = []
//                 res.on("data", (chunk) => {
//                     body.push(chunk)
//                 })
//                 res.on("end", () => {
//                     const json = JSON.parse(body.join(""))
//                     if (res.statusCode === 200) {
//                         const bulk = json as BulkPaymentObject

//                         resolve(bulk)
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
//      * **Retrieve bulk card payment list**
//      *
//      * corresponds to `GET /v1/payments/bulk`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public retrieveList(
//         pagination?: BulkPaymentPagination,
//         header?: Parameters<typeof createFincodeRequest>[4],
//     ): Promise<ListResponse<BulkPaymentObject>> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "GET",
//                 `/v1/payments/bulk`,
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
//                         const list = json as ListResponse<BulkPaymentObject>
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
//      * **Retrieve a bulk card payment detail**
//      *
//      * corresponds to `GET /v1/payments/bulk/:id`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public retrieveDetail(
//         id: string,
//         pagination?: BulkPaymentDetailPagination,
//         header?: Parameters<typeof createFincodeRequest>[4],
//     ): Promise<BulkPaymentDetailObject> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "GET",
//                 `/v1/payments/bulk/${id}`,
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
//                         const detail = json as BulkPaymentDetailObject
//                         resolve(detail)
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
//      * **Delete a bulk card payment**
//      *
//      * corresponds to `DELETE /v1/payments/bulk/:id`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public delete(
//         id: string,
//         header?: Parameters<typeof createFincodeRequest>[4],
//     ): Promise<DeletingBulkPaymentResponse> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "DELETE",
//                 `/v1/payments/bulk/${id}`,
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
//                         const detail = json as DeletingBulkPaymentResponse
//                         resolve(detail)
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
// export { BulkPayment }