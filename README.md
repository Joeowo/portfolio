# Portfolio Platform — Backend API Reference

面向 iOS 客户端开发者的后端接口文档。

---

## 目录

- [环境信息](#环境信息)
- [通用规范](#通用规范)
- [认证机制](#认证机制)
- [错误码列表](#错误码列表)
- [接口列表](#接口列表)
  - [1. 用户认证](#1-用户认证)
  - [2. 用户信息](#2-用户信息)
  - [3. 素材管理](#3-素材管理)
  - [4. 素材文件夹](#4-素材文件夹)
  - [5. 作品管理](#5-作品管理)
  - [6. 页面模版](#6-页面模版)
  - [7. 发布网页](#7-发布网页)
  - [8. 内容抓取](#8-内容抓取)
  - [9. AI 翻译](#9-ai-翻译)
  - [10. 管理后台](#10-管理后台)
- [数据结构说明](#数据结构说明)
- [测试账号](#测试账号)

---

## 环境信息

| 项目 | 值 |
|------|-----|
| 后端地址 | `http://<服务器IP>:8081` |
| 本地开发地址 | `http://localhost:8081` |
| 技术栈 | Spring Boot 3.2.5 / MySQL / Redis / 腾讯云 COS |
| 文件存储 CDN 前缀 | `https://zz-1330824771.cos.ap-beijing.myqcloud.com` |

所有 API 路径均以 `/api` 开头，例如：`http://localhost:8081/api/auth/login`

---

## 通用规范

### 请求格式

- Content-Type：`application/json`（文件上传接口除外，使用 `multipart/form-data`）
- 字符编码：UTF-8

### 统一响应格式

所有接口均返回以下结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": { ... }
}
```

成功时 `code` 为 `200`，失败时为对应错误码。`data` 在无返回值接口中为 `null`。

### 分页响应格式

分页接口的 `data` 字段统一为：

```json
{
  "records": [ ... ],
  "total": 100,
  "size": 20,
  "current": 1,
  "pages": 5
}
```

### 时间格式

所有时间字段为 ISO 8601 格式：`2026-05-21T14:30:00`

---

## 认证机制

采用 JWT Bearer Token 方案。

### 获取 Token

调用 `POST /api/auth/login` 获取 `accessToken` 和 `refreshToken`。

### 携带 Token

在请求 Header 中添加：

```
Authorization: Bearer <accessToken>
```

### Token 有效期

| Token 类型 | 有效期 |
|-----------|--------|
| accessToken | 7200 秒（2 小时） |
| refreshToken | 604800 秒（7 天） |

### 刷新 Token

accessToken 过期后，用 refreshToken 换取新 Token（见 [刷新 Token](#post-apiauthrefresh)），无需重新登录。

### 公开接口（无需 Token）

以下接口无需认证即可访问：

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/templates`
- `GET /api/templates/{id}`
- `GET /api/pages/view/{id}`（直接返回 HTML 页面）

---

## 错误码列表

| code | 含义 |
|------|------|
| 200 | 成功 |
| 400 | 参数错误 |
| 401 | 未登录或 Token 失效 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 1001 | 用户不存在 |
| 1002 | 用户名已被占用 |
| 1003 | 用户名或密码错误 |
| 1004 | Token 已过期 |
| 1005 | Token 无效 |
| 1006 | 账号已被禁用 |
| 5001 | 素材不存在 |
| 5002 | 无权操作此素材 |
| 5003 | 文件夹不存在 |
| 5101 | 作品不存在 |
| 5102 | 无权操作此作品 |
| 5103 | 作品版本不存在 |
| 5201 | 模版不存在 |
| 5301 | 发布网页不存在 |
| 5302 | 短链路径已被占用 |
| 5303 | 无权操作此网页 |
| 5401 | 域名未在授权列表中 |
| 5402 | 内容抓取失败 |
| 5404 | 该域名已添加 |

---

## 接口列表

---

### 1. 用户认证

#### `POST /api/auth/register` — 注册

**无需 Token**

请求体：

```json
{
  "username": "testuser",
  "password": "Test@123456",
  "nickname": "测试用户"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名，唯一 |
| password | string | 是 | 密码 |
| nickname | string | 否 | 昵称 |

响应：`data` 为 `null`，code 200 表示注册成功。

---

#### `POST /api/auth/login` — 登录

**无需 Token**

请求体：

```json
{
  "username": "testuser",
  "password": "Test@123456"
}
```

响应：

```json
{
  "code": 200,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 7200
  }
}
```

---

#### `POST /api/auth/refresh` — 刷新 Token

**无需 Token**

请求体：

```json
{
  "refreshToken": "eyJhbGc..."
}
```

响应同登录，返回新的 `accessToken` 和 `refreshToken`。

---

#### `GET /api/auth/me` — 获取当前登录用户信息

**需要 Token**

响应：

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "username": "testuser",
    "nickname": "测试用户",
    "avatarUrl": "https://...",
    "email": "user@example.com",
    "bio": "个人简介",
    "role": "USER",
    "createdAt": "2026-05-01T10:00:00"
  }
}
```

---

### 2. 用户信息

#### `GET /api/users/{id}` — 获取指定用户公开信息

**无需 Token**

返回结构同 `/api/auth/me`，但仅包含公开字段。

---

#### `PUT /api/users/profile` — 更新个人资料

**需要 Token**

请求体：

```json
{
  "nickname": "新昵称",
  "avatarUrl": "https://...",
  "email": "new@example.com",
  "bio": "新的个人简介"
}
```

所有字段均可选，仅传需要更新的字段。

---

### 3. 素材管理

素材是用户上传或抓取的原始文件（图片、视频、文本），可复用到多个作品中。

#### `POST /api/assets/upload` — 上传文件素材

**需要 Token**，请求格式 `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 上传的文件，最大 500MB |
| folderId | Long | 否 | 目标文件夹 ID |
| tags | String | 否 | 标签，逗号分隔，如 `"风景,摄影"` |

响应：返回 [AssetDto](#assetdto)

---

#### `POST /api/assets/text` — 创建文本素材

**需要 Token**，请求格式 `application/x-www-form-urlencoded` 或参数直接拼接到 URL

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 素材名称 |
| textContent | String | 是 | 文本内容 |
| folderId | Long | 否 | 目标文件夹 ID |
| tags | String | 否 | 标签 |

响应：返回 [AssetDto](#assetdto)

---

#### `GET /api/assets` — 获取素材列表

**需要 Token**

Query 参数：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| folderId | Long | - | 按文件夹筛选 |
| type | String | - | 按类型筛选：`image` / `video` / `text` |
| keyword | String | - | 按名称关键词搜索 |
| sortBy | String | `createdAt` | 排序字段 |
| page | Int | 1 | 页码 |
| size | Int | 20 | 每页数量 |

响应：分页结果，records 为 [AssetDto](#assetdto) 数组

---

#### `GET /api/assets/{id}` — 获取单个素材详情

**需要 Token**

---

#### `PUT /api/assets/{id}` — 更新素材

**需要 Token**

请求体：

```json
{
  "name": "新名称",
  "folderId": 2,
  "tags": "新标签"
}
```

---

#### `DELETE /api/assets/{id}` — 删除素材（软删除）

**需要 Token**

---

### 4. 素材文件夹

#### `GET /api/assets/folders` — 获取文件夹树

**需要 Token**

响应：

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "我的照片",
      "parentId": null,
      "children": [
        { "id": 3, "name": "风景", "parentId": 1, "children": [] }
      ]
    }
  ]
}
```

---

#### `POST /api/assets/folders` — 创建文件夹

**需要 Token**

请求体：

```json
{
  "name": "新文件夹",
  "parentId": null
}
```

`parentId` 为 `null` 时创建根文件夹，传 ID 时创建子文件夹。

---

#### `PUT /api/assets/folders/{id}` — 重命名文件夹

**需要 Token**

请求体：

```json
{
  "name": "新名称"
}
```

---

#### `DELETE /api/assets/folders/{id}` — 删除文件夹

**需要 Token**

---

### 5. 作品管理

作品（Work）是用户创建的内容集合，由若干「区块（Section）」组成，最终可选择模版生成为可分享的网页。

#### `POST /api/portfolio/works` — 创建作品

**需要 Token**

请求体：

```json
{
  "title": "城市之光摄影集",
  "description": "用镜头记录都市生活",
  "coverUrl": "https://zz-1330824771.cos.ap-beijing.myqcloud.com/...",
  "sections": "[{\"type\":\"text_block\",\"order\":1,\"content\":{\"html\":\"<p>作品介绍</p>\"}},{\"type\":\"image_gallery\",\"order\":2,\"content\":{\"images\":[{\"url\":\"https://...\",\"caption\":\"图片说明\"}]}}]",
  "visibility": 0
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 是 | 作品标题 |
| description | String | 否 | 作品简介 |
| coverUrl | String | 否 | 封面图 URL（从素材库取） |
| sections | String | 否 | 区块 JSON 数组（见下方说明） |
| visibility | Int | 否 | `0`=私密（默认），`1`=公开 |

响应：返回 [PortfolioWorkDto](#portfolioworkdto)

---

#### `GET /api/portfolio/works` — 获取作品列表

**需要 Token**

Query 参数：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| keyword | String | - | 标题关键词搜索 |
| sortBy | String | `createdAt` | 排序：`createdAt` / `updatedAt` |
| visibility | Int | - | `0`=私密，`1`=公开 |
| page | Int | 1 | 页码 |
| size | Int | 12 | 每页数量 |

---

#### `GET /api/portfolio/works/{id}` — 获取单个作品详情

**需要 Token**

---

#### `PUT /api/portfolio/works/{id}` — 更新作品

**需要 Token**

请求体同创建作品。每次更新自动保存版本快照。

---

#### `DELETE /api/portfolio/works/{id}` — 删除作品（软删除）

**需要 Token**

---

#### `POST /api/portfolio/works/{id}/duplicate` — 复制作品

**需要 Token**

无请求体，返回复制后的新作品。

---

#### `GET /api/portfolio/works/{id}/versions` — 获取版本历史

**需要 Token**

响应：

```json
{
  "data": [
    {
      "id": 5,
      "workId": 1,
      "version": 3,
      "title": "标题快照",
      "createdAt": "2026-05-20T10:00:00"
    }
  ]
}
```

---

#### `POST /api/portfolio/works/{id}/versions/{ver}/rollback` — 回滚到指定版本

**需要 Token**

`ver` 为版本号（整数）。回滚成功后返回更新后的作品。

---

### 6. 页面模版

模版定义了作品网页的视觉风格（配色、字体、布局）。系统内置 3 套，用户可自定义。

#### `GET /api/templates` — 获取模版列表

**无需 Token**

Query 参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| category | String | 分类筛选 |
| type | String | `system`（系统模版）/ `custom`（用户模版） |
| keyword | String | 关键词搜索 |
| page | Int | 页码（默认 1） |
| size | Int | 每页数量（默认 12） |

响应：records 为 [TemplateDto](#templatedto) 数组

---

#### `GET /api/templates/{id}` — 获取模版详情

**无需 Token**

---

#### `POST /api/templates` — 创建自定义模版

**需要 Token**

请求体：

```json
{
  "name": "我的模版",
  "category": "摄影",
  "layoutType": "single",
  "globalConfig": "{\"colorScheme\":{\"primary\":\"#1E50A0\",\"bg\":\"#FFFFFF\",\"text\":\"#333333\",\"accent\":\"#FF6B6B\"},\"font\":{\"title\":\"Noto Sans SC, sans-serif\",\"body\":\"Inter, sans-serif\"}}",
  "pageStructure": "{}",
  "previewUrl": "https://..."
}
```

`layoutType` 可选值：`single`（单列）、`grid`（网格）、`two_column`（双栏）

---

#### `PUT /api/templates/{id}` — 更新模版

**需要 Token**，只能更新自己创建的模版

---

#### `DELETE /api/templates/{id}` — 删除模版

**需要 Token**，只能删除自己创建的模版

---

### 7. 发布网页

将作品和模版组合，生成静态 HTML 页面上传到 CDN，获得可分享的链接。

#### `POST /api/pages/generate` — 生成并发布网页

**需要 Token**

请求体：

```json
{
  "workId": 1,
  "templateId": 2,
  "pageSlug": "my-portfolio",
  "seoTitle": "陈艺术家作品集",
  "seoDescription": "摄影作品展示"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| workId | Long | 是 | 作品 ID |
| templateId | Long | 是 | 模版 ID |
| pageSlug | String | 否 | 自定义 URL 路径，全局唯一 |
| seoTitle | String | 否 | SEO 标题 |
| seoDescription | String | 否 | SEO 描述 |

响应：返回 [PublishedPageDto](#publishedpagedto)，其中 `pageUrl` 是 COS 上的原始文件地址。

**访问已发布页面建议使用：**

```
GET /api/pages/view/{id}
```

该接口直接返回 HTML（Content-Type: text/html），适合在应用内 WebView 或浏览器中打开。

---

#### `GET /api/pages` — 获取我的已发布网页列表

**需要 Token**

Query 参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| isOnline | Int | `1`=上线，`0`=下线，不传返回全部 |
| sortBy | String | 排序字段（默认 `createdAt`） |
| page | Int | 页码（默认 1） |
| size | Int | 每页数量（默认 12） |

---

#### `GET /api/pages/{id}` — 获取单个发布网页详情

**需要 Token**

---

#### `GET /api/pages/view/{id}` — 直接渲染已发布网页

**无需 Token**，返回 `text/html`

适用于：WebView 加载、浏览器直链、分享。

---

#### `PUT /api/pages/{id}` — 更新 SEO 信息

**需要 Token**

请求体：

```json
{
  "pageSlug": "new-slug",
  "seoTitle": "新标题",
  "seoDescription": "新描述"
}
```

---

#### `POST /api/pages/{id}/regenerate` — 重新生成网页

**需要 Token**

可选请求体：

```json
{
  "templateId": 3
}
```

传 `templateId` 可切换模版重新生成，不传则使用原模版。

---

#### `PUT /api/pages/{id}/status` — 上线/下线

**需要 Token**

请求体：

```json
{
  "isOnline": 1
}
```

`isOnline`: `1`=上线，`0`=下线

---

### 8. 内容抓取

从授权网站抓取文字和图片，导入为素材。

#### `POST /api/crawl/extract` — 抓取网页内容

**需要 Token**

请求体：

```json
{
  "url": "https://example.com/article",
  "autoTranslate": true
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| url | String | 目标网页 URL，域名必须在授权列表中 |
| autoTranslate | Bool | 是否自动翻译英文内容为中文 |

响应：

```json
{
  "data": {
    "url": "https://example.com/article",
    "title": "文章标题",
    "translated": true,
    "items": [
      {
        "type": "text",
        "content": "原文段落内容",
        "translatedContent": "翻译后内容（仅英文内容有）",
        "sourceUrl": "https://example.com/article"
      },
      {
        "type": "image",
        "content": "https://example.com/image.jpg",
        "translatedContent": null,
        "sourceUrl": "https://example.com/article"
      }
    ]
  }
}
```

---

#### `POST /api/crawl/import` — 导入抓取内容为素材

**需要 Token**

请求体：

```json
{
  "items": [
    {
      "type": "text",
      "content": "原文内容",
      "useTranslation": true,
      "translatedContent": "翻译内容",
      "sourceUrl": "https://example.com"
    },
    {
      "type": "image",
      "content": "https://example.com/image.jpg",
      "useTranslation": false,
      "sourceUrl": "https://example.com"
    }
  ]
}
```

响应：返回导入成功的 [AssetDto](#assetdto) 数组

---

#### `GET /api/crawl/sources` — 获取授权源站列表

**需要 Token**

Query 参数：`page`、`size`

返回当前用户添加的源站 + 全局授权源站。

---

#### `POST /api/crawl/sources` — 添加授权源站

**需要 Token**

请求体：

```json
{
  "domain": "example.com",
  "name": "示例站点",
  "description": "可选描述"
}
```

`domain` 填写纯域名（含端口时写 `example.com:8080`），不要加 `http://` 前缀。

---

#### `DELETE /api/crawl/sources/{id}` — 删除授权源站

**需要 Token**，只能删除自己添加的源站

---

#### `GET /api/crawl/logs` — 获取抓取历史

**需要 Token**

Query 参数：`page`、`size`

---

### 9. AI 翻译

基于 DeepSeek 大模型，支持单条/批量文本翻译。

#### `POST /api/translate` — 单条翻译

**需要 Token**

请求体：

```json
{
  "text": "Hello, this is a test.",
  "sourceLang": "en",
  "targetLang": "zh"
}
```

响应：

```json
{
  "data": {
    "original": "Hello, this is a test.",
    "translated": "你好，这是一个测试。"
  }
}
```

---

#### `POST /api/translate/batch` — 批量翻译

**需要 Token**

请求体：

```json
{
  "items": ["Hello world", "Good morning"],
  "targetLang": "zh"
}
```

响应：`data` 为翻译后的字符串数组，顺序与输入一致。

---

### 10. 管理后台

需要角色 `ADMIN` 或 `SUPER_ADMIN`，普通用户调用返回 403。

#### `GET /api/admin/portfolio/dashboard` — 数据概览

响应：

```json
{
  "data": {
    "totalWorks": 42,
    "totalAssets": 318,
    "totalTemplates": 5,
    "totalPages": 27
  }
}
```

---

#### `GET /api/admin/portfolio/pages/review` — 所有已发布网页列表

Query 参数：`page`、`size`

---

#### `PUT /api/admin/portfolio/pages/{id}/review` — 审核/下架网页

请求体：

```json
{
  "action": "takedown"
}
```

`action`: `"takedown"` 下架，其他值上架。

---

#### `GET /api/admin/portfolio/templates` — 管理所有模版

Query 参数：`type`、`page`、`size`

---

#### `POST /api/admin/portfolio/templates` — 创建系统模版

请求体同 `POST /api/templates`，创建后 type 自动设为 `"system"`。

---

#### `PUT /api/admin/portfolio/templates/{id}/status` — 上架/下架模版

请求体：

```json
{
  "status": 1
}
```

---

#### `GET /api/admin/portfolio/crawl/sources` — 查看所有授权源站

---

#### `POST /api/admin/portfolio/crawl/sources` — 添加全局授权源站

请求体同 `POST /api/crawl/sources`，创建后 scope 为 `"global"`，对所有用户生效。

---

## 数据结构说明

### AssetDto

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 素材 ID |
| userId | Long | 所属用户 ID |
| folderId | Long | 所在文件夹 ID |
| name | String | 素材名称 |
| assetType | String | 类型：`image` / `video` / `text` |
| mimeType | String | MIME 类型，如 `image/jpeg` |
| fileUrl | String | 文件访问地址（CDN URL） |
| thumbnailUrl | String | 缩略图 URL |
| fileSize | Long | 文件大小（字节） |
| width | Int | 图片宽度（像素，仅图片有） |
| height | Int | 图片高度（像素，仅图片有） |
| duration | Int | 视频时长（秒，仅视频有） |
| tags | String | 标签，逗号分隔 |
| textContent | String | 文本内容（仅文本素材有） |
| sourceType | String | 来源：`upload` / `crawl` |
| createdAt | DateTime | 创建时间 |

### PortfolioWorkDto

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 作品 ID |
| userId | Long | 创建者 ID |
| authorNickname | String | 创建者昵称 |
| authorAvatarUrl | String | 创建者头像 |
| title | String | 标题 |
| description | String | 简介 |
| coverUrl | String | 封面图 URL |
| sections | String | 区块 JSON 数组（见下） |
| version | Int | 当前版本号 |
| visibility | Int | `0`=私密，`1`=公开 |
| status | Int | `1`=正常，`0`=已删除 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 最后更新时间 |

### sections 字段格式

`sections` 是 JSON 数组字符串，支持以下区块类型：

```json
[
  {
    "type": "text_block",
    "order": 1,
    "content": {
      "html": "<p>这是一段<strong>文字</strong>内容</p>"
    }
  },
  {
    "type": "image_gallery",
    "order": 2,
    "content": {
      "images": [
        { "url": "https://cdn.example.com/photo1.jpg", "caption": "图片说明" },
        { "url": "https://cdn.example.com/photo2.jpg", "caption": "" }
      ]
    }
  },
  {
    "type": "video_player",
    "order": 3,
    "content": {
      "url": "https://cdn.example.com/video.mp4",
      "title": "视频标题"
    }
  },
  {
    "type": "quote",
    "order": 4,
    "content": {
      "text": "一段引言文字"
    }
  }
]
```

| type | 说明 |
|------|------|
| `text_block` | 富文本块，content.html 为 HTML 字符串 |
| `image_gallery` | 图片画廊，content.images 为图片数组 |
| `video_player` | 视频播放器，content.url 为视频地址 |
| `quote` | 引言块，content.text 为文本 |

### TemplateDto

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 模版 ID |
| name | String | 模版名称 |
| category | String | 分类 |
| type | String | `system`=系统内置，`custom`=用户自定义 |
| createdBy | Long | 创建者 ID（系统模版为 null） |
| previewUrl | String | 预览图 URL |
| globalConfig | String | 全局配置 JSON（配色、字体） |
| layoutType | String | 布局：`single` / `grid` / `two_column` |
| status | Int | `1`=可用，`0`=已下架 |

### PublishedPageDto

| 字段 | 类型 | 说明 |
|------|------|------|
| id | Long | 发布页面 ID |
| userId | Long | 所属用户 ID |
| workId | Long | 关联的作品 ID |
| workTitle | String | 作品标题 |
| templateId | Long | 使用的模版 ID |
| templateName | String | 模版名称 |
| pageSlug | String | 自定义短链（可为空） |
| pageUrl | String | COS 原始文件地址 |
| seoTitle | String | SEO 标题 |
| seoDescription | String | SEO 描述 |
| visitCount | Int | 访问量 |
| isOnline | Int | `1`=已上线，`0`=已下线 |
| publishedAt | DateTime | 发布时间 |
| lastRenderedAt | DateTime | 最后渲染时间 |
| createdAt | DateTime | 创建时间 |

---

## 测试账号

| 账号 | 密码 | 角色 | 说明 |
|------|------|------|------|
| `demo` | `Demo@12345` | USER | 普通用户，含测试数据 |
| `chenyanxiang` | *(询问管理员)* | USER | 另一测试用户 |

已有测试数据：
- 3 套系统模版（单列白、深色、网格）
- demo 账号下有 3 个作品、3 个已发布网页

访问已发布网页示例：

```
http://localhost:8081/api/pages/view/1
http://localhost:8081/api/pages/view/2
http://localhost:8081/api/pages/view/3
```
