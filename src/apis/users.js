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

  const sendInvite = async (email) => {
    try {
      const inviteData = {
        email: email,
        sentDate: new Date().toISOString(),
        signupLink: 'http://localhost:5173/signup' // 🔥 Static signup link
      }
  
      const response = await fetch('http://localhost:3000/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inviteData)
      })
  
      if (!response.ok) {
        throw new Error(`Error sending invite: ${response.statusText}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const submitAvailability = async (userId, gameId, available, comment = '') => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`)
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`)
      }
  
      const user = await response.json()
  
      if (!Array.isArray(user.availability)) {
        user.availability = []
      }
  
      const existing = user.availability.find(entry => entry.gameId === gameId)
  
      if (existing) {
        existing.available = available
        existing.comment = comment
      } else {
        user.availability.push({ gameId, available, comment })
      }
  
      const updateResponse = await fetch(`${BASE_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
  
      if (!updateResponse.ok) {
        throw new Error(`Error updating availability: ${updateResponse.statusText}`)
      }
  
      return await updateResponse.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  
  const getAvailability = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`)
      if (!response.ok) {
        throw new Error(`Error fetching user availability: ${response.statusText}`)
      }
  
      const user = await response.json()
      return user.availability || []
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  

export default {findAll, findById, createUser, deleteUser, sendInvite, submitAvailability, getAvailability}