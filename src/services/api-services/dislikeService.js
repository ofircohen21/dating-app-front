import { baseUrl } from "./constants"
import { getUserToken } from "./user-entities"

export const postDislikeAction = (payload) => {
    const url = `${baseUrl}/dislike`
    const token = getUserToken()

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}