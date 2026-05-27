# 任务清单 — Portfolio Platform 前端视觉原型

---

## 使用说明

- 每个任务应在单次会话内完成（建议 2-4 小时）
- 任务按依赖顺序排列，依次执行
- 每个任务包含：描述、验收标准、验证方式、涉及文件

---

## Phase 1: 基础设施 ✅ COMPLETED

### Task 1.1: 项目初始化 ✅
**描述**: 创建 Vite + Vue 3 + TypeScript 项目

**验收标准**:
- ✅ `frontend/` 目录存在
- ✅ `npm run dev` 启动成功
- ✅ 访问 http://localhost:5173 显示应用

**涉及文件**:
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/tsconfig.json`
- `frontend/index.html`
- `frontend/src/main.ts`

---

### Task 1.2: 安装依赖 ✅
**描述**: 安装所有项目依赖

**验收标准**:
- 所有依赖安装完成
- `package.json` 包含所有必需依赖

**验证方式**:
```bash
npm run type-check
```

**涉及文件**:
- `frontend/package.json`

---

### Task 1.3: 配置文件创建 ✅
**描述**: 创建 ESLint、Prettier、Husky 配置

**涉及文件**:
- ✅ `frontend/.eslintrc.cjs`
- ✅ `frontend/.prettierrc`
- ✅ `frontend/.gitignore`

---

### Task 1.4: 目录结构创建 ✅
**描述**: 按规范创建完整目录结构

**涉及文件**:
- ✅ `frontend/src/features/` 及子目录
- ✅ `frontend/src/shared/` 及子目录
- ✅ `frontend/src/router/`
- ✅ `frontend/src/stores/`
- ✅ `frontend/src/styles/`
- ✅ `frontend/src/types/`
- ✅ `frontend/mock/`

---

### Task 1.5: 设计 Tokens 建立 ✅
**描述**: 创建 CSS 变量定义

**涉及文件**:
- ✅ `frontend/src/styles/main.css` (Nothing Design System tokens)
- ✅ `frontend/src/styles/reset.css`
- ✅ `frontend/src/styles/transitions.css`
- ✅ `frontend/index.html` (Google Fonts loaded)

---

### Task 1.6: MSW 初始化 ✅
**描述**: 初始化 MSW Service Worker

**涉及文件**:
- ✅ `frontend/mock/browser.ts`
- ✅ `frontend/src/main.ts` (MSW 集成)

**注意**: 首次运行需执行 `npx msw init public/ --save`

---

### Task 1.7: 路由框架搭建 ✅
**描述**: 创建 Vue Router 配置和路由结构

**涉及文件**:
- ✅ `frontend/src/router/index.ts` (含所有路由 + 守卫)

---

### Task 1.8: 入口文件完善 ✅
**描述**: 完善 main.ts 和根组件

**涉及文件**:
- ✅ `frontend/src/main.ts`
- ✅ `frontend/src/App.vue`
- ✅ `frontend/src/stores/app.ts`

---

**Phase 1 完成时间**: 2026-05-27

## Phase 2A: 共享组件

### Task 2A.1: NButton 组件
**描述**: 实现 Nothing 风格按钮组件

**验收标准**:
- Primary 样式（Pill 圆角）
- Secondary 样式（4px 圆角）
- 支持 loading、disabled 状态
- 3 种尺寸（sm, md, lg）

**验证方式**:
创建测试页面查看按钮样式

**涉及文件**:
- `frontend/src/shared/components/NButton.vue`
- `frontend/src/shared/components/__tests__/NButton.test.ts`

---

### Task 2A.2: NInput 组件
**描述**: 实现 Nothing 风格输入框组件

**验收标准**:
- 机械感样式（4px 圆角、细边框）
- 支持错误状态
- 支持 label
- 支持禁用状态

**验证方式**:
创建测试页面查看输入框样式

**涉及文件**:
- `frontend/src/shared/components/NInput.vue`

---

### Task 2A.3: NCard 组件
**描述**: 实现无阴影卡片组件

**验收标准**:
- 细边框、无阴影
- 可选 padding
- 可选点阵背景

**验证方式**:
创建测试页面查看卡片样式

**涉及文件**:
- `frontend/src/shared/components/NCard.vue`

---

### Task 2A.4: NLabel 组件
**描述**: 实现全大写标签组件

**验收标准**:
- Space Mono 字体
- 全大写
- 3 种尺寸

**验证方式**:
创建测试页面查看标签样式

**涉及文件**:
- `frontend/src/shared/components/NLabel.vue`

---

### Task 2A.5: NBadge 组件
**描述**: 实现状态徽章组件

**验收标准**:
- success/warning/error 三种状态
- 使用语义化颜色

**验证方式**:
创建测试页面查看徽章样式

**涉及文件**:
- `frontend/src/shared/components/NBadge.vue`

---

### Task 2A.6: NAvatar 组件
**描述**: 实现圆形头像组件

**验收标准**:
- 圆形显示
- 支持图片和首字母回退
- 3 种尺寸

**验证方式**:
创建测试页面查看头像样式

**涉及文件**:
- `frontend/src/shared/components/NAvatar.vue`

---

### Task 2A.7: NDotPattern 组件
**描述**: 实现点阵背景装饰组件

**验收标准**:
- SVG 或 CSS 实现
- 可配置透明度
- 可配置颜色

**验证方式**:
创建测试页面查看点阵效果

**涉及文件**:
- `frontend/src/shared/components/NDotPattern.vue`

---

### Task 2A.8: MinimalLayout 组件
**描述**: 实现居中卡片布局（认证页面用）

**验收标准**:
- 内容居中
- 最大宽度 480px
- 响应式边距

**验证方式**:
在路由中测试布局

**涉及文件**:
- `frontend/src/shared/components/MinimalLayout.vue`

---

### Task 2A.9: ImmersiveLayout 组件
**描述**: 实现全屏沉浸式布局（创作页面用）

**验收标准**:
- 全屏显示
- 顶部工具栏
- 无侧边栏

**验证方式**:
在路由中测试布局

**涉及文件**:
- `frontend/src/shared/components/ImmersiveLayout.vue`

---

### Task 2A.10: SidebarLayout 组件
**描述**: 实现侧边栏布局（管理后台用）

**验收标准**:
- 200px 侧边栏
- 可折叠
- 选中状态高亮

**验证方式**:
在路由中测试布局

**涉及文件**:
- `frontend/src/shared/components/SidebarLayout.vue`

---

### Task 2A.11: TopNavLayout 组件
**描述**: 实现顶部导航布局（发布页面用）

**验收标准**:
- 固定顶部导航
- 内容区自适应

**验证方式**:
在路由中测试布局

**涉及文件**:
- `frontend/src/shared/components/TopNavLayout.vue`

---

### Task 2A.12: useAuth Composable
**描述**: 实现认证相关的 composable

**验收标准**:
- 返回 user、isAuthenticated
- 提供 login、logout 方法
- 提供检查认证方法

**验证方式**:
单元测试

**涉及文件**:
- `frontend/src/shared/composables/useAuth.ts`
- `frontend/src/shared/composables/__tests__/useAuth.test.ts`

---

### Task 2A.13: useLoading Composable
**描述**: 实现加载状态的 composable

**验收标准**:
- 提供 loading 状态
- 提供 start、stop 方法

**验证方式**:
单元测试

**涉及文件**:
- `frontend/src/shared/composables/useLoading.ts`

---

### Task 2A.14: useToast Composable
**描述**: 实现消息提示的 composable

**验收标准**:
- 提供 success、error、warning、info 方法
- 集成 Element Plus ElMessage

**验证方式**:
手动测试消息提示

**涉及文件**:
- `frontend/src/shared/composables/useToast.ts`

---

### Task 2A.15: request.ts 工具函数
**描述**: 实现 Axios 封装

**验收标准**:
- 自动注入 Token
- 统一错误处理
- 提供 get、post、put、delete 方法

**验证方式**:
单元测试

**涉及文件**:
- `frontend/src/shared/utils/request.ts`
- `frontend/src/shared/utils/__tests__/request.test.ts`

---

### Task 2A.16: format.ts 工具函数
**描述**: 实现格式化工具函数

**验收标准**:
- formatDate 日期格式化
- formatFileSize 文件大小
- formatNumber 数字格式化

**验证方式**:
单元测试，覆盖率 80%+

**涉及文件**:
- `frontend/src/shared/utils/format.ts`
- `frontend/src/shared/utils/__tests__/format.test.ts`

---

### Task 2A.17: validate.ts 工具函数
**描述**: 实现验证工具函数

**验收标准**:
- validateEmail 邮箱验证
- validatePassword 密码强度
- validateUsername 用户名规则

**验证方式**:
单元测试，覆盖率 80%+

**涉及文件**:
- `frontend/src/shared/utils/validate.ts`
- `frontend/src/shared/utils/__tests__/validate.test.ts`

---

## Phase 2B: Mock 数据

### Task 2B.1: Mock 数据定义 - 用户
**描述**: 创建测试用户数据

**验收标准**:
- 至少 2 个测试用户
- 数据结构与 API 文档一致

**验证方式**:
检查数据结构

**涉及文件**:
- `frontend/mock/data/users.ts`

---

### Task 2B.2: Mock 数据定义 - 素材
**描述**: 创建测试素材数据

**验收标准**:
- 至少 20 条素材数据
- 包含图片、视频、文本类型
- 包含文件夹结构

**验证方式**:
检查数据结构

**涉及文件**:
- `frontend/mock/data/assets.ts`

---

### Task 2B.3: Mock 数据定义 - 作品
**描述**: 创建测试作品数据

**验收标准**:
- 至少 10 条作品数据
- 包含完整的 sections 结构
- 包含版本历史

**验证方式**:
检查数据结构

**涉及文件**:
- `frontend/mock/data/works.ts`

---

### Task 2B.4: Mock 数据定义 - 模版
**描述**: 创建测试模版数据

**验收标准**:
- 3 条系统模版
- 2 条自定义模版
- 不同布局类型

**验证方式**:
检查数据结构

**涉及文件**:
- `frontend/mock/data/templates.ts`

---

### Task 2B.5: Mock 数据定义 - 网页
**描述**: 创建测试发布页面数据

**验收标准**:
- 至少 10 条数据
- 包含不同状态

**验证方式**:
检查数据结构

**涉及文件**:
- `frontend/mock/data/pages.ts`

---

### Task 2B.6: Auth Handlers
**描述**: 创建认证相关的 MSW handlers

**验收标准**:
- 登录接口
- 注册接口
- 刷新 Token 接口
- 获取用户信息接口

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/auth.ts`

