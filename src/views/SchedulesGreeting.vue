<template>
    <div class="schedules-greeting">
        <h1>Welcome to the schedules page!</h1>
        <h2>
            Here you can find all the schedules and their relevant information.
        </h2>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/apis/scheduling'

const userProfiles = ref([])

onMounted(loadSchedules)

async function loadSchedules() {
    try {
        userProfiles.value  = await api.findAllSchedules()
    } catch (error) {
        console.error('Error loading schedules:', error)
    }
}
</script>

<style lang="scss" scoped>
.schedules-greeting {
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h1 {
        margin-bottom: 1rem;
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 500;
        color: #555;
        text-align: center;
    }
}
</style>