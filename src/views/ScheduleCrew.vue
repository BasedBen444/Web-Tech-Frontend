<template>
    <div class="schedule-crew">
      <h2>Assign Crew to Game</h2>
  
      <label for="game">Select Game:</label>
      <select v-model="selectedGameId" @change="loadGameDetails">
        <option disabled value="">-- Choose a game --</option>
        <option
          v-for="(game, id) in allGames"
          :key="id"
          :value="game.id"
        >
          {{ game.date }} - {{ game.teams }}
        </option>
      </select>
  
      <div v-if="selectedGame">
        <h3>Required Crew</h3>
        <form @submit.prevent="submitAssignments">
          <div
            v-for="role in selectedGame.requiredCrewPositions"
            :key="role"
            class="role-group"
          >
            <label>{{ role }}</label>
            <select v-model="assignments[role]">
              <option disabled value="">-- Assign User --</option>
              <option
                v-for="user in eligibleUsers(role)"
                :key="user.id"
                :value="user.id"
              >
                {{ user.firstname }} {{ user.lastname }}
              </option>
            </select>
          </div>
  
          <button type="submit" class="submit-button">Assign Crew</button>
        </form>
      </div>
  
      <div v-if="successMessage" class="success-message">
        Crew successfully assigned!
      </div>
      <div v-if="errorMessage" class="error-message">
        Error: {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import scheduling from '@/apis/scheduling'
  import api from '@/apis/users'
  
  const schedules = ref([])
  const users = ref([])
  const selectedGameId = ref('')
  const selectedGame = ref(null)
  const selectedScheduleId = ref('')
  const assignments = ref({})
  const successMessage = ref(false)
  const errorMessage = ref('')
  
  const allGames = ref({})
  
  onMounted(async () => {
    try {
      schedules.value = await scheduling.findAllSchedules()
      users.value = await api.findAll()
  
      allGames.value = {}
      schedules.value.forEach(schedule => {
        schedule.games.forEach(game => {
          allGames.value[game.id] = {
            ...game,
            scheduleId: schedule.id
          }
        })
      })
    } catch (err) {
      console.error('Error loading data', err)
    }
  })
  
  function loadGameDetails() {
    const gameEntry = allGames.value[selectedGameId.value]
  
    if (!gameEntry || !Array.isArray(gameEntry.requiredCrewPositions)) {
      errorMessage.value = 'This game has no defined required crew.'
      selectedGame.value = null
      return
    }
  
    selectedGame.value = gameEntry
    selectedScheduleId.value = gameEntry.scheduleId
    assignments.value = {}
  
    gameEntry.requiredCrewPositions.forEach(role => {
      assignments.value[role] = ''
    })
  }
  
  function eligibleUsers(role) {
    return users.value.filter(user =>
      user.job?.toLowerCase() === role.toLowerCase() &&
      (user.availability || []).some(
        a => a.gameId === selectedGameId.value && a.available === true
      )
    )
  }
  
  async function submitAssignments() {
    successMessage.value = false
    errorMessage.value = ''
  
    try {
      await scheduling.assignCrewToGame(
        selectedScheduleId.value,
        selectedGameId.value,
        assignments.value
      )
      successMessage.value = true
    } catch (error) {
      errorMessage.value = error.message || 'Failed to assign crew'
    }
  }
  </script>
  
  <style scoped>
  .schedule-crew {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #f4f4f4;
    border-radius: 8px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-top: 1rem;
  }
  
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-top: 0.25rem;
  }
  
  .role-group {
    margin-bottom: 1rem;
  }
  
  .submit-button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: purple;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: darkviolet;
    transition: background-color 0.3s ease;
    color: white;
  }
  
  .success-message {
    color: green;
    margin-top: 1rem;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>
  