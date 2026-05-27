<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MinimalLayout from '@/shared/components/MinimalLayout.vue'
import AuthHeader from '../components/AuthHeader.vue'
import AuthFooter from '../components/AuthFooter.vue'
import AuthRegisterForm from '../components/AuthRegisterForm.vue'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const registerFormRef = ref<InstanceType<typeof AuthRegisterForm>>()

const handleRegister = async (data: {
  username: string
  password: string
  nickname?: string
}) => {
  try {
    await authStore.register(data)

    // Redirect to studio after successful registration
    router.push('/studio/assets')
  } catch (error) {
    // Show error on form
    registerFormRef.value?.setFormError('Registration failed. Please try again.')
  }
}
</script>

<template>
  <MinimalLayout>
    <div class="register-page">
      <AuthHeader label="REGISTER" title="Portfolio" />

      <AuthRegisterForm
        ref="registerFormRef"
        :loading="authStore.isLoading"
        @submit="handleRegister"
      />

      <AuthFooter
        text="Have account?"
        link-text="Sign in"
        link-to="/login"
      />
    </div>
  </MinimalLayout>
</template>

<style scoped>
.register-page {
  width: 100%;
  max-width: 480px;
}
</style>
