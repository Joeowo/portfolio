<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '../stores/adminStore'
import { useNotification } from '@/shared/composables/useNotification'
import { useDialog } from '@/shared/composables/useDialog'
import PagesReviewList from '../components/PagesReviewList.vue'
import type { PageReviewItem } from '../types'

const adminStore = useAdminStore()
const { success, error, warning } = useNotification()
const dialog = useDialog()

onMounted(async () => {
  await adminStore.fetchPagesReview()
})

const handleApprove = async (id: number) => {
  const confirmed = await dialog.confirm({
    type: 'success',
    title: '审核确认',
    message: '确认通过该网页的审核？通过后网页将正式上线。',
    confirmLabel: '通过',
    cancelLabel: '取消'
  })

  if (confirmed) {
    try {
      await adminStore.approvePage(id)
      success('网页已通过审核', {
        title: '审核成功'
      })
    } catch {
      error('审核失败，请稍后重试')
    }
  }
}

const handleReject = async (id: number) => {
  const confirmed = await dialog.confirm({
    type: 'warning',
    title: '拒绝确认',
    message: '确认拒绝该网页？拒绝后用户需要修改后重新提交审核。',
    confirmLabel: '拒绝',
    cancelLabel: '取消'
  })

  if (confirmed) {
    try {
      await adminStore.rejectPage(id)
      warning('网页已被拒绝', {
        title: '已拒绝'
      })
    } catch {
      error('操作失败，请稍后重试')
    }
  }
}

const handleOffline = async (id: number) => {
  const confirmed = await dialog.confirm({
    type: 'warning',
    title: '下架确认',
    message: '确认下架该网页？下架后网页将无法被访问。',
    confirmLabel: '确认下架',
    cancelLabel: '取消'
  })

  if (confirmed) {
    try {
      await adminStore.setPageOffline(id)
      warning('网页已下架', {
        title: '下架成功'
      })
    } catch {
      error('操作失败，请稍后重试')
    }
  }
}

const handlePreview = (page: PageReviewItem) => {
  window.open(page.previewUrl, '_blank')
}
</script>

<template>
  <div class="pages-review-page">
    <div class="page-header">
      <div class="label label--mono">ADMIN</div>
      <h1 class="page-title">Pages Review</h1>
    </div>

    <div class="page-content">
      <PagesReviewList
        :pages="adminStore.pagesReview"
        :loading="adminStore.loading"
        @approve="handleApprove"
        @reject="handleReject"
        @offline="handleOffline"
        @preview="handlePreview"
      />
    </div>
  </div>
</template>

<style scoped>
.pages-review-page {
  min-height: 100vh;
  padding: var(--spacing-screen-lg);
  background: var(--color-bg-primary);
}

.page-header {
  margin-bottom: var(--spacing-component-lg);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-element-sm);
}

.page-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.page-content {
  display: flex;
  flex-direction: column;
}
</style>
