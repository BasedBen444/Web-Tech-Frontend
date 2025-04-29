<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
                <label for="username">Email:</label>
                <input type="text" id="username" name="username" v-model="username" required placeholder="Enter your email"/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" v-model="password" required placeholder="Enter your password"/>
            </div>
            <button type="submit" class="login-button">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUserRole, isAuthenticated, login } from '@/apis/auth.js'
import { useRouter, useRoute } from 'vue-router'
import { createScheduleRoute, inviteRoute, submitAvailabilityRoute, userRoute, viewScheduleRoute } from '@/router/dynamicRoutes'
import { useNavStore } from '@/stores/NavStore.js'

const username = ref('')
const password = ref('')

const router = useRouter()
const route = useRoute()

const { updateNavRoutes } = useNavStore()

async function handleLogin () {    
    try {
        await login(username.value, password.value)

        const userRole = getUserRole()

        if ((userRole === 'admin' || userRole === 'user') && !router.hasRoute('users')) {
            router.addRoute('mainLayout', userRoute)
            router.addRoute('mainLayout', viewScheduleRoute)
            updateNavRoutes()
        }

        if (userRole === 'admin' && !router.hasRoute('createSchedule')) {
            router.addRoute('mainLayout', createScheduleRoute)
            router.addRoute('mainLayout', inviteRoute)
            updateNavRoutes()
        }

        if (userRole === userRole && !router.hasRoute('viewSchedule')) {
            router.addRoute('mainLayout', submitAvailabilityRoute)
            updateNavRoutes()
        }

        const redirectPath = { name: 'home' }
        router.replace(redirectPath)
    } catch (error) {
        console.error('Login failed:', error)
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 2rem auto;

    h2 {
        margin-bottom: 1rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: #333;
        text-align: center;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
            display: flex;
            flex-direction: column;

            label {
                margin-bottom: 0.5rem;
                font-size: 1rem;
                color: #555;
            }

            input {
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 6px;
                background-color: #fff;
                transition: all 0.3s ease;

                &:focus {
                    border-color: #007bff;
                    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
                    outline: none;
                }
            }
        }

        .login-button {
            padding: 0.75rem;
            border: none;
            border-radius: 6px;
            background-color: purple;
            color: #fff;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background-color: darkviolet;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-3px);
            }

            &:active {
                transform: translateY(3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>