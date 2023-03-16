// import { APIRawErrorResponse, CreatingCardRegistrationSessionRequest, CardRegistrationSessionObject, createUnknownError, formatErrorResponse } from "../../types/index.js"
// import { FincodeConfig } from "./fincode.js"
// import { createFincodeRequest } from "./http.js"

// class CardRegistrationSession {

//     private readonly _config: FincodeConfig

//     constructor(config: FincodeConfig) {
//         this._config = config
//     }

//     /**
//      * **Create a card card registration session**
//      *
//      * corresponds to `POST /v1/sessions`
//      *
//      * if the Promise is rejected, the error is an instance of `FincodeError`
//      */
//     public create(
//         body: CreatingCardRegistrationSessionRequest,
//         header?: Parameters<typeof createFincodeRequest>[4]
//     ): Promise<CardRegistrationSessionObject> {
//         return new Promise((resolve, reject) => {
//             const req = createFincodeRequest(
//                 this._config,
//                 "POST",
//                 `/v1/card_sessions`,
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
//                         const session = json as CardRegistrationSessionObject

//                         resolve(session)
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
// export { CardRegistrationSession }