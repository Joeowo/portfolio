# Phase 6: 模版选择 — UI 设计规范

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
| **Primary** | 模版预览图、选中模版名称 | Space Grotesk | 48px | `--color-text-display` |
| **Secondary** | 模版卡片标题、分类名称 | Space Grotesk | 16px / 12px | `--color-text-primary` / `--color-text-secondary` |
| **Tertiary** | 模版标签、元数据、操作提示 | Space Mono | 10px | `--color-text-secondary` |

### 层级分布图

```
┌─────────────────────────────────────────────────────────────────┐
│  [← BACK]                 CHOOSE TEMPLATE        [USER]        │ ← Tertiary
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SELECT A LAYOUT FOR YOUR PORTFOLIO                             │ ← Primary
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │   [PREVIEW] │  │   [PREVIEW] │  │   [PREVIEW] │             │ ← Primary
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  MINIMALIST        SERENE            MODERN                    │ ← Secondary
│  SYSTEM / SINGLE   SYSTEM / GRID     SYSTEM / TWO-COLUMN       │ ← Tertiary
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │             │  │             │                              │
│  │   [PREVIEW] │  │   [PREVIEW] │                              │
│  │             │  │             │                              │
│  │             │  │             │                              │
│  └─────────────┘  └─────────────┘                              │
│                                                                 │
│  CUSTOM #1          CUSTOM #2                                   │ ← Secondary
│  CUSTOM / GRID      CUSTOM / SINGLE                             │ ← Tertiary
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 设计原则

1. **图片主导**：模版预览图占据卡片 80% 视觉权重
2. **克制文字**：标题仅一行，超出省略
3. **状态编码**：选中状态用边框 + 背景变化，非颜色变化
4. **悬停反馈**：预览按钮仅在悬停时出现
5. **机械感**：4px 圆角、1px 边框、无阴影

---

## 2. 页面布局

### 2.1 模版选择页面 (TemplatesPage)

**布局：** TopNavLayout — 顶部导航 + 全屏内容区

```
┌─────────────────────────────────────────────────────────────────┐
│  [← BACK]    CHOOSE TEMPLATE                      [USER ▼]     │ ← 56px
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SELECT A LAYOUT FOR YOUR PORTFOLIO                             │ ← 96px breathing
│                                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐                                     │
│  │ ALL  │ │SYSTEM │ │CUSTOM│                                     │ ← 16px gap
│  └──────┘ └──────┘ └──────┘                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [SEARCH TEMPLATES...]                    [FILTER ▼]   │   │ ← 48px
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │ ← 280px 卡片
│  │             │  │             │  │             │             │   24px gap
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 尺寸规范

| 元素 | 值 |
|------|-----|
| 顶部导航高度 | 56px |
| 页面水平边距 | 64px |
| 标题顶部间距 | 96px |
| 卡片宽度 | 280px |
| 卡片高度 | 320px |
| 卡片间距 | 24px |
| 预览图高度 | 240px (75%) |
| 信息区高度 | 80px (25%) |

---

## 3. 组件设计

### 3.1 TemplateCard（模版卡片）

**核心设计原则**：图片为王，文字最小化

```
┌─────────────────────────────┐ 280px
│                             │
│                             │
│      [PREVIEW IMAGE]        │ 240px (75%)
│                             │
│                             │
├─────────────────────────────┤
│ MINIMALIST                  │ 16px / Primary
│ SYSTEM / SINGLE             │ 10px / Secondary
└─────────────────────────────┘ 80px (25%)

悬停状态：
┌─────────────────────────────┐
│                       [ 👁 ] │ ← 预览按钮，右上角
│                             │
│      [PREVIEW IMAGE]        │
│              +1px BORDER    │ ← 边框加粗
│                             │
├─────────────────────────────┤
│ MINIMALIST                  │
│ SYSTEM / SINGLE             │
└─────────────────────────────┘

选中状态：
┌─────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ ← 点阵背景
│                             │
│      [PREVIEW IMAGE]        │
│                             │
│                             │
├─────────────────────────────┤
│ MINIMALIST          [✓]    │ ← 勾选图标
│ SYSTEM / SINGLE             │
└─────────────────────────────┘
```

**Props：**

```typescript
interface TemplateCardProps {
  template: Template
  selected?: boolean
  onSelect?: (id: number) => void
  onPreview?: () => void
}
```

**样式规范：**

