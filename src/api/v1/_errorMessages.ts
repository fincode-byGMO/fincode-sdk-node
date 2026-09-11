import { FincodeSDKErrorKind } from "../../types/index"

export const getRequestErrorMessage = (kind: FincodeSDKErrorKind): string => {
    switch (kind) {
        case "timeout":
            return "Request timed out"
        case "network":
            return "Failed to send the request"
        case "response_body":
            return "Failed to parse response body"
        case "unknown":
            return "Error fetching data"
    }
}
