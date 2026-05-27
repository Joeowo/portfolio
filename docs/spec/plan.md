# 实施计划 — Portfolio Platform 前端视觉原型

---

## 计划概述

本文档详细说明如何实施 `docs/spec.md` 中定义的技术规范。

**总工期**: 约 20 天
**并行策略**: 共享组件与 Mock 数据可并行开发
**里程碑验证**: 每个 Phase 结束后进行演示和评审

---

## 依赖关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                        Phase 1: 基础设施                         │
│  项目初始化 │ 配置文件 │ 设计 Tokens │ MSW 初始化 │ 路由框架    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
┌───────────────────────┐     ┌───────────────────────┐
│  Phase 2A: 共享组件   │     │  Phase 2B: Mock 数据  │
│  NButton, NInput...   │     │  handlers + data      │
└───────────┬───────────┘     └───────────┬───────────┘
            │                             │
            └──────────────┬──────────────┘
                           ▼
            ┌──────────────────────────────┐
            │   Phase 3: 认证模块          │
            │   登录/注册/路由守卫         │
            └───────────┬──────────────────┘
                        │
                        ▼
            ┌──────────────────────────────┐
            │   Phase 4: 素材库模块        │
            │   网格/文件夹/上传/详情      │
            └───────────┬──────────────────┘
                        │
                        ▼
            ┌──────────────────────────────┐
            │   Phase 5: 作品编辑器        │
            │   列表/编辑器/区块/版本      │
            └───────────┬──────────────────┘
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
┌───────────────────┐   ┌───────────────────┐
│ Phase 6: 模版选择 │   │ Phase 7: 网页管理 │
│ 网格/预览/筛选    │   │ 列表/预览/SEO     │
└─────────┬─────────┘   └─────────┬─────────┘
          │                       │
          └───────────┬───────────┘
                      ▼
            ┌──────────────────────┐
            │ Phase 8: 管理后台    │
            │ 仪表盘/审核/模版管理 │
            └───────────┬──────────┘
                        │
                        ▼
            ┌──────────────────────┐
            │ Phase 9: 整合优化    │
            │ 导航/动画/错误/性能  │
            └───────────┬──────────┘
                        │
                        ▼
            ┌──────────────────────┐
            │ Phase 10: 验收交付   │
            │ 测试/走查/文档/演示  │
            └──────────────────────┘
```

---

## Phase 1: 基础设施（Day 1-2）

### 目标
搭建完整的项目基础，确保开发环境可用。

### 任务清单

#### 1.1 项目初始化
```bash
npm create vite@latest frontend -- --template vue-ts
cd frontend
npm install
```

#### 1.2 安装依赖
```bash
# 核心依赖
npm install vue@^3.4.0 vue-router@^4.3.0 pinia@^2.1.0
npm install element-plus@^2.7.0 @element-plus/icons-vue
npm install @iconify/vue vuedraggable@^4.1.0 axios

