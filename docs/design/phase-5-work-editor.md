# Phase 5: 作品编辑器模块 — UI 设计规范

> 遵循 Nothing Design System
> 亮色模式 | 2026-05-27

---

## 目录

- [1. 视觉层级](#1-视觉层级)
- [2. 页面布局](#2-页面布局)
- [3. 组件设计](#3-组件设计)
- [4. 编辑器交互](#4-编辑器交互)
- [5. 版本历史](#5-版本历史)
- [6. CSS Tokens 映射](#6-css-tokens-映射)

---

## 1. 视觉层级

### 1.1 作品列表页（WorksListPage）

| 层级 | 内容 | 字体 | 大小 | 颜色 |
|:----:|------|------|------|------|
| **Primary** | 作品数量、Hero 标题 "02" | Doto | 72px | `--color-text-display` |
| **Secondary** | 作品卡片标题、封面图 | Space Grotesk | 14–16px | `--color-text-primary` |
| **Tertiary** | 区块数量、更新时间、标签 | Space Mono | 10px ALL CAPS | `--color-text-secondary` |

### 1.2 作品编辑页（WorkEditorPage）

| 层级 | 内容 | 字体 | 大小 | 颜色 |
|:----:|------|------|------|------|
| **Primary** | 保存状态指示 `[SAVED]` | Space Mono | 12px | `--color-success-text` |
| **Secondary** | 作品标题、区块列表 | Space Grotesk | 16–20px | `--color-text-primary` |
| **Tertiary** | 区块类型标签、操作按钮 | Space Mono | 10px ALL CAPS | `--color-text-secondary` |

### 层级分布图 — 作品列表

```
┌─────────────────────────────────────────────────────────────┐
│  [02]                          WORKS          [+ NEW WORK]  │ ← Primary
│  ─────────────────────────────────────────────────────────  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  ALL  DRAFT  PUBLISH │ ← Secondary
│  │      │ │      │ │      │ │      │  8   ·   2024-05-27   │ ← Tertiary
│  │ 封面 │ │ 封面 │ │ 封面 │ │ 封面 │                           │
│  │      │ │      │ │      │ │      │                           │
│  └──────┘ └──────┘ └──────┘ └──────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### 层级分布图 — 作品编辑器

```
┌─────────────────────────────────────────────────────────────┐
│  [←]  我的作品                        [SAVED]    [保存] [预览]│ ← Primary
│  ─────────────────────────────────────────────────────────  │
│  ┌─────────────────────┐ ┌─────────────────────────────────┐│
│  │   基本信息          │ │  内容区块                      ││ ← Secondary
│  │   标题  [_______]   │ │  ┌─────────────────────────────┐││
│  │   简介  [_______]   │ │  │ ⋮⋮  TEXT BLOCK              │││ ← Tertiary
│  │   封面  [选择...]   │ │  │ 预览内容...                  │││
│  │                     │ │  └─────────────────────────────┘││
│  └─────────────────────┘ │  ┌─────────────────────────────┐││
│                          │  │ ⋮⋮  IMAGE GALLERY  [×]     │││
│                          │  │ [图][图][图]                 │││
│                          │  └─────────────────────────────┘││
│                          │                                 ││
│                          │  [+ 添加区块]                   ││
│                          └─────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 页面布局

### 2.1 作品列表页布局

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER — 固定顶部                                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ [02]                    WORKS           [+ 新建作品]       │ │
│  │ ────────                           [搜索...] [筛选▼]     │ │
│  └────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  WORKS GRID — 可滚动区域                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │          │ │          │ │          │ │          │          │
│  │  封面    │ │  封面    │ │  封面    │ │  封面    │          │
│  │          │ │          │ │          │ │          │          │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤          │
│  │ 标题     │ │ 标题     │ │ 标题     │ │ 标题     │          │
│  │ 5 区块   │ │ 3 区块   │ │ 8 区块   │ │ 2 区块   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 作品编辑页布局

```
┌─────────────────────────────────────────────────────────────────┐
│  EDITOR HEADER — 固定顶部                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ [← 返回]  我的作品 / 未命名作品        [SAVED]  [保存][预览]│ │
│  └────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  EDITOR MAIN — 双栏布局                                         │
│  ┌──────────────────────┬─────────────────────────────────────┐│
│  │                      │                                     ││
│  │  基本信息面板        │  内容区块列表                       ││
│  │  ┌────────────────┐  │  ┌───────────────────────────────┐ ││
│  │  │ 标题           │  │  │ ⋮⋮ TEXT BLOCK           [×]  │ ││
│  │  │ [____________] │  │  │ ─────────────────────────────  │ ││
│  │  │                │  │  │ 这是预览内容...               │ ││
│  │  │ 简介           │  │  │                               │ ││
│  │  │ [____________] │  │  │                    [编辑]    │ ││
│  │  │                │  │  └───────────────────────────────┘ ││
│  │  │ 封面           │  │                                   ││
│  │  │ [选择封面...]  │  │  ┌───────────────────────────────┐ ││
│  │  │                │  │  │ ⋮⋮ IMAGE GALLERY        [×]  │ ││
│  │  │ 可见性         │  │  │ ─────────────────────────────  │ ││
│  │  │ ● 私密 ○ 公开  │  │  │ [图][图][图]                 │ ││
│  │  │                │  │  │                               │ ││
│  │  │               │  │  │                    [编辑]    │ ││
│  │  │ [版本历史]     │  │  └───────────────────────────────┘ ││
│  │  └────────────────┘  │                                   ││
│  │                      │  ┌───────────────────────────────┐ ││
│  │  固定宽度: 280px      │  │ [+ 添加区块 ▼]               │ ││
│  └──────────────────────┘  └───────────────────────────────┘ ││
│                            └─────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 尺寸规范

| 元素 | 宽度 | 高度 | 间距 |
|------|------|------|------|
| Header | 100% | 64px | - |
| Work Card | 280px | 320px | gap: 24px |
| Editor Sidebar | 280px | 100% | - |
| Section Item | 100% | auto | gap: 16px |
| Block Editor Modal | 600px | auto | - |

---

## 3. 组件设计

### 3.1 WorkCard.vue — 作品卡片

**尺寸：** 280×320px（宽×高）

**状态：**

```
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│                    │  │                    │  │                    │
│    [封面图]        │  │    [封面图]        │  │    [封面图]        │
│                    │  │                    │  │                    │
│                    │  │   [悬停菜单]       │  │   [选中边框]       │
│                    │  │      ···          │  │   ✓               │
├────────────────────┤  ├────────────────────┤  ├────────────────────┤
│ 未命名的作品        │  │ 未命名的作品        │  │ 未命名的作品        │
│ 5 BLOCKS           │  │ 5 BLOCKS           │  │ 5 BLOCKS           │
│ DRAFT · 2H AGO     │  │ DRAFT · 2H AGO     │  │ DRAFT · 2H AGO     │
└────────────────────┘  └────────────────────┘  └────────────────────┘
     默认状态                悬停状态                选中状态
```

**CSS：**

```css
.work-card {
  width: 280px;
  height: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out-cubic);
  display: flex;
  flex-direction: column;
}

.work-card:hover {
  border-color: var(--color-border-strong);
}

.work-card--selected {
  border-color: var(--color-text-display);
  border-width: 2px;
}

.work-card__cover {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.work-card__content {
  flex: 1;
  padding: var(--spacing-element-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.work-card__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.work-card__meta {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.work-card__blocks {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.work-card__status {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

/* 发布状态颜色 */
.work-card__status--published {
  color: var(--color-success-text);
}

.work-card__status--draft {
  color: var(--color-text-secondary);
}
```

### 3.2 WorksGrid.vue — 作品网格

**布局：** CSS Grid 自适应

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-component-md);  /* 24px */
  padding: var(--spacing-screen-md);
}

.works-grid--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
```

**空状态：**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          0                                  │
│                       WORKS                                 │
│                                                             │
│              [创建你的第一个作品]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 SectionItem.vue — 区块项（可拖拽）

**尺寸：** 100% 宽度，高度自适应

**状态：**

```
┌─────────────────────────────────────────────────────────────┐
│ ⋮⋮               TEXT BLOCK                        [×]      │ ← Header
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│ 这是文本块的预览内容，显示前两行文字，超过部分...          │
│                                                             │
│                                              [编辑] [复制]  │ ← Actions
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⋮⋮           IMAGE GALLERY (3 IMAGES)               [×]      │
│ ─────────────────────────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐                                 │
│  │ 图  │ │ 图  │ │ 图  │                                 │
│  │     │ │     │ │     │                                 │
│  └─────┘ └─────┘ └─────┘                                 │
│                                              [编辑] [复制]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⋮⋮               VIDEO PLAYER                      [×]      │
│ ─────────────────────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │              [视频缩略图 + 播放按钮]                  │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                              [编辑] [复制]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⋮⋮                  QUOTE                          [×]      │
│ ─────────────────────────────────────────────────────────  │
│                                                             │
│        "这是引言预览，显示完整的引言内容..."                │
│                                                             │
│                                         — 作者名          │
│                                              [编辑] [复制]  │
└─────────────────────────────────────────────────────────────┘
```

**CSS：**

```css
.section-item {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.section-item:hover {
  border-color: var(--color-border-strong);
}

.section-item--dragging {
  opacity: 0.5;
  border: 2px dashed var(--color-border-strong);
}

.section-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.section-item__drag-handle {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  cursor: grab;
}

.section-item__type {
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.section-item__delete {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text-disabled);
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-body-md);
}

.section-item__delete:hover {
  color: var(--color-error-text);
}

.section-item__preview {
  padding: var(--spacing-element-md);
  min-height: 80px;
}

.section-item__text-preview {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.section-item__image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-2);
}

.section-item__image-thumb {
  aspect-ratio: 1;
  object-fit: cover;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.section-item__quote-preview {
  font-family: var(--font-family-display);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  line-height: var(--line-height-relaxed);
  font-style: italic;
}

.section-item__quote-author {
  text-align: right;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-2);
}

.section-item__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
}

.section-item__action-btn {
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
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.section-item__action-btn:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}
```

### 3.4 SectionList.vue — 区块列表

**布局：** 使用 vuedraggable 实现拖拽排序

```vue
<template>
  <div class="section-list">
    <draggable
      v-model="sections"
      item-key="id"
      handle=".section-item__drag-handle"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element: section }">
        <SectionItem
          :section="section"
          @edit="onEdit"
          @delete="onDelete"
          @duplicate="onDuplicate"
        />
      </template>
    </draggable>

    <div v-if="sections.length === 0" class="section-list__empty">
      <div class="empty-number">0</div>
      <div class="empty-label">SECTIONS</div>
      <p>添加你的第一个内容区块</p>
    </div>
  </div>
</template>

<style scoped>
.section-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm);
}

.section-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.empty-number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-xl);
  color: var(--color-text-disabled);
  line-height: var(--line-height-tight);
}

.empty-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-disabled);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-top: var(--spacing-2);
}
</style>
```

**添加区块按钮：**

```
┌─────────────────────────────────────────────────────────────┐
│  [+ 添加区块 ▼]                                              │
│                                                              │
│    ┌────────────────────────────────────────────────────┐   │
│    │ TEXT BLOCK            添加文本内容区块               │   │
│    ├────────────────────────────────────────────────────┤   │
│    │ IMAGE GALLERY        添加图片画廊                     │   │
│    ├────────────────────────────────────────────────────┤   │
│    │ VIDEO PLAYER         添加视频播放器                   │   │
│    ├────────────────────────────────────────────────────┤   │
│    │ QUOTE                添加引言块                       │   │
│    └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 编辑器交互

### 4.1 WorkEditor.vue — 编辑器主容器

**布局：** 左侧固定面板 + 右侧滚动区域

```css
.work-editor {
  display: flex;
  height: calc(100vh - var(--height-navbar));
}

.work-editor__sidebar {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-subtle);
  padding: var(--spacing-element-md);
  background: var(--color-bg-primary);
  overflow-y: auto;
}

.work-editor__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
}
```

**基本信息面板：**

```
┌──────────────────────┐
│  基本信息            │
│  ─────────────────── │
│                      │
│  标题                │
│  [_______________]   │
│                      │
│  简介                │
│  [_______________]   │
│  [_______________]   │
│                      │
│  封面                │
│  ┌────────────────┐  │
│  │  [选择封面...] │  │
│  │                │  │
│  └────────────────┘  │
│                      │
│  可见性              │
│  ● 私密  ○ 公开      │
│                      │
│  ─────────────────── │
│  [版本历史]          │
│                      │
└──────────────────────┘
```

**CSS：**

```css
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
  font-family: var(--font-family-base);
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
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
  resize: vertical;
}

.editor-panel__cover-selector {
  aspect-ratio: 16 / 10;
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out-cubic);
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
  border-radius: var(--radius-sm);
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
  font-family: var(--font-family-base);
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
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.editor-panel__version-link:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}
```

### 4.2 TextBlockEditor.vue — 文本块编辑器

**模态框布局：**

```
┌─────────────────────────────────────────────────────────────┐
│  编辑文本区块                                        [×]     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  内容                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  在这里输入文本内容...                              │   │
│  │                                                     │   │
│  │  支持多行输入，自动保存                             │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                             [取消] [保存]   │
└─────────────────────────────────────────────────────────────┘
```

**CSS：**

```css
.block-editor-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 80vh;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  z-index: var(--z-modal);
}

.block-editor-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.block-editor-modal__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
}

.block-editor-modal__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
}

.block-editor-modal__body {
  flex: 1;
  padding: var(--spacing-element-md);
  overflow-y: auto;
}

.block-editor-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
}
```

### 4.3 ImageGalleryEditor.vue — 图片画廊编辑器

**布局：**

```
┌─────────────────────────────────────────────────────────────┐
│  编辑图片画廊                                        [×]     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  已选择的图片 (3)                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐                               │
│  │      │ │      │ │      │                    [+ 添加]   │
│  │  图  │ │  图  │ │  图  │                               │
│  │      │ │      │ │      │                               │
│  └──────┘ └──────┘ └──────┘                               │
│  ┌──────┐ ┌──────┐ ┌──────┐                               │
│  │ [移除]│ │ [移除]│ │ [移除]│                              │
│  └──────┘ └──────┘ └──────┘                               │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  从素材库选择                                               │
│  [打开素材库选择器]                                         │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                             [取消] [保存]   │
└─────────────────────────────────────────────────────────────┘
```

### 4.4 VideoPlayerEditor.vue — 视频播放器编辑器

**布局：**

```
┌─────────────────────────────────────────────────────────────┐
│  编辑视频播放器                                      [×]     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  视频                                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │              [从素材库选择视频]                      │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│  [打开素材库选择器]                                         │
│                                                             │
│  标题（可选）                                               │
│  [_____________________________]                           │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                             [取消] [保存]   │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 QuoteEditor.vue — 引言块编辑器

**布局：**

```
┌─────────────────────────────────────────────────────────────┐
│  编辑引言块                                         [×]     │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  引言内容                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  在这里输入引言内容...                              │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  作者（可选）                                               │
│  [_____________________________]                           │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                             [取消] [保存]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. 版本历史

### 5.1 VersionHistory.vue — 版本历史

**抽屉布局：** 右侧滑入，宽度 400px

```
┌────────────────────────────────────────────┐
│  版本历史                            [×]    │
│  ────────────────────────────────────────  │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  V5                            [当前] │ │
│  │  今天 14:32                               │ │
│  │  ─────────────────────────────────      │ │
│  │  更新了标题和简介                        │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  V4                            [恢复] │ │
│  │  今天 12:15                               │ │
│  │  ─────────────────────────────────      │ │
│  │  添加了图片画廊                          │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  V3                            [恢复] │ │
│  │  昨天 18:45                               │ │
│  │  ─────────────────────────────────      │ │
│  │  修改了文本内容                          │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  V2                            [恢复] │ │
│  │  昨天 10:20                               │ │
│  │  ─────────────────────────────────      │ │
│  │  创建了作品                              │ │
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

**CSS：**

```css
.version-history {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border-default);
  transform: translateX(100%);
  transition: transform var(--duration-normal) var(--ease-out-cubic);
  z-index: var(--z-drawer);
}

.version-history--open {
  transform: translateX(0);
}

.version-history__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.version-history__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
}

.version-history__list {
  padding: var(--spacing-element-md);
  overflow-y: auto;
  max-height: calc(100vh - 64px);
}

.version-item {
  padding: var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  margin-bottom: var(--spacing-element-sm);
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
  transition: all var(--duration-fast) var(--ease-out-cubic);
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
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}
```

**回滚确认对话框：**

```
┌─────────────────────────────────────────────────────────────┐
│  确认回滚                                                   │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  确定要回滚到版本 V4 吗？                                    │
│                                                             │
│  当前版本将被保存为新版本 V5。                              │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                             [取消] [确认]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. CSS Tokens 映射

### 完整变量表

```css
/* === 色彩 === */
--works-bg-primary: var(--color-bg-primary);
--works-bg-secondary: var(--color-bg-secondary);
--works-bg-tertiary: var(--color-bg-tertiary);

--works-text-display: var(--color-text-display);
--works-text-primary: var(--color-text-primary);
--works-text-secondary: var(--color-text-secondary);
--works-text-disabled: var(--color-text-disabled);

--works-border-default: var(--color-border-default);
--works-border-strong: var(--color-border-strong);
--works-border-subtle: var(--color-border-subtle);

/* === 状态色 === */
--works-success-text: var(--color-success-text);
--works-error-text: var(--color-error-text);

/* === 字体 === */
--works-font-base: var(--font-family-base);
--works-font-mono: var(--font-family-mono);
--works-font-display: var(--font-family-display);

/* === 尺寸 === */
--works-card-width: 280px;
--works-card-height: 320px;
--works-card-cover-height: 220px;
--works-sidebar-width: 280px;
--works-modal-width: 600px;
--works-drawer-width: 400px;

/* === 圆角 === */
--works-radius-sm: var(--radius-sm);

/* === 动画 === */
--works-duration-fast: var(--duration-fast);
--works-duration-normal: var(--duration-normal);
--works-ease-out: var(--ease-out-cubic);
```

---

## 7. 组件 Props 接口

### WorkCard.vue

```typescript
interface WorkCardProps {
  work: Work
  selected?: boolean
}

interface Work {
  id: number
  title: string
  description?: string
  coverUrl?: string
  sections: Section[]
  version: number
  visibility: 0 | 1  // 0: private, 1: public
  createdAt: string
  updatedAt: string
}

interface Section {
  type: SectionType
  order: number
  content: Record<string, any>
}

type SectionType = 'text_block' | 'image_gallery' | 'video_player' | 'quote'
```

### WorksGrid.vue

```typescript
interface WorksGridProps {
  works: Work[]
  loading?: boolean
}

interface WorksGridEmits {
  (e: 'select', work: Work): void
  (e: 'delete', id: number): void
  (e: 'duplicate', id: number): void
}
```

### SectionItem.vue

```typescript
interface SectionItemProps {
  section: Section
}

interface SectionItemEmits {
  (e: 'edit', section: Section): void
  (e: 'delete', order: number): void
  (e: 'duplicate', section: Section): void
}
```

### SectionList.vue

```typescript
interface SectionListProps {
  sections: Section[]
}

interface SectionListEmits {
  (e: 'reorder', sections: Section[]): void
  (e: 'add', type: SectionType): void
  (e: 'edit', section: Section): void
  (e: 'delete', order: number): void
}
```

### WorkEditor.vue

```typescript
interface WorkEditorProps {
  work: Work
}

interface WorkEditorEmits {
  (e: 'save', work: Work): void
  (e: 'cancel'): void
}
```

### VersionHistory.vue

```typescript
interface VersionHistoryProps {
  workId: number
  versions: WorkVersion[]
  open?: boolean
}

interface WorkVersion {
  version: number
  createdAt: string
  description?: string
}

interface VersionHistoryEmits {
  (e: 'close'): void
  (e: 'rollback', version: number): void
}
```

---

## 8. 设计决策记录

### 决策 1: 固定宽度侧边栏
**Why:** 编辑器需要稳定的布局，左侧基本信息固定宽度，右侧内容区自适应
**How to apply:** 侧边栏固定 280px，右侧 `flex: 1`

### 决策 2: 卡片封面高度固定
**Why:** 保持网格整齐，封面图统一裁剪
**How to apply:** 固定 220px 高度，使用 `object-fit: cover`

### 决策 3: 拖拽手柄在区块左侧
**Why:** Nothing 风格的机械感，手柄显式表达可拖拽
**How to apply:** 使用 "⋮⋮" 符号作为拖拽手柄，固定在 Header 左侧

### 决策 4: 模态框居中显示
**Why:** 编辑操作需要专注，居中模态框提供最佳聚焦体验
**How to apply:** 固定 600px 宽度，使用 `transform: translate(-50%, -50%)` 居中

### 决策 5: 版本历史使用抽屉
**Why:** 版本列表可能较长，抽屉不影响主编辑区
**How to apply:** 右侧滑入 400px 宽抽屉，列表可滚动

### 决策 6: 无自动保存提示动画
**Why:** 机械感风格，直接显示 `[SAVED]` 文本，无过渡动画
**How to apply:** 状态切换时直接更新文本，颜色从灰色变绿色

### 决策 7: 区块编辑器无实时预览
**Why:** 编辑器需要聚焦，预览在区块列表中已显示，避免重复
**How to apply:** 模态框仅显示编辑表单，保存后更新列表预览

### 决策 8: 无区块数量限制
**Why:** 创作自由度优先，技术可支持大量区块
**How to apply:** 不添加区块数量上限，但虚拟滚动优化性能

### 决策 9: 自动保存间隔 5 分钟
**Why:** 平衡数据安全与性能，5 分钟间隔避免频繁保存
**How to apply:** 使用 `setInterval` 每 300 秒触发一次自动保存

### 决策 10: 版本历史保留 10 个
**Why:** 控制存储成本，10 个版本足够回溯需求
**How to apply:** 超过 10 个时删除最旧的版本（V1）

---

## 9. 交互状态汇总

### 9.1 作品卡片状态

| 状态 | 边框 | 背景 | 额外元素 |
|------|------|------|----------|
| 默认 | `1px solid #D1CFC9` | `#EBE9E6` | - |
| 悬停 | `1px solid #A8A6A0` | `#EBE9E6` | 右上角菜单 |
| 选中 | `2px solid #1A1A1A` | `#EBE9E6` | - |
| 拖拽 | `2px dashed #1A1A1A` | `#E5E3E0` | 半透明 |

### 9.2 区块项状态

| 状态 | 边框 | 背景 | 不透明度 |
|------|------|------|----------|
| 默认 | `1px solid #D1CFC9` | `#EBE9E6` | 100% |
| 悬停 | `1px solid #A8A6A0` | `#EBE9E6` | 100% |
| 拖拽中 | `2px dashed #A8A6A0` | `#F7F5F2` | 50% |

### 9.3 保存状态

| 状态 | 文本 | 颜色 |
|------|------|------|
| 未保存 | `[UNSAVED]` | `#F57C00` |
| 已保存 | `[SAVED]` | `#2E7D32` |
| 保存中 | `[SAVING...]` | `#6B6B6B` |

---

## 10. 已确认配置

| 配置项 | 决策值 | 说明 |
|--------|--------|------|
| 区块编辑器实时预览 | ❌ 否 | 预览在区块列表中显示，编辑器仅编辑 |
| 最大区块数量 | 无限制 | 创作自由度优先，虚拟滚动优化 |
| 自动保存间隔 | 5 分钟 | 平衡安全与性能 |
| 版本历史保留 | 10 个 | 超出后删除最旧版本 |
| 区块复制限制 | 无限制 | 可自由复制任何区块 |

### 自动保存实现

```typescript
// 每 5 分钟自动保存
const AUTO_SAVE_INTERVAL = 5 * 60 * 1000  // 300000ms

onMounted(() => {
  const timer = setInterval(() => {
    if (hasUnsavedChanges.value) {
      autoSaveWork()
    }
  }, AUTO_SAVE_INTERVAL)

  onUnmounted(() => clearInterval(timer))
})
```

### 版本清理策略

```typescript
// 保留最新 10 个版本
function trimVersions(versions: WorkVersion[]): WorkVersion[] {
  if (versions.length <= 10) return versions

  // 按版本号降序，保留前 10 个
  return versions
    .sort((a, b) => b.version - a.version)
    .slice(0, 10)
}
```

---

## 附录：完整页面结构示例

### WorksListPage.vue

```vue
<template>
  <div class="works-list-page">
    <!-- Header -->
    <header class="works-header">
      <div class="works-header__left">
        <h1 class="works-header__title">02</h1>
        <h2 class="works-header__subtitle">WORKS</h2>
      </div>
      <div class="works-header__right">
        <input type="search" placeholder="搜索作品..." class="search-input" />
        <button class="filter-button">筛选</button>
        <NButton type="primary" @click="createWork">
          [+ 新建作品]
        </NButton>
      </div>
    </header>

    <!-- Filter Tabs -->
    <div class="works-filter">
      <button class="filter-tab filter-tab--active">全部 (8)</button>
      <button class="filter-tab">草稿 (5)</button>
      <button class="filter-tab">已发布 (3)</button>
    </div>

    <!-- Grid -->
    <main class="works-main">
      <WorksGrid
        :works="filteredWorks"
        :loading="loading"
        @select="openWork"
        @delete="deleteWork"
        @duplicate="duplicateWork"
      />
      <div v-if="loading" class="loading-text">[LOADING...]</div>
      <div v-if="isEmpty" class="empty-state">
        <div class="empty-number">0</div>
        <div class="empty-label">WORKS</div>
        <p>创建你的第一个作品</p>
        <NButton type="primary" @click="createWork">
          [+ 新建作品]
        </NButton>
      </div>
    </main>
  </div>
</template>
```

### WorkEditorPage.vue

```vue
<template>
  <div class="work-editor-page">
    <!-- Header -->
    <header class="editor-header">
      <div class="editor-header__left">
        <button class="back-button" @click="goBack">
          [← 返回]
        </button>
        <span class="breadcrumb">我的作品 / {{ work.title || '未命名作品' }}</span>
      </div>
      <div class="editor-header__right">
        <span class="save-status" :class="saveStatusClass">
          [{{ saveStatusText }}]
        </span>
        <NButton type="secondary" @click="preview">
          [预览]
        </NButton>
        <NButton type="primary" @click="save">
          [保存]
        </NButton>
      </div>
    </header>

    <!-- Editor -->
    <WorkEditor
      :work="work"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>
```

---

**文档版本:** 1.0
**最后更新:** 2026-05-27
**下一步:** 组件实现 + 拖拽交互验证
