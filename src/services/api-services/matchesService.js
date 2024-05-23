import match from '../../assets/match1.png'
import { baseUrl } from './constants';
import { getUserToken } from './user-entities';

export const getFilteredMatches = async (userId, minAge, maxAge, distance, gender) => {
    const queryParams = queryParamsBuilder(userId, minAge, maxAge, distance, gender)

    const url = `${baseUrl}/matches?${queryParams}`
    const token = getUserToken()

    const response = await fetch(url, {
        headers: { 'Authorization': token }
    });

    if (response.status === 200) {
        const result = await response.json();
        if (result) {
            result.forEach(element => {
                // Assigning image to element 
                element['image'] = match
            });
        }
        return result
    }

    throw new Error('Failed to get matches')
}

const queryParamsBuilder = (userId, minAge, maxAge, distance, gender) => {
    return `userId=${userId}&minAge=${minAge}&maxAge=${maxAge}&distance=${distance}&gender=${gender}`
}