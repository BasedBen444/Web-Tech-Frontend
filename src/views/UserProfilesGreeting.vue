<template>
    <div class="user-profiles-greeting">
        <h1>Welcome to the user profiles page!</h1>
        <h2>
            Here you can find all the user profiles and their relevant information.
        </h2>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/apis/users'

const blogPosts = ref([])
const router = useRouter()

onMounted(loadBlogPosts)

async function loadBlogPosts() {
    try {
        blogPosts.value  = await api.findAll()
    } catch (error) {
        console.error('Error loading blog posts:', error)
    }
}
</script>

<style lang="scss" scoped>
.user-profiles-greeting {
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