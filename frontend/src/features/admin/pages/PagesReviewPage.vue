<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useAdminStore } from '../stores/adminStore'
import { useToast } from '@/shared/composables/useToast'
import PagesReviewList from '../components/PagesReviewList.vue'
import type { PageReviewItem } from '../types'

const adminStore = useAdminStore()
const { success, error: errorToast } = useToast()

onMounted(async () => {
  await adminStore.fetchPagesReview()
})

const handleApprove = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认通过该网页的审核？', '审核确认', {
      confirmButtonText: '通过',
      cancelButtonText: '取消',
      type: 'success'
    })

    await adminStore.approvePage(id)
    success('网页已通过审核')
  } catch (err) {
    // 用户取消
    if (err !== 'cancel') {
      errorToast('审核失败')
    }
  }
}

const handleReject = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认拒绝该网页？', '拒绝确认', {
      confirmButtonText: '拒绝',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await adminStore.rejectPage(id)
    success('网页已被拒绝')
  } catch (err) {
    // 用户取消
    if (err !== 'cancel') {
      errorToast('操作失败')
    }
  }
}

const handleOffline = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认下架该网页？', '下架确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await adminStore.setPageOffline(id)
    success('网页已下架')
  } catch (err) {
    // 用户取消
    if (err !== 'cancel') {
      errorToast('操作失败')
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
