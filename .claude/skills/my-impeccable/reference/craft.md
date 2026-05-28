# craft - 端到端构建功能

## 目标

基于 tasks.md 的任务描述和设计文档的视觉规范，完整实现一个功能模块。

## 流程

### 1. 解析任务

从 `docs/spec/tasks.md` 中读取指定 phase 的任务：

```markdown
### Task 5.1: Work 类型定义
**描述**: 定义作品相关类型

**验收标准**:
- Work 接口
- Section 接口
- SectionType 枚举

**涉及文件**:
- `frontend/src/features/studio/works/types/Work.ts`
```

### 2. 读取设计规范

从 `docs/design/phase-N-*.md` 读取组件设计：

- 尺寸规范
- CSS 样式
- Props 接口
- 交互状态

### 3. 确认实现计划

展示：
- 要创建的文件列表
- 组件结构树
- 依赖关系

等待用户确认。

### 4. 实现代码

按以下顺序创建文件：

1. **类型定义** (`types/`): TypeScript 接口
2. **API 封装** (`api/`): API 调用函数
3. **Store** (`stores/`): Pinia 状态管理
4. **组件** (`components/`): Vue 组件
5. **页面** (`pages/`): 页面组件

### 5. 代码规范

#### 组件模板

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NButton, NInput } from '@/shared/components'

interface Props {
  title?: string
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  loading: false
})

interface Emits {
  (e: 'submit', value: string): void
  (e: 'cancel'): void
}
const emit = defineEmits<Emits>()

const form = ref({
  username: '',
  password: ''
})

const isValid = computed(() => {
  return form.value.username.length >= 3 && form.value.password.length >= 6
})

const handleSubmit = () => {
  if (!isValid.value) return
  emit('submit', form.value.username)
}
</script>

<template>
  <div class="component-name">
    <div class="component-name__header">
      <h2 class="component-name__title">{{ title }}</h2>
      <span class="label label--mono">LABEL</span>
    </div>

    <form class="component-name__form" @submit.prevent="handleSubmit">
      <NInput
        v-model="form.username"
        label="用户名"
        placeholder="请输入用户名"
        :disabled="loading"
      />

      <div class="component-name__actions">
        <NButton
          type="primary"
          :loading="loading"
          :disabled="!isValid"
        >
          提交
        </NButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.component-name {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-md);
  padding: var(--spacing-screen-lg);
}

.component-name__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-lg);
  color: var(--color-text-display);
}

.label--mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.component-name__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-element-md);
}
</style>
```

#### CSS 规范

```css
/* ✅ 使用 CSS 变量 */
.component {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-element-md);
}

/* ✅ 机械感风格 */
.card {
  border-radius: 4px;
  border: 1px solid var(--color-border-default);
  box-shadow: none;
}

/* ✅ 全大写标签 */
.label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

/* ❌ 禁止硬编码 */
.bad-example {
  background: #F7F5F2;        /* 应该用 CSS 变量 */
  border-radius: 16px;        /* 应该用 var(--radius-md) */
  box-shadow: 0 4px 12px...;  /* Nothing 风格无阴影 */
}
```

### 6. 验收检查

完成后确认：

- ✅ TypeScript 编译无错误 (`npm run type-check`)
- ✅ ESLint 检查通过 (`npm run lint`)
- ✅ 组件符合设计规范
- ✅ 所有验收标准满足

## 设计规范参考

### Nothing Design System

- **字体**: Space Grotesk / Space Mono / Doto
- **圆角**: 4px (小圆角)
- **边框**: 1px (细边框)
- **阴影**: 无
- **标签**: 全大写，Space Mono

### 组件规范

- 使用共享组件: NButton, NInput, NCard, NLabel, NBadge
- 使用共享布局: MinimalLayout, ImmersiveLayout, SidebarLayout
- 使用 CSS 变量，不硬编码颜色值
