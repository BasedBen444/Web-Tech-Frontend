<template>
  <div class="signup-container">
    <h2>Create Your Account</h2>

    <form @submit.prevent="goToConfirmation">
      <label>
        First Name:
        <input v-model="form.firstname" type="text" required />
      </label>

      <label>
        Last Name:
        <input v-model="form.lastname" type="text" required />
      </label>

      <label>
        Phone Number:
        <input v-model="form.phonenumber" type="tel" required />
      </label>

      <label>
        Email:
        <input v-model="form.email" type="email" required />
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
          <option v-for="job in jobOptions" :key="job" :value="job">{{ job }}</option>
        </select>
      </label>

      <button type="submit">Continue</button>
    </form>

    <div v-if="error" class="error-msg">❌ {{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSignupStore } from '@/stores/signup'

const router = useRouter()
const signupStore = useSignupStore()

const form = ref({ ...signupStore.form })
const error = ref(null)

const jobOptions = [
  'Producer',
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

// Validate email and phone
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function isValidPhone(phone) {
  const re = /^\d{3}-\d{3}-\d{4}$/
  return re.test(phone)
}

function goToConfirmation() {
  error.value = null

  if (!isValidEmail(form.value.email)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (!isValidPhone(form.value.phonenumber)) {
    error.value = 'Phone number must be in the format 123-456-7890.'
    return
  }

  signupStore.setForm(form.value)
  router.push({ name: 'signup-confirm' })
}
</script>


<style scoped>
.signup-container {
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
  background-color: purple;
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
