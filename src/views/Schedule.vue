<template>
    <div class="schedule-details-container">
      <h2>Schedule Details</h2>
  
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else-if="schedule">
        <ul>
          <li><strong>Date:</strong> {{ schedule.date }}</li>
          <li><strong>Start Time:</strong> {{ schedule.startTime }}</li>
          <li><strong>End Time:</strong> {{ schedule.endTime }}</li>
          <li><strong>Timezone:</strong> {{ schedule.timezone }}</li>
          <li><strong>Sport:</strong> {{ schedule.sport }}</li>
          <li><strong>Teams:</strong> {{ schedule.teams }}</li>
          <li><strong>Network:</strong> {{ schedule.network }}</li>
          <li><strong>Location:</strong> {{ schedule.location }}</li>
          <li><strong>Required Crew Positions:</strong>
            <ul>
              <li v-for="(position, index) in schedule.requiredCrewPositions" :key="index">
                {{ position }}
              </li>
            </ul>
          </li>
          <li><strong>Notes:</strong> {{ schedule.notes }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/apis/scheduling'
  
  const route = useRoute()
  
  const schedule = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  async function loadSchedule(id) {
    try {
      schedule.value = await api.findScheduleById(id)
    } catch (err) {
      error.value = 'Failed to load schedule.'
    } finally {
      loading.value = false
    }
  }

  watch(() => route.params.id, (newId, oldId) => {
     loadSchedule(newId)
}, { immediate: true })
  </script>
  
  <style scoped>
  .schedule-details-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 0.75rem;
  }
  </style>
  