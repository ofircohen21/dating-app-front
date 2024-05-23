import { baseUrl } from "./constants";
import { getUserToken } from "./user-entities";

export const fetchChats = async (userId) => {
    const url = `${baseUrl}/chats/${userId}`

    try {
        const token = getUserToken()
        const response = await fetch(url, {
            headers: { 'Authorization': token }
        });
        if (response.status === 200) {
            const result = await response.json();
            return result
        }
    } catch (error) {
        throw new Error('Failed to get chats')
    }
};
