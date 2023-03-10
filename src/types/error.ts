export type APIErrorResponse = {
    errors: APIError[]
}

export type APIRawError = {
    error_code: string
    error_messaage: string
}

export type APIError = {

}

export enum APIErrorType {
    UNKNOWN = 'UNKNOWN',

    /**
     * 1. APIバージョン指定におけるエラー
     * 
     * Invalid API Version
     */
    INVALID_API_VERSION = 'INVALID_API_VERSION',

    /**
     * 2. フォーマット誤りによるエラー
     * 
     * Bad Request because of invalid format field
     */
    INVALID_FORMAT = 'INVALID_FORMAT',

    /**
     * 3. 桁数オーバーによるエラー
     * 
     * Bad Request because of over length field
     */
    OVER_LENGTH = 'OVER_LENGTH',

    /**
     * 4. 必須フィールドの不足によるエラー
     * 
     * Bad Request because of missing required field
     */
    MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

    /**
     * 5. IDの重複など、既に存在するデータに対するエラー
     * 
     * Bad Request because of duplicate data
     */
    DUPLICATE = 'DUPLICATE',

    /**
     * 6. 存在しないデータに対するエラー
     * 
     * Bad Request because of not found data
     */
    NOT_FOUND = 'NOT_FOUND',
}