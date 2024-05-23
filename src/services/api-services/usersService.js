import { baseUrl } from "./constants"
import { getUserToken } from "./user-entities";

export const registerUser = async (payload) => {
    const url = `${baseUrl}/users`

    const response = await fetch(url,
        {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    if (response.status === 201) {
        const responseBody = await response.json()

        return responseBody
    }
    if (response.status === 409) {
        throw new Error('User name is taken, try another one')
    }

    throw new Error('Failed to register user')
}
export const getUser = async (userId) => {
    const url = `${baseUrl}/users/${userId}`
    const token = getUserToken()

    const response = await fetch(url, {
        headers: { 'Authorization': token }
    });

    if (response.status === 200) {
        const user = await response.json();
        return user
    }
    throw new Error('Failed to get user data');
}

export const updateUser = async (userId, payload) => {
    const url = `${baseUrl}/users/${userId}`
    const token = getUserToken()

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    if (response.status !== 200) {
        throw new Error('Failed to update user')
    }
}

export const deleteUser = async (userId) => {
    const url = `${baseUrl}/users/${userId}`
    const token = getUserToken()

    const response = await fetch(url, {
        method: 'DELETE',
        'headers': { 'Authorization': token }
    })

    if (response.status === 200) {
        return { userId }
    } else {
        throw new Error('Failed to delete user')
    }
}