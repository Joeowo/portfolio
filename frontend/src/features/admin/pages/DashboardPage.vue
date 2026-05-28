<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '../stores/adminStore'
import DashboardStats from '../components/DashboardStats.vue'
import ActivityList from '../components/ActivityList.vue'

const adminStore = useAdminStore()

onMounted(async () => {
  await adminStore.init()
})
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="label label--mono">ADMIN DASHBOARD</div>
      <h1 class="page-title">Overview</h1>
    </div>

    <div class="page-content">
      <!-- 统计卡片 -->
      <DashboardStats :stats="adminStore.statCards" />

      <!-- 最近活动 -->
      <ActivityList :activities="adminStore.activities" />
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
  background: var(--color-bg-primary);
}

.page-header {
  margin-bottom: var(--spacing-component-lg);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.page-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-lg);
}
</style>
