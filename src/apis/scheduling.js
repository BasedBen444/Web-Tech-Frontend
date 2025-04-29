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

export default { createSchedule, findAllSchedules, findScheduleById, createGame }