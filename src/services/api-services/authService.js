import { baseUrl } from "./constants"

export const login = async (payload) => {
    const url = `${baseUrl}/login`

    const response = await fetch(url,
        {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    if (response.status === 200) {
        let responseBody = await response.json()
        return responseBody
    }

    if (response.status === 401) {
        throw new Error('Wrong username or password')
    }
}