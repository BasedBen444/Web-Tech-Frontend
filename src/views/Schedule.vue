<template>
  <div class="schedule-details-container">
    <h2>Schedule Details</h2>

    <div v-if="loading">
      Loading schedule...
    </div>

    <div v-else-if="error">
      Error loading schedule: {{ error }}
    </div>

    <div v-else-if="schedule">
      <!-- Game List or Game Details -->
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          v-if="$route.name === 'game'"
        />
        <GameList
          v-else
          :games="schedule.games"
          :scheduleId="schedule.id"
        />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/apis/scheduling'
import GameList from '@/components/GameList.vue'

const route = useRoute()

const schedule = ref(null)
const loading = ref(true)
const error = ref(null)

async function loadSchedule(scheduleId) {
  loading.value = true
  error.value = null
  schedule.value = null

  try {
    schedule.value = await api.findScheduleById(scheduleId)
  } catch (err) {
    error.value = err.message || 'Unknown error loading schedule'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSchedule(route.params.id)
})

// If user clicks another schedule while already on /schedules, re-load
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadSchedule(newId)
  }
})
</script>

<style scoped>
.schedule-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.button-group {
  text-align: center;
  margin-top: 2rem;
}

.create-game-link {
  text-decoration: none;
}

.create-game-button {
  padding: 0.75rem 2rem;
  background-color: purple;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.create-game-button:hover {
  background-color: darkviolet;
  transform: translateY(-2px);
}

.create-game-button:active {
  background-color: #004494;
  transform: translateY(1px);
}
</style>