---

### Task 2B.7: Assets Handlers
**描述**: 创建素材相关的 MSW handlers

**验收标准**:
- 所有素材接口已实现
- 文件夹接口已实现

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/assets.ts`

---

### Task 2B.8: Works Handlers
**描述**: 创建作品相关的 MSW handlers

**验收标准**:
- 所有作品接口已实现
- 版本管理接口已实现

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/works.ts`

---

### Task 2B.9: Templates Handlers
**描述**: 创建模版相关的 MSW handlers

**验收标准**:
- 所有模版接口已实现

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/templates.ts`

---

### Task 2B.10: Pages Handlers
**描述**: 创建网页相关的 MSW handlers

**验收标准**:
- 所有网页接口已实现
- 包括预览接口

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/pages.ts`

---

### Task 2B.11: Admin Handlers
**描述**: 创建管理后台相关的 MSW handlers

**验收标准**:
- 所有管理接口已实现

**验证方式**:
使用 Postman 或浏览器测试

**涉及文件**:
- `frontend/mock/handlers/admin.ts`

---

### Task 2B.12: MSW 配置完善
**描述**: 完善 MSW 浏览器配置

**验收标准**:
- 所有 handlers 已注册
- 网络延迟已配置
- 错误场景可模拟

**验证方式**:
检查控制台日志

