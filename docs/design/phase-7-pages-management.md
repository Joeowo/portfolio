# Phase 7: 网页管理 — UI 设计规范

> 遵循 Nothing Design System
> 亮色模式 | 2026-05-27

---

## 目录

- [1. 视觉层级](#1-视觉层级)
- [2. 页面布局](#2-页面布局)
- [3. 组件设计](#3-组件设计)
- [4. 交互状态](#4-交互状态)
- [5. 响应式设计](#5-响应式设计)
- [6. CSS Tokens 映射](#6-css-tokens-映射)

---

## 1. 视觉层级

### 三层架构

| 层级 | 内容 | 字体 | 大小 | 颜色 |
|:----:|------|------|------|------|
| **Primary** | 网页缩略图、访问量数字 | Doto / Space Mono | 48–72px | `--color-text-display` |
| **Secondary** | 网页标题、状态标签 | Space Grotesk | 14–16px | `--color-text-primary` |
| **Tertiary** | 元数据、操作提示、SEO 信息 | Space Mono | 10px | `--color-text-secondary` |

### 层级分布图

```
┌─────────────────────────────────────────────────────────────────┐
│  [← BACK]                 MY PAGES               [USER ▼]       │ ← Tertiary
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  8                                                      [+ NEW]  │ ← Primary
│  PUBLISHED PAGES                                              │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │                     │  │                     │              │
│  │   [THUMBNAIL]       │  │   [THUMBNAIL]       │              │ ← Primary
│  │                     │  │                     │              │
│  ├─────────────────────┤  ├─────────────────────┤              │
│  │ 我的设计作品集       │  │ 摄影精选 2024       │              │ ← Secondary
│  │ ONLINE · 1,247      │  │ DRAFT · 0          │              │ ← Tertiary
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 设计原则

1. **缩略图主导**：网页预览图占据卡片 70% 视觉权重
2. **数据驱动**：访问量使用 Hero 数字，状态用颜色编码
3. **操作清晰**：悬停显示操作按钮，选中状态用边框表达
4. **机械感**：4px 圆角、1px 边框、无阴影
5. **克制色彩**：状态颜色仅用于数据编码，非装饰

---

## 2. 页面布局

### 2.1 网页管理页面 (PagesPage)

**布局：** TopNavLayout — 顶部导航 + 全屏内容区

```
┌─────────────────────────────────────────────────────────────────┐
│  [← BACK]    MY PAGES                           [+ NEW PAGE]    │ ← 56px
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  8                                                      [+ NEW]  │ ← 64px breathing
│  PUBLISHED PAGES                                              │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │ ← 16px gap
│  │  ONLINE  │  │  DRAFT   │  │  OFFLINE │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SEARCH PAGES...                           [FILTER ▼]  │   │ ← 40px
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │                 │  │                 │  │                 │ │
│  │   [THUMBNAIL]   │  │   [THUMBNAIL]   │  │   [THUMBNAIL]   │ │ ← 320px 卡片
│  │                 │  │                 │  │                 │ │   24px gap
│  │                 │  │                 │  │                 │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ 我的设计作品集   │  │ 摄影精选 2024   │  │ 插画作品集      │ │
│  │ ONLINE · 1,247  │  │ DRAFT · 0       │  │ OFFLINE · 89    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │                 │  │                 │  │                 │ │
│  │   [THUMBNAIL]   │  │   [THUMBNAIL]   │  │   [THUMBNAIL]   │ │
│  │                 │  │                 │  │                 │ │
│  │                 │  │                 │  │                 │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ 建筑摄影集      │  │ UI 设计作品     │  │ 品牌设计项目    │ │
│  │ ONLINE · 2,341  │  │ ONLINE · 876    │  │ ONLINE · 542    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 尺寸规范

| 元素 | 值 |
|------|-----|
| 顶部导航高度 | 56px |
| 页面水平边距 | 64px |
| 标题顶部间距 | 64px |
| 卡片宽度 | 320px |
| 卡片高度 | 280px |
| 卡片间距 | 24px |
| 预览图高度 | 180px (64%) |
| 信息区高度 | 100px (36%) |

---

## 3. 组件设计

### 3.1 PageCard（网页卡片）

**核心设计原则**：预览图为主，访问量为视觉焦点

```
┌─────────────────────────────┐ 320px
│                             │
│                             │
│      [PREVIEW THUMBNAIL]    │ 180px (64%)
│                             │
│                             │
├─────────────────────────────┤
│ 我的设计作品集               │ 16px / Primary
│ ONLINE · 1,247 VIEWS        │ 10px / Secondary
└─────────────────────────────┘ 100px (36%)

悬停状态：
┌─────────────────────────────┐
│                     [👁 ✎] │ ← 操作按钮，右上角
│                             │
│      [PREVIEW THUMBNAIL]    │
│              +1px BORDER    │ ← 边框加粗
│                             │
├─────────────────────────────┤
│ 我的设计作品集               │
│ ONLINE · 1,247 VIEWS        │
└─────────────────────────────┘

草稿状态：
┌─────────────────────────────┐
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │ ← 虚线边框
│                             │
│      [NO PREVIEW]           │ ← 占位符
│                             │
├─────────────────────────────┤
│ 我的设计作品集               │
│ DRAFT · 0 VIEWS             │
└─────────────────────────────┘
```

**Props：**

```typescript
interface PageCardProps {
  page: PublishedPage
  onPreview?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onToggleStatus?: (id: number) => void
}

interface PublishedPage {
  id: number
  title: string
  slug: string
  workId: number
  templateId: number
  thumbnailUrl?: string
  previewUrl: string
  customUrl?: string
  status: 'draft' | 'online' | 'offline'
  viewCount: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}
```

**样式规范：**

```css
.page-card {
  width: 320px;
  height: 280px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-primary);
  cursor: pointer;
  transition: border-color 150ms ease-out;
  position: relative;
}

.page-card:hover {
  border-width: 2px;
  border-color: var(--color-border-hover);
}

.page-card--draft {
  border-style: dashed;
}

.page-card__thumbnail {
  height: 180px;
  background: var(--color-bg-tertiary);
  position: relative;
  overflow: hidden;
}

.page-card__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-card__thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-disabled);
  text-transform: uppercase;
}

.page-card__actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.page-card:hover .page-card__actions {
  opacity: 1;
}

.page-card__action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: 14px;
  color: var(--color-text-primary);
}

.page-card__info {
  height: 100px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.page-card__title {
  font-family: var(--font-family-primary);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-card__status {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 2px;
}

.page-card__status--online {
  color: var(--color-success-text);
  background: var(--color-success-bg);
}

.page-card__status--draft {
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
}

.page-card__status--offline {
  color: var(--color-warning-text);
  background: var(--color-warning-bg);
}

.page-card__views {
  margin-left: auto;
  font-family: var(--font-family-mono);
  font-size: 10px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-card__views-value {
  font-weight: 500;
  color: var(--color-text-display);
}
```

### 3.2 PagePreview（网页预览）

**设计**：模态框，使用 iframe 或模拟预览

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                  [PAGE PREVIEW]                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   我的设计作品集                                    [CLOSE ✕]    │
│   portfolio.design/my-work                                    │
│                                                                  │
│   ┌────────────────┐  ┌────────────────┐  ┌───────────────┐   │
│   │   [← BACK]     │  │   [ EDIT ]     │  │  [ VISIT → ]  │   │
│   └────────────────┘  └────────────────┘  └───────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Props：**

```typescript
interface PagePreviewProps {
  page: PublishedPage
  open: boolean
  onClose: () => void
  onEdit: () => void
  onVisit: () => void
}
```

**样式规范：**

```css
.page-preview {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fade-in 200ms ease-out;
}

.page-preview__content {
  width: 90%;
  max-width: 1200px;
  height: 80%;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  overflow: hidden;
  animation: scale-up 250ms ease-out;
}

.page-preview__iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.page-preview__footer {
  width: 90%;
  max-width: 1200px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-preview__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-preview__title {
  font-family: var(--font-family-primary);
  font-size: 16px;
  color: var(--color-text-display);
}

.page-preview__url {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.page-preview__actions {
  display: flex;
  gap: 12px;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 3.3 SeoEditor（SEO 编辑器）

**设计**：抽屉式侧边栏，右侧滑入

```
┌────────────────────────────────────────────────────────────┐
│  [×]                                                        │
│                                                             │
│  SEO SETTINGS                                               │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  PAGE TITLE                                  [135 / 60]    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 我的设计作品集 - 创意设计师 Portfolio                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  DESCRIPTION                                [155 / 160]    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 探索我的创意设计作品，包括品牌设计、UI/UX 设计、      │   │
│  │ 插画艺术等。欢迎联系合作！                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  CUSTOM SLUG                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ my-work                                             │   │
│  └─────────────────────────────────────────────────────┘   │
│  portfolio.design/                                       │
│                                                             │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  预览搜索结果：                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 我的设计作品集 - 创意设计师 Portfolio                 │   │
│  │ portfolio.design/my-work                             │   │
│  │ 探索我的创意设计作品，包括品牌设计、UI/UX 设计...      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  [取消]  [保存更改]                                         │
└────────────────────────────────────────────────────────────┘
```

**Props：**

```typescript
interface SeoEditorProps {
  page: PublishedPage
  open: boolean
  onClose: () => void
  onSave: (data: SeoData) => void
}

interface SeoData {
  seoTitle?: string
  seoDescription?: string
  customUrl?: string
}
```

**样式规范：**

```css
.seo-editor {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100%;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border-default);
  transform: translateX(100%);
  transition: transform 200ms ease-out;
  z-index: var(--z-drawer);
  display: flex;
  flex-direction: column;
}

.seo-editor--open {
  transform: translateX(0);
}

.seo-editor__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.seo-editor__title {
  font-family: var(--font-family-primary);
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-display);
}

.seo-editor__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: 16px;
  color: var(--color-text-secondary);
}

.seo-editor__body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.seo-editor__field {
  margin-bottom: 24px;
}

.seo-editor__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.seo-editor__char-count {
  font-size: 9px;
  color: var(--color-text-disabled);
}

.seo-editor__char-count.warning {
  color: var(--color-warning-text);
}

.seo-editor__char-count.error {
  color: var(--color-error-text);
}

.seo-editor__input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-secondary);
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-primary);
  transition: border-color 150ms ease-out;
}

