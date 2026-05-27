<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from '@/shared/components/MainNavigation.vue'
</script>

<template>
  <!-- 全局导航 -->
  <MainNavigation />

  <!-- 页面内容 -->
  <div class="app-content">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="(route.meta.transition as string) || 'page'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
/* Global app styles */

.app-content {
  padding-top: 56px; /* 导航栏高度 */
  min-height: 100vh;
}
</style>