**涉及文件**:
- `frontend/mock/browser.ts`

---

## Phase 3: 认证模块

### Task 3.1: Auth 类型定义
**描述**: 定义认证相关的 TypeScript 类型

**验收标准**:
- User 接口
- AuthResponse 接口
- LoginDto、RegisterDto

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/auth/types/User.ts`
- `frontend/src/features/auth/types/AuthResponse.ts`

---

### Task 3.2: Auth API 封装
**描述**: 创建认证 API 调用封装

**验收标准**:
- login 方法
- register 方法
- refresh 方法
- getMe 方法

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/auth/api/authApi.ts`

---

### Task 3.3: Auth Store
**描述**: 创建认证状态管理

**验收标准**:
- Token 持久化
- 用户信息管理
- login、logout 方法
- isAuthenticated 计算属性

**验证方式**:
手动测试登录登出

**涉及文件**:
- `frontend/src/features/auth/stores/authStore.ts`

---

### Task 3.4: AuthLoginForm 组件
**描述**: 创建登录表单组件

**验收标准**:
- 用户名、密码输入
- 表单验证
- 错误提示
- Loading 状态

**验证方式**:
手动测试登录流程

**涉及文件**:
- `frontend/src/features/auth/components/AuthLoginForm.vue`

---

### Task 3.5: AuthRegisterForm 组件
**描述**: 创建注册表单组件