.seo-editor__input:focus {
  outline: none;
  border-color: var(--color-text-display);
}

.seo-editor__textarea {
  min-height: 80px;
  resize: vertical;
}

.seo-editor__slug-wrapper {
  position: relative;
}

.seo-editor__slug-prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-disabled);
  pointer-events: none;
}

.seo-editor__slug-input {
  padding-left: 140px;
}

.seo-editor__preview {
  margin-top: 32px;
  padding: 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: 4px;
}

.seo-editor__preview-label {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

.seo-editor__google-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.seo-editor__preview-title {
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: #1a0dab;
  cursor: pointer;
}

.seo-editor__preview-url {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: #006621;
}

.seo-editor__preview-desc {
  font-family: var(--font-family-primary);
  font-size: 12px;
  color: #545454;
  line-height: 1.4;
}

.seo-editor__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid var(--color-border-subtle);
}
```

### 3.4 PageStatusToggle（状态切换）

**设计**：下拉菜单，支持在线/离线/草稿切换

```
┌─────────────────────────────┐
│  ● ONLINE                   │  ← 当前状态
│  ───────────────────────    │
│  ○ ONLINE                   │
│  ○ OFFLINE                  │
│  ○ DRAFT                    │
└─────────────────────────────┘
```

**组件代码：**

```vue
<template>
  <div class="status-toggle">
    <button
      class="status-toggle__button"
      @click="isOpen = !isOpen"
    >
      <span class="status-toggle__dot" :class="`status-toggle__dot--${page.status}`"></span>
      <span class="status-toggle__label">{{ statusLabel }}</span>
    </button>

    <div v-if="isOpen" class="status-toggle__dropdown">
      <button
        v-for="status in statusOptions"
        :key="status.value"
        :class="[
          'status-toggle__option',
          { 'status-toggle__option--active': page.status === status.value }
        ]"
        @click="handleStatusChange(status.value)"
      >
        {{ status.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.status-toggle {
  position: relative;
}

.status-toggle__button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
}

.status-toggle__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-toggle__dot--online {
  background: var(--color-success-text);
}

.status-toggle__dot--offline {
  background: var(--color-warning-text);
}

.status-toggle__dot--draft {
  background: var(--color-text-disabled);
}

.status-toggle__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 120px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  overflow: hidden;
  z-index: var(--z-dropdown);
}

