# Spec: Portfolio Platform 前端视觉原型

---

## 目标 (Objective)

### 产品定位
Portfolio Platform 是**作品集管理与网页生成平台**的前端视觉原型 Demo。后端 API 已完整实现（Spring Boot），前端聚焦于 UI/UX 展示，使用 Mock 数据模拟交互。

### 核心用户
- 创作者：需要展示作品的设计师、摄影师、艺术家
- 管理员：负责平台内容审核和系统维护

### 成功标准
1. **视觉完整性**：6 个模块全部实现，符合 Nothing 设计系统规范
2. **交互真实性**：核心路径可完整演示（登录→上传素材→创建作品→生成网页）
3. **设计系统验证**：建立完整的组件库和设计 tokens
4. **代码质量**：TypeScript 严格模式、ESLint 通过、无类型错误

### 非目标
- 不对接真实后端 API（使用 MSW Mock）
- 不实现暗色模式
- 不进行移动端深度优化（桌面优先）
- 不实现所有边缘交互（如版本回滚的详细流程）

---

## 技术栈 (Tech Stack)

| 类别 | 技术选择 | 版本 |
|------|----------|------|
| 框架 | Vue 3 | ^3.4.0 |
| 语言 | TypeScript | ^5.3.0 |
| 构建工具 | Vite | ^5.2.0 |
| 路由 | Vue Router | ^4.3.0 |
| 状态管理 | Pinia | ^2.1.0 |
| UI 组件库 | Element Plus | ^2.7.0（深度定制） |
| 字体图标 | @iconify/vue | ^4.1.0 |
| 拖拽 | vuedraggable | ^4.1.0 |
| HTTP 客户端 | axios | ^1.6.0 |
| Mock 工具 | MSW | ^2.3.0 |
| 代码规范 | ESLint + Prettier | - |
| Git Hooks | Husky + lint-staged | - |

### Google Fonts
- Space Grotesk（主字体）
- Space Mono（等宽字体/标签）
- Doto（Display 字体/Hero 数字）

---

## 命令 (Commands)

### 开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check
```

### 构建
```bash
# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 代码质量
```bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# Prettier 格式化
npm run format
```

### MSW 初始化（首次）
```bash
# 生成 Service Worker
npx msw init public/ --save
```

---

## 项目结构 (Project Structure)

```
frontend/
├── public/
│   ├── fonts/              # 字体文件（如需本地部署）
│   └── mockServiceWorker.js
│
├── src/
│   │
│   ├── features/           # 功能模块（按业务分组）
│   │   ├── auth/           # 认证模块
│   │   │   ├── components/ # AuthLoginForm.vue, AuthRegisterForm.vue
│   │   │   ├── api/        # authApi.ts
│   │   │   ├── stores/     # authStore.ts
│   │   │   ├── types/      # User.ts, AuthResponse.ts
│   │   │   └── pages/      # LoginPage.vue, RegisterPage.vue
│   │   │
│   │   ├── studio/
│   │   │   ├── assets/     # 素材库模块
│   │   │   │   ├── components/
│   │   │   │   ├── api/
│   │   │   │   ├── stores/
│   │   │   │   └── pages/
│   │   │   └── works/      # 作品编辑器模块
│   │   │       ├── components/
│   │   │       ├── api/
│   │   │       ├── stores/
│   │   │       └── pages/
│   │   │
│   │   ├── publish/
│   │   │   ├── templates/  # 模版选择模块
│   │   │   └── pages/      # 网页管理模块
│   │   │
│   │   └── admin/          # 管理后台模块
│   │
│   ├── shared/             # 共享资源
│   │   ├── components/     # 通用组件（遵循 Nothing 设计）
│   │   │   ├── NButton.vue     # Pill/Technical 按钮
│   │   │   ├── NCard.vue       # 无阴影卡片
│   │   │   ├── NInput.vue      # 机械感输入框
│   │   │   ├── NLabel.vue      # 全大写标签
│   │   │   ├── NBadge.vue      # 状态徽章
│   │   │   ├── NAvatar.vue     # 圆形头像
│   │   │   ├── NDotPattern.vue # 点阵背景
│   │   │   └── ...
│   │   ├── composables/  # 通用 composables
│   │   │   ├── useAuth.ts
│   │   │   ├── useLoading.ts
│   │   │   └── useToast.ts
│   │   ├── utils/        # 工具函数
│   │   │   ├── request.ts    # axios 封装
│   │   │   ├── format.ts     # 格式化函数
│   │   │   └── validate.ts   # 验证函数
│   │   └── config/       # 配置文件
│   │       └── constants.ts
│   │
│   ├── router/             # Vue Router 配置
│   │   ├── index.ts
│   │   └── routes/
│   │       ├── auth.ts
│   │       ├── studio.ts
│   │       ├── publish.ts
│   │       └── admin.ts
│   │
│   ├── stores/             # 全局共享 stores
│   │   └── app.ts
│   │
│   ├── styles/             # 全局样式
│   │   ├── main.css        # CSS 变量 + tokens
│   │   ├── reset.css       # 样式重置
│   │   └── transitions.css # 过渡动画
│   │
│   ├── types/              # 全局类型定义
│   │   └── global.d.ts
│   │
│   ├── App.vue
│   └── main.ts
│
├── mock/                   # MSW Mock 数据
│   ├── handlers/           # 按模块分组
│   │   ├── auth.ts
│   │   ├── assets.ts
│   │   ├── works.ts
│   │   ├── templates.ts
│   │   ├── pages.ts
│   │   └── admin.ts
│   ├── data/               # Mock 数据
│   └── browser.ts          # MSW 配置
│
├── docs/                   # 项目文档
│   └── design/             # 设计规范
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## 代码风格 (Code Style)

### 命名规范

```typescript
// 组件：PascalCase + 模块前缀（避免冲突）
AuthLoginForm.vue
StudioAssetGrid.vue
PublishTemplateCard.vue
AdminDashboard.vue

