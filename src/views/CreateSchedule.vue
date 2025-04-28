<template>
    <div class="create-schedule-container">
      <h2>Create a New Schedule</h2>
  
      <form @submit.prevent="submitSchedule">
        <div class="form-group">
          <label>Date:</label>
          <input v-model="form.date" type="date" required />
        </div>
  
        <div class="form-group">
          <label>Start Time:</label>
          <input v-model="form.startTime" type="time" required />
        </div>
  
        <div class="form-group">
          <label>End Time:</label>
          <input v-model="form.endTime" type="time" required />
        </div>
  
        <div class="form-group">
          <label>Timezone:</label>
          <input v-model="form.timezone" type="text" placeholder="CST" required />
        </div>
  
        <div class="form-group">
          <label>Sport:</label>
          <input v-model="form.sport" type="text" placeholder="e.g., Basketball" required />
        </div>
  
        <div class="form-group">
          <label>Teams:</label>
          <input v-model="form.teams" type="text" placeholder="e.g., TCU vs Baylor" required />
        </div>
  
        <div class="form-group">
          <label>Network:</label>
          <input v-model="form.network" type="text" placeholder="e.g., ESPN+" required />
        </div>
  
        <div class="form-group">
          <label>Location:</label>
          <input v-model="form.location" type="text" placeholder="e.g., Fort Worth, TX" />
        </div>
  
        <div class="form-group">
          <label>Required Crew Positions:</label>
          <textarea v-model="crewInput" placeholder="Enter positions separated by commas (e.g., Producer, Cameras, Replay)"></textarea>
        </div>
  
        <div class="form-group">
          <label>Notes:</label>
          <textarea v-model="form.notes" placeholder="Optional notes..."></textarea>
        </div>
  
        <div class="button-group">
          <button type="submit">Create Schedule</button>
        </div>
  
        <div v-if="error" class="error-msg">{{ error }}</div>
        <div v-if="success" class="success-msg">{{ success }}</div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/apis/scheduling'
  
  const router = useRouter()
  
  const form = ref({
    date: '',
    startTime: '',
    endTime: '',
    timezone: '',
    sport: '',
    teams: '',
    network: '',
    location: '',
    notes: ''
  })
  
  const crewInput = ref('')
  const error = ref(null)
  const success = ref(null)

  function formatDate(date) {
  return date.trim()
}

function formatTime(time) {
  return time.trim()
}

function formatTimezone(tz) {
  return tz.trim().toUpperCase()
}

function formatSport(sport) {
  if (!sport) return ''
  return sport.trim().charAt(0).toUpperCase() + sport.trim().slice(1).toLowerCase()
}

function formatTeams(teams) {
  return teams.trim()
}

function formatNetwork(network) {
  return network.trim().toUpperCase()
}

function formatCrew(crewInput) {
  return crewInput.split(',')
    .map(role => role.trim())
    .filter(role => role.length > 0)
}
  
  async function submitSchedule() {
    error.value = null
    success.value = null
  
    if (!form.value.date || !form.value.startTime || !form.value.endTime || !form.value.sport || !form.value.teams || !form.value.network) {
      error.value = '❌ Please fill out all required fields.'
      return
    }
  
    const newSchedule = {
        date: formatDate(form.value.date),
        startTime: formatTime(form.value.startTime),
        endTime: formatTime(form.value.endTime),
        timezone: formatTimezone(form.value.timezone),
        sport: formatSport(form.value.sport),
        teams: formatTeams(form.value.teams),
        network: formatNetwork(form.value.network),
        location: form.value.location.trim(),
        notes: form.value.notes.trim(),
        requiredCrewPositions: formatCrew(crewInput.value)
    }
  
    try {
      await api.createSchedule(newSchedule)
      success.value = '✅ Schedule created successfully!'
      setTimeout(() => {
        router.push({ name: 'schedules' }) // ✅ Send them to the list of schedules
      }, 1500)
    } catch (err) {
      error.value = '❌ Failed to create schedule. Please try again.'
    }
  }
  </script>
  
  <style scoped>
  .create-schedule-container {
    max-width: 600px;
    margin: 2rem auto;
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  
  textarea {
    min-height: 80px;
  }
  
  .button-group {
    text-align: center;
    margin-top: 2rem;
  }
  
  button {
    padding: 0.75rem 2rem;
    background-color: purple;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: darkviolet;
  }
  
  .error-msg {
    color: red;
    margin-top: 1rem;
    text-align: center;
  }
  
  .success-msg {
    color: green;
    margin-top: 1rem;
    text-align: center;
  }
  </style>
  