<script setup lang="ts">
/**
 * WorkEditor 组件 - 作品编辑器主容器
 * Phase 5: 作品编辑器模块 - Task 5.12
 */
import { ref, watch } from 'vue'
import type { Work, Section, SectionType, SectionContent } from '../types'
import SectionList from './SectionList.vue'
import TextBlockEditor from './TextBlockEditor.vue'
import ImageGalleryEditor from './ImageGalleryEditor.vue'
import VideoPlayerEditor from './VideoPlayerEditor.vue'
import QuoteEditor from './QuoteEditor.vue'
import VersionHistory from './VersionHistory.vue'

interface Props {
  work: Work
}

const props = defineProps<Props>()

// 表单数据
const title = ref(props.work.title)
const description = ref(props.work.description || '')
const coverUrl = ref(props.work.coverUrl || '')
const visibility = ref(props.work.visibility)
const sections = ref<Section[]>([...props.work.sections])

// 监听 work 变化
watch(
  () => props.work,
  (newWork) => {
    title.value = newWork.title
    description.value = newWork.description || ''
    coverUrl.value = newWork.coverUrl || ''
    visibility.value = newWork.visibility
    sections.value = [...newWork.sections]
  },
  { deep: true }
)

// 区块编辑器状态
const editingSection = ref<Section | null>(null)
const editorType = ref<SectionType | null>(null)
const showEditor = ref(false)

// 打开区块编辑器
const openEditor = (section: Section) => {
  editingSection.value = section
  editorType.value = section.type
  showEditor.value = true
}

// 关闭编辑器
const closeEditor = () => {
  showEditor.value = false
  editingSection.value = null
  editorType.value = null
}

// 保存区块
const saveSection = async (content: SectionContent) => {
  if (editingSection.value) {
    const index = sections.value.findIndex(s => s.id === editingSection.value!.id)
    if (index !== -1) {
      sections.value[index] = {
        ...sections.value[index],
        content
      }
    }
  }
  closeEditor()
}

