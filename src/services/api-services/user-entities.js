
// Get token from local stoarge
export const getUserToken = () => {
    return JSON.parse(localStorage.getItem('user')).token
}