# 开发依赖
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint eslint-plugin-vue prettier
npm install -D @vue/eslint-config-typescript @vue/eslint-config-prettier
npm install -D husky lint-staged
npm install -D msw@^2.3.0
npm install -D vitest @vue/test-utils
```

#### 1.3 配置文件创建
- `vite.config.ts` - 路径别名 `@`, `@features`, `@shared`
- `tsconfig.json` - 严格模式
- `.eslintrc.cjs` - ESLint 规则
- `.prettierrc` - Prettier 配置
- `package.json` - scripts 配置

#### 1.4 目录结构创建
```bash
mkdir -p src/features/{auth,studio/{assets,works},publish/{templates,pages},admin}
mkdir -p src/shared/{components,composables,utils,config}
mkdir -p src/{router,stores,styles,types}
mkdir -p public/fonts
mkdir -p mock/handlers mock/data
mkdir -p docs/design
```

#### 1.5 设计 Tokens 建立
- `src/styles/main.css` - CSS 变量定义
- `src/styles/reset.css` - 样式重置
- `src/styles/transitions.css` - 过渡动画

#### 1.6 MSW 初始化
```bash
npx msw init public/ --save
```
- 创建 `mock/browser.ts`
- 创建 `mock/handlers/` 目录结构

#### 1.7 路由框架搭建
- `src/router/index.ts` - 路由配置
- `src/router/routes/` - 按模块分组路由

#### 1.8 入口文件
- `src/main.ts` - 应用入口
- `src/App.vue` - 根组件
- `index.html` - HTML 模板（Google Fonts）

### 验证标准
- [ ] `npm run dev` 启动成功
- [ ] 访问 `http://localhost:5173` 显示空白页（无报错）
- [ ] TypeScript 编译无错误
- [ ] ESLint 检查通过
- [ ] CSS 变量在 DevTools 中可见
- [ ] MSW 控制台显示 `[MSW] Mocking enabled`

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| Node 版本不兼容 | 确保 Node 18.x+，使用 nvm 切换 |
| MSW Service Worker 报错 | 检查 public 目录路径，重新运行 `npx msw init` |
| 路径别名不生效 | 同步 `vite.config.ts` 和 `tsconfig.json` 配置 |

---

## Phase 2A: 共享组件（Day 3-5）

### 目标
建立 Nothing 设计系统的核心组件库。

### 任务清单

#### 2A.1 基础组件
按优先级顺序实现：

1. **NButton.vue**
   - Props: `type` ('primary' | 'secondary'), `size`, `loading`, `disabled`
   - Primary: Pill 形状（`border-radius: 999px`）
   - Secondary: Technical 形状（`border-radius: 4px`）

2. **NInput.vue**
   - Props: `label`, `placeholder`, `error`, `disabled`
   - 机械感：4px 圆角，细边框
   - 聚焦状态：边框颜色加深

3. **NCard.vue**
   - Props: `padding`, `border`
   - 无阴影，细边框
   - 可选点阵背景

4. **NLabel.vue**
   - 全大写，Space Mono 字体
   - Props: `size`, `color`

5. **NBadge.vue**
   - 状态徽章
   - Props: `status` ('success' | 'warning' | 'error')

6. **NAvatar.vue**
   - 圆形头像
   - Props: `size`, `src`, `name`（首字母回退）

7. **NDotPattern.vue**
   - 点阵背景装饰
   - Props: `opacity`, `color`

#### 2A.2 布局组件

1. **MinimalLayout.vue**
   - 居中卡片布局（认证页面）
   - 最大宽度 480px

2. **ImmersiveLayout.vue**
   - 全屏布局（创作页面）
   - 顶部工具栏

3. **SidebarLayout.vue**
   - 侧边栏布局（管理后台）
   - 侧边栏宽度 200px

4. **TopNavLayout.vue**
   - 顶部导航布局（发布页面）

#### 2A.3 Composables

1. **useAuth.ts**
   ```typescript
   export function useAuth() {
     return {
       user: computed(() => authStore.user),
       isAuthenticated: computed(() => !!authStore.token),
       login: authStore.login,
       logout: authStore.logout,
       checkAuth: authStore.checkAuth
     }
   }
   ```

2. **useLoading.ts**
   ```typescript
   export function useLoading(initialState = false) {
     const loading = ref(initialState)
     const start = () => { loading.value = true }
     const stop = () => { loading.value = false }
     return { loading, start, stop }
   }
   ```

3. **useToast.ts**
   - 消息提示
   - Methods: `success()`, `error()`, `warning()`, `info()`

#### 2A.4 工具函数

1. **request.ts** - Axios 封装
   ```typescript
   // 拦截器：Token 注入、错误处理
   // 方法: get(), post(), put(), delete()
   ```

2. **format.ts**
   - `formatDate()` - 日期格式化
   - `formatFileSize()` - 文件大小
   - `formatNumber()` - 数字格式化

