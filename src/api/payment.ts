import Payment from "./../types/payment"
import { FincodeInstance } from "./fincode"
import * as https from "https"

class Payment {
    public _orderID: string | undefined
    public _accessID: string | undefined

    public _fincode: FincodeInstance

    constructor(fincode: FincodeInstance, orderID?: string) {
        this._fincode = fincode
        this._orderID = orderID
    }

    public create(req: Payment.RegisteringRequest): Promise<Payment.Payment> {
    }
}