.status-toggle__option {
  width: 100%;
  padding: 10px 16px;
  text-align: left;
  background: transparent;
  border: none;
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background 150ms ease-out;
}

.status-toggle__option:hover {
  background: var(--color-bg-secondary);
}

.status-toggle__option--active {
  font-weight: 500;
}
</style>
```

### 3.5 PagesFilterBar（筛选工具栏）

**设计**：状态标签 + 搜索框

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │  ALL 8   │  │ ONLINE 5 │  │ DRAFT 2  │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ SEARCH PAGES...                            [FILTER ▼]  │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

**组件代码：**

```vue
<template>
  <div class="pages-filter-bar">
    <!-- 状态标签 -->
    <div class="pages-filter-bar__status-tabs">
      <button
        v-for="status in statusOptions"
        :key="status.value"
        :class="[
          'pages-filter-bar__tab',
          { 'pages-filter-bar__tab--active': currentStatus === status.value }
        ]"
        @click="$emit('update:status', status.value)"
      >
        {{ status.label }}
        <span class="pages-filter-bar__count">{{ status.count }}</span>
      </button>
    </div>

    <!-- 搜索和筛选 -->
    <div class="pages-filter-bar__search">
      <NInput
        v-model="searchQuery"
        placeholder="SEARCH PAGES..."
        clearable
      />
      <NSelect
        v-model="sortBy"
        :options="sortOptions"
        placeholder="SORT BY"
      />
    </div>
  </div>
