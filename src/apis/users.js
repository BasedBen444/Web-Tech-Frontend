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

const createUser = async (user) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error(`Error creating user: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteUser = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`)
      }
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

export default {findAll, findById, createUser, deleteUser}