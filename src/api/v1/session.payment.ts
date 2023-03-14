import { APIRawErrorResponse, CreatingPaymentSessionRequest, PaymentSessionObject, createUnknownError, formatErrorResponse } from "../../types/index"
import { FincodeConfig } from "./fincode"
import { createFincodeRequest } from "./http"

class PaymentSession {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Create a card payment session**
     * 
     * corresponding to `POST /v1/sessions`
     * 
     * if rejected, the error is a instance of `FincodeError`
     */
    public create(
        body: CreatingPaymentSessionRequest,
        header?: Parameters<typeof createFincodeRequest>[4]
    ): Promise<PaymentSessionObject> {
        return new Promise((resolve, reject) => {
            const req = createFincodeRequest(
                this._config,
                "POST",
                `/v1/sessions`,
                JSON.stringify(body),
                header,
            )

            req.on("response", res => {
                const body: string[] = []
                res.on("data", chunk => {
                    body.push(chunk)
                })
                res.on("end", () => {
                    const json = JSON.parse(body.join(""))
                    if (res.statusCode === 200) {
                        const session = json as PaymentSessionObject

                        resolve(session)
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
export { PaymentSession }