3. **validate.ts**
   - `validateEmail()` - 邮箱验证
   - `validatePassword()` - 密码强度
   - `validateUsername()` - 用户名规则

### 验证标准
- [ ] 所有组件在 Storybook 或测试页可预览
- [ ] 组件 props 类型定义完整
- [ ] CSS 变量覆盖所有样式
- [ ] 无 `any` 类型
- [ ] 组件单元测试覆盖率 60%+

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| Element Plus 样式冲突 | 使用 `:deep()` 选择器，增加 CSS 优先级 |
| 组件复用性不足 | 抽象 props，保持组件灵活性 |
| 设计 tokens 遗漏 | 对照 `docs/design-tokens.md` 逐项检查 |

---

## Phase 2B: Mock 数据（可与 2A 并行）（Day 3-4）

### 目标
建立 MSW Mock 数据，覆盖所有 API 接口。

### 任务清单

#### 2B.1 Mock 数据定义
创建 `mock/data/` 下的数据文件：

1. `users.ts` - 测试用户数据
2. `assets.ts` - 素材数据（20+ 条）
3. `works.ts` - 作品数据（10+ 条）
4. `templates.ts` - 模版数据（3 条系统 + 2 条自定义）
5. `pages.ts` - 发布页面数据（10+ 条）

#### 2B.2 Handlers 创建
按模块创建 `mock/handlers/`：

1. `auth.ts`
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `POST /api/auth/refresh`
   - `GET /api/auth/me`

2. `assets.ts`
   - `POST /api/assets/upload`
   - `POST /api/assets/text`
   - `GET /api/assets`
   - `GET /api/assets/:id`
   - `PUT /api/assets/:id`
   - `DELETE /api/assets/:id`
   - `GET /api/assets/folders`
   - 其他文件夹接口

3. `works.ts`
   - `GET /api/portfolio/works`
   - `POST /api/portfolio/works`
   - `GET /api/portfolio/works/:id`
   - `PUT /api/portfolio/works/:id`
   - `DELETE /api/portfolio/works/:id`
   - `POST /api/portfolio/works/:id/duplicate`
   - `GET /api/portfolio/works/:id/versions`
   - `POST /api/portfolio/works/:id/versions/:ver/rollback`

4. `templates.ts`
   - `GET /api/templates`
   - `GET /api/templates/:id`
   - `POST /api/templates`
   - `PUT /api/templates/:id`
   - `DELETE /api/templates/:id`

5. `pages.ts`
   - `POST /api/pages/generate`
   - `GET /api/pages`
   - `GET /api/pages/:id`
   - `GET /api/pages/view/:id`
   - `PUT /api/pages/:id`
   - `POST /api/pages/:id/regenerate`
   - `PUT /api/pages/:id/status`

6. `admin.ts`
   - `GET /api/admin/portfolio/dashboard`
   - `GET /api/admin/portfolio/pages/review`
   - `PUT /api/admin/portfolio/pages/:id/review`
   - 其他管理接口

#### 2B.3 MSW 配置
- `mock/browser.ts` - worker 配置
- 添加网络延迟模拟（`ctx.delay(300-800)`）

### 验证标准
- [ ] 所有 API 接口有对应的 handler
- [ ] Mock 数据结构与 API 文档一致
- [ ] 网络延迟模拟生效
- [ ] 错误场景可模拟（401、404、500）

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| 数据结构不一致 | 严格对照 `README.md` API 文档 |
| 复杂场景难以模拟 | 使用动态响应函数，根据请求参数返回 |

---

## Phase 3: 认证模块（Day 6-7）

### 目标
实现用户登录注册功能，建立认证状态管理。

