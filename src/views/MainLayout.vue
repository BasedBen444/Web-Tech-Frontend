<template>
    <div class="main-layout">
        <Navigation></Navigation>
        <router-view v-slot="{ Component, route }">
              <component :is="Component" />
        </router-view>
    </div>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>