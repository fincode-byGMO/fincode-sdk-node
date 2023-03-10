import Customer from "./types/customer"
import * as https from "https"
import * as http from "http"

const M_KEY = "m_test_NjY2YjRhNDItOWFjMS00ZWI5LTk5MmYtYjVlYjFkMGM5YWZiZjE2NDY0MDItODUwNS00NWIzLWE0MjAtNTQ1ZGE2MWNmZWM5c18yMjA4MDQwMjkwMA"

const main = async () => {
    const customerId = "cus_test_1"

    const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
        try {
            const request: Customer.CreatingRequest = {
                id: customerId,
                name: "from Node.js SDK",
            }

            const options: http.RequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${M_KEY}`,
                },
            }

            const url = `https://api.test.fincode.jp/v1/customers`

            const req = https.request(url, options)

            req.on("error", (e) => {
                console.error(e)
                reject(e)
            })
            req.on("response", (res) => {
                console.log(res)
                resolve(res)
            })
            req.write(JSON.stringify(request))
            req.end()
        } catch (e) {
            reject(e)
        }
    })

    console.log(res)
}


main().catch((e) => {
    console.error(e)
})