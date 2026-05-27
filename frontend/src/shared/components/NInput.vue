<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  error?: string
  disabled?: boolean
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'enter', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false
})

const emit = defineEmits<Emits>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emit('enter', e)
  }
}
</script>

<template>
  <div :class="['n-input', `n-input--${size}`, { 'n-input--error': error }]">
    <label v-if="label" class="n-input__label">
      {{ label }}
    </label>

    <div class="n-input__wrapper">
      <input
        :class="['n-input__field']"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        v-bind="$attrs"
      />
    </div>

    <span v-if="error" class="n-input__error">{{ error }}</span>
  </div>
</template>

<style scoped>
.n-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
  width: 100%;
}

.n-input__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.n-input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.n-input__field {
  width: 100%;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  outline: none;
  transition: var(--transition-fast);
}

.n-input__field::placeholder {
  color: var(--color-text-disabled);
}

.n-input__field:focus {
  border-color: var(--color-border-strong);
}

.n-input__field:disabled {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.n-input__field:read-only {
  background-color: var(--color-bg-secondary);
  cursor: default;
}

.n-input--error .n-input__field {
  border-color: var(--color-error-border);
}

.n-input--error .n-input__field:focus {
  border-color: var(--color-error-text);
}

.n-input__error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-regular);
  color: var(--color-error-text);
}

/* Sizes */
.n-input--sm .n-input__field {
  height: var(--height-input-sm);
  padding: 0 var(--spacing-element-md);
  font-size: var(--font-size-body-sm);
}

.n-input--md .n-input__field {
  height: var(--height-input-md);
  padding: 0 var(--spacing-element-lg);
}

.n-input--lg .n-input__field {
  height: var(--height-input-lg);
  padding: 0 var(--spacing-component-md);
  font-size: var(--font-size-body-lg);
}
</style>
