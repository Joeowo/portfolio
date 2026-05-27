# Phase 4: 素材库模块 — UI 设计规范

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
| **Primary** | 素材数量统计、当前文件夹名称 | Doto / Space Grotesk | 48–72px | `--color-text-display` |
| **Secondary** | 素材卡片缩略图、文件名 | Space Grotesk | 14–16px | `--color-text-primary` |
| **Tertiary** | 文件大小、日期、标签 | Space Mono | 10px ALL CAPS | `--color-text-secondary` |

### 层级分布图

```
┌─────────────────────────────────────────────────────────────┐
│  [126]                          ASSETS          [+ UPLOAD]  │ ← Primary
│  ─────────────────────────────────────────────────────────  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  IMAGE  VIDEO  TEXT     │ ← Secondary
│  │ IMG │ │ IMG │ │ IMG │ │ IMG │  2.4MB  ·   2024-05-27   │ ← Tertiary
│  └─────┘ └─────┘ └─────┘ └─────┘                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 页面布局

### 2.1 整体布局结构

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER — 固定顶部                                              │
│  ┌──────────┐ ┌──────────────────────────────┐ ┌────────────┐  │
│  │ 文件夹树 │ │  搜索          [筛选]  [视图] │ │  [上传]    │  │
│  └──────────┘ └──────────────────────────────┘ └────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ASSETS GRID — 可滚动区域                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │      │ │      │ │      │ │      │ │      │ │      │        │
│  │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │        │
│  │      │ │      │ │      │ │      │ │      │ │      │        │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │      │ │      │ │      │ │      │ │      │ │      │        │
│  │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │        │
│  │      │ │      │ │      │ │      │ │      │ │      │        │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
│  DRAWER — 素材详情（右侧滑入）                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 尺寸规范

| 元素 | 宽度 | 高度 | 间距 |
|------|------|------|------|
| Header | 100% | 64px | - |
| Sidebar (文件夹树) | 200px | 100% | - |
| Search Bar | 400px | 40px | - |
| Asset Card | 200px | 200px | gap: 16px |
| Drawer | 400px | 100% | - |

---

## 3. 组件设计

### 3.1 AssetGrid.vue — 素材网格

**布局：** CSS Grid 自适应

```css
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-component-sm);  /* 16px */
  padding: var(--spacing-screen-md); /* 48px */
}
```

**空状态：**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          0                                  │
│                       ASSETS                                │
│                                                             │
│   [拖拽文件到此处 或 点击上传按钮]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 AssetCard.vue — 素材卡片

**尺寸：** 200×200px（正方形）

**状态：**

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│                │  │                │  │                │
│    [缩略图]     │  │    [缩略图]     │  │    [缩略图]     │
│                │  │   [悬停菜单]    │  │  [选中状态]    │
│                │  │    ···          │  │   ✓ 边框高亮    │
├────────────────┤  ├────────────────┤  ├────────────────┤
│ 文件名.jpg      │  │ 文件名.jpg      │  │ 文件名.jpg      │
│ 2.4MB · IMG    │  │ 2.4MB · IMG    │  │ 2.4MB · IMG    │
└────────────────┘  └────────────────┘  └────────────────┘
   默认状态            悬停状态            选中状态
```

**CSS：**

```css
.asset-card {
  width: 200px;
  height: 200px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);  /* 4px */
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out-cubic);
}

.asset-card:hover {
  border-color: var(--color-border-strong);
}

.asset-card--selected {
  border-color: var(--color-text-display);
  border-width: 2px;
}

.asset-card__thumbnail {
  width: 100%;
  height: 156px;  /* 200 - 44 (footer) */
  object-fit: cover;
  background: var(--color-bg-tertiary);
}

.asset-card__footer {
  height: 44px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.asset-card__name {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);  /* 12px */
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.asset-card__meta {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);  /* 8px */
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}
```

**悬停菜单：**

```
┌────────────────┐
│                │
│    [缩略图]     │
│                │
│          ┌───┐ │
│          │···│ │  ← 位置：右上角，距边缘 8px
│          └───┘ │
├────────────────┤
│ 文件名.jpg      │
└────────────────┘
```

