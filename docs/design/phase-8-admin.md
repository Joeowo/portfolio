# Phase 8 管理后台设计规范

---

## 概述

Phase 8 管理后台包含三个核心页面：
1. **数据仪表盘** — 系统数据统计概览
2. **网页审核** — 待审核网页列表与操作
3. **模版管理** — 模版 CRUD 操作

---

## 设计模式

### 亮色模式配色

```css
/* 背景层级 */
--color-bg-primary: #F7F5F2;     /* 主背景 - 温暖灰白 */
--color-bg-secondary: #EBE7E4;   /* 次级背景 - 卡片/容器 */
--color-bg-tertiary: #DFDBD8;    /* 三级背景 - 悬停状态 */

/* 文本层级 */
--color-text-display: #1A1A1A;   /* Hero 数字 - 100% */
--color-text-primary: #2C2C2C;   /* 正文 - 90% */
--color-text-secondary: #6B6B6B; /* 标签/元数据 - 60% */
--color-text-disabled: #A8A8A8;  /* 禁用 - 40% */

/* 边框 */
--color-border-default: #C0BCB9;
--color-border-strong: #9C9895;

/* 状态色（仅用于数据值编码） */
--color-success: #4CAF50;
--color-warning: #FF9800;
--color-error: #D71921;
--color-accent: #D71921;
```

---

## 页面 1：数据仪表盘 (DashboardPage.vue)

### 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  顶部导航栏                                    [管理员] ▼   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  DASHBOARD                                                    │
│  ─────────────────────────────────────────────────────────   │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │          │  │          │  │          │  │          │   │
│  │   1,247  │  │    856   │  │    124   │  │   98.5%  │   │
│  │  用户总数 │  │ 作品总数 │  │ 网页总数 │  │ 审核通过 │   │
│  │  +12%    │  │   +8%    │  │   +3     │  │   ↓      │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  最近活动                                              │  │
│  │  ─────────────────────────────────────────────────   │  │
│  │                                                       │  │
│  │  2分钟前   用户@alice 创建了新作品「我的摄影集」      │  │
│  │  5分钟前   网页#127 进入审核队列                      │  │
│  │  12分钟前  管理员@bob 审核通过了网页#126              │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 视觉层次

| 层级 | 元素 | 字体 | 大小 | 颜色 |
|------|------|------|------|------|
| **Primary** | 统计数字 (1,247) | Doto | 72px | `--color-text-display` |
| **Secondary** | 标签文字 | Space Grotesk | 14px | `--color-text-secondary` |
| **Tertiary** | 趋势 (+12%) | Space Mono | 12px | `--color-success` / `--color-error` |

### DashboardStats.vue 组件规范

```vue
<template>
  <div class="dashboard-stats">
    <div class="stat-card" v-for="stat in stats" :key="stat.id">
      <!-- Primary: Hero 数字 -->
      <div class="stat-card__value">{{ stat.value }}</div>

      <!-- Secondary: 标签 -->
      <div class="stat-card__label">{{ stat.label }}</div>

      <!-- Tertiary: 趋势 -->
      <div class="stat-card__trend" :class="trendClass(stat.trend)">
        <span class="trend-icon">{{ trendIcon(stat.trend) }}</span>
        <span class="trend-value">{{ stat.trend }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  padding: 32px 24px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-card__value {
  /* Primary: Hero 数字 */
  font-family: 'Doto', var(--font-family-display);
  font-size: 72px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text-display);
}

.stat-card__label {
  /* Secondary: 标签 */
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  text-transform: none;
}

.stat-card__trend {
  /* Tertiary: 趋势 */
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-card__trend--positive {
  color: var(--color-success);
}

.stat-card__trend--negative {
  color: var(--color-error);
}
</style>
```

### 最近活动列表规范

```css
.activity-list {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  padding: 24px;
}

.activity-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border-default);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.activity-content {
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-primary);
}
```

---

## 页面 2：网页审核 (PagesReviewPage.vue)