**验收标准**:
- 用户名、密码、昵称输入
- 表单验证
- 错误提示
- 成功后跳转

**验证方式**:
手动测试注册流程

**涉及文件**:
- `frontend/src/features/auth/components/AuthRegisterForm.vue`

---

### Task 3.6: LoginPage
**描述**: 创建登录页面

**验收标准**:
- 使用 MinimalLayout
- Hero 数字标题
- 全大写标签
- 登录表单

**验证方式**:
访问 /login 路由

**涉及文件**:
- `frontend/src/features/auth/pages/LoginPage.vue`

---

### Task 3.7: RegisterPage
**描述**: 创建注册页面

**验收标准**:
- 使用 MinimalLayout
- 注册表单
- 返回登录链接

**验证方式**:
访问 /register 路由

**涉及文件**:
- `frontend/src/features/auth/pages/RegisterPage.vue`

---

### Task 3.8: 路由守卫配置
**描述**: 配置认证路由守卫

**验收标准**:
- 未登录访问受保护路由重定向
- 已登录访问登录页重定向
- Token 存在性检查

**验证方式**:
手动测试路由跳转

**涉及文件**:
- `frontend/src/router/index.ts`

---

## Phase 4: 素材库模块

### Task 4.1: Asset 类型定义
**描述**: 定义素材相关类型

**验收标准**:
- Asset 接口
- Folder 接口
- AssetType 枚举

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/studio/assets/types/Asset.ts`

---

### Task 4.2: Assets API 封装
**描述**: 创建素材 API 调用

**验收标准**:
- 所有素材接口已封装

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/studio/assets/api/assetsApi.ts`

---

### Task 4.3: Assets Store
**描述**: 创建素材状态管理

**验收标准**:
- 素材列表
- 文件夹列表
- 当前文件夹
- 筛选条件
- CRUD 方法

**验证方式**:
手动测试

**涉及文件**:
- `frontend/src/features/studio/assets/stores/assetsStore.ts`

---

### Task 4.4: AssetCard 组件
**描述**: 创建素材卡片组件

**验收标准**:
- 缩略图展示
- 元数据标签
- 悬停操作按钮
- 不同类型区分展示

**验证方式**:
手动测试组件展示

**涉及文件**:
- `frontend/src/features/studio/assets/components/AssetCard.vue`

---

### Task 4.5: AssetGrid 组件
**描述**: 创建素材网格组件

**验收标准**:
- 响应式布局
- 空状态处理
- Loading 状态

**验证方式**:
手动测试网格展示

**涉及文件**:
- `frontend/src/features/studio/assets/components/AssetGrid.vue`

---

### Task 4.6: FolderTree 组件
**描述**: 创建文件夹树组件

**验收标准**:
- 树形结构
- 展开/折叠
- 选中高亮
- 右键菜单（可选）

**验证方式**:
手动测试文件夹操作

**涉及文件**:
- `frontend/src/features/studio/assets/components/FolderTree.vue`