### 3.3 FolderTree.vue — 文件夹树

**布局：** 左侧固定 200px

```
┌──────────────┐
│ 📁 全部素材  │  ← 根节点，始终展开
│   📁 未分类  │
│   📁 项目A   │
│     📁 灵感  │
│     📁 草稿  │
│   📁 项目B   │
│              │
│ [+ 新建文件夹]│
└──────────────┘
```

**CSS：**

```css
.folder-tree {
  width: 200px;
  height: 100%;
  border-right: 1px solid var(--color-border-subtle);
  padding: var(--spacing-element-md);
  background: var(--color-bg-primary);
}

.folder-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);  /* 8px */
  height: 36px;
  padding: 0 var(--spacing-element-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);  /* 14px */
  color: var(--color-text-primary);
}

.folder-item:hover {
  background: var(--color-bg-secondary);
}

.folder-item--active {
  background: var(--color-bg-tertiary);
  font-weight: var(--font-weight-medium);
}

.folder-item__icon {
  width: var(--icon-size-sm);  /* 16px */
  height: var(--icon-size-sm);
  color: var(--color-text-secondary);
}

.folder-item__count {
  margin-left: auto;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-sm);
  color: var(--color-text-disabled);
  text-transform: uppercase;
}
```

### 3.4 UploadDropzone.vue — 上传拖拽区

**内联模式（工具栏中）：**

```
┌─────────────────────────────────────────────────────────────┐
│  [+ 上传素材]  IMAGE  VIDEO  TEXT                           │
└─────────────────────────────────────────────────────────────┘
```

**全屏模式（拖拽文件时）：**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                     释放文件以上传                           │
│                   支持 JPG, PNG, MP4                        │
│                                                             │
│                    [取消上传]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**CSS：**

```css
.upload-dropzone {
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-component-lg);
  transition: all var(--duration-normal) var(--ease-out-cubic);
}

.upload-dropzone--dragging {
  border-color: var(--color-text-display);
  border-style: solid;
  background: var(--color-bg-tertiary);
}

.upload-dropzone__text {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.upload-dropzone__hint {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}
```

**上传进度条：**

```
┌─────────────────────────────────────────────────────────────┐
│  filename.jpg                                      67%      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━             │
└─────────────────────────────────────────────────────────────┘
```

```css
.upload-progress {
  width: 100%;
}

.upload-progress__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-1);
}

.upload-progress__filename {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-sm);
  color: var(--color-text-primary);
}

.upload-progress__percent {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.upload-progress__bar {
  height: 2px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.upload-progress__fill {
  height: 100%;
  background: var(--color-text-display);
  transition: width var(--duration-slow) var(--ease-out-cubic);
}
```

### 3.5 AssetDetailDrawer.vue — 素材详情抽屉

**布局：** 右侧滑入，宽度 400px

```
┌────────────────────────────────────────────┐
│  [×]                                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │         [预览图]                     │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  文件名.jpg                                 │
│  IMAGE · 2.4MB · 1920×1080                 │
│  ───────────────────────────────────────    │
│                                             │
│  名称                  [_____________]      │
│  标签                  [______] [+ 添加]    │
│  文件夹                [全部素材 ▼]         │
│                                             │
│  创建时间              2024-05-27 14:32     │
│  修改时间              2024-05-27 16:45     │
│                                             │
│  ───────────────────────────────────────    │
│                                             │
│  [下载]  [删除]  [关闭]                     │
└────────────────────────────────────────────┘
```

**CSS：**

```css
.drawer {
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

.drawer--open {
  transform: translateX(0);
}

.drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
}

.drawer__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-body-md);
  color: var(--color-text-secondary);
}

.drawer__preview {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: contain;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-subtle);
}

.drawer__info {
  padding: var(--spacing-element-md);
}

.drawer__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-h4);
  color: var(--color-text-display);
  margin-bottom: var(--spacing-1);
}

.drawer__meta {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-element-md);
}

.drawer__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.drawer__actions {
  display: flex;
  gap: var(--spacing-element-sm);
  padding: var(--spacing-element-md);
  border-top: 1px solid var(--color-border-subtle);
}
```

