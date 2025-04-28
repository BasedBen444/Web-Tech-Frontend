<template>
    <div class="schedules-page">
      <div class="sidebar">
        <ScheduleList />
      </div>
  
      <div class="main">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import ScheduleList from '@/components/ScheduleList.vue'
  </script>
  
  <style scoped>
  .schedules-page {
    display: flex;
  }
  
  .sidebar {
    flex: 0 0 300px;
    padding: 1rem;
    background-color: #f5f5f5;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid #ddd;
  }
  
  .main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }
  </style>
  