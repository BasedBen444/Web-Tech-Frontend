const BASE_URL = 'http://localhost:3000/users'

const findAll = async () => {
    try {
        const response = await fetch(BASE_URL)
        if(!response.ok) {
            throw new Error(`Error fetching user profiles: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        if(!response.ok) {
            throw new Error(`Error fetching user profile: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default {findAll, findById}