# next - 下一个任务

## 目标

找到并展示下一个待开发的任务。

## 流程

### 1. 读取 tasks.md

解析任务状态，找到第一个未完成的任务。

### 2. 显示任务

```markdown
## 下一个待开发任务

### Task 5.3: Works Store

**Phase**: 5 - 作品编辑器
**优先级**: 高

**描述**:
创建作品状态管理

**验收标准**:
- 作品列表
- 当前作品
- CRUD 方法
- 版本管理方法

**涉及文件**:
- `frontend/src/features/studio/works/stores/worksStore.ts`

**依赖**:
- Task 5.1: Work 类型定义 ✅
- Task 5.2: Works API 封装 ✅

---

开始这个任务？使用 `/my-impeccable phase 5` 继续
```

### 3. 依赖检查

确认前置任务已完成：
- 如果依赖未完成，提示先完成依赖任务
- 如果依赖已完成，可以直接开始