### 组件结构
```
features/auth/
├── components/
│   ├── AuthLoginForm.vue       # 登录表单
│   ├── AuthRegisterForm.vue    # 注册表单
│   └── AuthLayout.vue          # 认证页面布局
├── pages/
│   ├── LoginPage.vue
│   └── RegisterPage.vue
├── stores/
│   └── authStore.ts
├── api/
│   └── authApi.ts
└── types/
    ├── User.ts
    └── AuthResponse.ts
```

### 任务清单

#### 3.1 类型定义
```typescript
// types/User.ts
interface User {
  id: number
  username: string
  nickname?: string
  avatarUrl?: string
  email?: string
  bio?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string
}

// types/AuthResponse.ts
interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}
```

#### 3.2 API 封装
```typescript
// api/authApi.ts
export const authApi = {
  login: (data: { username: string; password: string }) =>
    request.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterDto) =>
    request.post('/auth/register', data),
  refresh: (refreshToken: string) =>
    request.post<AuthResponse>('/auth/refresh', { refreshToken }),
  getMe: () =>
    request.get<User>('/auth/me')
}
```

#### 3.3 状态管理
```typescript
// stores/authStore.ts
export const authStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const login = async (username: string, password: string) => {
    const response = await authApi.login({ username, password })
    token.value = response.data.accessToken
    localStorage.setItem('token', response.data.accessToken)
    // 获取用户信息
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, login, logout, isAuthenticated }
})
```

#### 3.4 页面实现
- **LoginPage.vue**: Hero 数字标题、居中卡片、登录表单
- **RegisterPage.vue**: 注册表单、成功后跳转

#### 3.5 路由守卫
```typescript
// router/index.ts
router.beforeEach((to, from, next) => {
  const auth = authStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### 验证标准
- [ ] 登录成功后跳转到首页
- [ ] Token 存储到 localStorage
- [ ] 未登录访问受保护页面重定向到登录
- [ ] 登录表单验证生效
- [ ] 错误提示正确显示

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| Token 刷新逻辑复杂 | 暂时简化，Token 过期后要求重新登录 |
| 路由守卫死循环 | 检查重定向目标，避免循环 |

---

## Phase 4: 素材库模块（Day 8-10）

### 目标
实现素材管理功能：网格展示、文件夹管理、文件上传。

### 组件结构
```
features/studio/assets/
├── components/
│   ├── AssetGrid.vue           # 素材网格
│   ├── AssetCard.vue           # 素材卡片
│   ├── FolderTree.vue          # 文件夹树
│   ├── UploadDropzone.vue      # 上传拖拽区
│   ├── AssetDetailDrawer.vue   # 素材详情抽屉
│   └── AssetFilterBar.vue      # 筛选工具栏
├── pages/
│   └── AssetsPage.vue
├── stores/
│   └── assetsStore.ts
├── api/
│   └── assetsApi.ts
└── types/
    └── Asset.ts
```

### 任务清单

#### 4.1 类型定义
```typescript
// types/Asset.ts
interface Asset {
  id: number
  userId: number
  folderId: number | null
  name: string
  assetType: 'image' | 'video' | 'text'
  fileUrl: string
  thumbnailUrl?: string
  fileSize: number
  width?: number
  height?: number
  tags?: string
  createdAt: string
}

