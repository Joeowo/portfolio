<script setup lang="ts">
import type { Template } from '../types/Template'
import TemplateCard from './TemplateCard.vue'

interface Props {
  templates: Template[]
  selectedId?: number | null
  loading?: boolean
}

interface Emits {
  (e: 'select', id: number): void
  (e: 'preview', template: Template): void
}

withDefaults(defineProps<Props>(), {
  selectedId: null,
  loading: false
})

defineEmits<Emits>()
</script>

<template>
  <div class="template-grid">
    <!-- Loading State -->
    <div v-if="loading" class="template-grid__loading">
      <div v-for="i in 6" :key="i" class="template-grid__skeleton">
        <div class="template-grid__skeleton-image"></div>
        <div class="template-grid__skeleton-info"></div>
      </div>
    </div>

    <!-- Template Cards -->
    <template v-else-if="templates.length > 0">
      <TemplateCard
        v-for="template in templates"
        :key="template.id"
        :template="template"
        :selected="selectedId === template.id"
        @select="$emit('select', $event)"
        @preview="$emit('preview', $event)"
      />
    </template>

    <!-- Empty State -->
    <div v-else class="template-grid__empty">
      <span class="template-grid__empty-icon">○</span>
      <span class="template-grid__empty-text">NO TEMPLATES FOUND</span>
    </div>
  </div>
</template>

<style scoped>
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Loading Skeletons */
.template-grid__loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.template-grid__skeleton {
  width: 280px;
  height: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-bg-primary);
}

.template-grid__skeleton-image {
  height: 240px;
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 0%,
    var(--color-bg-secondary) 50%,
    var(--color-bg-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.template-grid__skeleton-info {
  height: 80px;
  padding: 16px;
  background: var(--color-bg-secondary);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Empty State */
.template-grid__empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 0;
  gap: 16px;
}

.template-grid__empty-icon {
  font-size: 48px;
  color: var(--color-text-disabled);
}

.template-grid__empty-text {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .template-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .template-grid__loading {
    grid-template-columns: 1fr;
  }

  .template-grid__skeleton {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .template-grid__loading {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
