<script setup lang="ts">
import type { StatCard } from '../types'

interface Props {
  stats: StatCard[]
}

defineProps<Props>()

const trendIcon = (trend?: string) => {
  if (!trend) return ''
  if (trend.includes('+')) return '↑'
  if (trend.includes('-')) return '↓'
  return ''
}

const trendClass = (trend?: string) => {
  if (!trend) return ''
  if (trend.includes('+')) return 'stat-card__trend--positive'
  if (trend.includes('-')) return 'stat-card__trend--negative'
  return ''
}
</script>

<template>
  <div class="dashboard-stats">
    <div v-for="stat in stats" :key="stat.id" class="stat-card">
      <!-- Primary: Hero 数字 -->
      <div class="stat-card__value">{{ stat.value }}</div>

      <!-- Secondary: 标签 -->
      <div class="stat-card__label">{{ stat.label }}</div>

      <!-- Tertiary: 趋势 -->
      <div v-if="stat.trend" class="stat-card__trend" :class="[trendClass(stat.trend)]">
        <span class="trend-icon">{{ trendIcon(stat.trend) }}</span>
        <span class="trend-value">{{ stat.trend }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-component-md);
}

.stat-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-component-lg) var(--spacing-component-md);
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.15s ease-out;
}

.stat-card:hover {
  border-color: var(--color-border-strong);
}

.stat-card__value {
  /* Primary: Hero 数字 */
  font-family: 'Doto', var(--font-family-display);
  font-size: 72px;
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-tight);
  color: var(--color-text-display);
}

.stat-card__label {
  /* Secondary: 标签 */
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
}

.stat-card__trend {
  /* Tertiary: 趋势 */
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  display: flex;
  align-items: center;
  gap: var(--spacing-element-xs);
}

.stat-card__trend--positive {
  color: var(--color-success);
}

.stat-card__trend--negative {
  color: var(--color-error);
}

@media (max-width: 1280px) {
  .dashboard-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
}
</style>
