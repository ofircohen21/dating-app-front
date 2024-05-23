import { baseUrl } from "./constants";
import { getUserToken } from "./user-entities";

export const postLikeAction = (payload) => {
    const url = `${baseUrl}/likes`
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


export const fetchLikes = async (userId) => {
    const url = `${baseUrl}/likes/${userId}`
    const token = getUserToken()

    const response = await fetch(url, {
        headers: { 'Authorization': token }
    });

    if (response.status === 200) {
        const result = await response.json();
        return result
    }

    throw new Error('Failed to get likes')
};
