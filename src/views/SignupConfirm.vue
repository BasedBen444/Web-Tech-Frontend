<template>
    <div class="confirm-container">
      <h2>Confirm Your Information</h2>
  
      <ul>
        <li><strong>First Name:</strong> {{ form.firstname }}</li>
        <li><strong>Last Name:</strong> {{ form.lastname }}</li>
        <li><strong>Phone Number:</strong> {{ form.phonenumber }}</li>
        <li><strong>Email:</strong> {{ form.email }}</li>
        <li><strong>Position:</strong> {{ form.position }}</li>
        <li><strong>Job:</strong> {{ form.job }}</li>
      </ul>
  
      <div class="button-group">
        <button @click="confirmSignup">Confirm</button>
        <button @click="goBack">Go Back</button>
      </div>
  
      <div v-if="success" class="success-msg">✅ Profile created successfully! Redirecting...</div>
      <div v-if="error" class="error-msg">❌ {{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useSignupStore } from '@/stores/signup'
  import { ref } from 'vue'
  import api from '@/apis/users'
  
  const router = useRouter()
  const signupStore = useSignupStore()
  
  const form = signupStore.form
  const success = ref(false)
  const error = ref(null)
  
  async function confirmSignup() {
    error.value = null
    try {
      const newUser = {
        ...form,
        availability: "",
        enabled: true,
        roles: "user"
      }
      await api.createUser(newUser)
  
      success.value = true // ✅ Set success
      signupStore.resetForm()
  
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1500) // ✅ Small delay so user sees the success message
    } catch (err) {
      error.value = err.message
    }
  }
  
  function goBack() {
    router.push({ name: 'signup' })
  }
  </script>
  
  <style scoped>
  .confirm-container {
    max-width: 500px;
    margin: 2rem auto;
    background: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:first-child {
    background-color: #28a745;
    color: white;
  }
  
  button:last-child {
    background-color: #dc3545;
    color: white;
  }
  
  .success-msg {
    color: green;
    font-weight: bold;
    margin-top: 1rem;
  }
  
  .error-msg {
    color: red;
    margin-top: 1rem;
  }
  </style>
  