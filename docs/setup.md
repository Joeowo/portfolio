# 项目设置指南 — Portfolio Platform 前端

本文档指导如何从零开始设置 Portfolio Platform 前端项目。

---

## 目录

- [前置要求](#前置要求)
- [项目初始化](#项目初始化)
- [依赖安装](#依赖安装)
- [目录结构创建](#目录结构创建)
- [配置文件设置](#配置文件设置)
- [开发服务器启动](#开发服务器启动)
- [验证检查清单](#验证检查清单)

---

## 前置要求

### 必需软件

| 软件 | 版本要求 | 检查命令 |
|------|----------|----------|
| Node.js | 18.x+ | `node --version` |
| npm | 9.x+ | `npm --version` |
| Git | 最新版 | `git --version` |

### 推荐 IDE

- **VS Code** + 以下扩展：
  - Vue - Official
  - TypeScript Vue Plugin (Volar)
  - ES Lint
  - Stylelint

---

## 项目初始化

### 1. 创建 Vite + Vue 3 项目

```bash
cd E:/Code/portfolio
npm create vite@latest frontend -- --template vue-ts
cd frontend
```

### 2. 安装基础依赖

```bash
# Vue 生态
npm install vue@^3.4.0 vue-router@^4.3.0 pinia@^2.1.0

# UI 组件库
npm install element-plus@^2.7.0 @element-plus/icons-vue

# 图标
npm install @iconify/vue

# 拖拽
npm install vuedraggable@^4.1.0

# HTTP 客户端
npm install axios

# Mock
npm install msw@^2.3.0 -D
```

### 3. 安装开发依赖

```bash
# 代码质量
npm install -D @typescript-eslint/eslint-plugin \
                  @typescript-eslint/parser \
                  eslint \
                  eslint-plugin-vue \
                  prettier \
                  @vue/eslint-config-typescript \
                  @vue/eslint-config-prettier

# Git hooks
npm install -D husky lint-staged
```

---

## 目录结构创建

### 按功能模块分组

```bash
# 创建目录结构
mkdir -p src/features/{auth,studio/{assets,works},publish/{templates,pages},admin}
mkdir -p src/shared/{components,composables,utils,config}
mkdir -p src/{router,stores,styles,types}
mkdir -p public/fonts
mkdir -p mock/handlers
mkdir -p docs/design
```

### 完整目录结构

```
frontend/
├── public/
│   └── fonts/                    # 字体文件（如需本地部署）
├── src/
│   ├── features/                 # 功能模块
│   │   ├── auth/
│   │   │   ├── components/       # AuthLoginForm.vue
│   │   │   ├── api/              # authApi.ts
│   │   │   ├── stores/           # authStore.ts
│   │   │   ├── types/            # User.ts, AuthResponse.ts
│   │   │   └── pages/            # LoginPage.vue
│   │   ├── studio/
│   │   │   ├── assets/           # 素材库模块
│   │   │   └── works/            # 作品编辑器模块
│   │   ├── publish/
│   │   │   ├── templates/        # 模版选择模块
│   │   │   └── pages/            # 网页管理模块
│   │   └── admin/                # 管理后台模块
│   ├── shared/
│   │   ├── components/           # 通用组件
│   │   │   ├── Label.vue         # 全大写标签
│   │   │   ├── Button.vue        # Pill/Technical 按钮
│   │   │   ├── Card.vue          # 无阴影+细边框卡片
│   │   │   ├── Input.vue         # Nothing 原版输入框
│   │   │   └── ...
│   │   ├── composables/          # 通用 composables
│   │   ├── utils/                # 工具函数
│   │   └── config/               # 配置文件
│   ├── router/                   # Vue Router 配置
│   │   ├── index.ts
│   │   └── routes/               # 按模块分组路由
│   ├── stores/                   # Pinia stores（共享）
│   ├── styles/                   # 全局样式
│   │   ├── main.css              # CSS 变量 tokens
│   │   └── reset.css             # 样式重置
│   ├── types/                    # 全局类型定义
│   ├── App.vue
│   └── main.ts
├── mock/
│   ├── handlers/                 # MSW handlers
│   │   ├── auth.ts
│   │   ├── assets.ts
│   │   └── ...
│   └── browser.ts                # MSW 配置
├── docs/
│   └── design/                   # 设计规范文档
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 配置文件设置

### 1. Vite 配置 (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@features': resolve(__dirname, 'src/features'),
      '@shared': resolve(__dirname, 'src/shared'),
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  }
})
```

### 2. TypeScript 配置 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. ESLint 配置 (.eslintrc.cjs)

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

### 4. Google Fonts 加载 (index.html)

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Google Fonts: Space Grotesk + Space Mono + Doto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

    <title>Portfolio Platform</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 5. CSS Tokens (src/styles/main.css)

```css
/* === Nothing Design Tokens === */
@import './reset.css';

:root {
  /* 色彩 - 亮色模式 */
  --color-bg-primary: #F7F5F2;
  --color-bg-secondary: #EBE9E6;
  --color-text-primary: #2D2D2D;
  --color-text-secondary: #6B6B6B;
  --color-border-default: #D1CFC9;

  /* 字体 */
  --font-family-base: 'Space Grotesk', sans-serif;
  --font-family-mono: 'Space Mono', monospace;
  --font-family-display: 'Doto', 'Space Grotesk', sans-serif;

  /* 间距 - 4px 基数 */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-8: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-pill: 999px;

  /* 更多 tokens 见 docs/design-tokens.md */
}

body {
  font-family: var(--font-family-base);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}
```

---

## 开发服务器启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

默认访问地址：`http://localhost:5173`

---

## MSW 初始化

### 1. 生成 Service Worker

```bash
npx msw init public/ --save
```

### 2. 创建 Mock 配置 (mock/browser.ts)

```typescript
import { setupWorker, rest } from 'msw'
import { authHandlers } from './handlers/auth'
import { assetHandlers } from './handlers/assets'

const worker = setupWorker(
  ...authHandlers,
  ...assetHandlers
  // ... 更多 handlers
)

worker.start({
  onUnhandledRequest: 'bypass'
})

export default worker
```

### 3. 在 main.ts 中引入

```typescript
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 仅开发环境启用 MSW
if (import.meta.env.DEV) {
  import('./mock/browser')
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

---

## 验证检查清单

完成设置后，验证以下项目：

- [ ] `npm run dev` 启动成功，无报错
- [ ] 浏览器访问 `http://localhost:5173` 显示 Vue 欢迎页
- [ ] Google Fonts 加载成功（DevTools Network 面板检查）
- [ ] CSS 变量生效（DevTools 检查 `:root`）
- [ ] TypeScript 无类型错误
- [ ] ESLint 配置生效（编辑器显示警告）
- [ ] MSW worker 启动成功（控制台显示 `[MSW] Mocking enabled`）
- [ ] 路径别名 `@` 可用（import `@/App.vue` 无报错）

---

## 常见问题

### MSW Service Worker 报错

```bash
# 重新初始化
npx msw init public/ --save
```

### 路径别名不生效

检查 `vite.config.ts` 和 `tsconfig.json` 的 `paths` 配置是否一致。

### 字体加载失败

确认网络可访问 `fonts.googleapis.com`，或下载字体到 `public/fonts/` 本地引用。

---

## 下一步

设置完成后，参考以下文档开始开发：

- `docs/design-tokens.md` — 设计系统完整规范
- `CONTEXT.md` — 领域术语和概念
- `docs/adr/` — 架构决策记录

**推荐开发顺序**（见 ADR-0003）：
1. 认证模块（登录页）
2. 素材库模块
3. 作品编辑器模块
4. 模版选择模块
5. 网页管理模块
6. 管理后台模块
