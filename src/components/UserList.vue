<template>
    <div class="user-list-container">
      <h2>User Profiles</h2>
  
      <!-- Admin-only filters -->
      <div v-if="isAdminUser" class="filters">
        <input v-model="filters.name" type="text" placeholder="Filter by First Name" />
        <input v-model="filters.job" type="text" placeholder="Filter by Qualified Position" />
        <input v-model="filters.position" type="text" placeholder="Filter by Role" />
      </div>
  
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
  
      <div v-else class="user-profile-list">
        <router-link
          v-for="userProfile in filteredProfiles"
          :key="userProfile.id"
          :to="{ name: 'user', params: { id: userProfile.id } }"
          class="user-item"
        >
          {{ userProfile.firstname }} {{ userProfile.lastname }}
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/apis/users'
  import { ref, computed, onMounted } from 'vue'
  import { isAdmin, userRole } from '@/apis/auth'
  
  const userProfiles = ref([])
  const loading = ref(true)
  const error = ref(null)
  const isAdminUser = computed(() => isAdmin.value)
    
  // Filters
  const filters = ref({
    name: '',
    job: '',
    position: ''
  })
  
  // Load users
  onMounted(loadUserProfiles)
  
  async function loadUserProfiles() {
    try {
      userProfiles.value = await api.findAll()
  
      // After loading users, you can check your logged-in user
      // Hardcoded for now: Let's assume admin if any user has "admin" role
      // (You can replace this later with real login info)
  
    } catch (err) {
      error.value = 'An error occurred while loading user profiles.'
    } finally {
      loading.value = false
    }
  }
  
  // Computed list based on filters
  const filteredProfiles = computed(() => {
    return userProfiles.value.filter(user => {
      const matchesName = user.firstname.toLowerCase().includes(filters.value.name.toLowerCase())
      const matchesJob = user.job.toLowerCase().includes(filters.value.job.toLowerCase())
      const matchesPosition = user.position.toLowerCase().includes(filters.value.position.toLowerCase())
  
      return matchesName && matchesJob && matchesPosition
    })
  })
  </script>
  
  <style scoped>
  .user-list-container {
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .filters input, .filters select {
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .user-profile-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .user-item {
    padding: 0.5rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-decoration: none;
    color: black;
    transition: background-color 0.3s;
  }
  
  .user-item:hover {
    background-color: #007bff;
    color: white;
  }
  </style>
  