### 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  网页审核                                              [筛选▼]│
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  ┌───┬────────────┬──────────┬──────────┬─────────┬──────┐ │
│  │   │  网页标题   │   作者    │  创建时间  │  状态   │ 操作 │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 1 │「山川摄影」 │ @alice   │ 2小时前  │ 待审核  │ 审核通过 │ │
│  │   │  mountain.p │          │          │  ○      │  下架   │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 2 │「城市速写」 │ @bob     │ 5小时前  │ 已上线  │  下架   │ │
│  │   │  urban.p    │          │          │  ●      │        │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 3 │「人像作品」 │ @carol   │ 1天前    │ 已下架  │ 上架   │ │
│  │   │  portrait.p │          │          │  ○      │        │ │
│  └───┴────────────┴──────────┴──────────┴─────────┴──────┘ │
│                                                               │
│                        显示 1-10 / 共 124 条                  │
└─────────────────────────────────────────────────────────────┘
```

### 视觉层次

| 层级 | 元素 | 字体 | 大小 | 颜色 |
|------|------|------|------|------|
| **Primary** | 网页标题 | Space Grotesk | 16px | `--color-text-primary` |
| **Secondary** | 作者、创建时间 | Space Grotesk | 14px | `--color-text-secondary` |
| **Tertiary** | 表头、状态标签 | Space Mono | 12px | `--color-text-secondary` |

### PagesReviewList.vue 组件规范

```vue
<template>
  <div class="pages-review-list">
    <table class="review-table">
      <thead>
        <tr>
          <th class="th--mono">序号</th>
          <th>网页标题</th>
          <th>作者</th>
          <th class="th--mono">创建时间</th>
          <th class="th--mono">状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in pages" :key="page.id">
          <td class="cell--mono">{{ page.id }}</td>
          <td class="cell--title">
            <div class="title-main">{{ page.title }}</div>
            <div class="title-slug">{{ page.slug }}</div>
          </td>
          <td>{{ page.author }}</td>
          <td class="cell--mono">{{ page.createdAt }}</td>
          <td>
            <span class="status-badge" :class="statusClass(page.status)">
              {{ statusLabel(page.status) }}
            </span>
          </td>
          <td>
            <button class="btn-action">审核通过</button>
            <button class="btn-action btn-action--secondary">下架</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.review-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  overflow: hidden;
}

.review-table th {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
}

.review-table td {
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-primary);
  padding: 16px;
  border-bottom: 1px solid var(--color-border-default);
}

.review-table tr:last-child td {
  border-bottom: none;
}

.review-table tbody tr:hover {
  background: var(--color-bg-tertiary);
}

.cell--mono {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
}

.cell--title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-main {
  font-size: 16px;
  font-weight: 500;
}

