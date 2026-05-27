<script setup lang="ts">
/**
 * VersionHistory 组件 - 版本历史（抽屉）
 * Phase 5: 作品编辑器模块 - Task 5.13
 */
import { ref, onMounted, watch } from 'vue'
import type { WorkVersion } from '../types'
import { useWorksStore } from '../stores/worksStore'

interface Props {
  workId: number
  open?: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const worksStore = useWorksStore()

const versions = ref<WorkVersion[]>([])
const loading = ref(false)
const confirmingRollback = ref<number | null>(null)

// 获取版本列表
const loadVersions = async () => {
  loading.value = true
  try {
    versions.value = await worksStore.fetchVersions(props.workId)
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  if (props.open) {
    loadVersions()
  }
})

// 监听 open 变化
watch(
  () => props.open,
  isOpen => {
    if (isOpen) {
      loadVersions()
    }
  }
)

// 回滚版本
const handleRollback = (version: number) => {
  confirmingRollback.value = version
}

// 确认回滚
const confirmRollback = async () => {
  if (confirmingRollback.value === null) return

  try {
    await worksStore.rollbackToVersion(props.workId, confirmingRollback.value)
    await loadVersions()
    confirmingRollback.value = null
    emit('close')
  } catch (error) {
    console.error('回滚失败:', error)
  }
}

// 取消回滚
const cancelRollback = () => {
  confirmingRollback.value = null
}

// 关闭抽屉
const handleClose = () => {
  emit('close')
}

// 格式化时间
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 7) return `${days} 天前`

  return date.toLocaleDateString('zh-CN')
}

// 是否为当前版本
const isCurrentVersion = (version: WorkVersion) => {
  return versions.value.length > 0 && version.version === versions.value[0].version
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="version-history">
        <!-- 头部 -->
        <div class="version-history__header">
          <h3 class="version-history__title">版本历史</h3>
          <button class="version-history__close" @click="handleClose">×</button>
        </div>

        <!-- 版本列表 -->
        <div class="version-history__list">
          <div v-if="loading" class="version-history__loading">[LOADING...]</div>

          <div v-else-if="versions.length === 0" class="version-history__empty">
            <div class="empty-number">0</div>
            <div class="empty-label">VERSIONS</div>
          </div>

          <div v-else class="version-items">
            <div v-for="version in versions" :key="version.id" class="version-item">
              <div class="version-item__header">
                <span class="version-item__number">V{{ version.version }}</span>
                <span v-if="isCurrentVersion(version)" class="version-item__current">[当前]</span>
                <button
                  v-else
                  class="version-item__restore"
                  @click="handleRollback(version.version)"
                >
                  [恢复]
                </button>
              </div>
              <div class="version-item__time">{{ formatTime(version.createdAt) }}</div>
              <div v-if="version.description" class="version-item__description">
                {{ version.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- 回滚确认对话框 -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="confirmingRollback !== null" class="rollback-confirm-overlay">
              <div class="rollback-confirm">
                <h3 class="rollback-confirm__title">确认回滚</h3>
                <p class="rollback-confirm__message">
                  确定要回滚到版本 V{{ confirmingRollback }} 吗？
                </p>
                <p class="rollback-confirm__note">当前版本将被保存为新版本。</p>
                <div class="rollback-confirm__actions">
                  <button class="editor-btn editor-btn--secondary" @click="cancelRollback">
                    取消
                  </button>
                  <button class="editor-btn editor-btn--primary" @click="confirmRollback">
                    确认
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.version-history {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border-default);
  z-index: var(--z-drawer);
  display: flex;
  flex-direction: column;
}

/* 头部 */
.version-history__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.version-history__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0;
}

.version-history__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  font-size: var(--font-size-h2);
  line-height: 1;
  color: var(--color-text-primary);
  transition: var(--transition-fast);
}

.version-history__close:hover {
  border-color: var(--color-border-strong);
}

/* 列表 */
.version-history__list {
  flex: 1;
  padding: var(--spacing-element-md);
  overflow-y: auto;
}

.version-history__loading {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  text-align: center;
  padding: var(--spacing-component-md);
}

.version-history__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-component-md);
}

.empty-number {
  font-family: var(--font-family-display);
  font-size: 48px;
  color: var(--color-text-disabled);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-medium);
}

.empty-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.version-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-sm);
}

.version-item {
  padding: var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
}

.version-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-1);
}

.version-item__number {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-display);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  font-weight: var(--font-weight-medium);
}

.version-item__current {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-success-text);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.version-item__restore {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  padding: var(--spacing-1) var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  transition: var(--transition-fast);
}

.version-item__restore:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.version-item__time {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--spacing-1);
}

.version-item__description {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}

/* 回滚确认对话框 */
.rollback-confirm-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.5);
  z-index: var(--z-modal);
  padding: var(--spacing-screen-md);
}

.rollback-confirm {
  width: 100%;
  max-width: 400px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-element-lg);
}

.rollback-confirm__title {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin: 0 0 var(--spacing-element-md) 0;
}

.rollback-confirm__message {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.rollback-confirm__note {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-element-md) 0;
}

.rollback-confirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-element-sm);
}

.editor-btn {
  height: var(--height-button-md);
  padding: 0 var(--spacing-6);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.editor-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
}

.editor-btn--secondary:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

.editor-btn--primary {
  background: var(--color-text-display);
  color: var(--color-text-inverse);
  border-color: var(--color-text-display);
}

.editor-btn--primary:hover {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
}

/* 动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform var(--duration-normal) var(--ease-out);
}

.drawer-enter-from {
  transform: translateX(100%);
}

.drawer-leave-to {
  transform: translateX(100%);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
