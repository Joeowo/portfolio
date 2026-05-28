# verify - 验收检查

## 目标

对照 tasks.md 的验收标准，检查完成的任务。

## 检查清单

### 功能完整性

- [ ] 所有验收标准已满足
- [ ] 所有涉及文件已创建/修改
- [ ] 组件功能按设计文档实现

### 代码质量

- [ ] TypeScript 编译无错误
```bash
npm run type-check
```

- [ ] ESLint 检查通过
```bash
npm run lint
```

- [ ] 无 `any` 类型
- [ ] 无 `@ts-ignore` 注释

### 设计规范

- [ ] 使用 CSS 变量，无硬编码颜色
- [ ] 组件命名带模块前缀
- [ ] 遵循 BEM 命名规范
- [ ] 符合 Nothing Design System

### 视觉质量

- [ ] 机械感风格（小圆角、细边框、无阴影）
- [ ] 字体正确使用（Space Grotesk / Space Mono / Doto）
- [ ] 全大写标签样式正确
- [ ] 响应式布局正常

## 验证命令

```bash
# 类型检查
npm run type-check

# ESLint
npm run lint

# 开发服务器测试
npm run dev
```

## 报告格式

```markdown
## 验收报告 - Phase N

### 任务完成度
- ✅ Task N.1: xxx
- ✅ Task N.2: xxx
- ⬜ Task N.3: xxx (待完成)

### 代码质量
- TypeScript: ✅ 无错误
- ESLint: ✅ 通过
- 测试: ⬜ 待运行

### 设计符合度
- CSS 变量: ✅
- 组件命名: ✅
- BEM 规范: ✅
- Nothing 风格: ✅

### 待修复问题
1. xxx
2. xxx
```