### 3.6 AssetFilterBar.vue — 筛选工具栏

**布局：** 顶部 Header 内

```
┌─────────────────────────────────────────────────────────────────┐
│  全部素材 (126)                    [    搜索...    ] [筛选▼] [≡] │
└─────────────────────────────────────────────────────────────────┘
```

**CSS：**

```css
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 var(--spacing-element-md);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-primary);
}

.filter-bar__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
}

.filter-bar__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-lg);  /* 48px */
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}

.filter-bar__count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.filter-bar__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-element-sm);
}

.filter-bar__search {
  width: 400px;
  height: 40px;
  padding: 0 var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-md);
  color: var(--color-text-primary);
}

.filter-bar__search::placeholder {
  color: var(--color-text-disabled);
}

.filter-bar__button {
  height: 40px;
  padding: 0 var(--spacing-element-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out-cubic);
}

.filter-bar__button:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-tertiary);
}
```

**筛选下拉菜单：**

```
┌────────────────────────────┐
│  类型                       │
│  ─────────────────────────  │
│  ● 全部                     │
│  ○ 图片                     │
│  ○ 视频                     │
│  ○ 文本                     │
│                            │
│  排序                       │
│  ─────────────────────────  │
│  ○ 最新创建                 │
│  ○ 文件名                   │
│  ○ 文件大小                 │
└────────────────────────────┘
```

---

## 4. 交互状态

### 4.1 素材卡片状态

| 状态 | 边框 | 背景 | 额外元素 |
|------|------|------|----------|
| 默认 | `1px solid #D1CFC9` | `#EBE9E6` | - |
| 悬停 | `1px solid #A8A6A0` | `#EBE9E6` | 右上角菜单按钮 |
| 选中 | `2px solid #1A1A1A` | `#EBE9E6` | 左上角对勾图标 |
| 拖拽 | `2px dashed #1A1A1A` | `#E5E3E0` | 半透明 |
| 禁用 | `1px solid #E5E3E0` | `#E5E3E0` | - |

### 4.2 按钮状态

| 状态 | 背景 | 文字颜色 | 边框 |
|------|------|----------|------|
| Primary 默认 | `#1A1A1A` | `#F7F5F2` | - |
| Primary 悬停 | `#2D2D2D` | `#F7F5F2` | - |
| Primary 禁用 | `#E5E3E0` | `#9B9B9B` | - |
| Secondary 默认 | `#EBE9E6` | `#1A1A1A` | `#D1CFC9` |
| Secondary 悬停 | `#E5E3E0` | `#1A1A1A` | `#A8A6A0` |

### 4.3 输入框状态

| 状态 | 边框 | 背景 | 文字颜色 |
|------|------|------|----------|
| 默认 | `1px solid #D1CFC9` | `#EBE9E6` | `#2D2D2D` |
| 聚焦 | `1px solid #1A1A1A` | `#F7F5F2` | `#1A1A1A` |
| 错误 | `1px solid #D71921` | `#EBE9E6` | `#D71921` |
| 禁用 | `1px solid #E5E3E0` | `#E5E3E0` | `#9B9B9B` |

### 4.4 加载状态

**无骨架屏** — 使用 `[LOADING...]` 文本：

```
┌─────────────────────────────────────────────────────────────┐
│                        [LOADING...]                         │
└─────────────────────────────────────────────────────────────┘
```

**上传状态：**

```
┌─────────────────────────────────────────────────────────────┐
│  上传中...                                       3/5        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━             │
└─────────────────────────────────────────────────────────────┘
```

### 4.5 错误状态

**内联错误提示：**

```
┌─────────────────────────────────────────────────────────────┐
│  [ERROR: 文件大小超过 10MB 限制]                             │
└─────────────────────────────────────────────────────────────┘
```