</template>

<style scoped>
.pages-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.pages-filter-bar__status-tabs {
  display: flex;
  gap: 8px;
}

.pages-filter-bar__tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  cursor: pointer;
  transition: all 150ms ease-out;
}

.pages-filter-bar__tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
  border-color: var(--color-border-selected);
}

.pages-filter-bar__count {
  font-weight: 500;
}

.pages-filter-bar__search {
  display: flex;
  gap: 16px;
}

.pages-filter-bar__search .n-input {
  flex: 1;
}
</style>
```

---

## 4. 交互状态

### 4.1 PageCard 状态矩阵

| 状态 | 边框 | 背景 | 操作按钮 | 缩略图 |
|------|------|------|----------|--------|
| **Default** | 1px 实线 | 主背景 | 隐藏 | 预览图 |
| **Hover** | 2px 实线 | 主背景 | 显示 | 预览图 |
| **Draft** | 1px 虚线 | 主背景 | 隐藏 | 占位符 |
| **Selected** | 2px 选中色 | 次背景 | 显示 | 预览图 |

### 4.2 状态颜色编码

| 状态 | 文字颜色 | 背景颜色 | 使用场景 |
|------|----------|----------|----------|
| **Online** | `#3A7A3A` | `#E8F5E9` | 已上线网页 |
| **Offline** | `#B97B00` | `#FFF4E6` | 已下线网页 |
| **Draft** | `#6B6B6B` | `#F1EDE6` | 草稿状态 |

### 4.3 过渡动画