```css
.template-card {
  width: 280px;
  height: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: var(--color-bg-primary);
  cursor: pointer;
  transition: border-color 150ms ease-out;
}

.template-card:hover {
  border-width: 2px;
  border-color: var(--color-border-hover);
}

.template-card--selected {
  border-color: var(--color-border-selected);
  background: var(--color-bg-secondary);
}

.template-card__preview {
  height: 240px;
  background: var(--color-bg-tertiary);
  position: relative;
}

.template-card__preview-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.template-card:hover .template-card__preview-btn {
  opacity: 1;
}

.template-card__info {
  height: 80px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.template-card__title {
  font-family: var(--font-family-primary);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.template-card__meta {
  font-family: var(--font-family-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.template-card__check {
  margin-left: auto;
  color: var(--color-text-display);
}
```

### 3.2 TemplatePreview（模版预览）

**设计**：模态框，全屏居中展示

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                  [LARGE PREVIEW]                        │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   MINIMALIST                                    [CLOSE ✕]       │
│   A clean, single-column layout for focused presentations       │
│                                                                  │
│   ┌───────────────┐ ┌───────────────┐                           │
│   │   [← BACK]    │ │  [ SELECT ]   │                           │
│   └───────────────┘ └───────────────┘                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Props：**

```typescript
interface TemplatePreviewProps {
  template: Template
  open: boolean
  onClose: () => void
  onSelect: () => void
}
```

### 3.3 TemplateFilterBar（筛选工具栏）

**设计**：紧凑行布局，全大写标签

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────┐ ┌────┐ ┌────┐                                             │
│  │ ALL│ │ SYS│ │CUS │                                             │
│  └────┘ └────┘ └────┘                                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ SEARCH TEMPLATES...                        [FILTER ▼]  │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

**组件代码：**

```vue
<template>
  <div class="template-filter-bar">
    <!-- 分类 Tab -->
    <div class="template-filter-bar__tabs">
      <button
        v-for="cat in categories"
        :key="cat.value"
        :class="[
          'template-filter-bar__tab',
          { 'template-filter-bar__tab--active': category === cat.value }
        ]"
        @click="$emit('update:category', cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- 搜索和筛选 -->
    <div class="template-filter-bar__search">
      <NInput
        v-model="searchQuery"
        placeholder="SEARCH TEMPLATES..."
        clearable
      >
        <template #prefix>
          <span class="icon-search">🔍</span>
        </template>
      </NInput>

      <NSelect
        v-model="layoutFilter"
        :options="layoutOptions"
        placeholder="LAYOUT"
      />
    </div>
  </div>
</template>

<style scoped>
.template-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.template-filter-bar__tabs {
  display: flex;
  gap: 8px;
}

.template-filter-bar__tab {
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

.template-filter-bar__tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-secondary);
  border-color: var(--color-border-selected);
}

.template-filter-bar__search {
  display: flex;
  gap: 16px;
}

.template-filter-bar__search .n-input {
  flex: 1;
}
</style>
```

### 3.4 TemplateGrid（模版网格）

**设计**：响应式网格，自动适应

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │   Card 1    │  │   Card 2    │  │   Card 3    │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │   Card 4    │  │   Card 5    │  │   Card 6    │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │             │  │             │  │             │             │
│  │   Card 7    │  │   Card 8    │  │   Card 9    │             │
│  │             │  │             │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

**组件代码：**

```vue
<template>
  <div class="template-grid">
    <TemplateCard
      v-for="template in templates"
      :key="template.id"
      :template="template"
      :selected="selectedId === template.id"
      @select="handleSelect"
      @preview="handlePreview"
    />

    <!-- 空状态 -->
    <div v-if="templates.length === 0" class="template-grid__empty">
      <span class="template-grid__empty-icon">○</span>
      <span class="template-grid__empty-text">NO TEMPLATES FOUND</span>
    </div>
  </div>
</template>

<style scoped>
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.template-grid__empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 0;
  gap: 16px;
}

.template-grid__empty-icon {
  font-size: 48px;
  color: var(--color-text-disabled);
}

.template-grid__empty-text {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}
</style>
```

---

## 4. 交互状态

### 4.1 TemplateCard 状态矩阵

| 状态 | 边框 | 背景 | 预览按钮 | 勾选图标 |
|------|------|------|----------|----------|
| **Default** | 1px 默认 | 主背景 | 隐藏 | 无 |
| **Hover** | 2px 悬停 | 主背景 | 显示 | 无 |
| **Selected** | 2px 选中 | 次背景 + 点阵 | 隐藏 | 显示 |
| **Selected + Hover** | 2px 选中 | 次背景 + 点阵 | 显示 | 显示 |

