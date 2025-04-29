<template>
    <div class="create-schedule-container">
      <h2>Create New Schedule</h2>
  
      <form @submit.prevent="submitSchedule">
        <label>
          Schedule Name:
          <input v-model="name" required />
        </label>
  
        <div class="button-group">
          <button type="submit">Create Schedule</button>
        </div>
  
        <div v-if="success" class="success-msg">✅ Schedule created successfully!</div>
        <div v-if="error" class="error-msg">❌ Failed to create schedule. Try again.</div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '@/apis/scheduling'
  
  const name = ref('')
  const success = ref(false)
  const error = ref(false)
  
  async function submitSchedule() {
    success.value = false
    error.value = false
  
    try {
      await api.createSchedule({
        name: name.value,
        games: [] // Empty games array initially
      })
      success.value = true
      name.value = ''
    } catch (err) {
      error.value = true
    }
  }
  </script>
  
  <style scoped>
  .create-schedule-container {
    max-width: 500px;
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
  
  input {
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
    transition: background-color 0.3s ease;
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
  