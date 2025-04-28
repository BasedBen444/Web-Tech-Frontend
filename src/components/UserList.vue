<template>
    <div class="user-list-container">
        <h2>User Profiles</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="err">Error: {{ err }}</div>
       <div class="user-profile-list" v-else>
            <router-link
            v-for="userProfile in userProfiles"
            :key="userProfile.id"
            :to="{ name: 'user', params: { id: userProfile.id } }" class = "user-item">
                {{ userProfile.firstname }}
            </router-link>
       </div>
    </div>
</template>

<script setup>
import api from '@/apis/users'
import { ref, onMounted } from 'vue'
const userProfiles = ref([])
const loading = ref(true)
const err = ref(null)

onMounted(loadUserProfiles)

async function loadUserProfiles() {
    try {
        userProfiles.value = await api.findAll()
    } catch (error) {
        err.value = 'An error occurred while loading user profiles.'
    } finally {
        loading.value = false
    }
    loading.value = false
}
</script>

<style lang="scss" scoped>
.user-list-container {
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    .user-profile-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .user-item {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            background-color: #fff;
            transition: all 0.3s ease;

            &:hover {
                background-color: #007bff;
                color: #fff;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-3px);
            }

            &:active {
                transform: translateY(3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }

        .router-link-active {
            background-color: #007bff;
            /* Highlight background for active link */
            color: #fff;
            /* Ensure the text stands out */
            border-color: #0056b3;
            /* Darker border for contrast */
            font-weight: bold;
            /* Emphasize active link */
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            /* Enhanced shadow for active */
            transform: translateY(-2px);
            /* Slight elevation for active link */
        }
    }
}
</style>