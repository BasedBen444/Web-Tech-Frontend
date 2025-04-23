<template>
    <div class="form-container">
      <h2>Create User Profile</h2>
  
      <form @submit.prevent="createUser">
        <label>
          Username:
          <input v-model="form.username" type="text" required />
        </label>
  
        <label>
          Position:
          <select v-model="form.position" required>
            <option disabled value="">-- Select Position --</option>
            <option>staff</option>
            <option>student</option>
            <option>broadcaster</option>
            <option>freelancer</option>
          </select>
        </label>
  
        <label>
          Job:
          <select v-model="form.job" required>
            <option disabled value="">-- Select Job --</option>
            <option v-for="role in jobRoles" :key="role" :value="role">{{ role }}</option>
          </select>
        </label>
  
        <button type="submit">Create User</button>
      </form>
  
      <div v-if="success" class="success-msg">✅ User created successfully!</div>
      <div v-if="error" class="error-msg">❌ {{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    username: '',
    position: '',
    job: ''
  })
  
  const success = ref(false)
  const error = ref(null)
  
  const jobRoles = [
    'TOC',
    'Assistant Director',
    'Director',
    'Assistant Producer',
    'Technical Director',
    'Score Bug Operator',
    'Graphics',
    'Replay',
    'Video Operator',
    'Cameras',
    'Utility',
    'Audio 1',
    'Audio 2',
    'Talent',
    'Stage Manager',
    'Stats'
  ]
  
  async function createUser() {
    success.value = false
    error.value = null
  
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
  
      if (!res.ok) throw new Error('Failed to create user')
      success.value = true
  
      form.value = {
        username: '',
        position: '',
        job: ''
      }
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 2rem auto;
    background: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  input,
  select {
    display: block;
    width: 100%;
    padding: 0.4rem;
    margin-top: 0.4rem;
    font-size: 1rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .success-msg {
    color: green;
    margin-top: 1rem;
  }
  
  .error-msg {
    color: red;
    margin-top: 1rem;
  }
  </style>
  