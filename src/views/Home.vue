<template>
    <div>
        <h1>Welcome to the FrogCrew Schedule Manager!</h1>
        <p v-if="isAuthenticated">Stay on top of your game. Use the navigation bar to check or update availability, view user profiles, and a full list of upcoming games!</p>
        <p v-else>Log in to access the schedule and view/manage your availability.</p>
        <button @click="handleLogout" v-if="isAuthenticated">
            Log Out
        </button>
        <button @click="handleLogin" v-else>
            Log In
        </button>
    </div>
</template>

<script setup>
import { isAuthenticated, logout } from '@/apis/auth'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useNavStore } from '@/stores/NavStore'
import { onMounted } from 'vue'

const router = useRouter()
const { updateNavRoutes } = useNavStore()

const handleLogout = () => {
    if (router.hasRoute('users')) {
        router.removeRoute('users')
        updateNavRoutes()
    }

    if(router.hasRoute('schedules')) {
        router.removeRoute('schedules')
        updateNavRoutes()
    }

    if(router.hasRoute('createSchedule')) {
        router.removeRoute('createSchedule')
        updateNavRoutes()
    }

    if(router.hasRoute('invite')) {
        router.removeRoute('invite')
        updateNavRoutes()
    }

    if(router.hasRoute('submitAvailability')) {
        router.removeRoute('submitAvailability')
        updateNavRoutes()
    }

    if(router.hasRoute('scheduleCrew')) {
        router.removeRoute('scheduleCrew')
        updateNavRoutes()
    }
    logout()
}

const handleLogin = () => {
    const redirectPath = { name: 'login' }
    router.replace(redirectPath)
}

</script>

<style lang="scss" scoped>
h1 {
    display: flex;
    font-size: 2rem;
    margin-bottom: 1rem;
    justify-content: center;
}

p {
    display: flex;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    justify-content: center;
}

button {
    display: flex;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    justify-self: center;
    background-color: purple;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: purple;
    }
}
</style>