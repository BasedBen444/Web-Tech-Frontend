<template>
    <div class="schedule-list-container">
      <h2>Schedules</h2>
  
      <div v-if="loading">Loading...</div>
      <div v-else-if="err">Error: {{ err }}</div>
      <div class="schedule-profile-list" v-else>
        <router-link
          v-for="schedule in schedules"
          :key="schedule.id"
          :to="{ name: 'schedule', params: { id: schedule.id } }"
          class="schedule-item"
        >
          {{ schedule.name }}
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/apis/scheduling' // Make sure you use your scheduling.js
  import { ref, onMounted } from 'vue'
  
  const schedules = ref([])
  const loading = ref(true)
  const err = ref(null)
  
  onMounted(loadSchedules)
  
  async function loadSchedules() {
    try {
      schedules.value = await api.findAllSchedules()
    } catch (error) {
      err.value = 'An error occurred while loading schedules.'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .schedule-list-container {
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .schedule-profile-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .schedule-item {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fff;
    transition: all 0.3s ease;
  }
  
  .schedule-item:hover {
    background-color: purple;
    color: #fff;
    transform: translateY(-3px);
  }
  </style>
  