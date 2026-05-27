# ADR-0004: 使用 MSW 进行 API Mock

## 状态

已采纳 (2026-05-27)

## 上下文

Portfolio Platform 是视觉原型型 Demo（见 ADR-0001），需要模拟后端 API 响应。

Mock 数据方案包括：
1. **静态 JSON 文件** — 数据存在 `mock/data.json`，组件内直接 import
2. **MSW (Mock Service Worker)** — 拦截 HTTP 请求，模拟真实 API
3. **硬编码在组件内** — 数据直接写死在组件 setup() 里

## 决策

**采用 MSW (Mock Service Worker)**。

### 实施方式

```typescript
// mock/handlers.ts
export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: {
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh',
          expiresIn: 7200
        }
      })
    )
  }),
  // ... 其他 handlers
]
```

### 特性

- 拦截 `fetch`/`axios` 请求，无需修改组件代码
- 可模拟网络延迟（`ctx.delay(500)`）
- 支持动态响应（根据请求参数返回不同数据）
- 开发环境启用，生产环境自动禁用

## 理由

| 因素 | 说明 |
|------|------|
| API 结构复用 | 后端 API 已定义，MSW 可直接复用接口结构 |
| 真实交互体验 | 可模拟加载状态、错误处理、重试等 |
- 未来迁移便利 | 对接真实 API 时只需切换 base URL |
| 开发体验 | 组件代码与生产环境一致，无需修改 |

## 后果

### 正面

- Demo 交互更真实
- 后续对接 API 成本低
- 支持复杂场景模拟（分页、筛选、错误）

### 负面

- 需要编写完整的 handlers
- 增加一个开发依赖
- Mock 数据需要与 API 文档同步维护

### 缓解措施

- 按模块组织 handlers，与 features 结构一致
- 使用 TypeScript 类型确保数据结构正确
- 定期与后端 API 文档同步

## 相关决策

- [ADR-0001: Demo 定位为视觉原型型](./0001-demo-visual-prototype.md)
- [ADR-0005: 按功能模块分组的文件结构](./0005-feature-based-structure.md)

## 参考

- [MSW 官方文档](https://mswjs.io/)
