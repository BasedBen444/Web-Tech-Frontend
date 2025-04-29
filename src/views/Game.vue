<template>
    <div v-if="loading">Loading game details...</div>
  
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>
  
    <div v-else-if="game">
      <h2>{{ game.teams }}</h2>
      <ul>
        <li><strong>Date:</strong> {{ game.date }}</li>
        <li><strong>Start Time:</strong> {{ game.startTime }} {{ game.timezone }}</li>
        <li><strong>End Time:</strong> {{ game.endTime }} {{ game.timezone }}</li>
        <li><strong>Sport:</strong> {{ game.sport }}</li>
        <li><strong>Network:</strong> {{ game.network }}</li>
        <li><strong>Location:</strong> {{ game.location }}</li>
        <li><strong>Notes:</strong> {{ game.notes }}</li>
        <li>
          <strong>Required Crew:</strong>
          <ul>
            <li v-for="(crew, index) in game.requiredCrewPositions" :key="index">
              {{ crew }}
            </li>
          </ul>
        </li>
      </ul>
  
      <router-link :to="{ name: 'schedule', params: { id: scheduleId } }" class="back-link">
        ← Back to Schedule
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/apis/scheduling' //  scheduling api
  
  const route = useRoute()
  
  const loading = ref(true)
  const error = ref(null)
  const game = ref(null)
  const scheduleId = ref(null)
  
  async function loadGame() {
    loading.value = true
    error.value = null
    game.value = null
  
    try {
      scheduleId.value = route.params.id
      const schedule = await api.findScheduleById(scheduleId.value)
  
      if (!schedule || !schedule.games) {
        throw new Error('Schedule or games not found')
      }
  
      game.value = schedule.games.find(g => g.id === route.params.gameId)
  
      if (!game.value) {
        throw new Error('Game not found in this schedule')
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  onMounted(loadGame)
  
  // Also reload when clicking a different game
  watch(() => route.params.gameId, () => {
    loadGame()
  })
  </script>
  
  <style scoped>
  .back-link {
    display: inline-block;
    margin-top: 1.5rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  </style>  