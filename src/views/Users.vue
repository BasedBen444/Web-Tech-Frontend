<template>
    <div class="user-profile-layout">
        <aside class="user-profile-list">
            <UserList></UserList>
        </aside>
        <main class="user-content-with-sidebar">    
            <router-view class="user-profile-content" v-slot="{Component, route}">
                    <component :is="Component" :key="route.path"></component>
            </router-view>
        </main>
    </div>
</template>

<script setup>
import UserList from '@/components/UserList.vue'
</script>

<style lang="scss" scoped>
.user-profile-layout {
    display: flex;
    width: 100%;
    gap: 1rem;
    .blog-post-list {
        flex: 0 0 25%;
    }
    
    .user-content-with-sidebar {
        display: flex;
        flex: 0 0 75%;

        .user-profile-content{
            flex: 1;
        }
    }
}
</style>