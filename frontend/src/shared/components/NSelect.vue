<template>
  <div ref="containerRef" class="n-select">
    <button
      :class="['n-select__button', { 'n-select__button--open': isOpen }]"
      @click="toggleDropdown"
    >
      <span v-if="selectedLabel" class="n-select__label">{{ selectedLabel }}</span>
      <span v-else class="n-select__placeholder">{{ placeholder }}</span>
      <span class="n-select__arrow">{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="n-select__dropdown">
        <div
          v-for="option in options"
          :key="option.value"
          :class="[
            'n-select__option',
            { 'n-select__option--selected': modelValue === option.value }
          ]"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select...'
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const option = props.options.find(o => o.value === props.modelValue)
  return option?.label || ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const closeDropdown = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.n-select {
  position: relative;
  min-width: 160px;
}

.n-select__button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  transition: border-color var(--duration-fast) ease-out;
}

.n-select__button:hover {
  border-color: var(--color-border-hover);
}

.n-select__button--open {
  border-color: var(--color-border-selected);
}

.n-select__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.n-select__placeholder {
  color: var(--color-text-disabled);
}

.n-select__arrow {
  font-size: 10px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.n-select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  overflow: hidden;
  z-index: var(--z-dropdown);
  max-height: 300px;
  overflow-y: auto;
}

.n-select__option {
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--duration-fast) ease-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.n-select__option:hover {
  background: var(--color-bg-secondary);
}

.n-select__option--selected {
  font-weight: 500;
  color: var(--color-text-display);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--duration-fast) ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
