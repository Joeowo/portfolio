<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MinimalLayout from '@/shared/components/MinimalLayout.vue'
import AuthHeader from '../components/AuthHeader.vue'
import AuthFooter from '../components/AuthFooter.vue'
import AuthRegisterForm from '../components/AuthRegisterForm.vue'

const router = useRouter()
const loading = ref(false)
const registerFormRef = ref<InstanceType<typeof AuthRegisterForm>>()

const handleRegister = async (data: {
  username: string
  password: string
  nickname?: string
}) => {
  loading.value = true

  // Simulate API call
  // TODO: Replace with actual auth API call
  console.log('[Demo] Register:', data)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo: accept any valid input and redirect to login
  // In real implementation, this would auto-login or show success message
  router.push('/login')
}
</script>

<template>
  <MinimalLayout>
    <div class="register-page">
      <AuthHeader label="REGISTER" title="Portfolio" />

      <AuthRegisterForm
        ref="registerFormRef"
        :loading="loading"
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
