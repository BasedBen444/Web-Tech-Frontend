<template>
    <div class="invite-container">
      <h2>Invite a New User</h2>
  
      <form @submit.prevent="submitInvite">
        <label>
          Email Address:
          <input v-model="email" type="email" required />
        </label>
  
        <div class="button-group">
          <button type="submit">Send Invite</button>
        </div>
  
        <div v-if="success" class="success-msg">
            ✅ Invite sent successfully! <br/>
        </div>

        <div v-if="validationError" class="validation-msg">
            ❌ Please enter a valid email address.
        </div>
  
        <div v-if="error" class="error-msg">
            ❌ Failed to send invite. Please try again.
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import api from '@/apis/users'
  
  const email = ref('')
  const success = ref(false)
  const error = ref(false)
  const validationError = ref(false)
  const inviteLink = ref('')

  function validateEmail(emailAddress) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(emailAddress)
  }
  
  async function submitInvite() {
    success.value = false
    error.value = false
    inviteLink.value = ''

    if (!validateEmail(email.value)) {
        validationError.value = true
        return
    }
  
    try {
      const invite = await api.sendInvite(email.value)
      success.value = true
      inviteLink.value = invite.signupLink || 'http://localhost:5173/signup'
      email.value = ''
    } catch (err) {
      error.value = true
    }
  }
  </script>
  
  <style scoped>
  .invite-container {
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
  }
  
  .success-msg {
    color: green;
    text-align: center;
    margin-top: 1rem;
  }
  
  .error-msg {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
  
  .validation-msg {
    color: red;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  </style>
  