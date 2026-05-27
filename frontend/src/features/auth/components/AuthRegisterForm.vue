<script setup lang="ts">
import { ref, computed } from 'vue'
import NInput from '@/shared/components/NInput.vue'
import NButton from '@/shared/components/NButton.vue'

interface Props {
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: { username: string; password: string; nickname?: string }): void
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const form = ref({
  username: '',
  password: '',
  nickname: ''
})

const errors = ref<{
  username?: string
  password?: string
  nickname?: string
  form?: string
}>({})

const isValid = computed(() => {
  return (
    form.value.username.length >= 3 &&
    form.value.username.length <= 20 &&
    form.value.password.length >= 6 &&
    form.value.nickname.length <= 50
  )
})

const validateUsername = (value: string): string | undefined => {
  if (!value) {
    return 'Username is required'
  }
  if (value.length < 3) {
    return 'Username must be at least 3 characters'
  }
  if (value.length > 20) {
    return 'Username must be at most 20 characters'
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return 'Username can only contain letters, numbers, and underscores'
  }
  return undefined
}

const validate = (): boolean => {
  errors.value = {}

  errors.value.username = validateUsername(form.value.username)

  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }

  if (form.value.nickname && form.value.nickname.length > 50) {
    errors.value.nickname = 'Nickname must be at most 50 characters'
  }

  return Object.values(errors.value).every((v) => !v)
}

const handleSubmit = () => {
  errors.value.form = ''

  if (!validate()) {
    return
  }

  emit('submit', {
    username: form.value.username,
    password: form.value.password,
    nickname: form.value.nickname || undefined
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
  <div class="auth-register-form">
    <NInput
      v-model="form.username"
      label="USERNAME"
      placeholder="Choose a username"
      :error="errors.username"
      :disabled="loading"
      @enter="handleSubmit"
    />

    <NInput
      v-model="form.password"
      type="password"
      label="PASSWORD"
      placeholder="Choose a password"
      :error="errors.password"
      :disabled="loading"
      @enter="handleSubmit"
    />

    <NInput
      v-model="form.nickname"
      label="NICKNAME"
      placeholder="Optional display name"
      :error="errors.nickname"
      :disabled="loading"
      @enter="handleSubmit"
    />

    <div v-if="errors.form" class="auth-register-form__error">
      [ {{ errors.form }} ]
    </div>

    <NButton
      type="primary"
      size="lg"
      :loading="loading"
      :disabled="!isValid || loading"
      @click="handleSubmit"
    >
      CREATE ACCOUNT
    </NButton>
  </div>
</template>

<style scoped>
.auth-register-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
}

.auth-register-form__error {
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