```css
.inline-error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-error-text);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: var(--spacing-element-sm);
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
}
```

---

## 5. 响应式设计

### 断点

| 断点 | 宽度 | 网格列数 | 侧边栏 |
|------|------|----------|--------|
| Desktop XL | ≥1440px | 6 列 | 显示 |
| Desktop | 1024–1439px | 5 列 | 显示 |
| Tablet | 768–1023px | 4 列 | 收起 |
| Mobile | <768px | 2 列 | 抽屉 |

### Tablet (768-1023px)

```
┌─────────────────────────────────────────────────────┐
│  [≡] 全部素材 (126)          [搜索...]    [上传]    │
├─────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│  │ 卡片 │ │ 卡片 │ │ 卡片 │ │ 卡片 │              │
│  └──────┘ └──────┘ └──────┘ └──────┘              │
└─────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌─────────────────────────────────────┐
│  [≡] 全部素材        [搜索]  [上传] │
├─────────────────────────────────────┤
│  ┌──────┐ ┌──────┐                │
│  │ 卡片 │ │ 卡片 │                │
│  └──────┘ └──────┘                │
└─────────────────────────────────────┘
```

---

## 6. CSS Tokens 映射

### 完整变量表

```css
/* === 色彩 === */
--assets-bg-primary: var(--color-bg-primary);         /* #F7F5F2 */
--assets-bg-secondary: var(--color-bg-secondary);     /* #EBE9E6 */
--assets-bg-tertiary: var(--color-bg-tertiary);       /* #E5E3E0 */

--assets-text-display: var(--color-text-display);     /* #1A1A1A */
--assets-text-primary: var(--color-text-primary);     /* #2D2D2D */
--assets-text-secondary: var(--color-text-secondary); /* #6B6B6B */
--assets-text-disabled: var(--color-text-disabled);   /* #9B9B9B */

--assets-border-default: var(--color-border-default); /* #D1CFC9 */
--assets-border-strong: var(--color-border-strong);   /* #A8A6A0 */
--assets-border-subtle: var(--color-border-subtle);   /* #E5E3E0 */

/* === 字体 === */
--assets-font-base: var(--font-family-base);          /* Space Grotesk */
--assets-font-mono: var(--font-family-mono);          /* Space Mono */
--assets-font-display: var(--font-family-display);    /* Doto */

/* === 尺寸 === */
--assets-card-size: 200px;
--assets-drawer-width: 400px;
--assets-sidebar-width: 200px;
--assets-header-height: 64px;

/* === 圆角 === */
--assets-radius-sm: var(--radius-sm);                 /* 4px */
--assets-radius-md: var(--radius-md);                 /* 8px */

/* === 动画 === */
--assets-duration-fast: var(--duration-fast);         /* 150ms */
--assets-duration-normal: var(--duration-normal);     /* 200ms */
--assets-ease-out: var(--ease-out-cubic);
```

---

## 7. 组件 Props 接口

### AssetCard.vue

```typescript
interface AssetCardProps {
  asset: Asset
  selected?: boolean
  selectable?: boolean
  showMenu?: boolean
}

interface Asset {
  id: number
  name: string
  type: 'image' | 'video' | 'text'
  thumbnailUrl: string
  fileSize: number
  width?: number
  height?: number
  createdAt: string
}
```

### AssetGrid.vue

```typescript
interface AssetGridProps {
  assets: Asset[]
  loading?: boolean
  selectable?: boolean
  selectedIds?: number[]
  layout?: 'grid' | 'list'
}

interface AssetGridEmits {
  (e: 'select', id: number): void
  (e: 'deselect', id: number): void
  (e: 'delete', id: number): void
  (e: 'open-detail', asset: Asset): void
}
```

### FolderTree.vue

```typescript
interface FolderTreeProps {
  folders: Folder[]
  currentFolderId: number | null
  showCreateButton?: boolean
}

interface Folder {
  id: number
  name: string
  parentId: number | null
  assetCount?: number
  children?: Folder[]
}
```

### UploadDropzone.vue

