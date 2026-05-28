<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '../stores/adminStore'
import { useNotification } from '@/shared/composables/useNotification'
import { useDialog } from '@/shared/composables/useDialog'
import TemplatesManageTable from '../components/TemplatesManageTable.vue'
import type { TemplateManageItem } from '../types'

const adminStore = useAdminStore()
const { success, error, info } = useNotification()
const dialog = useDialog()

onMounted(async () => {
  await adminStore.fetchTemplates()
})

const handleEdit = (template: TemplateManageItem) => {
  info('编辑功能待实现', {
    title: `编辑模版: ${template.name}`
  })
}

const handleDelete = async (id: number) => {
  const confirmed = await dialog.confirm({
    type: 'danger',
    title: '删除确认',
    message: '确认删除该模版？此操作不可撤销，删除后无法恢复。',
    confirmLabel: '删除',
    cancelLabel: '取消'
  })

  if (confirmed) {
    try {
      await adminStore.deleteTemplate(id)
      success('模版已删除', {
        title: '删除成功'
      })
    } catch {
      error('删除失败，请稍后重试')
    }
  }
}

const handleToggleStatus = async (id: number, status: boolean) => {
  try {
    await adminStore.toggleTemplateStatus(id, status)
    success(status ? '模版已启用' : '模版已禁用', {
      title: status ? '启用成功' : '禁用成功'
    })
  } catch {
    error('操作失败，请稍后重试')
  }
}

const handlePreview = (template: TemplateManageItem) => {
  window.open(template.previewUrl, '_blank')
}
</script>

<template>
  <div class="templates-manage-page">
    <div class="page-header">
      <div class="label label--mono">ADMIN</div>
      <h1 class="page-title">Template Management</h1>
    </div>

    <div class="page-content">
      <TemplatesManageTable
        :templates="adminStore.templates"
        :loading="adminStore.loading"
        @edit="handleEdit"
        @delete="handleDelete"
        @toggle-status="handleToggleStatus"
        @preview="handlePreview"
      />
    </div>
  </div>
</template>

<style scoped>
.templates-manage-page {
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
