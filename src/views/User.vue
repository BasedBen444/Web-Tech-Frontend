<template>
    <div class="user-profile-container">
         <div v-if="loading">Loading...</div>
         <div v-else-if="user">
             <h1 class="user-name">{{ user.firstname }} {{ user.lastname }}</h1>
             <div class="user-info">
                <p>Role: {{ user.position }}</p>
                <p>Qualified Position: {{ user.job }}</p>
                <p>Phone: {{ user.phonenumber }}</p>
                <p>Email: {{ user.email }}</p>
             </div>
         </div>
         <div v-else>Failed to load user profile. Please try again later</div>
    </div>
 </template>
 
 <script setup>
 import { ref, watch } from 'vue'
 import { useRoute } from 'vue-router'
 import api from '@/apis/users'
 
 const user = ref(null)
 const loading = ref(true)
 
 const route = useRoute()
 
 async function loadUserProfile(id) {
     try {
         user.value = await api.findById(id)
     }
     catch (error) {
         console.error(`Failed to load user profile with id ${id}:`, error)
     } finally {
         loading.value = false
     }
 }
 
 watch(() => route.params.id, (newId, oldId) => {
     loadUserProfile(newId)
 }, 
 { immediate: true })
 
 </script>
 
 <style lang="scss" scoped>
 .user-profile-container {
     padding: 1.5rem;
     background-color: #f5f5f5;
     border: 1px solid #ddd;
     border-radius: 8px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     margin: 0 auto;
 
     .user-name {
         font-size: 2rem;
         font-weight: bold;
         color: #333;
         margin-bottom: 1rem;
         text-align: center;
     }
 
     .user-info {
         font-size: 1.1rem;
         line-height: 1.6;
         color: #555;
         text-align: justify;
 
         p {
             margin-bottom: 1rem;
         }
     }
 }
 </style>