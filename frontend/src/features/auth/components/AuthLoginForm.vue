<script setup lang="ts">
import { ref, computed } from 'vue'
import NInput from '@/shared/components/NInput.vue'
import NButton from '@/shared/components/NButton.vue'

interface Props {
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: { username: string; password: string }): void
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const form = ref({
  username: '',
  password: ''
})

const errors = ref<{
  username?: string
  password?: string
  form?: string
}>({})

const isValid = computed(() => {
  return form.value.username.length >= 3 && form.value.password.length >= 6
})

const validate = (): boolean => {
  errors.value = {}

  if (!form.value.username) {
    errors.value.username = 'Username is required'
  } else if (form.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  errors.value.form = ''

  if (!validate()) {
    return
  }

  emit('submit', {
    username: form.value.username,
    password: form.value.password
  })
}

const setFormError = (message: string) => {
  errors.value.form = message
}

defineExpose({
  setFormError
})
</script>

<template>
  <div class="auth-login-form">
    <NInput
      v-model="form.username"
      label="USERNAME"
      placeholder="Enter your username"
      :error="errors.username"
      :disabled="loading"
      @enter="handleSubmit"
    />

    <NInput
      v-model="form.password"
      type="password"
      label="PASSWORD"
      placeholder="Enter your password"
      :error="errors.password"
      :disabled="loading"
      @enter="handleSubmit"
    />

    <div v-if="errors.form" class="auth-login-form__error">
      [ {{ errors.form }} ]
    </div>

    <NButton
      type="primary"
      size="lg"
      :loading="loading"
      :disabled="!isValid || loading"
      @click="handleSubmit"
    >
      SIGN IN
    </NButton>
  </div>
</template>

<style scoped>
.auth-login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
}

.auth-login-form__error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-error-text);
  text-align: center;
  padding: var(--spacing-element-sm);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  background: var(--color-error-bg);
}
</style>
