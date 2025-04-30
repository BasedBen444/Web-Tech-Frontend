const BASE_URL = 'http://localhost:3000/schedules'

const createSchedule = async (gameData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    })

    if (!response.ok) {
      throw new Error(`Error creating schedule: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const findAllSchedules = async () => {
    try {
        const response = await fetch(BASE_URL)
        if(!response.ok) {
            throw new Error(`Error fetching schedules: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findScheduleById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        if(!response.ok) {
            throw new Error(`Error fetching schedule: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const createGame = async (scheduleId, gameData) => {
  try {
    // Get the existing schedule
    const response = await fetch(`${BASE_URL}/${scheduleId}`)
    if (!response.ok) {
      throw new Error(`Error fetching schedule: ${response.statusText}`)
    }
    const schedule = await response.json()

    // Add new game to existing games
    const updatedGames = [...schedule.games, gameData]

    // PATCH the updated games array
    const patchResponse = await fetch(`${BASE_URL}/${scheduleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ games: updatedGames })
    })

    if (!patchResponse.ok) {
      throw new Error(`Error adding game: ${patchResponse.statusText}`)
    }

    return await patchResponse.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const USERS_URL = 'http://localhost:3000/users'

const assignCrewToGame = async (scheduleId, gameId, assignments) => {
  try {
    // Fetch all users
    const usersRes = await fetch(USERS_URL)
    const users = await usersRes.json()

    // Get the schedule
    const scheduleRes = await fetch(`${BASE_URL}/${scheduleId}`)
    if (!scheduleRes.ok) throw new Error('Schedule not found')
    const schedule = await scheduleRes.json()

    // Find the game
    const gameIndex = schedule.games.findIndex(g => g.id === gameId)
    if (gameIndex === -1) throw new Error('Game not found')

    // Validate each role assignment
    for (const role in assignments) {
      const userId = assignments[role]
      const user = users.find(u => u.id === userId)

      if (!user) throw new Error(`User ${userId} not found`)

      // Fix: Compare job/role case-insensitively
      if (user.job?.toLowerCase() !== role.toLowerCase()) {
        throw new Error(`${user.firstname} does not match job: ${role}`)
      }

      const available = user.availability?.some(
        a => a.gameId === gameId && a.available === true
      )
      if (!available) {
        throw new Error(`${user.firstname} is not available for ${role}`)
      }
    }

    // Save crew assignments
    schedule.games[gameIndex].assignedCrew = assignments

    const updateRes = await fetch(`${BASE_URL}/${scheduleId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    })

    if (!updateRes.ok) throw new Error('Failed to save crew assignments')

    return await updateRes.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}



export default { createSchedule, findAllSchedules, findScheduleById, createGame, assignCrewToGame }