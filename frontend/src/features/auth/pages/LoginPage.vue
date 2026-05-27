<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MinimalLayout from '@/shared/components/MinimalLayout.vue'
import AuthHeader from '../components/AuthHeader.vue'
import AuthFooter from '../components/AuthFooter.vue'
import AuthLoginForm from '../components/AuthLoginForm.vue'

const router = useRouter()
const loading = ref(false)
const loginFormRef = ref<InstanceType<typeof AuthLoginForm>>()

const handleLogin = async (data: { username: string; password: string }) => {
  loading.value = true

  // Simulate API call
  // TODO: Replace with actual auth API call
  console.log('[Demo] Login:', data)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Demo: accept any valid input
  if (data.username === 'demo' && data.password === 'password') {
    // Success - redirect to studio
    router.push('/studio/assets')
  } else {
    // Show error
    loginFormRef.value?.setFormError('Invalid credentials')
    loading.value = false
  }
}
</script>

<template>
  <MinimalLayout>
    <div class="login-page">
      <AuthHeader label="LOGIN" title="Portfolio" />

      <AuthLoginForm
        ref="loginFormRef"
        :loading="loading"
        @submit="handleLogin"
      />

      <AuthFooter
        text="No account?"
        link-text="Join"
        link-to="/register"
      />
    </div>
  </MinimalLayout>
</template>

<style scoped>
.login-page {
  width: 100%;
  max-width: 480px;
}
</style>
