# Phase 3: 认证模块 — UI 设计规范

> 遵循 Nothing Design System
> 亮色模式 | 2026-05-27

> **变更记录**
> - 2026-05-27: 修正 spacing token 映射 (`--spacing-component-sm` 替代 `md` 用于 16px)
> - 2026-05-27: 统一使用 `--color-bg-secondary` 替代未定义的 `--color-bg-elevated`

---

## 目录

- [1. 视觉层级](#1-视觉层级)
- [2. 页面布局](#2-页面布局)
- [3. 组件设计](#3-组件设计)
- [4. 交互状态](#4-交互状态)
- [5. 响应式设计](#5-响应式式计)
- [6. CSS Tokens 映射](#6-css-tokens-映射)

---

## 1. 视觉层级

### 三层架构

| 层级 | 内容 | 字体 | 大小 | 颜色 |
|:----:|------|------|------|------|
| **Primary** | "Portfolio" Hero 标题 | Doto | 72px | `--color-text-display` |
| **Secondary** | "LOGIN" / "REGISTER" 标签、表单标题 | Space Grotesk | 12px / 48px | `--color-text-secondary` / `--color-text-display` |
| **Tertiary** | 输入框标签、链接、错误提示 | Space Mono | 10px | `--color-text-secondary` / `--color-error-text` |

### 层级分布图

```
┌───────────────────────────────────────┐
│                                       │
│           LOGIN               [Logo]  │ ← Tertiary (Label)
│                                       │
│         Portfolio                     │ ← Primary (Hero Title)
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ USERNAME                        │  │ ← Tertiary (Input Label)
│  │ ┌─────────────────────────────┐ │  │
│  │ │                             │ │  │ ← Secondary (Input Field)
│  │ └─────────────────────────────┘ │  │
│  │                                 │  │
│  │ PASSWORD                        │  │
│  │ ┌─────────────────────────────┐ │  │
│  │ │ ••••••••                    │ │  │
│  │ └─────────────────────────────┘ │  │
│  │                                 │  │
│  │ [ERROR] Invalid credentials     │  │ ← Tertiary (Error)
│  │                                 │  │
│  │     [  SIGN IN  ]              │  │ ← Secondary (Button)
│  └─────────────────────────────────┘  │
│                                       │
│            NO ACCOUNT? JOIN           │ ← Tertiary (Link)
│                                       │
└───────────────────────────────────────┘
```

### 设计原则

1. **减法原则**：页面只保留必要元素，无装饰性图形
2. **结构即装饰**：间距、字体大小、颜色构成视觉层次
3. **单色画布**：亮色模式背景，深色文字，红色仅用于错误状态
4. **字体主导**：Doto 仅用于 Hero 标题，Space Mono 用于标签和数据
5. **机械感**：小圆角（4px）、细边框、无阴影

---

## 2. 页面布局

### 2.1 登录页面 (LoginPage)

**布局：** MinimalLayout — 居中卡片，全屏背景

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│                                                                  │
│                         ┌─────────────────┐                     │
│                         │                 │                     │
│                         │    LOGIN        │                     │
│                         │                 │                     │
│                         │   Portfolio     │                     │
│                         │                 │                     │
│                         │  ┌───────────┐  │                     │
│                         │  │ Username  │  │                     │
│                         │  │ [_______] │  │                     │
│                         │  └───────────┘  │                     │
│                         │                 │                     │
│                         │  ┌───────────┐  │                     │
│                         │  │ Password  │  │                     │
│                         │  │ [_______] │  │                     │
│                         │  └───────────┘  │                     │
│                         │                 │                     │
│                         │  [ SIGN IN ]    │                     │
│                         │                 │                     │
│                         │   NO ACCOUNT?   │                     │
│                         │      JOIN       │                     │
│                         │                 │                     │
│                         └─────────────────┘                     │
│                                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**尺寸规范：**

| 元素 | 数值 |
|------|------|
| 容器最大宽度 | 480px |
| 容器内边距 | 48px |
| Hero 标题字号 | 72px |
| 标签字号 | 12px |
| 输入框高度 | 40px |
| 按钮高度 | 48px |
| 元素间距 | 16px (--spacing-component-sm) |

### 2.2 注册页面 (RegisterPage)

**布局：** 与登录页面相同，增加昵称字段

```
┌─────────────────┐
│    REGISTER     │
│                 │
│   Portfolio     │
│                 │
│  ┌───────────┐  │
│  │ Username  │  │
│  │ [_______] │  │
│  └───────────┘  │
│                 │
│  ┌───────────┐  │
│  │ Password  │  │
│  │ [_______] │  │
│  └───────────┘  │
│                 │
│  ┌───────────┐  │
│  │ Nickname  │  │  ← 额外字段
│  │ [_______] │  │
│  └───────────┘  │
│                 │
│  [ CREATE ]     │
│                 │
│  HAVE ACCOUNT?  │
│      SIGN IN    │
└─────────────────┘
```

---

## 3. 组件设计

### 3.1 AuthLoginForm.vue — 登录表单

**Props：**
```typescript
interface Props {
  loading?: boolean
}
```

**Emits：**
```typescript
interface Emits {
  (e: 'submit', data: { username: string; password: string }): void
}
```

**HTML 结构：**
```html
<div class="auth-login-form">
  <!-- Username -->
  <NInput
    v-model="form.username"
    label="USERNAME"
    placeholder="Enter your username"
    :error="errors.username"
    @enter="handleSubmit"
  />

  <!-- Password -->
  <NInput
    v-model="form.password"
    type="password"
    label="PASSWORD"
    placeholder="Enter your password"
    :error="errors.password"
    @enter="handleSubmit"
  />

  <!-- Error Message -->
  <div v-if="errors.form" class="auth-login-form__error">
    [ {{ errors.form }} ]
  </div>

  <!-- Submit Button -->
  <NButton
    type="primary"
    size="lg"
    block
    :loading="loading"
    :disabled="!isValid"
    @click="handleSubmit"
  >
    SIGN IN
  </NButton>
</div>
```

**样式规范：**
```css
.auth-login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-component-sm); /* 16px */
}

.auth-login-form__error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-error-text);
  text-align: center;
  padding: var(--spacing-element-sm);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-sm);
  background: var(--color-error-bg);
}
```

### 3.2 AuthRegisterForm.vue — 注册表单

**额外字段：**
- Nickname (可选)

**验证规则：**
- Username: 3-20 字符，字母数字下划线
- Password: 最少 6 字符
- Nickname: 最多 50 字符

### 3.3 AuthHeader.vue — 认证页面头部

**Props：**
```typescript
interface Props {
  label: string      // "LOGIN" or "REGISTER"
  title: string      // "Portfolio" or "Create Account"
  showLogo?: boolean // 显示 Logo
}
```

**布局：**
```
┌─────────────────────────┐
│  LOGIN           [Logo] │  ← Label (全大写) + 可选 Logo
│                         │
│      Portfolio          │  ← Hero Title (Doto 72px)
└─────────────────────────┘
```

**样式规范：**
```css
.auth-header {
  margin-bottom: var(--spacing-component-lg); /* 24px */
}

.auth-header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-element-sm);
}

.auth-header__label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}

.auth-header__logo {
  width: 24px;
  height: 24px;
  opacity: 0.5;
}

.auth-header__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-2xl); /* 72px */
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}
```

### 3.4 AuthFooter.vue — 认证页面底部

**Props：**
```typescript
interface Props {
  text: string      // "No account?"
  linkText: string  // "Join" / "Sign in"
  linkTo: string    // 目标路由
}
```

**样式规范：**
```css
.auth-footer {
  margin-top: var(--spacing-component-lg);
  text-align: center;
}

.auth-footer__text {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
}

.auth-footer__link {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-primary);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  transition: var(--transition-fast);
}

.auth-footer__link:hover {
  color: var(--color-text-display);
}
```

---

## 4. 交互状态

### 4.1 输入框状态

| 状态 | 边框颜色 | 背景 | 文字颜色 |
|------|----------|------|----------|
| Default | `--color-border-default` | `--color-bg-secondary` | `--color-text-primary` |
| Focus | `--color-border-strong` | `--color-bg-secondary` | `--color-text-display` |
| Error | `--color-error-border` | `--color-error-bg` | `--color-error-text` |
| Disabled | `--color-border-subtle` | `--color-bg-tertiary` | `--color-text-disabled` |

### 4.2 按钮状态

| 状态 | 背景 | 边框 | 文字 |
|------|------|------|------|
| Default | `--color-text-display` | none | `--color-text-inverse` |
| Hover | `--color-text-primary` | none | `--color-text-inverse` |
| Disabled | `--color-bg-secondary` | none | `--color-text-disabled` |
| Loading | `--color-text-display` | none | spinner |

### 4.3 错误提示

**行内错误：**
```
[ERROR: Username is required]
```

**样式：**
```css
.auth-form__inline-error {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-error-text);
}

.auth-form__inline-error::before {
  content: '[ERROR: ';
}

.auth-form__inline-error::after {
  content: ']';
}
```

### 4.4 加载状态

**按钮加载：**
- 显示旋转 spinner
- 按钮禁用
- 文字保持可见

**页面加载：**
- 使用 `[LOADING...]` 文字，非骨架屏
```css
.auth-loading {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  color: var(--color-text-secondary);
  text-align: center;
}

.auth-loading::before,
.auth-loading::after {
  content: '[';
}

.auth-loading::after {
  content: ']';
}
```

---

## 5. 响应式设计

### 5.1 断点

| 断点 | 宽度 | 调整 |
|------|------|------|
| Mobile | < 640px | 容器宽度 100%，内边距 24px |
| Tablet | 640px - 1024px | 容器最大宽度 400px |
| Desktop | > 1024px | 容器最大宽度 480px |

### 5.2 移动端适配

```css
@media (max-width: 640px) {
  .auth-container {
    max-width: 100%;
    padding: var(--spacing-screen-md);
  }

  .auth-header__title {
    font-size: var(--font-size-display-xl); /* 56px */
  }

  .auth-footer {
    margin-top: var(--spacing-component-lg);
  }
}
```

---

## 6. CSS Tokens 映射

### 6.1 颜色

| 用途 | Token | 值 |
|------|-------|-----|
| 页面背景 | `--color-bg-primary` | `#F7F5F2` |
| 卡片背景 | `--color-bg-secondary` | `#FFFFFF` |
| Hero 标题 | `--color-text-display` | `#1A1A1A` |
| 正文 | `--color-text-primary` | `#2D2D2D` |
| 标签 | `--color-text-secondary` | `#6B6B6B` |
| 错误文字 | `--color-error-text` | `#D71921` |
| 边框默认 | `--color-border-default` | `#D1CFC9` |
| 边框强调 | `--color-border-strong` | `#A8A6A0` |

### 6.2 字体

| 用途 | Token | 值 |
|------|-------|-----|
| 主字体 | `--font-family-primary` | `'Space Grotesk', sans-serif` |
| 等宽字体 | `--font-family-mono` | `'Space Mono', monospace` |
| Display 字体 | `--font-family-display` | `'Doto', 'Space Grotesk', sans-serif` |

### 6.3 间距

| 用途 | Token | 值 |
|------|-------|-----|
| 组件内间距 | `--spacing-component-sm` | `16px` |
| 组件间间距 | `--spacing-component-lg` | `24px` |
| 屏幕边距 | `--spacing-screen-lg` | `64px` |

### 6.4 圆角

| 用途 | Token | 值 |
|------|-------|-----|
| 输入框/卡片 | `--radius-sm` | `4px` |
| 按钮（Pill） | `--radius-xl` | `999px` |

---

## 7. 设计决策记录

### 7.1 为什么使用 Doto 作为 Hero 标题字体？

**理由：**
- Doto 是点阵风格字体，最接近 Nothing 的 NDot 57
- 创造视觉焦点，是页面唯一的"惊喜"元素
- 72px 大尺寸确保第一眼吸引力

### 7.2 为什么输入框标签全大写？

**理由：**
- 符合 Nothing 设计的"仪器面板"美学
- Space Mono + 全大写 = 技术感、精确感
- 与输入内容形成对比

### 7.3 为什么错误状态使用红色边框而非红色背景？

**理由：**
- 避免视觉过载
- 红色作为"事件"而非"背景"
- 符合 Nothing 的"一个屏幕一个强调色"原则

### 7.4 为什么按钮是 Pill 形状？

**理由：**
- Primary 按钮使用 Pill (999px 圆角) 是 Nothing 设计标准
- 与 Technical 风格的输入框（4px 圆角）形成对比
- 创造"机械感"与"有机感"的平衡

---

## 8. 实施检查清单

### 组件实现
- [ ] AuthLoginForm.vue
- [ ] AuthRegisterForm.vue
- [ ] AuthHeader.vue
- [ ] AuthFooter.vue

### 页面实现
- [ ] LoginPage.vue (使用 MinimalLayout)
- [ ] RegisterPage.vue (使用 MinimalLayout)

### 样式验证
- [ ] Hero 标题使用 Doto 72px
- [ ] 标签使用 Space Mono 全大写
- [ ] 输入框 4px 圆角
- [ ] 按钮 Pill 形状
- [ ] 错误状态红色边框
- [ ] 无阴影、无渐变
- [ ] 正确使用 CSS 变量

### 交互验证
- [ ] 输入框焦点状态
- [ ] 按钮悬停状态
- [ ] 加载状态显示
- [ ] 错误提示正确
- [ ] 表单验证生效
- [ ] Enter 键提交

---

## 9. 参考资源

- `frontend/src/styles/main.css` — CSS Tokens 定义
- `frontend/src/shared/components/NInput.vue` — 输入框组件
- `frontend/src/shared/components/NButton.vue` — 按钮组件
- `frontend/src/shared/components/MinimalLayout.vue` — 布局组件
- `C:/Users/HP/.claude/skills/nothing-design/references/tokens.md` — Nothing 设计系统完整规范