---

### Task 4.7: UploadDropzone 组件
**描述**: 创建上传拖拽组件

**验收标准**:
- 拖拽上传
- 点击上传
- 进度条
- 文件类型验证

**验证方式**:
手动测试上传功能

**涉及文件**:
- `frontend/src/features/studio/assets/components/UploadDropzone.vue`

---

### Task 4.8: AssetDetailDrawer 组件
**描述**: 创建素材详情抽屉

**验收标准**:
- 从右侧滑出
- 显示详细信息
- 编辑功能
- 删除确认

**验证方式**:
手动测试抽屉

**涉及文件**:
- `frontend/src/features/studio/assets/components/AssetDetailDrawer.vue`

---

### Task 4.9: AssetFilterBar 组件
**描述**: 创建筛选工具栏

**验收标准**:
- 类型筛选
- 关键词搜索
- 排序切换

**验证方式**:
手动测试筛选功能

**涉及文件**:
- `frontend/src/features/studio/assets/components/AssetFilterBar.vue`

---

### Task 4.10: AssetsPage
**描述**: 创建素材库页面

**验收标准**:
- 使用 ImmersiveLayout
- 左侧文件夹树
- 右侧素材网格
- 顶部工具栏

**验证方式**:
访问 /studio/assets 路由

**涉及文件**:
- `frontend/src/features/studio/assets/pages/AssetsPage.vue`

---

## Phase 5: 作品编辑器

### Task 5.1: Work 类型定义
**描述**: 定义作品相关类型

**验收标准**:
- Work 接口
- Section 接口
- SectionType 枚举

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/studio/works/types/Work.ts`

---

### Task 5.2: Works API 封装
**描述**: 创建作品 API 调用

**验收标准**:
- 所有作品接口已封装

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/studio/works/api/worksApi.ts`

---

### Task 5.3: Works Store
**描述**: 创建作品状态管理

**验收标准**:
- 作品列表
- 当前作品
- CRUD 方法
- 版本管理方法

**验证方式**:
手动测试

**涉及文件**:
- `frontend/src/features/studio/works/stores/worksStore.ts`

---

### Task 5.4: WorkCard 组件
**描述**: 创建作品卡片组件

**验收标准**:
- 封面图
- 标题、简介
- 元数据标签
- 操作按钮

**验证方式**:
手动测试组件

**涉及文件**:
- `frontend/src/features/studio/works/components/WorkCard.vue`

---

### Task 5.5: WorksList 组件
**描述**: 创建作品列表组件

**验收标准**:
- 网格布局
- 筛选搜索
- 空状态

**验证方式**:
手动测试列表

**涉及文件**:
- `frontend/src/features/studio/works/components/WorksList.vue`

---

### Task 5.6: SectionItem 组件
**描述**: 创建区块项组件

**验收标准**:
- 显示区块类型
- 预览内容
- 拖拽手柄
- 操作按钮

**验证方式**:
手动测试组件

**涉及文件**:
- `frontend/src/features/studio/works/components/SectionItem.vue`

---

### Task 5.7: SectionList 组件
**描述**: 创建区块列表组件（拖拽排序）

**验收标准**:
- 使用 vuedraggable
- 拖拽排序生效
- 添加区块按钮

**验证方式**:
手动测试拖拽

**涉及文件**:
- `frontend/src/features/studio/works/components/SectionList.vue`

---

### Task 5.8: TextBlockEditor 组件
**描述**: 创建文本块编辑器

**验收标准**:
- 文本输入
- HTML 预览
- 删除确认

**验证方式**:
手动测试编辑

**涉及文件**:
- `frontend/src/features/studio/works/components/TextBlockEditor.vue`

---

### Task 5.9: ImageGalleryEditor 组件
**描述**: 创建图片画廊编辑器

**验收标准**:
- 从素材库选择图片
- 多图片支持
- 图片说明

**验证方式**:
手动测试编辑

**涉及文件**:
- `frontend/src/features/studio/works/components/ImageGalleryEditor.vue`

---

### Task 5.10: VideoPlayerEditor 组件
**描述**: 创建视频播放器编辑器

