<template>
  <div class="create-game-container">
    <h2>Create New Game for Schedule</h2>

    <form @submit.prevent="submitGame">
      <label>
        Date:
        <input v-model="game.date" type="date" required />
      </label>

      <label>
        Start Time:
        <input v-model="game.startTime" type="time" required />
      </label>

      <label>
        End Time:
        <input v-model="game.endTime" type="time" required />
      </label>

      <label>
        Timezone:
        <input v-model="game.timezone" type="text" value="CST" required />
      </label>

      <label>
        Sport:
        <input v-model="game.sport" type="text" required />
      </label>

      <label>
        Teams:
        <input v-model="game.teams" type="text" required />
      </label>

      <label>
        Network:
        <input v-model="game.network" type="text" required />
      </label>

      <label>
        Location:
        <input v-model="game.location" type="text" required />
      </label>

      <label>
        Notes:
        <textarea v-model="game.notes"></textarea>
      </label>

      <label>
        Required Crew Positions (comma separated):
        <input v-model="crewInput" type="text" />
      </label>

      <div class="button-group">
        <button type="submit">Create Game</button>
      </div>

      <div v-if="success" class="success-msg">✅ Game created successfully!</div>
      <div v-if="error" class="error-msg">❌ Failed to create game. Try again.</div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/apis/scheduling'

const route = useRoute()
const router = useRouter() 

const scheduleId = ref('')

// Automatically load the scheduleId from the URL
onMounted(() => {
  scheduleId.value = route.params.scheduleId
})

const game = ref({
  id: '', 
  date: '',
  startTime: '',
  endTime: '',
  timezone: '',
  sport: '',
  teams: '',
  network: '',
  location: '',
  notes: '',
  requiredCrewPositions: []
})

const crewInput = ref('')
const success = ref(false)
const error = ref(false)

async function submitGame() {
  success.value = false
  error.value = false

  try {
    // Generate a unique game ID automatically
    game.value.id = 'game-' + Date.now()

    // Convert crew input string into array
    game.value.requiredCrewPositions = crewInput.value
      .split(',')
      .map(pos => pos.trim())
      .filter(pos => pos.length > 0) // Remove any empty entries

    await api.createGame(scheduleId.value, game.value)

    success.value = true

    router.push({ name: 'schedule', params: { id: scheduleId.value } })

    // Reset form after success
    crewInput.value = ''
    game.value = {
      id: '',
      date: '',
      startTime: '',
      endTime: '',
      timezone: '',
      sport: '',
      teams: '',
      network: '',
      location: '',
      notes: '',
      requiredCrewPositions: []
    }
  } catch (err) {
    error.value = true
  }
}
</script>

<style scoped>
.create-game-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

label {
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.button-group {
  text-align: center;
}

button {
  padding: 0.75rem 2rem;
  background-color: purple;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darkviolet;
}

.success-msg {
  color: green;
  text-align: center;
}

.error-msg {
  color: red;
  text-align: center;
}
</style>
