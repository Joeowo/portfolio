<script setup lang="ts">
import type { ActivityItem } from '../types'

interface Props {
  activities: ActivityItem[]
}

defineProps<Props>()

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString()
}

const getActivityIcon = (type: ActivityItem['type']) => {
  const icons: Record<ActivityItem['type'], string> = {
    user_created: '👤',
    work_created: '📦',
    page_pending: '⏳',
    page_approved: '✓',
    page_rejected: '✗',
    page_offline: '📴'
  }
  return icons[type] || '•'
}
</script>

<template>
  <div class="activity-list">
    <div class="list-header">
      <div class="label label--mono">RECENT ACTIVITY</div>
    </div>

    <div v-if="activities.length === 0" class="empty-state">
      <p>暂无最近活动</p>
    </div>

    <div v-else class="list-content">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
        <div class="activity-icon">{{ getActivityIcon(activity.type) }}</div>
        <div class="activity-info">
          <div class="activity-title">{{ activity.title }}</div>
          <div v-if="activity.description" class="activity-description">
            {{ activity.description }}
          </div>
        </div>
        <div class="activity-time">{{ formatTime(activity.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-list {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-component-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
}

.list-header {
  padding-bottom: var(--spacing-element-sm);
  border-bottom: 1px solid var(--color-border-default);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.empty-state {
  padding: var(--spacing-16) 0;
  text-align: center;
  color: var(--color-text-secondary);
}

.empty-state p {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
}

.list-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
}

.activity-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-component-md);
  padding: var(--spacing-element-md) 0;
  align-items: center;
}

.activity-item:not(:last-child) {
  border-bottom: 1px solid var(--color-border-default);
}

.activity-icon {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-xs);
}

.activity-title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
}

.activity-description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.activity-time {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