**验收标准**:
- 从素材库选择视频
- 标题输入

**验证方式**:
手动测试编辑

**涉及文件**:
- `frontend/src/features/studio/works/components/VideoPlayerEditor.vue`

---

### Task 5.11: QuoteEditor 组件
**描述**: 创建引言块编辑器

**验收标准**:
- 文本输入
- 样式预览

**验证方式**:
手动测试编辑

**涉及文件**:
- `frontend/src/features/studio/works/components/QuoteEditor.vue`

---

### Task 5.12: WorkEditor 组件
**描述**: 创建作品编辑器主容器

**验收标准**:
- 基本信息编辑
- 区块列表
- 侧边抽屉布局
- 保存按钮

**验证方式**:
手动测试编辑器

**涉及文件**:
- `frontend/src/features/studio/works/components/WorkEditor.vue`

---

### Task 5.13: VersionHistory 组件
**描述**: 创建版本历史组件

**验收标准**:
- 版本列表
- 回滚确认
- 时间显示

**验证方式**:
手动测试版本操作

**涉及文件**:
- `frontend/src/features/studio/works/components/VersionHistory.vue`

---

### Task 5.14: WorksListPage
**描述**: 创建作品列表页面

**验收标准**:
- 使用 ImmersiveLayout
- 作品网格
- 创建按钮

**验证方式**:
访问 /studio/works 路由

**涉及文件**:
- `frontend/src/features/studio/works/pages/WorksListPage.vue`

---

### Task 5.15: WorkEditorPage
**描述**: 创建作品编辑页面

**验收标准**:
- 加载作品数据
- 编辑器正常工作
- 保存功能

**验证方式**:
访问 /studio/works/:id 路由

**涉及文件**:
- `frontend/src/features/studio/works/pages/WorkEditorPage.vue`

---

## Phase 6: 模版选择

### Task 6.1: Template 类型定义
**描述**: 定义模版相关类型

**验收标准**:
- Template 接口
- LayoutType 枚举

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/publish/templates/types/Template.ts`

---

### Task 6.2: Templates API 封装
**描述**: 创建模版 API 调用

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/publish/templates/api/templatesApi.ts`

---

### Task 6.3: Templates Store
**描述**: 创建模版状态管理

**验证方式**:
手动测试

**涉及文件**:
- `frontend/src/features/publish/templates/stores/templatesStore.ts`

---

### Task 6.4: TemplateCard 组件
**描述**: 创建模版卡片组件

**验收标准**:
- 预览图
- 模版名称
- 预览按钮
- 选择按钮

**验证方式**:
手动测试组件

**涉及文件**:
- `frontend/src/features/publish/templates/components/TemplateCard.vue`

---

### Task 6.5: TemplateGrid 组件
**描述**: 创建模版网格组件

**验收标准**:
- 大图布局
- 分类筛选

**验证方式**:
手动测试网格

**涉及文件**:
- `frontend/src/features/publish/templates/components/TemplateGrid.vue`

---

### Task 6.6: TemplatePreview 组件
**描述**: 创建模版预览模态框

**验收标准**:
- 大图展示
- 选择操作

**验证方式**:
手动测试预览

**涉及文件**:
- `frontend/src/features/publish/templates/components/TemplatePreview.vue`

---

### Task 6.7: TemplatesPage
**描述**: 创建模版选择页面

**验收标准**:
- 使用 TopNavLayout
- 模版网格
- 预览功能

**验证方式**:
访问 /publish/templates 路由

**涉及文件**:
- `frontend/src/features/publish/templates/pages/TemplatesPage.vue`

---

## Phase 7: 网页管理

### Task 7.1: PublishedPage 类型定义
**描述**: 定义发布页面相关类型

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/publish/pages/types/PublishedPage.ts`

---

### Task 7.2: Pages API 封装
**描述**: 创建网页 API 调用

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/publish/pages/api/pagesApi.ts`

---

### Task 7.3: Pages Store
**描述**: 创建网页状态管理

**验证方式**:
手动测试

**涉及文件**:
- `frontend/src/features/publish/pages/stores/pagesStore.ts`

