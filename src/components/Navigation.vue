<template>
    <nav>
        <router-link v-for="route in navRoutes" :key="route.path" :to="route.path">
            {{ route.meta.title }}
        </router-link>
    </nav>
</template>

<script setup>
import { useNavStore } from '@/stores/NavStore'

const { navRoutes } = useNavStore()
</script>

<style lang="scss" scoped>
nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1.5rem;
    background-color: f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    a {
        padding: 0.5rem;
    }
    .router-link-active {
        background-color: purple;
        color: #fff;
        border-color: darkmagenta;
        border-radius: 6px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
}
</style>