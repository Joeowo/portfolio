---
name: my-impeccable
description: Portfolio 项目专用开发 skill，基于 spec 和设计文档进行前端开发。使用 phase 参数快速定位任务，遵循 Nothing Design System 规范实现 Vue 3 组件和页面。
---

基于项目 spec 和设计文档的前端开发专用 skill。

## 用法

```bash
/my-impeccable [phase] [spec-path] [design-path]
```

### 参数

- `phase`: Phase 编号（1-10），如 `phase 5`、`5` 或 `5`
- `spec-path`: spec 目录路径，默认 `docs/spec`
- `design-path`: 设计文档路径，默认根据 phase 自动定位

### 示例

```bash
# 开发 Phase 5
/my-impeccable phase 5

# 指定路径
/my-impeccable phase 5 e:\Code\portfolio\docs\spec e:\Code\portfolio\docs\design\phase-5-work-editor.md

# 查看命令菜单
/my-impeccable
```

## Setup

开始任何开发工作前：

1. **加载 spec 和任务文档**
2. **加载对应 phase 的设计文档**
3. **识别并加载参考文件**（如果调用子命令）

### 1. Context gathering

项目使用两套文档系统：

**Spec 文档** (默认 `docs/spec/`):
- `spec.md`: 技术栈、代码规范、项目结构
- `tasks.md`: 任务清单，按 phase 分组
- `plan.md`: 项目计划

**Design 文档** (默认 `docs/design/`):
- `phase-3-auth.md`: 认证模块
- `phase-4-assets-library.md`: 素材库模块
- `phase-5-work-editor.md`: 作品编辑器
- `phase-6-templates.md`: 模版选择
- `phase-7-pages-management.md`: 网页管理
- `phase-8-admin.md`: 管理后台

### 2. Phase 映射

| Phase | 名称 | 设计文档 | 目录前缀 |
|-------|------|----------|----------|
| 1 | 基础设施 | - | - |
| 2A | 共享组件 | - | shared/components |
| 2B | Mock 数据 | - | mock |
| 3 | 认证模块 | phase-3-auth.md | features/auth |
| 4 | 素材库模块 | phase-4-assets-library.md | features/studio/assets |
| 5 | 作品编辑器 | phase-5-work-editor.md | features/studio/works |
| 6 | 模版选择 | phase-6-templates.md | features/publish/templates |
| 7 | 网页管理 | phase-7-pages-management.md | features/publish/pages |
| 8 | 管理后台 | phase-8-admin.md | features/admin |
| 9 | 整合优化 | - | - |
| 10 | 验收交付 | - | - |

## 设计规范

遵循 **Nothing Design System**:

### 色彩

- 使用 CSS 变量，不硬编码颜色值
- 语义化颜色: `--color-text-primary`、`--color-bg-secondary`
- 状态色: `--color-success-text`、`--color-error-text`

### 字体

- **Space Grotesk**: 主字体，正文和标题
- **Space Mono**: 等宽字体，标签和技术信息
- **Doto**: Display 字体，Hero 数字

### 风格

- 机械感: 4px 小圆角、1px 细边框、无阴影
- 全大写标签: `text-transform: uppercase`
- 点阵背景装饰: NDotPattern 组件

### 布局

- BEM 命名: `.component__element--modifier`
- 响应式间距: `var(--spacing-component-md)`
- Flexbox/Grid 布局优先

## 代码规范

### 组件结构

```vue
<script setup lang="ts">
// 1. 导入: Vue API → 外部库 → 内部模块
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NInput } from '@/shared/components'

// 2. Props 定义
interface Props {
  title?: string
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  loading: false
})

// 3. Emits 定义
interface Emits {
  (e: 'submit', value: string): void
}
const emit = defineEmits<Emits>()

// 4. 响应式状态
const form = ref({ username: '' })

// 5. 计算属性
const isValid = computed(() => form.value.username.length >= 3)

// 6. 方法
const handleSubmit = () => emit('submit', form.value.username)
</script>

<template>
  <div class="component-name">
    <!-- 模板内容 -->
  </div>
</template>

<style scoped>
.component-name {
  /* CSS 变量 + BEM 命名 */
}
</style>
```

### 命名规范

- 组件: PascalCase + 模块前缀 `WorkCard.vue`
- Store: kebab-case + store 后缀 `worksStore.ts`
- API: camelCase + Api 后缀 `fetchWorksApi()`
- 类型: PascalCase `interface Work`
- 常量: UPPER_SNAKE_CASE `MAX_FILE_SIZE`

### TypeScript

- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型
- 明确标注函数返回类型
- 避免 `any`，使用 `unknown`

## Commands

| Command | Description |
|---------|-------------|
| `phase [n]` | 开发指定 phase，读取对应任务和设计文档 |
| `status` | 查看当前任务完成状态 |
| `next` | 查看下一个待开发任务 |
| `verify` | 验证当前 phase 的验收标准 |

### Routing rules

1. **无参数**: 显示 Phase 映射表和命令菜单
2. **`phase N`**: 加载 tasks.md 第 N phase，对应设计文档，开始开发
3. **其他命令**: 执行对应功能

## 开发流程

1. **解析参数**: 提取 phase 编号
2. **读取文档**:
   - `docs/spec/tasks.md` → 获取 phase 任务列表
   - `docs/design/phase-N-*.md` → 获取设计规范
3. **定位任务**: 找到未完成的任务
4. **确认范围**: 展示任务和验收标准
5. **执行开发**: 按设计规范实现
6. **验证**: 对照验收标准检查

## 验收标准

每个任务包含：

- **描述**: 要实现的功能
- **验收标准**: 完成的条件
- **验证方式**: 如何测试
- **涉及文件**: 需要创建/修改的文件

完成工作前确认：
- ✅ TypeScript 编译无错误
- ✅ ESLint 检查通过
- ✅ 组件符合设计规范
- ✅ 验收标准全部满足
