/**
 * Company Stamp Object
 */
export type CompanyStampObject = {
    /**
     * Shop ID the stamp belongs to.
     */
    shop_id?: string | null

    /**
     * Stamp image as a data URI, base64 encoded.
     * 
     * For example `data:image/png;base64,iVBORw0KGgo...`.
     */
    data?: string | null

    /**
     * File name including the extension.
     */
    filename?: string | null

    /**
     * Extension of the file (`png`, `jpg` or `jpeg`).
     */
    extension?: string | null

    /**
     * Delete flag.
     * 
     * - `0`: Not deleted
     */
    delete_flag?: "0" | null

    /**
     * Date this stamp was registered.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    create_date?: string | null

    /**
     * Date this stamp was updated.
     * 
     * Format: `yyyy/MM/dd HH:mm:ss.SSS`
     */
    update_date?: string | null
}

/**
 * Request body of Registering a company stamp (used for POST /v1/company_stamps)
 */
export type RegisteringCompanyStampRequest = {
    /**
     * Stamp image, up to 512KB.
     */
    data: Buffer | string

    /**
     * File name of the `data`.
     * 
     * The extension has to be `png`, `jpg` or `jpeg`.
     */
    fileName: string

    /**
     * MIME type of the `data`.
     * 
     * Defaults to `application/octet-stream`.
     */
    contentType?: string
}
