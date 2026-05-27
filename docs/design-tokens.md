# Design Tokens — Portfolio Platform 前端

本文档定义 Nothing 风格设计系统的全部设计 tokens（CSS 变量）。

---

## 目录

- [色彩系统](#色彩系统)
- [字体系统](#字体系统)
- [间距系统](#间距系统)
- [圆角系统](#圆角系统)
- [尺寸系统](#尺寸系统)
- [阴影系统](#阴影系统)
- [动画系统](#动画系统)
- [Z-Index 层级](#z-index-层级)

---

## 色彩系统

### 亮色模式（默认）

```css
/* === 基础色彩 === */

/* 背景 - Canvas */
--color-bg-primary: #F7F5F2;        /* 温暖米白色，主背景 */
--color-bg-secondary: #EBE9E6;      /* 次级背景，卡片/容器 */
--color-bg-tertiary: #E5E3E0;       /* 三级背景，输入框/禁用状态 */

/* 文字 - Text */
--color-text-display: #1A1A1A;      /* 100% - Hero 数字/标题 */
--color-text-primary: #2D2D2D;      /* 90% - 正文内容 */
--color-text-secondary: #6B6B6B;    /* 60% - 标签/元数据 */
--color-text-disabled: #9B9B9B;     /* 40% - 禁用/占位符 */

/* 边框 - Border */
--color-border-default: #D1CFC9;    /* 默认边框 */
--color-border-strong: #A8A6A0;     /* 强边框 */
--color-border-subtle: #E5E3E0;     /* 弱边框/分割线 */

/* === 状态色彩（仅用于数据值编码）=== */

/* 成功 */
--color-success-text: #2E7D32;
--color-success-bg: rgba(46, 125, 50, 0.1);
--color-success-border: #4CAF50;

/* 警告 */
--color-warning-text: #F57C00;
--color-warning-bg: rgba(245, 124, 0, 0.1);
--color-warning-border: #FF9800;

/* 错误 / 危险 */
--color-error-text: #D71921;        /* Nothing 红 - interrupt */
--color-error-bg: rgba(215, 25, 33, 0.1);
--color-error-border: #EF5350;

/* === 点阵背景 === */
--color-dot-pattern: #D1CFC9;       /* 点阵颜色 */
```

### 暗色模式（预留）

```css
[data-theme="dark"] {
  --color-bg-primary: #000000;      /* OLED 黑 */
  --color-bg-secondary: #1A1A1A;
  --color-bg-tertiary: #2D2D2D;

  --color-text-display: #FFFFFF;
  --color-text-primary: #E5E3E0;
  --color-text-secondary: #9B9B9B;
  --color-text-disabled: #6B6B6B;

  --color-border-default: #3D3D3D;
  --color-border-strong: #5D5D5D;
  --color-border-subtle: #2D2D2D;
}
```

---

## 字体系统

### 字体家族

```css
/* === Google Fonts 加载 === */
/* Space Grotesk + Space Mono + Doto */

/* 主字体 */
--font-family-base: 'Space Grotesk', -apple-system, sans-serif;

/* 等宽字体（标签、元数据） */
--font-family-mono: 'Space Mono', 'Consolas', 'Monaco', monospace;

/* 显示字体（Hero 时刻） */
--font-family-display: 'Doto', 'Space Grotesk', sans-serif;
```

### 字体大小（Type Scale）

```css
/* === Space Grotesk === */

/* Display - Hero 时刻 */
--font-size-display-3xl: 96px;      /* 超大 Hero 数字 */
--font-size-display-2xl: 72px;      /* 大 Hero 数字 */
--font-size-display-xl: 56px;       /* Hero 数字 */
--font-size-display-lg: 48px;       /* 大标题 */

/* Headings */
--font-size-h1: 40px;
--font-size-h2: 32px;
--font-size-h3: 24px;
--font-size-h4: 20px;

/* Body */
--font-size-body-xl: 18px;
--font-size-body-lg: 16px;          /* 默认正文 */
--font-size-body-md: 14px;
--font-size-body-sm: 12px;

/* === Space Mono === */

/* Labels - 全大写标签 */
--font-size-label-lg: 12px;
--font-size-label-md: 10px;
--font-size-label-sm: 8px;

/* === 行高 === */
--line-height-tight: 1.1;           /* 标题 */
--line-height-normal: 1.5;          /* 正文 */
--line-height-relaxed: 1.8;         /* 阅读文本 */
```

### 字重

```css
--font-weight-light: 300;
--font-weight-regular: 400;         /* 默认 */
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 字间距

```css
--letter-spacing-tight: -0.02em;    /* 大标题 */
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em;      /* 全大写文字 */
--letter-spacing-wider: 0.1em;      /* 小号文字 */
```

---

## 间距系统

### 4px 基数 Scale

```css
--spacing-0: 0;
--spacing-1: 4px;                   /* 最小间距 */
--spacing-2: 8px;                   /* 紧密 - icon + label */
--spacing-3: 12px;
--spacing-4: 16px;                  /* 中等 - 列表项、表单字段 */
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;                  /* 宽 - section break */
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;                 /* 巨大 - major division */
--spacing-20: 80px;
--spacing-24: 96px;                 /* vast - new context */
```

### 语义间距

```css
/* 元素内间距 */
--spacing-element-xs: var(--spacing-1);   /* 4px - 紧密元素 */
--spacing-element-sm: var(--spacing-2);   /* 8px - 小元素 */
--spacing-element-md: var(--spacing-4);   /* 16px - 中等元素 */
--spacing-element-lg: var(--spacing-6);   /* 24px - 大元素 */

/* 组件间距 */
--spacing-component-sm: var(--spacing-4);  /* 16px - 同组不同项 */
--spacing-component-md: var(--spacing-8);  /* 32px - 组件间 */
--spacing-component-lg: var(--spacing-12); /* 48px - section 间 */

/* 屏幕边距 */
--spacing-screen-sm: var(--spacing-6);     /* 24px - 小边距 */
--spacing-screen-md: var(--spacing-12);    /* 48px - 中边距 */
--spacing-screen-lg: var(--spacing-16);    /* 64px - 大边距 */
```

---

## 圆角系统

```css
/* === 三级圆角系统 === */

/* Technical - 方形/机械感 */
--radius-none: 0;
--radius-sm: 4px;                  /* 默认 - 卡片、输入框、次要按钮 */
--radius-md: 8px;                  /* 中等圆角 */

/* Pill - 完全圆角 */
--radius-pill: 999px;              /* 主要按钮 */

/* 特殊 */
--radius-circle: 50%;              /* 圆形（状态点、头像） */
```

### 组件圆角映射

| 组件 | 圆角值 |
|------|--------|
| Card | `var(--radius-sm)` |
| Button (Primary) | `var(--radius-pill)` |
| Button (Secondary) | `var(--radius-sm)` |
| Input | `var(--radius-sm)` |
| Checkbox | `var(--radius-sm)` |
| Status Dot | `var(--radius-circle)` |
| Avatar | `var(--radius-circle)` |

---

## 尺寸系统

### 组件高度

```css
/* === 表单控件 === */
--height-input-sm: 32px;
--height-input-md: 40px;           /* 默认 */
--height-input-lg: 48px;

/* === 按钮 === */
--height-button-sm: 32px;
--height-button-md: 40px;           /* 默认 */
--height-button-lg: 48px;

/* === 导航 === */
--height-navbar: 56px;
--height-sidebar-item: 40px;

/* === 头像 === */
--height-avatar-xs: 24px;
--height-avatar-sm: 32px;
--height-avatar-md: 40px;
--height-avatar-lg: 56px;
--height-avatar-xl: 72px;
```

### 图标尺寸

```css
--icon-size-xs: 12px;
--icon-size-sm: 16px;
--icon-size-md: 20px;              /* 默认 */
--icon-size-lg: 24px;
--icon-size-xl: 32px;
--icon-size-2xl: 48px;
```

---

## 阴影系统

**Nothing 原则：无阴影、无模糊**

```css
/* === 实际上不使用阴影 === */
/* 如需深度感，使用边框或背景色差 */

/* 预留（仅用于特殊情况） */
--shadow-none: none;
--shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.05);  /* 极淡 */
```

---

## 动画系统

### 缓动函数（Easing）

```css
/* 机械感 - 无 bounce */
--ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* 线性（机械运动） */
--ease-linear: linear;
```

### 持续时间

```css
--duration-instant: 100ms;         /* 瞬时反馈 */
--duration-fast: 150ms;            /* 快速过渡 */
--duration-normal: 200ms;          /* 默认过渡 */
--duration-slow: 300ms;            /* 慢速过渡 */
--duration-slower: 500ms;          /* 页面切换 */
```

### Vue Transition 配置

```javascript
// 机械感过渡
const nothingTransition = {
  enterActiveClass: 'transition-all duration-200 ease-out-cubic',
  leaveActiveClass: 'transition-all duration-150 ease-out-cubic'
}
```

---

## Z-Index 层级

```css
/* === Z-Index Scale === */
--z-base: 0;
--z-raised: 10;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;

/* === 语义化 Z-Index === */
--z-header: var(--z-sticky);        /* 顶部导航 */
--z-sidebar: var(--z-raised);       /* 侧边栏 */
--z-drawer: var(--z-modal);         /* 侧边抽屉 */
--z-status-bar: var(--z-fixed);     /* 顶部状态栏 */
```

---

## 点阵背景（Dot Pattern）

### CSS 定义

```css
.dot-pattern {
  background-image: radial-gradient(
    var(--color-dot-pattern) 1px,
    transparent 1px
  );
  background-size: 24px 24px;       /* 点间距 */
  background-position: -1px -1px;   /* 对齐网格 */
}
```

### 点阵 SVG 遮罩（用于文字）

```css
.dot-matrix-text {
  /* 点阵文字效果 - 用 SVG mask 实现 */
  mask-image: url("data:image/svg+xml,...");
  -webkit-mask-image: url("data:image/svg+xml,...");
}
```

---

## 使用示例

### CSS 变量引用

```css
.my-component {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: var(--spacing-element-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-body-lg);
  color: var(--color-text-primary);
}
```

### 全大写标签

```css
.label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-label-md);
  font-weight: var(--font-weight-regular);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
}
```

### Hero 数字

```css
.hero-number {
  font-family: var(--font-family-display);
  font-size: var(--font-size-display-3xl);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-display);
  line-height: var(--line-height-tight);
}
```

---

## 相关文档

- `CONTEXT.md` — 领域上下文
- `docs/adr/0002-nothing-design-system.md` — Nothing 设计系统采用决策
- `skills/nothing-design/` — Nothing 设计系统完整规范
