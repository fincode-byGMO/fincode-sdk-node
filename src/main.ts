import fetch from "node-fetch"
import { createFincode } from "./api/v1/index.js"
import { FincodeError, RetrievingCustomerListPagination } from "./types/index.js"

const secretKey = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

const main = async () => {
    const fincode = createFincode(secretKey, { isTest: true })
    const pagination = new RetrievingCustomerListPagination({
        count_only: true,
    })

    try {

        // const { total_count } = await fincode.customer.retrieveList(pagination)
        // console.log(total_count)

        const zipCode = "2110016"
        const zipSearch = await fetch(
            `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`,
            {
                method: "GET",
            }
        ).then((res) => res.json())
        console.log(zipSearch)

    } catch (e) {
        console.log("main catch")
        console.log(e)
    }
}

main()