```typescript
interface UploadDropzoneProps {
  accept?: string
  maxSize?: number  // bytes
  multiple?: boolean
}

interface UploadDropzoneEmits {
  (e: 'upload', files: File[]): void
  (e: 'error', message: string): void
}
```

### AssetDetailDrawer.vue

```typescript
interface AssetDetailDrawerProps {
  asset: Asset | null
  open?: boolean
}

interface AssetDetailDrawerEmits {
  (e: 'close'): void
  (e: 'update', asset: Asset): void
  (e: 'delete', id: number): void
  (e: 'download', asset: Asset): void
}
```

---

## 8. 设计决策记录

### 决策 1: 正方形卡片
**Why:** 保持视觉一致性，缩略图不需要额外裁剪处理
**How to apply:** 固定 200×200px，长图/视频使用 `object-fit: cover`

### 决策 2: 无阴影卡片
**Why:** Nothing 设计原则 — 使用边框而非阴影表达深度
**How to apply:** 卡片悬停时仅改变边框颜色和粗细

### 决策 3: 文件夹固定宽度
**Why:** 避免文件夹名称过长导致布局抖动
**How to apply:** 固定 200px，长名称使用 `text-overflow: ellipsis`

### 决策 4: 内联错误提示
**Why:** 无 toast 弹窗，错误信息直接显示在相关元素旁
**How to apply:** 上传失败时，在卡片上方显示 `[ERROR: ...]`

### 决策 5: 机械感交互
**Why:** 追求精确、快速的操作反馈
**How to apply:** 所有过渡使用 `ease-out-cubic`，无 bounce，持续 150-200ms

---

## 9. 待确认问题

1. **多选操作：** 是否需要批量选择功能？如需要，确认多选操作项（删除、移动、下载）
2. **排序方式：** 确认默认排序规则（创建时间？文件名？）
3. **视频预览：** 视频卡片是否需要显示播放按钮？悬停是否自动播放？
4. **文件夹嵌套：** 支持多少层级嵌套？（建议：最多 3 层）
5. **拖拽上传：** 是否支持拖拽文件夹直接上传？

---

## 附录：参考实现

### 完整页面结构

```vue
<template>
  <div class="assets-page">
    <!-- Header -->
    <header class="assets-header">
      <div class="assets-header__left">
        <FolderTree :folders="folders" v-model="currentFolderId" />
        <div class="assets-header__title">
          <h1>{{ currentFolderName }}</h1>
          <span class="label">{{ assetCount }}</span>
        </div>
      </div>
      <div class="assets-header__right">
        <input type="search" placeholder="搜索素材..." class="search-input" />
        <button class="filter-button">筛选</button>
        <button class="view-toggle">
          <Icon :icon="viewMode === 'grid' ? 'ph:squares-four' : 'ph:list-dashes'" />
        </button>
        <NButton type="primary" @click="openUpload">
          [+ 上传素材]
        </NButton>
      </div>
    </header>

    <!-- Grid -->
    <main class="assets-main">
      <AssetGrid
        :assets="filteredAssets"
        :selected-ids="selectedIds"
        :selectable="isSelectMode"
        @select="handleSelect"
        @open-detail="handleOpenDetail"
      />
      <div v-if="loading" class="loading-text">[LOADING...]</div>
      <div v-if="isEmpty" class="empty-state">
        <div class="empty-number">0</div>
        <div class="empty-label">ASSETS</div>
        <p>拖拽文件到此处 或 点击上传按钮</p>
      </div>
    </main>

    <!-- Drawer -->
    <AssetDetailDrawer
      :asset="selectedAsset"
      :open="isDrawerOpen"
      @close="closeDrawer"
      @delete="handleDelete"
    />

    <!-- Upload Overlay -->
    <UploadDropzone
      v-if="isUploading"
      :accept="acceptedTypes"
      :max-size="maxFileSize"
      @upload="handleUpload"
    />
  </div>
</template>
```

---

**文档版本:** 1.0
**最后更新:** 2026-05-27
**下一步:** 组件实现 + Storybook 验证
