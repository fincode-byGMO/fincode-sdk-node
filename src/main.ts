import { createFincode } from "./api/v1/index"
import { FincodeError, RetrievingCustomerListPagination } from "./types/index"


const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

const main = async () => {
    const fincode = createFincode(secretKey, { isTest: true })
    const pagination = new RetrievingCustomerListPagination({
        count_only: true,
    })

    try {
        const { total_count } = await fincode.customer.retrieveList(pagination)
        console.log(total_count)
    } catch (e) {
        console.log("main catch")
        if (e instanceof FincodeError) {
            console.log(e.errors[0])
        }
    }
}

main()