---

### Task 7.4: PageCard 组件
**描述**: 创建网页卡片组件

**验收标准**:
- 缩略图
- 访问量（Hero 数字）
- 状态标签
- 操作按钮

**验证方式**:
手动测试组件

**涉及文件**:
- `frontend/src/features/publish/pages/components/PageCard.vue`

---

### Task 7.5: PagesGrid 组件
**描述**: 创建网页网格组件

**验证方式**:
手动测试网格

**涉及文件**:
- `frontend/src/features/publish/pages/components/PagesGrid.vue`

---

### Task 7.6: PagePreview 组件
**描述**: 创建网页预览组件

**验收标准**:
- iframe 或模拟预览
- 关闭按钮

**验证方式**:
手动测试预览

**涉及文件**:
- `frontend/src/features/publish/pages/components/PagePreview.vue`

---

### Task 7.7: SeoEditor 组件
**描述**: 创建 SEO 编辑器

**验收标准**:
- SEO 标题输入
- SEO 描述输入
- 自定义短链输入

**验证方式**:
手动测试编辑

**涉及文件**:
- `frontend/src/features/publish/pages/components/SeoEditor.vue`

---

### Task 7.8: PagesPage
**描述**: 创建网页管理页面

**验收标准**:
- 使用 TopNavLayout
- 网页网格
- 管理功能

**验证方式**:
访问 /publish/pages 路由

**涉及文件**:
- `frontend/src/features/publish/pages/pages/PagesPage.vue`

---

## Phase 8: 管理后台

### Task 8.1: AdminStats 类型定义
**描述**: 定义统计数据类型

**验证方式**:
TypeScript 编译无错误

**涉及文件**:
- `frontend/src/features/admin/types/AdminStats.ts`

---

### Task 8.2: Admin API 封装
**描述**: 创建管理后台 API 调用

**验证方式**:
使用 MSW 测试

**涉及文件**:
- `frontend/src/features/admin/api/adminApi.ts`

---

### Task 8.3: Admin Store
**描述**: 创建管理后台状态管理

**验证方式**:
手动测试

**涉及文件**:
- `frontend/src/features/admin/stores/adminStore.ts`

---

### Task 8.4: DashboardStats 组件
**描述**: 创建数据统计卡片

**验收标准**:
- 4 个统计卡片
- Hero 数字显示
- 点阵背景装饰

**验证方式**:
手动测试展示

**涉及文件**:
- `frontend/src/features/admin/components/DashboardStats.vue`

---

### Task 8.5: PagesReviewList 组件
**描述**: 创建网页审核列表

**验收标准**:
- 表格布局
- 审核/下架操作
- 状态显示

**验证方式**:
手动测试操作

**涉及文件**:
- `frontend/src/features/admin/components/PagesReviewList.vue`

---

### Task 8.6: TemplatesManageTable 组件
**描述**: 创建模版管理表格

**验收标准**:
- 表格布局
- CRUD 操作
- 状态切换

**验证方式**:
手动测试操作

**涉及文件**:
- `frontend/src/features/admin/components/TemplatesManageTable.vue`

---

### Task 8.7: DashboardPage
**描述**: 创建数据仪表盘页面

**验收标准**:
- 使用 SidebarLayout
- 统计卡片
- 快速入口

**验证方式**:
访问 /admin 路由

**涉及文件**:
- `frontend/src/features/admin/pages/DashboardPage.vue`

---

### Task 8.8: PagesReviewPage
**描述**: 创建网页审核页面

**验证方式**:
访问 /admin/pages/review 路由

**涉及文件**:
- `frontend/src/features/admin/pages/PagesReviewPage.vue`

---

### Task 8.9: TemplatesManagePage
**描述**: 创建模版管理页面

**验证方式**:
访问 /admin/templates 路由

**涉及文件**:
- `frontend/src/features/admin/pages/TemplatesManagePage.vue`

---

## Phase 9: 整合优化

### Task 9.1: MainNavigation 组件
**描述**: 创建主导航组件

**验收标准**:
- Logo 展示
- 导航菜单
- 用户菜单
- 退出登录