### 4.2 过渡动画

```css
/* 边框过渡 */
.template-card {
  transition: border-color 150ms ease-out, border-width 150ms ease-out;
}

/* 预览按钮淡入淡出 */
.template-card__preview-btn {
  transition: opacity 150ms ease-out;
}

/* 选中状态切换 */
.template-card--selected {
  animation: select-check 200ms ease-out;
}

@keyframes select-check {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
```

### 4.3 预览模态框动画

```css
.template-preview {
  animation: fade-in 200ms ease-out;
}

.template-preview__content {
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

---

## 5. 响应式设计

### 断点策略

| 断点 | 屏幕宽度 | 列数 | 卡片宽度 | 间距 |
|------|----------|------|----------|------|
| **Mobile** | < 768px | 1 | 100% | 16px |
| **Tablet** | 768px - 1024px | 2 | calc(50% - 12px) | 24px |
| **Desktop** | > 1024px | 3-4 | 280px | 24px |

### 移动端适配

```css
/* Mobile */
@media (max-width: 768px) {
  .template-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .template-card {
    width: 100%;
    height: 280px;
  }

  .template-card__preview {
    height: 200px;
  }

  .template-filter-bar__tabs {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .template-filter-bar__search {
    flex-direction: column;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 6. CSS Tokens 映射

### 颜色（亮色模式）

```css
/* 边框颜色 */
--color-border-default: #E0DCD5;
--color-border-hover: #C0BCB5;
--color-border-selected: #2D2D2D;

/* 背景颜色 */
--color-bg-primary: #FAF8F5;      /* 主背景 */
--color-bg-secondary: #F1EDE6;    /* 选中背景 */
--color-bg-tertiary: #E8E4DD;     /* 占位背景 */

/* 文字颜色 */
--color-text-display: #1A1A1A;    /* Hero 文字 */
--color-text-primary: #2D2D2D;    /* 主要文字 */
--color-text-secondary: #767676;  /* 次要文字 */
--color-text-disabled: #B0B0B0;   /* 禁用文字 */
```

### 间距

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
--spacing-4xl: 96px;
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
--font-size-xl: 24px;
--font-size-2xl: 32px;
--font-size-3xl: 48px;
--font-size-4xl: 64px;
--font-size-5xl: 72px;
```

### 圆角

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 999px;
```

### 动画

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;

--easing-out: cubic-bezier(0.215, 0.61, 0.355, 1);
```

---

## 附录：Mock 数据结构

```typescript
// Template 类型定义
interface Template {
  id: number
  name: string                    // "Minimalist"
  category: 'system' | 'custom'
  type: 'single' | 'grid' | 'two_column'
  previewUrl: string              // 预览图 URL
  thumbnailUrl: string            // 缩略图 URL
  description?: string            // 预览模态框中显示
  status: 0 | 1                   // 0: 草稿, 1: 启用
  createdAt: string
}

// 系统模版数据（3 条）
const systemTemplates: Template[] = [
  {
    id: 1,
    name: 'Minimalist',
    category: 'system',
    type: 'single',
    previewUrl: '/templates/minimalist-preview.png',
    thumbnailUrl: '/templates/minimalist-thumb.png',
    description: 'A clean, single-column layout for focused presentations',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Serene',
    category: 'system',
    type: 'grid',
    previewUrl: '/templates/serene-preview.png',
    thumbnailUrl: '/templates/serene-thumb.png',
    description: 'A balanced grid layout for showcasing multiple works',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Modern',
    category: 'system',
    type: 'two_column',
    previewUrl: '/templates/modern-preview.png',
    thumbnailUrl: '/templates/modern-thumb.png',
    description: 'A dynamic two-column layout with rich visual storytelling',
    status: 1,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// 自定义模版数据（2 条）
const customTemplates: Template[] = [
  {
    id: 101,
    name: 'Custom #1',
    category: 'custom',
    type: 'grid',
    previewUrl: '/templates/custom1-preview.png',
    thumbnailUrl: '/templates/custom1-thumb.png',
    description: 'Custom grid layout',
    status: 1,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 102,
    name: 'Custom #2',
    category: 'custom',
    type: 'single',
    previewUrl: '/templates/custom2-preview.png',
    thumbnailUrl: '/templates/custom2-thumb.png',
    description: 'Custom single column layout',
    status: 1,
    createdAt: '2024-02-15T00:00:00Z'
  }
]
```

---

**文档版本**：1.0
**最后更新**：2026-05-27
**设计师**：Claude (Nothing Design System)
