# PetCare 前后端联调进度

> 最后更新：2026-06-07  
> 后端项目：`D:\PersonalProject\petcare-server-nextjs`（NestJS + Prisma + PostgreSQL）  
> API 前缀：`http://localhost:3000/api/v1`  
> Swagger：`http://localhost:3000/api/docs`  
> OpenAPI JSON：`http://localhost:3000/api/docs-json`

---

## 总体进度

| 类别 | 数量 | 说明 |
|------|------|------|
| 已联调页面 | 4 | 登录、添加/编辑宠物、宠物列表、我的 |
| 部分联调页面 | 2 | 我的（stats 等仍为 mock）、宠物列表（无删除/详情） |
| 未联调页面 | 10 | 首页、AI、商城、社区等业务页 |
| 前端基建 | 已完成 | request / storage / auth / mapper / types |

---

## 已联调页面

### 1. 登录 — `src/extra/login/index.vue`

| 项目 | 内容 |
|------|------|
| 路由 | `/extra/login/index` |
| 接口 | `POST /auth/wechat/login` |
| 行为 | 微信 `uni.login` 取 code → 换 JWT → 写入本地 storage |
| 限制 | 密码/验证码登录暂未开放（toast 提示） |
| 前置 | 需勾选用户协议 |

### 2. 添加/编辑宠物 — `src/extra/add-pet/index.vue`

| 项目 | 内容 |
|------|------|
| 路由 | `/extra/add-pet/index`（编辑：`?id=<petId>`） |
| 接口 | `GET /pets/:id`、`POST /pets`、`PATCH /pets/:id`、`POST /upload/image` |
| 行为 | 进入页校验登录；编辑模式拉取并回填；保存时先上传头像再创建/更新 |
| 字段映射 | 见下方「字段约定」 |
| 标签 | 个性标签写入 `notes`，顿号拼接（如 `玻璃胃、幼犬期`） |

### 3. 宠物列表 — `src/extra/pet-list/index.vue`

| 项目 | 内容 |
|------|------|
| 路由 | `/extra/pet-list/index` |
| 接口 | `GET /pets` |
| 行为 | `onShow` 拉取列表；编辑跳转 `/extra/add-pet/index?id=xxx` |
| 未做 | 点击卡片详情、删除宠物 |

### 4. 我的 — `src/pages/profile/index.vue`

| 项目 | 内容 |
|------|------|
| 路由 | `/pages/profile/index`（Tab） |
| 接口 | `GET /auth/me`、`GET /pets` |
| 行为 | `onShow` 刷新用户与宠物；未登录显示占位，点头像去登录 |
| 未做 | 获赞/粉丝/关注/发帖 stats（mock）；功能菜单仅 toast |

---

## 部分联调说明

### `pages/profile/index`

- **已接**：用户昵称、头像、宠物横向列表、「管理」「添加宠物」跳转（需登录）
- **仍为 mock**：stats 四项数据；用户 bio 为固定文案（后端无 bio 字段）
- **未接**：订单、预约、收藏、动态等菜单项

### `extra/pet-list/index`

- **已接**：列表展示、添加、编辑
- **未接**：宠物详情页、`DELETE /pets/:id`

---

## 未联调页面

### 主包（Tab / 功能）

| 页面 | 路径 |
|------|------|
| 首页 | `pages/index/index` |
| AI 宠物师 | `pages/ai-pet-advisor/index` |
| 能不能吃 | `pages/food-check/index` |
| 避敏微商城 | `pages/allergy-shop/index` |
| 训宠社区 | `pages/pet-community/index` |
| 训宠课程 | `pages/training-courses/index` |

### extra 分包

| 页面 | 路径 |
|------|------|
| 注册 | `extra/register/index` |
| 找回密码 | `extra/forgot-password/index` |
| 电子病历 | `extra/medical-records/index` |
| 7 日科学换粮 | `extra/food-transition/index` |
| 异常自查与咨询 | `extra/health-check/index` |

---

## 前端基建（已完成）

| 文件 | 作用 |
|------|------|
| `src/config/env.ts` | `API_BASE_URL`、storage key |
| `src/types/api.ts` | User、Pet、ApiResponse 等类型 |
| `src/utils/storage.ts` | token / user 读写 |
| `src/utils/request.ts` | `uni.request` 封装；401 清 auth |
| `src/utils/auth.ts` | `loginWithWechat`、`ensureLoggedIn`、`handleApiError` |
| `src/utils/pet-mapper.ts` | 前后端字段映射、年龄计算、notes ↔ 标签 |
| `src/api/auth.ts` | 微信登录、`GET /auth/me` |
| `src/api/pets.ts` | 宠物 CRUD（含 `deletePet`，页面未用） |
| `src/api/upload.ts` | `uni.uploadFile` 上传图片 |

### 已封装但未在页面使用的 API

- `deletePet` — `DELETE /pets/:id`
- 后端 `PATCH /users/me` — 前端尚未封装

---

## 字段约定（前后端映射）

| 前端 | 后端 API |
|------|----------|
| `dog` / `cat` / `other` | `狗` / `猫` / `其他` |
| `male` / `female` | `公` / `母` |
| 个性标签数组 | `notes`（`、` 拼接） |
| 本地 temp 路径 | `avatarUrl`（经 upload 后 URL） |

统一响应格式：

```json
{ "code": 0, "message": "ok", "data": { ... } }
```

鉴权：`Authorization: Bearer <accessToken>`

---

## 联调链路

```
登录页 ──POST /auth/wechat/login──► JWT
   │
   ▼
我的页 ──GET /auth/me + GET /pets──► 用户 + 宠物概览
   │
   ├── 宠物列表 ──GET /pets──► 列表
   │       └── 编辑 ──GET /pets/:id──► 添加/编辑页
   │
   └── 添加宠物 ──POST /upload/image + POST|PATCH /pets──► 保存
```

---

## 本地联调 checklist

- [ ] 后端已启动：`http://localhost:3000`
- [ ] 前端：`pnpm dev:mp-weixin`
- [ ] 微信开发者工具：**不校验合法域名**
- [ ] 后端已配置微信小程序 AppID / AppSecret
- [ ] 流程：我的 → 登录 → 添加宠物 → 列表/个人中心可见

---

## 建议后续优先级

1. 宠物列表：删除宠物（`DELETE /pets/:id`）
2. 首页：展示当前用户宠物或快捷入口
3. 用户资料：`PATCH /users/me`（昵称、头像）
4. 宠物详情页（若产品需要独立详情，而非仅编辑页）
5. 业务页按产品优先级逐个对接（商城、社区、AI 等）

---

## 备注

- 标签暂无独立表/字段，临时存 `notes`；若需结构化需后端扩展。
- `App.vue` 启动时 token 校验、全局 401 跳转尚未统一处理（401 在 `request.ts` 内会清 token）。