**验证方式**:
手动测试导航

**涉及文件**:
- `frontend/src/shared/components/MainNavigation.vue`
- `frontend/src/shared/components/UserMenu.vue`

---

### Task 9.2: 页面过渡动画
**描述**: 配置页面切换动画

**验收标准**:
- 机械感风格
- 流畅过渡
- 无卡顿

**验证方式**:
手动测试路由切换

**涉及文件**:
- `frontend/src/styles/transitions.css`
- `frontend/src/App.vue`

---

### Task 9.3: 全局错误处理
**描述**: 实现全局错误边界和错误处理

**验收标准**:
- API 错误统一处理
- 友好的错误提示
- 错误日志记录

**验证方式**:
手动触发错误

**涉及文件**:
- `frontend/src/shared/utils/request.ts`
- `frontend/src/shared/composables/useToast.ts`

---

### Task 9.4: Loading 状态统一
**描述**: 统一 Loading 状态展示

**验收标准**:
- 全局 Loading
- 局部 Loading
- 骨架屏

**验证方式**:
手动测试加载状态

**涉及文件**:
- `frontend/src/shared/components/Loading.vue`
- `frontend/src/shared/components/Skeleton.vue`

---

### Task 9.5: 空状态页面
**描述**: 创建空状态组件

**验收标准**:
- 友好的空状态提示
- 引导操作

**验证方式**:
手动测试空状态

**涉及文件**:
- `frontend/src/shared/components/EmptyState.vue`

---

### Task 9.6: 性能优化
**描述**: 实施性能优化

**验收标准**:
- 路由懒加载
- 图片懒加载
- 组件按需加载

**验证方式**:
检查网络请求和加载速度

**涉及文件**:
- `frontend/src/router/index.ts`
- `frontend/vite.config.ts`

---

## Phase 10: 验收交付

### Task 10.1: 完整流程测试
**描述**: 测试核心用户流程

**验收标准**:
- 登录→上传素材→创建作品→选择模版→生成网页
- 管理员审核流程

**验证方式**:
手动测试

**涉及文件**:
- 无

---

### Task 10.2: 视觉走查
**描述**: 对照设计系统进行视觉走查

**验收标准**:
- 所有组件符合 Nothing 设计
- CSS 变量正确使用
- 响应式布局正常

**验证方式**:
逐页面检查

**涉及文件**:
- 所有组件和页面

---

### Task 10.3: 代码质量检查
**描述**: 最终代码质量检查

**验收标准**:
- ESLint 通过
- TypeScript 无错误
- 单元测试通过

**验证方式**:
```bash
npm run lint
npm run type-check
npm run test
```

**涉及文件**:
- 所有源文件

---

### Task 10.4: 文档完善
**描述**: 完善项目文档

**验收标准**:
- README.md 更新
- 组件使用示例
- 已知问题记录

**验证方式**:
检查文档完整性

**涉及文件**:
- `frontend/README.md`
- `frontend/docs/`

---

### Task 10.5: 演示准备
**描述**: 准备演示环境和材料

**验收标准**:
- 演示账号可用
- 演示数据完整
- 演示流程顺畅

**验证方式**:
完整演示测试

**涉及文件**:
- `frontend/docs/demo-guide.md`

---

## 任务统计

| Phase | 任务数 | 预计时间 |
|-------|--------|----------|
| 1: 基础设施 | 8 | 2 天 |
| 2A: 共享组件 | 17 | 3 天 |
| 2B: Mock 数据 | 12 | 2 天 |
| 3: 认证模块 | 8 | 2 天 |
| 4: 素材库 | 10 | 3 天 |
| 5: 作品编辑器 | 15 | 3 天 |
| 6: 模版选择 | 7 | 1 天 |
| 7: 网页管理 | 8 | 1 天 |
| 8: 管理后台 | 9 | 2 天 |
| 9: 整合优化 | 6 | 2 天 |
| 10: 验收交付 | 5 | 1 天 |
| **总计** | **105** | **20-22 天** |

---

## 下一步

确认任务清单后，可以开始执行 **Phase 1: Task 1.1**。
