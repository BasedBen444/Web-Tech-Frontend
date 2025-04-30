<template>
    <div class="user-profile-container">
         <div v-if="loading">Loading...</div>
         <div v-else-if="user">
             <h1 class="user-name">{{ user.firstname }} {{ user.lastname }}</h1>
             <div class="user-info">
                <p>Qualified Position: {{ user.position }}</p>
                <p>Role: {{ user.job }}</p>
                <p>Phone: {{ user.phonenumber }}</p>
                <p>Email: {{ user.email }}</p>
                <div v-if="isAdminUser">
                    <p><strong>Availability:</strong></p>
                    <div v-if="user.availability && user.availability.length > 0">
                        <p v-for="(entry, index) in user.availability" :key="index">
                            Game Id: {{ entry.gameId }}
                            <br>
                            Status: <span v-if="entry.available">Available</span><span v-else>Unavailable</span>
                            <br>
                            Comment: "{{ entry.comment }}"
                        </p>
                    </div>
                    <p v-else>No availability listed</p>
                </div>
                <div v-if="isAdminUser" class="button-group">
                    <button @click="confirmDelete">Delete Crew Member</button>
                </div>
             </div>
         </div>
         <div v-else>Failed to load user profile. Please try again later</div>
    </div>
 </template>
 
 <script setup>
 import { ref, watch, computed } from 'vue'
 import { useRoute, useRouter } from 'vue-router'
 import api from '@/apis/users'
 import { isAdmin } from '@/apis/auth'
 
 const user = ref(null)
 const loading = ref(true)
 const route = useRoute()
 const router = useRouter()
 const isAdminUser = computed(() => isAdmin.value)
 
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

async function confirmDelete() {
    const confirmed = window.confirm(`⚠️ Are you sure you want to delete ${user.value.firstname} ${user.value.lastname}? This cannot be undone.`)

    if (confirmed) {
        try {
            await api.deleteUser(route.params.id)
            alert('✅ User deleted successfully.')
            router.push({ name: 'users' }) // send back to user list
        } catch (err) {
            alert('❌ Failed to delete user.')
        }
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
         .button-group {
            margin-top: 1.5rem;
        }   
        button {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        }

        button:hover {
        background-color: #c82333;
        }
    }
 }
 </style>