// Stores：kebab-case + store 后缀
authStore.ts
assetsStore.ts
worksStore.ts

// API 函数：camelCase + Api 后缀
loginApi()
fetchAssetsApi()
createWorkApi()

// 类型/接口：PascalCase
interface User {}
interface Asset {}
type Visibility = 'private' | 'public'

// 常量：UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8081/api'
const MAX_FILE_SIZE = 500 * 1024 * 1024

// Composables：use 前缀 + camelCase
useAuth()
useLoading()
useToast()
```

### 组件风格示例

```vue
<script setup lang="ts">
// 1. 导入顺序：Vue API → 外部库 → 内部模块
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/features/auth/stores/authStore'
import { NButton, NInput } from '@/shared/components'

// 2. Props 定义（带类型）
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
  (e: 'cancel'): void
}
const emit = defineEmits<Emits>()

// 4. 响应式状态
const form = ref({
  username: '',
  password: ''
})

// 5. 计算属性
const isValid = computed(() => {
  return form.value.username.length >= 3 && form.value.password.length >= 6
})

// 6. 方法
const handleSubmit = async () => {
  if (!isValid.value) return
  emit('submit', form.value.username)
}

// 7. 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>

<template>
  <!-- 模板使用语义化标签，Nothing 风格类名 -->
  <div class="auth-login">
    <div class="auth-login__header">
      <h1 class="auth-login__title">{{ title }}</h1>
      <span class="label label--mono">LOGIN</span>
    </div>

    <form class="auth-login__form" @submit.prevent="handleSubmit">
      <NInput
        v-model="form.username"
        label="用户名"
        placeholder="请输入用户名"
        :disabled="loading"
      />

      <NInput
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :disabled="loading"
      />

      <div class="auth-login__actions">
        <NButton
          type="primary"
          :loading="loading"
          :disabled="!isValid"
        >
          登录
        </NButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* BEM 风格 + CSS 变量 */
.auth-login {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-md);
  padding: var(--spacing-screen-lg);
}

.auth-login__title {
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
</style>
```

### TypeScript 风格

```typescript
// ✅ 优先使用 interface 定义对象类型
interface User {
  id: number
  username: string
  nickname?: string  // 可选属性
}

// ✅ 使用 type 定义联合类型
type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'
type AssetType = 'image' | 'video' | 'text'

// ✅ 使用 enum 仅当值是固定且需要时序化时
enum Visibility {
  Private = 0,
  Public = 1
}

// ✅ 函数返回类型明确标注
async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await authApi.login({ username, password })
  return response.data
}

// ✅ 使用泛型增强类型安全
function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    code: 200,
    msg: 'success',
    data
  }
}
```

### CSS 风格（Nothing Design）

```css
/* ✅ 使用 CSS 变量，不硬编码值 */
.my-component {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-element-md);
}

/* ✅ 机械感：小圆角、细边框、无阴影 */
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

/* ✅ Hero 数字 */
.hero-number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-3xl);
  font-weight: 400;
  line-height: 1.1;
}

/* ❌ 避免使用 */
.bad-example {
  background: #F7F5F2;        /* 应该用 CSS 变量 */
  border-radius: 16px;        /* 应该用 var(--radius-md) */
  box-shadow: 0 4px 12px...;  /* Nothing 风格无阴影 */
  color: rgba(0,0,0,0.87);    /* 应该用语义化颜色变量 */
}
```

---

## 测试策略 (Testing Strategy)

### 测试级别

| 级别 | 工具 | 覆盖目标 | 说明 |
|------|------|----------|------|
| 单元测试 | Vitest | 核心工具函数 | utils/ 下的纯函数 |
| 组件测试 | Vitest + @vue/test-utils | 共享组件 | NButton, NInput 等通用组件 |
| E2E 测试 | - | - | 暂不实施（视觉原型优先） |

### 测试文件位置

```
src/shared/utils/
├── format.test.ts       # format.ts 的单元测试
└── validate.test.ts     # validate.ts 的单元测试

src/shared/components/
└── __tests__/
    ├── NButton.test.ts
    └── NInput.test.ts
