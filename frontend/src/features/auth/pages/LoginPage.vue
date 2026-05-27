<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MinimalLayout from '@/shared/components/MinimalLayout.vue'
import AuthHeader from '../components/AuthHeader.vue'
import AuthFooter from '../components/AuthFooter.vue'
import AuthLoginForm from '../components/AuthLoginForm.vue'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const loginFormRef = ref<InstanceType<typeof AuthLoginForm>>()

const handleLogin = async (data: { username: string; password: string }) => {
  try {
    await authStore.login(data)

    // Redirect to the page user was trying to access, or default to studio
    const redirect = (route.query.redirect as string) || '/studio/assets'
    router.push(redirect)
  } catch (error) {
    // Show error on form
    loginFormRef.value?.setFormError('Invalid username or password')
  }
}
</script>

<template>
  <MinimalLayout>
    <div class="login-page">
      <AuthHeader label="LOGIN" title="Portfolio" />

      <AuthLoginForm ref="loginFormRef" :loading="authStore.isLoading" @submit="handleLogin" />

      <AuthFooter text="No account?" link-text="Join" link-to="/register" />
    </div>
  </MinimalLayout>
</template>

<style scoped>
.login-page {
  width: 100%;
  max-width: 480px;
}
</style>