// 添加区块
const addSection = async (type: SectionType) => {
  const newSection: Section = {
    id: Date.now(),
    type,
    order: sections.value.length,
    content: getDefaultContent(type),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  sections.value.push(newSection)
  // 自动打开编辑器
  openEditor(newSection)
}

// 获取默认内容
const getDefaultContent = (type: SectionType): SectionContent => {
  switch (type) {
    case 'text_block':
      return { text_block: { content: '' } }
    case 'image_gallery':
      return { image_gallery: { images: [], layout: 'grid' } }
    case 'video_player':
      return { video_player: { videoId: 0 } }
    case 'quote':
      return { quote: { content: '', author: '' } }
    default:
      return {}
  }
}

// 删除区块
const deleteSection = (order: number) => {
  sections.value = sections.value.filter(s => s.order !== order)
  // 重新排序
  sections.value.forEach((s, index) => {
    s.order = index
  })
}

// 复制区块
const duplicateSection = (section: Section) => {
  const newSection: Section = {
    ...section,
    id: Date.now(),
    order: sections.value.length
  }
  sections.value.push(newSection)
}

// 重新排序区块
const reorderSections = (newSections: Section[]) => {
  sections.value = newSections
}

// 版本历史
const showVersionHistory = ref(false)

const openVersionHistory = () => {
  showVersionHistory.value = true
}

const closeVersionHistory = () => {
  showVersionHistory.value = false
}

// 选择封面
const selectCover = () => {
  // 模拟选择封面
  coverUrl.value = 'https://via.placeholder.com/800x600'
}
</script>

<template>
  <div class="work-editor">
    <!-- 左侧基本信息面板 -->
    <aside class="work-editor__sidebar">
      <div class="editor-panel">
        <h3 class="editor-panel__title">基本信息</h3>

        <!-- 标题 -->
        <div class="editor-panel__field">
          <label class="editor-panel__label">标题</label>
          <input v-model="title" type="text" class="editor-panel__input" placeholder="作品标题" />
        </div>

        <!-- 简介 -->
        <div class="editor-panel__field">
          <label class="editor-panel__label">简介</label>
          <textarea
            v-model="description"
            class="editor-panel__textarea"
            placeholder="作品简介"
            rows="3"
          />
        </div>

        <!-- 封面 -->
        <div class="editor-panel__field">
          <label class="editor-panel__label">封面</label>
          <div class="editor-panel__cover-selector" @click="selectCover">
            <img v-if="coverUrl" :src="coverUrl" alt="封面" class="editor-panel__cover-image" />
            <span v-else class="editor-panel__cover-placeholder">[选择封面...]</span>
          </div>
        </div>

        <!-- 可见性 -->
        <div class="editor-panel__field">
          <label class="editor-panel__label">可见性</label>
          <div class="editor-panel__radio-group">
            <label class="editor-panel__radio">
              <input
                v-model="visibility"
                type="radio"
                :value="0"
                class="editor-panel__radio-input"
              />
              <span class="editor-panel__radio-label">私密</span>
            </label>
            <label class="editor-panel__radio">
              <input
                v-model="visibility"
                type="radio"
                :value="1"
                class="editor-panel__radio-input"
              />
              <span class="editor-panel__radio-label">公开</span>
            </label>
          </div>
        </div>

        <!-- 版本历史 -->
        <button class="editor-panel__version-link" @click="openVersionHistory">
          [版本历史]
        </button>
      </div>
    </aside>

    <!-- 右侧区块编辑区 -->
    <main class="work-editor__main">
      <SectionList
        :sections="sections"
        @reorder="reorderSections"
        @add="addSection"
        @edit="openEditor"
        @delete="deleteSection"
        @duplicate="duplicateSection"
      />
    </main>

    <!-- 区块编辑器 -->
    <TextBlockEditor
      v-if="editorType === 'text_block'"
      :section="editingSection"
      :open="showEditor"
      @close="closeEditor"
      @save="saveSection"
    />

    <ImageGalleryEditor
      v-if="editorType === 'image_gallery'"
      :section="editingSection"
      :open="showEditor"
      @close="closeEditor"
      @save="saveSection"
    />

    <VideoPlayerEditor
      v-if="editorType === 'video_player'"
      :section="editingSection"
      :open="showEditor"
      @close="closeEditor"
      @save="saveSection"
    />

    <QuoteEditor
      v-if="editorType === 'quote'"
      :section="editingSection"
      :open="showEditor"
      @close="closeEditor"
      @save="saveSection"
    />

    <!-- 版本历史 -->
    <VersionHistory
      v-if="showVersionHistory"
      :open="showVersionHistory"
      :work-id="work.id"
      @close="closeVersionHistory"
    />
  </div>
</template>

<style scoped>
.work-editor {
  display: flex;
  height: calc(100vh - var(--height-navbar));
}

/* 侧边栏 */
.work-editor__sidebar {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-subtle);
  padding: var(--spacing-element-md);
  background: var(--color-bg-primary);
  overflow-y: auto;
}

.editor-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
}

.editor-panel__title {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding-bottom: var(--spacing-1);
  border-bottom: 1px solid var(--color-border-subtle);
  margin: 0;
}

.editor-panel__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.editor-panel__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.editor-panel__input {
  height: var(--height-input-md);
  padding: 0 var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.editor-panel__input:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

.editor-panel__textarea {
  min-height: 80px;
  padding: var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  resize: vertical;
}

.editor-panel__textarea:focus {
  outline: none;
  border-color: var(--color-text-display);
  background: var(--color-bg-primary);
}

.editor-panel__cover-selector {
  aspect-ratio: 16 / 10;
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  overflow: hidden;
}

.editor-panel__cover-selector:hover {
  border-color: var(--color-border-strong);
  border-style: solid;
}

.editor-panel__cover-placeholder {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.editor-panel__cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.editor-panel__radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.editor-panel__radio {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
}

.editor-panel__radio-input {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border-strong);
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

.editor-panel__radio-input:checked {
  border-color: var(--color-text-display);
}

.editor-panel__radio-input:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: var(--color-text-display);
  border-radius: 50%;
}

.editor-panel__radio-label {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.editor-panel__version-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height-input-md);
  margin-top: var(--spacing-element-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: var(--transition-fast);
}

.editor-panel__version-link:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}

/* 主内容区 */
.work-editor__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  overflow-y: auto;
  padding: var(--spacing-element-md);
}
</style>
