<script setup lang="ts">
/**
 * WorkEditorPage - 作品编辑页面
 * Phase 5: 作品编辑器模块 - Task 5.15
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorksStore } from '../stores/worksStore'
import WorkEditor from '../components/WorkEditor.vue'
import NButton from '@/shared/components/NButton.vue'
import type { Work } from '../types'

const route = useRoute()
const router = useRouter()
const worksStore = useWorksStore()

// 获取作品 ID
const workId = computed(() => parseInt(route.params.id as string))

// 加载状态
const loading = ref(true)
const error = ref<string | null>(null)

// 当前作品
const currentWork = computed(() => worksStore.currentWork)

// 保存状态
const saveStatus = computed(() => worksStore.saveStatus)

// 保存状态文本
const saveStatusText = computed(() => {
  switch (saveStatus.value) {
    case 'saved':
      return 'SAVED'
    case 'unsaved':
      return 'UNSAVED'
    case 'saving':
      return 'SAVING...'
    default:
      return ''
  }
})

const saveStatusClass = computed(() => {
  return `save-status--${saveStatus.value}`
})

// 初始化
onMounted(async () => {
  try {
    await worksStore.fetchWork(workId.value)
    worksStore.startAutoSave()
  } catch (err: any) {
    error.value = err.message || '加载作品失败'
  } finally {
    loading.value = false
  }
})

// 清理
onUnmounted(() => {
  worksStore.stopAutoSave()
  worksStore.clearCurrentWork()
})

// 返回列表
const goBack = () => {
  if (saveStatus.value === 'unsaved') {
    if (confirm('有未保存的更改，确定要离开吗？')) {
      router.push('/studio/works')
    }
  } else {
    router.push('/studio/works')
  }
}

// 保存作品
const handleSave = async (work: Work) => {
  try {
    await worksStore.updateWork(work.id, {
      title: work.title,
      description: work.description,
      coverUrl: work.coverUrl,
      visibility: work.visibility
    })
  } catch (err: any) {
    error.value = err.message || '保存失败'
  }
}

// 取消编辑
const handleCancel = () => {
  goBack()
}

// 预览
const handlePreview = () => {
  // TODO: 实现预览功能
  alert('预览功能开发中...')
}
</script>

<template>
  <div class="work-editor-page">
    <!-- 头部工具栏 -->
    <header class="editor-header">
      <div class="editor-header__left">
        <button class="back-button" @click="goBack">[← 返回]</button>
        <span class="breadcrumb"> 我的作品 / {{ currentWork?.title || '未命名作品' }} </span>
      </div>
      <div class="editor-header__right">
        <span :class="['save-status', saveStatusClass]"> [{{ saveStatusText }}] </span>
        <NButton type="secondary" size="sm" @click="handlePreview"> [预览] </NButton>
        <NButton type="primary" size="sm" @click="handleSave(currentWork!)"> [保存] </NButton>
      </div>
    </header>

    <!-- 加载状态 -->
    <div v-if="loading" class="editor-loading">
      <div class="loading-text">[LOADING...]</div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="editor-error">
      <div class="error-message">{{ error }}</div>
      <NButton type="secondary" @click="goBack">[返回]</NButton>
    </div>

    <!-- 编辑器 -->
    <WorkEditor
      v-else-if="currentWork"
      :work="currentWork"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
.work-editor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 头部工具栏 */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md) var(--spacing-screen-md);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.editor-header__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-md);
}

.back-button {
  padding: var(--spacing-1) var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.back-button:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.breadcrumb {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-secondary);
}

.editor-header__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
}

.save-status {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  padding: var(--spacing-1) var(--spacing-element-sm);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.save-status--saved {
  color: var(--color-success-text);
}

.save-status--unsaved {
  color: var(--color-warning-text);
}

.save-status--saving {
  color: var(--color-text-secondary);
}

/* 加载状态 */
.editor-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.loading-text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* 错误状态 */
.editor-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-component-md);
  flex: 1;
}

.error-message {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-error-text);
}
</style>
