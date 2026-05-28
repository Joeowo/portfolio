<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useAdminStore } from '../stores/adminStore'
import { useToast } from '@/shared/composables/useToast'
import TemplatesManageTable from '../components/TemplatesManageTable.vue'
import type { TemplateManageItem } from '../types'

const adminStore = useAdminStore()
const { success, error: errorToast } = useToast()

onMounted(async () => {
  await adminStore.fetchTemplates()
})

const handleEdit = (_template: TemplateManageItem) => {
  ElMessage.info('编辑功能待实现')
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该模版？此操作不可撤销。', '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await adminStore.deleteTemplate(id)
    success('模版已删除')
  } catch (err) {
    if (err !== 'cancel') {
      errorToast('删除失败')
    }
  }
}

const handleToggleStatus = async (id: number, status: boolean) => {
  try {
    await adminStore.toggleTemplateStatus(id, status)
    success(status ? '模版已启用' : '模版已禁用')
  } catch (err) {
    errorToast('操作失败')
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
