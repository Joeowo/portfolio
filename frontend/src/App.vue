<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from '@/shared/components/MainNavigation.vue'
import NToastContainer from '@/shared/components/NToastContainer.vue'
import NConfirmDialog from '@/shared/components/NConfirmDialog.vue'
import { getToasts } from '@/shared/composables/useNotification'
import { getDialogState, handleDialogConfirm, handleDialogCancel } from '@/shared/composables/useDialog'

// Get global toast state
const toasts = getToasts()
const dialogState = getDialogState()

// Handle dialog actions
function handleConfirm() {
  handleDialogConfirm()
}

function handleCancel() {
  handleDialogCancel()
}

function handleCloseToast(id: string) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}
</script>

<template>
  <!-- 全局导航 -->
  <MainNavigation />

  <!-- Toast 容器 -->
  <NToastContainer
    :items="toasts"
    position="top-right"
    @close="handleCloseToast"
  />

  <!-- 确认对话框 -->
  <NConfirmDialog
    v-bind="dialogState"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />

  <!-- 页面内容 -->
  <div class="app-content">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="(route.meta.transition as string) || 'page'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
/* Global app styles */

.app-content {
  padding-top: 56px; /* 导航栏高度 */
  min-height: 100vh;
}

/* CSS 变量 - 状态色扩展 */
:root {
  --z-toast: 9999;
  --z-modal: 9998;

  /* Success colors */
  --color-success-bg: #e8f5e9;
  --color-success-bg-hover: #c8e6c9;
  --color-success-border: #81c784;
  --color-success-text: #2e7d32;

  /* Error colors */
  --color-error-bg: #ffebee;
  --color-error-bg-hover: #ffcdd2;
  --color-error-border: #e57373;
  --color-error-text: #c62828;

  /* Warning colors */
  --color-warning-bg: #fff8e1;
  --color-warning-bg-hover: #ffecb3;
  --color-warning-border: #ffd54f;
  --color-warning-text: #f57f17;

  /* Info colors */
  --color-info-bg: #e3f2fd;
  --color-info-bg-hover: #bbdefb;
  --color-info-border: #64b5f6;
  --color-info-text: #1565c0;

  /* Ease functions */
  --ease-out-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
</style>