.title-slug {
  font-family: var(--font-family-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.status-badge {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.status-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-badge--pending {
  color: var(--color-warning);
  background: rgba(255, 152, 0, 0.1);
}

.status-badge--online {
  color: var(--color-success);
  background: rgba(76, 175, 80, 0.1);
}

.status-badge--offline {
  color: var(--color-text-disabled);
  background: rgba(168, 168, 168, 0.1);
}

.btn-action {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background 0.15s ease-out;
}

.btn-action:hover {
  background: var(--color-bg-tertiary);
}

.btn-action--secondary {
  color: var(--color-text-secondary);
}
</style>
```

---

## 页面 3：模版管理 (TemplatesManagePage.vue)

### 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│  模版管理                                           [+ 新建] │
│  ─────────────────────────────────────────────────────────── │
│                                                               │
│  ┌───┬────────────┬──────────┬──────────┬─────────┬──────┐ │
│  │   │  模版名称   │  分类    │  类型    │  状态   │ 操作 │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 1 │「极简白」   │ 摄影类   │ 系统     │ 启用中  │ 编辑 │ │
│  │   │              │          │          │  ●      │ 删除 │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 2 │「暗黑风」   │ 摄影类   │ 系统     │ 启用中  │ 编辑 │ │
│  │   │              │          │          │  ●      │ 删除 │ │
│  ├───┼────────────┼──────────┼──────────┼─────────┼──────┤ │
│  │ 3 │「杂志风」   │ 设计类   │ 自定义   │ 已禁用  │ 编辑 │ │
│  │   │              │          │          │  ○      │ 删除 │ │
│  └───┴────────────┴──────────┴──────────┴─────────┴──────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### TemplatesManageTable.vue 组件规范

表格样式与网页审核表格保持一致，复用以下模式：
- 表头：Space Mono 全大写
- 边框：1px 细线分隔
- 悬停：背景色变化
- 状态徽章：圆形指示器 + 标签文字

---

## 组件：状态切换开关 (StatusToggle.vue)

管理后台专用的机械感开关组件：

```vue
<template>
  <button
    class="status-toggle"
    :class="{ 'status-toggle--active': active }"
    @click="toggle"
  >
    <span class="status-toggle__track">
      <span class="status-toggle__thumb" />
    </span>
    <span class="status-toggle__label">
      {{ active ? '启用中 ●' : '已禁用 ○' }}
    </span>
  </button>
</template>

<style scoped>
.status-toggle {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.status-toggle__track {
  width: 40px;
  height: 22px;
  border: 1px solid var(--color-border-default);
  border-radius: 999px;
  position: relative;
  background: var(--color-bg-primary);
  transition: border-color 0.15s ease-out;
}

.status-toggle--active .status-toggle__track {
  border-color: var(--color-success);
}

.status-toggle__thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.15s ease-out;
}

.status-toggle--active .status-toggle__thumb {
  left: 20px;
  background: var(--color-success);
}

.status-toggle__label {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.status-toggle--active .status-toggle__label {
  color: var(--color-text-primary);
}
</style>
```

---

## 布局：SidebarLayout.vue

管理后台使用侧边栏布局：

```
┌────────┬─────────────────────────────────────────────────────┐
│        │  顶部导航栏                                    [管理员] ▼   │
│   侧   ├─────────────────────────────────────────────────────────────┤
│   边   │                                                               │
│   栏   │  主内容区域                                                   │
│        │                                                               │
│        │  (仪表盘/审核/模版表格)                                        │
│        │                                                               │
│        │                                                               │
│        │                                                               │
└────────┴─────────────────────────────────────────────────────────────┘
```

```css
.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar-layout__sidebar {
  width: 200px;
  background: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border-default);
  padding: 24px 16px;
}

.sidebar-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sidebar-layout__header {
  height: 64px;
  border-bottom: 1px solid var(--color-border-default);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-layout__content {
  flex: 1;
  padding: 48px 32px;
}
```

### 侧边栏导航项

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 4px;
  font-family: var(--font-family-primary);
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.nav-item:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.nav-item--active {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.nav-item__label {
  font-family: var(--font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  margin-left: auto;
}
```

---

## 间距系统应用

| 位置 | 间距值 | 用途 |
|------|--------|------|
| 页面边距 | 48px | 内容与屏幕边缘 |
| 组件间距 | 32px | 主要区块之间 |
| 卡片间距 | 16px | 网格卡片之间 |
| 表单元素 | 16px | 输入框之间 |
| 紧密元素 | 8px | 标签与值 |
| 超紧密 | 4px | 图标与文字 |

---

## 动画规范

遵循 Nothing 机械感动画风格：

```css
/* 所有过渡使用 ease-out，时间 150ms */
.transition-smooth {
  transition: all 0.15s ease-out;
}

/* 悬停状态：边框颜色加深 */
.hover-border:hover {
  border-color: var(--color-border-strong);
}

/* 点击反馈：短暂背景闪烁 */
@keyframes press {
  0% { background: var(--color-bg-tertiary); }
  100% { background: transparent; }
}

.press-feedback:active {
  animation: press 0.15s ease-out;
}
```

---

## 响应式断点

管理后台桌面优先，断点参考：

```css
/* 小屏笔记本 */
@media (max-width: 1280px) {
  .dashboard-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 平板（非重点） */
@media (max-width: 768px) {
  .sidebar-layout__sidebar {
    width: 64px; /* 收缩侧边栏 */
  }
  .dashboard-stats {
    grid-template-columns: 1fr;
  }
}
```

---

## Nothing 设计检查清单

- [ ] 无阴影、无模糊效果
- [ ] 所有圆角 ≤ 4px（按钮除外）
- [ ] 使用 CSS 变量，无硬编码颜色
- [ ] Hero 数字使用 Doto 字体
- [ ] 标签使用 Space Mono 全大写
- [ ] 三层视觉层次清晰
- [ ] 间距遵循 4/8/16/32/48 节奏
- [ ] 状态色仅用于数据值编码
- [ ] 过渡动画 150ms ease-out
- [ ] 表格无斑马纹