interface Folder {
  id: number
  name: string
  parentId: number | null
  children?: Folder[]
}
```

#### 4.2 核心组件

1. **AssetGrid.vue**
   - 响应式网格布局
   - 支持图片/视频/文本不同展示
   - 虚拟滚动（数据量大时）

2. **AssetCard.vue**
   - 缩略图展示
   - 悬停显示操作按钮
   - 全大写标签显示元数据

3. **FolderTree.vue**
   - 树形结构展示
   - 支持展开/折叠
   - 点击切换当前文件夹

4. **UploadDropzone.vue**
   - 拖拽上传区域
   - 上传进度条
   - 文件类型验证

#### 4.3 状态管理
```typescript
// stores/assetsStore.ts
export const assetsStore = defineStore('assets', () => {
  const assets = ref<Asset[]>([])
  const folders = ref<Folder[]>([])
  const currentFolder = ref<number | null>(null)
  const filters = ref({ type: '', keyword: '' })

  const fetchAssets = async () => { /* ... */ }
  const uploadFile = async (file: File) => { /* ... */ }
  const createFolder = async (name: string, parentId: number | null) => { /* ... */ }

  return { assets, folders, currentFolder, filters, fetchAssets, uploadFile, createFolder }
})
```

### 验证标准
- [ ] 素材网格正确展示
- [ ] 文件夹切换正常
- [ ] 文件拖拽上传生效
- [ ] 筛选和搜索功能正常
- [ ] 视觉符合 Nothing 设计

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| 大文件上传卡顿 | 添加进度条，模拟分片上传 |
| 虚拟滚动复杂 | 数据量小时暂不实现 |

---

## Phase 5: 作品编辑器（Day 11-13）

### 目标
实现作品管理和编辑功能：列表展示、区块编辑、拖拽排序。

### 组件结构
```
features/studio/works/
├── components/
│   ├── WorksList.vue            # 作品列表
│   ├── WorkCard.vue             # 作品卡片
│   ├── WorkEditor.vue           # 编辑器主容器
│   ├── SectionList.vue          # 区块列表
│   ├── SectionItem.vue          # 区块项
│   ├── TextBlockEditor.vue      # 文本块编辑
│   ├── ImageGalleryEditor.vue   # 图片画廊编辑
│   ├── VideoPlayerEditor.vue    # 视频播放器编辑
│   ├── QuoteEditor.vue          # 引言块编辑
│   ├── VersionHistory.vue       # 版本历史
│   └── AssetPicker.vue          # 素材选择器（复用）
├── pages/
│   ├── WorksListPage.vue
│   └── WorkEditorPage.vue
├── stores/
│   └── worksStore.ts
├── api/
│   └── worksApi.ts
└── types/
    └── Work.ts
```

### 任务清单

#### 5.1 类型定义
```typescript
// types/Work.ts
interface Work {
  id: number
  userId: number
  title: string
  description?: string
  coverUrl?: string
  sections: Section[]
  version: number
  visibility: 0 | 1
  createdAt: string
  updatedAt: string
}

type SectionType = 'text_block' | 'image_gallery' | 'video_player' | 'quote'

interface Section {
  type: SectionType
  order: number
  content: Record<string, any>
}
```

#### 5.2 核心组件

1. **WorkEditor.vue**
   - 侧边抽屉布局
   - 基本信息（标题、简介、封面）
   - 区块列表（拖拽排序）
   - 添加区块按钮

2. **SectionList.vue**
   - 使用 vuedraggable 实现拖拽
   - 每个区块显示类型图标和预览
   - 悬停显示操作按钮

3. **各区块编辑器**
   - TextBlockEditor: 富文本编辑（简化版 textarea）
   - ImageGalleryEditor: 从素材库选择图片
   - VideoPlayerEditor: 从素材库选择视频
   - QuoteEditor: 简单文本输入

4. **VersionHistory.vue**
   - 版本列表展示
   - 回滚确认对话框

#### 5.3 状态管理
```typescript
// stores/worksStore.ts
export const worksStore = defineStore('works', () => {
  const works = ref<Work[]>([])
  const currentWork = ref<Work | null>(null)

  const fetchWorks = async () => { /* ... */ }
  const createWork = async (data: CreateWorkDto) => { /* ... */ }
  const updateWork = async (id: number, data: UpdateWorkDto) => { /* ... */ }
  const duplicateWork = async (id: number) => { /* ... */ }
  const deleteWork = async (id: number) => { /* ... */ }
  const rollbackVersion = async (id: number, version: number) => { /* ... */ }

  return { works, currentWork, fetchWorks, createWork, updateWork, duplicateWork, deleteWork, rollbackVersion }
})
```

### 验证标准
- [ ] 作品列表正确展示
- [ ] 区块拖拽排序生效
- [ ] 各区块编辑器正常工作
- [ ] 版本历史展示正确
- [ ] 自动保存功能模拟

### 风险与缓解
| 风险 | 缓解措施 |
|------|----------|
| 拖拽排序复杂 | 使用 vuedraggable，参考示例代码 |
| 富文本编辑器复杂 | 简化为 textarea + HTML 预览 |

---

## Phase 6: 模版选择（Day 14）

### 目标
实现模版浏览和选择功能。

### 组件结构
```
features/publish/templates/
├── components/
│   ├── TemplateGrid.vue         # 模版网格
│   ├── TemplateCard.vue         # 模版卡片
│   ├── TemplatePreview.vue      # 模版预览
│   └── TemplateFilterBar.vue    # 筛选工具栏
├── pages/
│   └── TemplatesPage.vue
├── stores/
│   └── templatesStore.ts
├── api/
│   └── templatesApi.ts
└── types/
    └── Template.ts
