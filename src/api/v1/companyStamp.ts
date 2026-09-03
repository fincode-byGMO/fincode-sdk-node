import { FormData } from "undici"
import {
    CompanyStampObject,
    RegisteringCompanyStampRequest,
} from "../../types/index"
import { FincodeConfig } from "./fincode"
import { FincodeRequestHeaders } from "./http"
import { executeRequest } from "./_request"

class CompanyStamp {

    private readonly _config: FincodeConfig

    constructor(config: FincodeConfig) {
        this._config = config
    }

    /**
     * **Register a company stamp**
     * 
     * corresponds to `POST /v1/company_stamps`
     * 
     * The stamp is put on the invoices the shop issues. Registering again
     * replaces the one already there.
     * 
     * The main shop of a platform can register a stamp for a tenant by naming
     * it in `headers.tenantShopId`.
     * 
     * @param {RegisteringCompanyStampRequest} body - request body
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CompanyStampObject>} - registered company stamp object
     */
    public register(
        body: RegisteringCompanyStampRequest,
        headers?: FincodeRequestHeaders
    ): Promise<CompanyStampObject> {

        // multipart/form-data
        const formData = new FormData()
        formData.append(
            "data",
            new Blob([body.data], { type: body.contentType ?? "application/octet-stream" }),
            body.fileName,
        )

        return executeRequest<CompanyStampObject>(this._config, "POST", "/v1/company_stamps", {
            body: formData,
            headers,
        })
    }

    /**
     * **Retrieve the company stamp**
     * 
     * corresponds to `GET /v1/company_stamps`
     * 
     * Answers with every field set to `null` when no stamp is registered.
     * 
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CompanyStampObject>} - retrieved company stamp object
     */
    public retrieve(
        headers?: FincodeRequestHeaders
    ): Promise<CompanyStampObject> {
        return executeRequest<CompanyStampObject>(this._config, "GET", "/v1/company_stamps", {
            headers,
        })
    }

    /**
     * **Delete the company stamp**
     * 
     * corresponds to `DELETE /v1/company_stamps`
     * 
     * Deleting when no stamp is registered fails rather than doing nothing.
     * 
     * @param {FincodeRequestHeaders} [headers] - request header
     * 
     * @returns {Promise<CompanyStampObject>} - deleted company stamp object
     */
    public delete(
        headers?: FincodeRequestHeaders
    ): Promise<CompanyStampObject> {
        return executeRequest<CompanyStampObject>(this._config, "DELETE", "/v1/company_stamps", {
            headers,
        })
    }
}

export { CompanyStamp }