```

### 覆盖率目标

- utils/: **80%+**
- components/: **60%+**（仅共享组件）
- features/: 暂不要求

### 测试命令

```bash
# 运行测试
npm run test

# 覆盖率报告
npm run test:coverage

# UI 模式
npm run test:ui
```

---

## 边界 (Boundaries)

### Always do（始终执行）
- ✅ 使用 TypeScript 严格模式
- ✅ 组件使用 `<script setup>` + `lang="ts"`
- ✅ 使用 CSS 变量，不硬编码样式
- ✅ API 调用通过 `request.ts` 封装，统一处理错误
- ✅ 提交前运行 ESLint 检查
- ✅ 组件命名带模块前缀（避免冲突）
- ✅ 遵循 BEM 命名类名
- ✅ 使用语义化 HTML 标签

### Ask first（先询问）
- ❓ 添加新的 npm 依赖（评估必要性）
- ❓ 修改 Nothing 设计 tokens（需要设计评审）
- ❓ 修改 API 接口结构（需要后端确认）
- ❓ 跳过某个模块（调整交付计划）
- ❓ 使用 Element Plus 默认样式（应深度定制）

### Never do（禁止执行）
- ❌ 提交硬编码的密钥或敏感信息
- ❌ 禁用 TypeScript 类型检查（使用 `@ts-ignore` 等）
- ❌ 使用 `any` 类型（`unknown` 优于 `any`）
- ❌ 直接在组件中调用 `window.fetch`（应使用 `request.ts`）
- ❌ 修改 `node_modules` 或 `vendor` 目录
- ❌ 删除或跳过 ESLint 错误

---

## 模块实现顺序

### Phase 1: 基础设施（Day 1-2）
1. 项目初始化（Vite + Vue 3 + TypeScript）
2. 配置文件搭建（ESLint、Prettier、路径别名）
3. 设计系统 tokens 建立
4. MSW 初始化

### Phase 2: 共享组件（Day 3-5）
1. NButton, NInput, NCard 等核心组件
2. NLabel, NBadge, NAvatar 等展示组件
3. 布局组件（ImmersiveLayout, SidebarLayout）
4. Composables（useAuth, useLoading, useToast）

### Phase 3: 认证模块（Day 6-7）
1. 登录页面
2. 注册页面
3. 认证流程和状态管理
4. 路由守卫

### Phase 4: 素材库模块（Day 8-10）
1. 素材网格视图
2. 文件夹树组件
3. 上传组件（拖拽上传）
4. 素材详情抽屉

### Phase 5: 作品编辑器（Day 11-13）
1. 作品列表页面
2. 作品编辑器（区块拖拽排序）
3. 区块组件（文本块、图片画廊、视频播放器、引言块）
4. 版本历史界面

### Phase 6: 模版选择（Day 14）
1. 模版网格展示
2. 模版预览
3. 模版筛选

### Phase 7: 网页管理（Day 15）
1. 已发布网页列表
2. 网页预览
3. SEO 编辑
4. 上线/下线操作

### Phase 8: 管理后台（Day 16-17）
1. 数据仪表盘
2. 网页审核界面
3. 模版管理

### Phase 9: 整合与优化（Day 18-19）
1. 全局导航
2. 过渡动画
3. 错误处理
4. 性能优化

### Phase 10: 验收与交付（Day 20）
1. 完整流程测试
2. 视觉走查
3. 文档完善
4. 演示准备

---

## 成功标准 (Success Criteria)

### 功能完整性
- [ ] 6 个模块全部实现
- [ ] 核心路径可完整演示：登录→上传素材→创建作品→生成网页
- [ ] 所有页面路由可访问
- [ ] Mock 数据覆盖主要场景

### 视觉质量
- [ ] 符合 Nothing 设计系统规范
- [ ] CSS 变量覆盖所有样式
- [ ] 响应式布局（桌面优先）
- [ ] 过渡动画流畅

### 代码质量
- [ ] TypeScript 严格模式，无 `any` 类型
- [ ] ESLint 检查通过
- [ ] 组件命名规范统一
- [ ] 核心工具有单元测试

### 用户体验
- [ ] 加载状态反馈
- [ ] 错误提示友好
- [ ] 表单验证清晰
- [ ] 操作反馈及时

---

## 待解决问题 (Open Questions)

1. **用户头像默认方案**：是否使用默认占位符还是要求用户上传？
2. **文件上传进度**：是否需要显示上传进度条？
3. **实时预览**：作品编辑器是否需要实时预览功能？
4. **数据持久化**：Mock 数据是否需要 localStorage 持久化？
5. **国际化**：是否需要预留 i18n 支持？
6. **演示数据量**：每个模块需要多少条 Mock 数据？

---

## 相关文档

- `README.md` — 后端 API 参考
- `FEATURES.md` — 功能说明
- `CONTEXT.md` — 领域术语
- `docs/design-tokens.md` — 设计系统完整 tokens
- `docs/setup.md` — 开发环境设置
- `docs/adr/` — 架构决策记录
