# ADR-0005: 按功能模块分组的文件结构

## 状态

已采纳 (2026-05-27)

## 上下文

Portfolio Platform 有 6 个模块，需要清晰的代码组织。

常见文件结构包括：
1. **按技术角色分组** — `components/`, `views/`, `stores/`, `api/`...
2. **按功能模块分组** — 每个模块一个文件夹，内部包含组件、状态、类型
3. **混合结构** — 页面级按模块，共享资源按角色

## 决策

**采用按功能模块分组**（Feature-Based Structure）。

### 目录结构

```
src/
├── features/
│   ├── auth/           # 认证模块
│   │   ├── components/ # 模块专用组件
│   │   ├── api/        # API 调用
│   │   ├── stores/     # Pinia stores
│   │   ├── types/      # TypeScript 类型
│   │   └── pages/      # 页面组件
│   │
│   ├── studio/
│   │   ├── assets/     # 素材库
│   │   └── works/      # 作品编辑器
│   │
│   ├── publish/
│   │   ├── templates/  # 模版选择
│   │   └── pages/      # 网页管理
│   │
│   └── admin/          # 管理后台
│
├── shared/             # 共享资源
│   ├── components/     # 通用组件（Button, Card, Input...）
│   ├── composables/    # 通用 composables
│   ├── utils/          # 工具函数
│   └── config/         # 配置文件
│
├── router/             # Vue Router 配置
├── mock/               # MSW handlers
└── styles/             # 全局样式、CSS 变量
```

### 命名规范

- 组件：PascalCase + 模块前缀（`AuthLoginForm.vue`, `StudioAssetGrid.vue`）
- Stores：kebab-case（`auth-store.ts`, `assets-store.ts`）
- 类型：PascalCase（`User`, `Asset`, `PortfolioWork`）

## 理由

| 因素 | 说明 |
|------|------|
| 模块独立性 | 6 个模块相对独立，可单独拆分或复用 |
| 开发效率 | 相关代码集中，减少跨目录跳转 |
| 维护清晰 | 修改一个模块时，影响范围明确 |
| 系统感 | 符合 Nothing "精密系统感" — 每个模块是自包含的机械单元 |

## 后果

### 正面

- 模块边界清晰
- 新人更容易理解代码结构
- 便于模块级重构或提取

### 负面

- 共享组件需要决定归属（是 shared 还是某个 features）
- 跨模块复用可能需要调整
- 目录层级较深

### 缓解措施

- 明确 `shared/` 的边界：只放真正通用的组件
- 跨模块复用通过 composables 或事件总线
- 使用 IDE 文件跳转功能缓解层级深度

## 相关决策

- [ADR-0002: Nothing 设计系统采用](./0002-nothing-design-system.md)
- [ADR-0003: 混合布局策略](./0003-hybrid-layout.md)
- [ADR-0004: 使用 MSW 进行 API Mock](./0004-msw-mocking.md)

## 参考

- [Feature-Sliced Design](https://feature-sliced.design/) — 类似的模块化架构方法论
