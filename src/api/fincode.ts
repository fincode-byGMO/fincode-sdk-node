interface FincodeInstance {
    version: string | undefined
    isTest: boolean
    apiKey: string
}

class Fincode implements FincodeInstance {
    public _version: string | undefined
    get version() { return this._version }

    public _isTest: boolean
    get isTest() { return this._isTest }

    public _apiKey: string
    get apiKey() { return this._apiKey }
    set apiKey(value: string) { this._apiKey = value }

    constructor(apiKey: string, isTest: boolean = true, version?: string) {
        this._version = version
        this._isTest = isTest
        this._apiKey = apiKey
    }
}
export { Fincode, FincodeInstance }

type FincodeInitConfig = {
    isTest?: boolean
    version?: string
}
export type { FincodeInitConfig }

const createFincode = (apiKey: string, config?: FincodeInitConfig): Fincode => {
    const fincode = new Fincode(apiKey, config?.isTest, config?.version)
    return fincode
}
export { createFincode }