```

### 任务清单

#### 6.1 类型定义
```typescript
// types/Template.ts
interface Template {
  id: number
  name: string
  category: string
  type: 'system' | 'custom'
  previewUrl: string
  layoutType: 'single' | 'grid' | 'two_column'
  status: 0 | 1
}
```

#### 6.2 核心组件

1. **TemplateGrid.vue**
   - 大图网格布局
   - 悬停显示预览按钮

2. **TemplatePreview.vue**
   - 模态框展示
   - 显示完整预览图
   - 选择按钮

### 验证标准
- [ ] 模版网格正确展示
- [ ] 分类筛选生效
- [ ] 预览功能正常
- [ ] 选择操作正确传递

---

## Phase 7: 网页管理（Day 15）

### 目标
实现已发布网页管理功能。

### 组件结构
```
features/publish/pages/
├── components/
│   ├── PagesGrid.vue            # 网页网格
│   ├── PageCard.vue             # 网页卡片
│   ├── PagePreview.vue          # 网页预览
│   ├── SeoEditor.vue            # SEO 编辑器
│   └── PageStatusToggle.vue     # 上线/下线切换
├── pages/
│   └── PagesPage.vue
├── stores/
│   └── pagesStore.ts
├── api/
│   └── pagesApi.ts
└── types/
    └── PublishedPage.ts
```

### 任务清单

#### 7.1 核心组件

1. **PageCard.vue**
   - 网页缩略图
   - 访问量显示（Hero 数字）
   - 状态标签（上线/下线）
   - 操作按钮

2. **PagePreview.vue**
   - iframe 展示实际页面
   - 或模拟页面预览

3. **SeoEditor.vue**
   - SEO 标题输入
   - SEO 描述输入
   - 自定义短链输入

### 验证标准
- [ ] 网页列表正确展示
- [ ] 预览功能正常
- [ ] SEO 编辑生效
- [ ] 上线/下线切换正常

---

## Phase 8: 管理后台（Day 16-17）

### 目标
实现管理员功能：数据仪表盘、网页审核、模版管理。

### 组件结构
```
features/admin/
├── components/
│   ├── DashboardStats.vue       # 数据统计卡片
│   ├── PagesReviewList.vue      # 网页审核列表
│   ├── TemplatesManageTable.vue # 模版管理表格
│   └── StatusToggle.vue         # 状态切换
├── pages/
│   ├── DashboardPage.vue
│   ├── PagesReviewPage.vue
│   └── TemplatesManagePage.vue
├── stores/
│   └── adminStore.ts
├── api/
│   └── adminApi.ts
└── types/
    └── AdminStats.ts