```css
/* 卡片边框过渡 */
.page-card {
  transition: border-color 150ms ease-out, border-width 150ms ease-out;
}

/* 操作按钮淡入淡出 */
.page-card__actions {
  transition: opacity 150ms ease-out;
}

/* SEO 抽屉滑入 */
.seo-editor {
  transition: transform 200ms ease-out;
}

/* 预览模态框淡入 */
.page-preview {
  animation: fade-in 200ms ease-out;
}

.page-preview__content {
  animation: scale-up 250ms ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 4.4 加载状态

**无骨架屏** — 使用 `[LOADING...]` 文本：

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        [LOADING...]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 空状态

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          0                                  │
│                       PAGES                                 │
│                                                             │
│   您还没有发布任何网页                                       │
│   创建第一个作品并发布                                       │
│                                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │          [+ CREATE FIRST PAGE]                   │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. 响应式设计

### 断点策略

| 断点 | 屏幕宽度 | 列数 | 卡片宽度 | 间距 |
|------|----------|------|----------|------|
| **Mobile** | < 768px | 1 | 100% | 16px |
| **Tablet** | 768px - 1024px | 2 | calc(50% - 12px) | 24px |
| **Desktop** | > 1024px | 3-4 | 320px | 24px |

### 移动端适配

```css
/* Mobile */
@media (max-width: 768px) {
  .pages-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .page-card {
    width: 100%;
    height: 260px;
  }

  .page-card__thumbnail {
    height: 160px;
  }

  .pages-filter-bar__status-tabs {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .pages-filter-bar__search {
    flex-direction: column;
  }

  .seo-editor {
    width: 100%;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .pages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 6. CSS Tokens 映射

### 颜色（亮色模式）

```css
/* 边框颜色 */
--color-border-default: #D1CFC9;
--color-border-hover: #A8A6A0;
--color-border-selected: #2D2D2D;
--color-border-subtle: #E5E3E0;

/* 背景颜色 */
--color-bg-primary: #F7F5F2;
--color-bg-secondary: #EBE9E6;
--color-bg-tertiary: #E5E3E0;

/* 文字颜色 */
--color-text-display: #1A1A1A;
--color-text-primary: #2D2D2D;
--color-text-secondary: #6B6B6B;
--color-text-disabled: #9B9B9B;

/* 状态颜色 */
--color-success-text: #3A7A3A;
--color-success-bg: #E8F5E9;
--color-warning-text: #B97B00;
--color-warning-bg: #FFF4E6;
--color-error-text: #D71921;
--color-error-bg: #FFEBEE;
```

### 间距

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
--spacing-3xl: 48px;
--spacing-4xl: 64px;
```

### 字体

```css
--font-family-display: 'Doto', sans-serif;
--font-family-primary: 'Space Grotesk', sans-serif;
--font-family-mono: 'Space Mono', monospace;

--font-size-xs: 10px;
--font-size-sm: 12px;
--font-size-md: 14px;
--font-size-lg: 16px;
--font-size-xl: 18px;
--font-size-2xl: 24px;
--font-size-3xl: 32px;
--font-size-4xl: 48px;
```

### 圆角

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-pill: 999px;
```

### 动画

```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 250ms;

--easing-out: cubic-bezier(0.215, 0.61, 0.355, 1);
```

### Z-index 层级

```css
--z-dropdown: 100;
--z-drawer: 200;
--z-modal: 300;
```

---

## 附录：Mock 数据结构

```typescript
// PublishedPage 类型定义
interface PublishedPage {
  id: number
  title: string
  slug: string
  workId: number
  templateId: number
  thumbnailUrl?: string
  previewUrl: string
  customUrl?: string
  status: 'draft' | 'online' | 'offline'
  viewCount: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

// Mock 数据（10 条）
const mockPages: PublishedPage[] = [
  {
    id: 1,
    title: '我的设计作品集',
    slug: 'my-work',
    workId: 1,
    templateId: 1,
    thumbnailUrl: '/pages/page-1-thumb.png',
    previewUrl: '/pages/page-1-preview.png',
    customUrl: 'my-work',
    status: 'online',
    viewCount: 1247,
    seoTitle: '我的设计作品集 - 创意设计师 Portfolio',
    seoDescription: '探索我的创意设计作品，包括品牌设计、UI/UX 设计、插画艺术等。',
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-05-20T00:00:00Z'
  },
  {
    id: 2,
    title: '摄影精选 2024',
    slug: 'photography-2024',
    workId: 2,
    templateId: 2,
    previewUrl: '/pages/page-2-preview.png',
    status: 'draft',
    viewCount: 0,
    createdAt: '2024-05-15T00:00:00Z',
    updatedAt: '2024-05-15T00:00:00Z'
  },
  {
    id: 3,
    title: '插画作品集',
    slug: 'illustration-works',
    workId: 3,
    templateId: 3,
    thumbnailUrl: '/pages/page-3-thumb.png',
    previewUrl: '/pages/page-3-preview.png',
    status: 'offline',
    viewCount: 89,
    createdAt: '2024-04-20T00:00:00Z',
    updatedAt: '2024-05-10T00:00:00Z'
  },
  {
    id: 4,
    title: '建筑摄影集',
    slug: 'architecture',
    workId: 4,
    templateId: 1,
    thumbnailUrl: '/pages/page-4-thumb.png',
    previewUrl: '/pages/page-4-preview.png',
    customUrl: 'architecture-photos',
    status: 'online',
    viewCount: 2341,
    seoTitle: '建筑摄影作品集 - 捕捉空间与光影',
    seoDescription: '精选建筑摄影作品，展示现代建筑与城市空间的独特视角。',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-05-05T00:00:00Z'
  },
  {
    id: 5,
    title: 'UI 设计作品',
    slug: 'ui-works',
    workId: 5,
    templateId: 2,
    thumbnailUrl: '/pages/page-5-thumb.png',
    previewUrl: '/pages/page-5-preview.png',
    status: 'online',
    viewCount: 876,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-05-12T00:00:00Z'
  },
  {
    id: 6,
    title: '品牌设计项目',
    slug: 'brand-design',
    workId: 6,
    templateId: 3,
    thumbnailUrl: '/pages/page-6-thumb.png',
    previewUrl: '/pages/page-6-preview.png',
    status: 'online',
    viewCount: 542,
    createdAt: '2024-04-10T00:00:00Z',
    updatedAt: '2024-05-08T00:00:00Z'
  },
  {
    id: 7,
    title: '平面设计精选',
    slug: 'graphic-design',
    workId: 7,
    templateId: 1,
    previewUrl: '/pages/page-7-preview.png',
    status: 'draft',
    viewCount: 0,
    createdAt: '2024-05-20T00:00:00Z',
    updatedAt: '2024-05-20T00:00:00Z'
  },
  {
    id: 8,
    title: '3D 艺术作品',
    slug: '3d-art',
    workId: 8,
    templateId: 2,
    thumbnailUrl: '/pages/page-8-thumb.png',
    previewUrl: '/pages/page-8-preview.png',
    status: 'draft',
    viewCount: 0,
    createdAt: '2024-05-22T00:00:00Z',
    updatedAt: '2024-05-22T00:00:00Z'
  }
]
```

---

## 设计决策记录

### 决策 1: 访问量作为视觉焦点
**Why:** 访问量是网页管理最重要的指标，需要用户一目了然
**How to apply:** 使用 Hero 数字（Space Mono）+ 大字号，与状态标签并排显示

### 决策 2: 草稿状态使用虚线边框
**Why:** 视觉上区分未发布内容，且传达"不完整"的语义
**How to apply:** `border-style: dashed`，与已发布内容形成对比

### 决策 3: SEO 编辑器使用抽屉而非模态框
**Why:** SEO 编辑是辅助操作，需要保持上下文可见
**How to apply:** 右侧滑入抽屉，宽度 480px，可即时预览搜索结果

### 决策 4: 状态颜色编码仅用于数据展示
**Why:** 遵循 Nothing 设计原则，颜色用于信息而非装饰
**How to apply:** 状态标签使用低饱和度背景色，文字使用高对比度

### 决策 5: 无骨架屏加载
**Why:** Nothing 设计原则 — 使用机械感文本提示而非模糊占位
**How to apply:** 加载时显示 `[LOADING...]` 居中文本

---

**文档版本**：1.0
**最后更新**：2026-05-27
**设计师**：Claude (Nothing Design System)
