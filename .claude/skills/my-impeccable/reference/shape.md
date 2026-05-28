# shape - 规划 UX/UI

## 目标

在编写代码前，先规划组件结构和视觉设计。

## 流程

### 1. 分析设计文档

从 `docs/design/phase-N-*.md` 提取：

- 组件层级图
- 尺寸规范表
- CSS 样式定义
- Props 接口定义
- 交互状态描述

### 2. 构建组件树

```
WorksListPage
├── WorksHeader
│   ├── HeroTitle (02)
│   ├── Subtitle (WORKS)
│   └── Actions (搜索、筛选、新建)
├── FilterTabs (全部/草稿/已发布)
└── WorksGrid
    └── WorkCard × N
        ├── CoverImage
        ├── Title
        ├── Meta (区块数、状态)
        └── HoverMenu
```

### 3. 设计 Props 接口

```typescript
// WorkCard.vue
interface WorkCardProps {
  work: Work
  selected?: boolean
}

interface WorkCardEmits {
  (e: 'select', work: Work): void
  (e: 'delete', id: number): void
  (e: 'duplicate', id: number): void
}
```

### 4. 定义状态管理

```typescript
// worksStore.ts
interface WorksState {
  works: Work[]
  currentWork: Work | null
  loading: boolean
  filter: 'all' | 'draft' | 'published'
}

interface WorksActions {
  fetchWorks(): Promise<void>
  createWork(work: Partial<Work>): Promise<Work>
  updateWork(id: number, work: Partial<Work>): Promise<Work>
  deleteWork(id: number): Promise<void>
}
```

### 5. 确认设计

展示：
- 组件树
- Props 接口
- 状态结构
- 布局示意图

等待用户确认后再实现。