```

### 任务清单

#### 8.1 核心组件

1. **DashboardStats.vue**
   - 4 个统计卡片
   - Hero 数字显示

2. **PagesReviewList.vue**
   - 表格布局
   - 审核/下架操作

3. **TemplatesManageTable.vue**
   - 表格布局
   - 创建/编辑/删除操作

### 验证标准
- [ ] 数据统计正确显示
- [ ] 审核操作正常
- [ ] 模版管理功能完整

---

## Phase 9: 整合优化（Day 18-19）

### 目标
全局功能整合和性能优化。

### 任务清单

#### 9.1 全局导航
- **MainNavigation.vue** - 主导航组件
- **UserMenu.vue** - 用户菜单（头像下拉）

#### 9.2 过渡动画
- 页面切换动画
- 组件过渡动画
- 遵循 Nothing 机械感风格

#### 9.3 错误处理
- 全局错误边界
- API 错误统一处理
- 友好的错误提示

#### 9.4 性能优化
- 路由懒加载
- 图片懒加载
- 组件按需加载

#### 9.5 细节打磨
- Loading 状态统一
- 空状态页面
- 骨架屏

### 验证标准
- [ ] 所有页面可导航访问
- [ ] 过渡动画流畅
- [ ] 错误提示友好
- [ ] 无明显性能问题

---

## Phase 10: 验收交付（Day 20）

### 目标
最终验收和文档完善。

### 任务清单

#### 10.1 完整流程测试
1. 登录 → 上传素材 → 创建作品 → 选择模版 → 生成网页
2. 管理员登录 → 数据查看 → 网页审核

#### 10.2 视觉走查
- 对照 Nothing 设计系统逐项检查
- CSS 变量使用检查
- 响应式布局检查

#### 10.3 代码质量
- ESLint 检查通过
- TypeScript 无错误
- 单元测试运行

#### 10.4 文档完善
- 更新 README.md
- 添加组件使用示例
- 记录已知问题

#### 10.5 演示准备
- 准备演示账号
- 准备演示数据
- 录制演示视频（可选）

### 最终验收标准
- [ ] 6 个模块全部实现
- [ ] 核心流程可演示
- [ ] 视觉符合规范
- [ ] 代码质量达标
- [ ] 文档完整

---

## 风险汇总

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| Element Plus 定制困难 | 高 | 中 | 预留额外时间，必要时减少定制深度 |
| MSW Mock 复杂场景 | 中 | 中 | 简化复杂场景，聚焦主要流程 |
| 设计 tokens 不完整 | 高 | 低 | 严格对照设计文档，提前验证 |
| 进度延期 | 中 | 中 | 优先完成核心功能，边缘功能可简化 |
| 浏览器兼容性 | 低 | 低 | 桌面优先，仅测试现代浏览器 |

---

## 关键决策点

1. **Day 5 结束**: 共享组件评审 - 确认设计系统实施方向
2. **Day 7 结束**: 认证模块评审 - 确认路由和状态管理方案
3. **Day 13 结束**: 创作模块评审 - 确认编辑器交互方案
4. **Day 17 结束**: 功能完整性检查 - 确认所有模块已实现
5. **Day 19 结束**: 最终视觉走查 - 确认交付质量

---

## 并行开发策略

可以并行的任务：
- **Phase 2A 和 2B**: 共享组件和 Mock 数据可同时开发
- **Phase 6 和 7**: 模版选择和网页管理可并行
- **Phase 8 的一部分**: 管理后台的不同页面可并行

必须串行的任务：
- Phase 1-2-3: 基础设施 → 共享组件 → 认证（有依赖）
- Phase 3-4-5: 认证 → 素材库 → 编辑器（数据流依赖）

---

## 资源需求

### 开发环境
- Node.js 18.x+
- 现代浏览器（Chrome/Edge 最新版）
- VS Code + 推荐扩展

### 外部资源
- Google Fonts（需要网络访问）
- 后端 API 文档（已存在）
- 设计规范文档（已存在）

### 依赖账号
- 无需外部服务账号（Mock 数据）

---

## 下一步

确认本计划后，将进入 **Phase 3: Tasks** 阶段，生成详细的任务清单。
