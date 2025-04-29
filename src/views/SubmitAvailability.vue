<template>
    <div class="availability-form">
      <h2>Submit Availability</h2>
  
      <form @submit.prevent="handleSubmit">
        <!-- Game selection -->
        <label for="game">Select Game:</label>
        <select v-model="form.gameId" required>
          <option disabled value="">-- Choose a Game --</option>
          <option v-for="game in games" :key="game.id" :value="game.id">
            {{ game.date }} - {{ game.teams }}
          </option>
        </select>
  
        <!-- Availability choice -->
        <label>Available?</label>
        <div class="radio-group">
          <label>
            <input type="radio" value="true" v-model="form.available" required />
            Yes
          </label>
          <label>
            <input type="radio" value="false" v-model="form.available" />
            No
          </label>
        </div>
  
        <!-- Optional comment -->
        <label for="comment">Comment (optional):</label>
        <textarea id="comment" v-model="form.comment" placeholder="Any notes..."></textarea>
  
        <!-- Submit -->
        <button type="submit">Submit Availability</button>
      </form>
  
      <div v-if="success" class="success-message">Availability submitted successfully!</div>
      <div v-if="error" class="error-message">Something went wrong. Try again.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/apis/users'
  import { useRoute } from 'vue-router'
  
  // Assume logged-in user is available (mocked ID for now)
  const userId = '3' // Replace with real auth integration
  
  const form = ref({
    gameId: '',
    available: '',
    comment: ''
  })
  
  const success = ref(false)
  const error = ref(false)
  const games = ref([])
  
  // Load games from your schedules API or mock structure
  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/schedules')
      const data = await res.json()
      games.value = data.flatMap(sch => sch.games || [])
    } catch (e) {
      console.error('Failed to load games:', e)
    }
  })
  
  const handleSubmit = async () => {
    try {
      success.value = false
      error.value = false
  
      await api.submitAvailability(
        userId,
        form.value.gameId,
        form.value.available === 'true',
        form.value.comment
      )
  
      success.value = true
      // Optionally reset form
      form.value = { gameId: '', available: '', comment: '' }
    } catch (e) {
      error.value = true
    }
  }
  </script>
  
  <style scoped>
  .availability-form {
    max-width: 600px;
    margin: auto;
    padding: 1.5rem;
    background: #f8f8f8;
    border-radius: 8px;
  }
  
  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
  
  select,
  textarea,
  input[type="radio"] {
    width: 100%;
    margin-top: 0.25rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .radio-group {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  
  button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: purple;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkviolet;
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
  