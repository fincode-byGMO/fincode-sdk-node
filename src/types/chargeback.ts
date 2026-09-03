import { Modify } from "../utils/utilTypes"
import { Pagination } from "./pagination"

/**
 * Category of a chargeback.
 * 
 * - `0`: Suspected fraud.
 * - `1`: Investigation request.
 * - `2`: Confirmed fraud.
 */
export type ChargebackCategory = 0 | 1 | 2

/**
 * Status of a chargeback.
 * 
 * - `4005`: Action required.
 * - `4006`: Replied.
 * - `4007`: Replied.
 * - `4009`: Refund of the sale settled. Reverted afterwards when `canceled` is `"true"`.
 * - `4011`: Replied.
 */
export type ChargebackStatusCode = 4005 | 4006 | 4007 | 4009 | 4011

/**
 * What the cardholder claims.
 * 
 * - `1`: Hold the delivery.
 * - `2`: Stop the delivery.
 * - `11`: Does not recognize the transaction.
 * - `12`: Service was not provided.
 * - `13`: Service was not performed.
 * - `14`: Goods did not arrive.
 * - `15`: Goods differ from the order.
 * - `16`: Amount differs from the order.
 * - `17`: Goods are defective.
 * - `18`: Cancellation was not processed.
 * - `19`: Asks how to cancel.
 * - `20`: Asks for the cancellation to be done on their behalf.
 * - `21`: Asks where to make an enquiry.
 * - `22`: Asks what the transaction was.
 */
export type ChargebackRequest = 1 | 2 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22

/**
 * Chargeback Object
 */
export type ChargebackObject = {
    /**
     * Chargeback ID.
     */
    id?: number | null

    /**
     * Shop ID.
     */
    shop_id?: string | null

    /**
     * Order ID of the payment this chargeback is against.
     */
    order_id?: string | null

    /**
     * Amount of the payment.
     */
    amount?: number | null

    /**
     * Date the payment was registered.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    trade_registration_date?: string | null

    /**
     * Category of this chargeback.
     * 
     * - `0`: Suspected fraud.
     * - `1`: Investigation request.
     * - `2`: Confirmed fraud.
     */
    category?: ChargebackCategory | null

    /**
     * Status of this chargeback.
     */
    status_code?: ChargebackStatusCode | null

    /**
     * What the cardholder claims.
     */
    request?: ChargebackRequest | null

    /**
     * Date of the order.
     */
    process_date?: string | null

    /**
     * Date fincode notified the shop.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    opened_to_shop_date?: string | null

    /**
     * Whether this chargeback was canceled.
     * 
     * - `"true"`: the chargeback was canceled.
     * - `"false"`: an ordinary chargeback.
     */
    canceled?: "true" | "false" | null

    /**
     * Date this chargeback was canceled.
     * 
     * Format: `yyyy/MM/dd HH:mm`
     */
    canceled_date?: string | null
}

/**
 * Query parameters of Retrieving a list of chargebacks. (used for GET /v1/shop_charge_backs)
 */
export type RetrievingChargebackListQueryParams = Modify<Pagination, {
    /**
     * Order ID of the payment.
     */
    order_id?: string | null

    /**
     * Amount of the payment.
     */
    amount?: number | null

    /**
     * What the cardholder claims.
     * 
     * Multiple values narrow the list down to chargebacks with any of them.
     */
    request?: ChargebackRequest | ChargebackRequest[] | null

    /**
     * Status of the chargeback.
     * 
     * Multiple values narrow the list down to chargebacks in any of them.
     */
    status_code?: ChargebackStatusCode | ChargebackStatusCode[] | null

    /**
     * Category of the chargeback.
     * 
     * Multiple values narrow the list down to chargebacks in any of them.
     */
    category?: ChargebackCategory | ChargebackCategory[] | null

    /**
     * Whether the chargeback was canceled.
     * 
     * Only applies together with `status_code` `4009`; ignored otherwise.
     * Leave it out to get both.
     */
    canceled?: boolean | null

    /**
     * Date of the order (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    process_date_since?: string | null

    /**
     * Date of the order (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    process_date_until?: string | null

    /**
     * Date fincode notified the shop (from)
     * 
     * Format: `yyyy/MM/dd`
     */
    opened_to_shop_date_since?: string | null

    /**
     * Date fincode notified the shop (to)
     * 
     * Format: `yyyy/MM/dd`
     */
    opened_to_shop_date_until?: string | null
}>

/**
 * Request body of Replying to a chargeback
 * (used for POST /v1/shop_charge_backs/{id}/reply)
 */
export type ReplyingChargebackRequest = {
    /**
     * Phone number the cardholder can reach the shop on.
     */
    contact_tel?: string | null

    /**
     * Business hours of the shop.
     */
    business_hours?: string | null

    /**
     * Whether the goods were shipped or the service provided.
     */
    delivered?: boolean | null

    /**
     * Delivery company.
     */
    delivery_provider?: string | null

    /**
     * Tracking number of the delivery.
     */
    receipt_number?: string | null

    /**
     * Name of the person who placed the order.
     */
    orderer_name?: string | null

    /**
     * Address of the person who placed the order.
     */
    orderer_address?: string | null

    /**
     * Phone number of the person who placed the order.
     */
    orderer_tel?: string | null

    /**
     * Email address of the person who placed the order.
     */
    orderer_mail?: string | null

    /**
     * Name of the person who received the goods.
     */
    receiver_name?: string | null

    /**
     * Address the goods were delivered to.
     */
    receiver_address?: string | null

    /**
     * Phone number of the person who received the goods.
     */
    receiver_tel?: string | null

    /**
     * Whether the goods or service were provided.
     */
    provides_product?: boolean | null

    /**
     * Details of the goods or service.
     */
    product_detail?: string | null

    /**
     * Note for the fincode team.
     */
    memo?: string | null
}

/**
 * Request body of Uploading a file for a chargeback
 * (used for POST /v1/charge_backs/file_upload)
 */
export type UploadingChargebackFileRequest = {
    /**
     * Shop ID the chargeback belongs to.
     */
    shop_id: string

    /**
     * Chargeback ID the file is evidence for.
     */
    charge_back_id: number

    /**
     * File to upload.
     */
    data: Buffer | string

    /**
     * File name of the `data`, 1 to 255 characters.
     * 
     * The extension is taken from what follows the last dot, so the name has
     * to carry one.
     */
    fileName: string

    /**
     * MIME type of the `data`.
     * 
     * Defaults to `application/octet-stream`.
     */
    contentType?: string
}

/**
 * Response object of Uploading a file for a chargeback
 * (used for POST /v1/charge_backs/file_upload)
 */
export type UploadingChargebackFileResponse = {
    examination_files?: {
        /**
         * Shop ID the file was accepted for.
         */
        shop_id?: string | null

        /**
         * Kind of the uploaded file.
         */
        type?: number | null

        /**
         * File name including the extension.
         */
        filename?: string | null

        /**
         * File size in bytes.
         */
        filesize?: number | null
    }[] | null
}
