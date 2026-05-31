# 产品图包标准流程（7 张 · 每 SKU 必做）

> **硬规则**：每款上架前必须完成本图包。未完成 → 不进 `CURATED_PRODUCT_SLUGS`、不 `is_active=true`。  
> 参考样板：`src/assets/images/products/black-double-breasted-chain-blazer-6754/`  
> 模特 prompt：`docs/ai_model_prompts.md` · 自动化总览：`docs/product_automation_pipelines.md`

---

## 0) 分工原则（2026-05 修订 — 与代码一致）

| 图层 | 来源 | 用途 |
|------|------|------|
| **品牌图包 01–07** | `src/assets/images/products/{slug}/`（P 图 / AI / 棚拍） | **前台 PDP、列表、购物车缩略图** — 唯一对用户可见的商品图 |
| **供应商真图 URL** | CJ / 1688，写入 Supabase `image_url` / `images[]` | **仅内部**：对货、履约、重新生成品牌图时的参考，**不在前台展示** |

**硬规则**：策展 capsule SKU（`storefrontCapsule.ts`）若本地没有 01–07，前台**宁可空白也不显示** CJ/1688 原图（避免风格不统一）。  
生成方式：`npm run brand-stylize-cj`（调色）或 Krea/Gemini（按 `ai_model_prompts.md` 重做棚拍）。

---

## 1) 标准 7 张清单

每 SKU 在 `src/assets/images/products/{slug}/` 下必须有：

| 文件 | 类型 | 说明 |
|------|------|------|
| `07-model-cover-front.png` | **封面首图** | Model B 全身/四分之三，链饰/廓形可见 |
| `01-flatlay-white.png` | 白底平铺 | 结构真源；后续细节图都引用它 |
| `02-detail-{feature}.png` | 细节 1 | **Hero 卖点**（链饰、腰头、肩线等） |
| `03-detail-{feature}.png` | 细节 2 | 袖口 / 扣具 / 拉链 |
| `04-detail-{feature}.png` | 细节 3 | 门襟 / 翻领 / 主扣 |
| `05-detail-{feature}.png` | 细节 4 | 口袋 / 缝线 / 版型 |
| `06-detail-{feature}.png` | 细节 5 | 里布 / 领标（**供应商标须打码或换 1688 原图**） |

`{feature}` 按品类替换，例如 `chain`、`cuff-buttons`、`lapel-buttons`。

可选扩展（不替代 7 张）：
- `08-model-tiktok-9x16.png` — Reels / TikTok 竖版
- `09-back-flatlay-white.png` — 背面平铺

---

## 2) 执行顺序（固定）

```text
Step 1  供应商图入库（CJ backfill 或 1688 backfill）
Step 2  生成或确认 01-flatlay-white.png（白底平铺 = 全图包真源）
Step 3  按卖点选 5 个细节位 → 02–06（macro · 纯白底 · 无模特）
Step 4  Model B 封面 07（参考：01 + model-b-style-switcher.png）
Step 5  写本目录 README.md（slug、顺序、regenerate 备注）
Step 6  跑校验：npm run check:product-images -- {slug}
Step 7  人工 Approve → 才允许上架
```

---

## 3) Agent / Cursor 一键指令（复制即用）

```text
为 SKU {slug} 做标准 7 张图包：
1. 供应商图已在 supplierImages / Supabase
2. 白底平铺：{已有路径 或 从 1688/CJ 主图生成}
3. 细节 5 张：按 hero 卖点 {链饰/腰头/…}，macro 白底
4. 封面：Model B，{搭配建议，如 wide-leg black trouser}
5. 输出到 src/assets/images/products/{slug}/（必须 commit + deploy）
6. 写 README + 跑 check:product-images
7. Supabase 可写 CJ URL 对货，但前台只读本地 01–07，不会展示供应商 URL。
```

---

## 4) 细节位怎么选（按品类）

| 品类 | 细节 1 | 细节 2 | 细节 3 | 细节 4 | 细节 5 |
|------|--------|--------|--------|--------|--------|
| Blazer / 外套 | 链饰/胸袋 | 袖口扣 | 双排扣+翻领 | 腰袋盖 | 领标/里布 |
| 裤装 | 腰头+扣 | 侧缝/褶 | 口袋 | 裤脚 | 面料 macro |
| 风衣 | 腰带/扣 | 肩章/肩线 | 门襟 | 袖口 | 里布 |

原则：**先写 1 句 hero 卖点**，再映射到 5 个 macro 位。

---

## 5) Prompt 要点

### 白底平铺（01）
- 纯 `#FFFFFF` 背景，无阴影道具
-  garment 与供应商图结构一致（扣数、口袋、颜色）

### 细节（02–06）
- Reference：`01-flatlay-white.png`
- `E-commerce macro, pure white background, no model, photorealistic, 4:5`
- 领标位：若出现供应商品牌字，**必须**后期打码或换 1688 实拍

### 封面（07）
- Reference：`01-flatlay-white.png` + `src/assets/images/models/model-b-style-switcher.png`
- 用 `ai_model_prompts.md` Model B 块 + 统一 negative prompt
- 背景：muted grey concrete 或 `#F0EDE6` 暖灰 studio
- 搭配：同系列下装（宽腿西裤 / cargo），禁 cute / girly

---

## 6) 上架闸门（G4 图片）

| 检查项 | 通过标准 |
|--------|----------|
| 文件夹 | `src/assets/images/products/{slug}/` 存在 |
| 7 文件 | 01–07 齐全 |
| README | 含 slug、顺序、用途说明 |
| 校验脚本 | `npm run check:product-images -- {slug}` exit 0 |
| 人工 | 封面构图 + 细节与实物一致 |
| PDP | 仅本地 `01–07`；Supabase `images[]` 可有 CJ URL（后台用，用户看不见） |

未过 G4 → 保持 `is_active=false`。

---

## 7) 与 Supabase / 代码的关系

- 前台逻辑：`src/lib/productAssets.ts` — 有本地 01–07 则用品牌图；capsule SKU **禁止**回退到 `image_url` / CJ gallery
- Supabase `images[]`：可存 CJ URL 供对货；**不要**指望它出现在 PDP
- **不要**把品牌图 URL 写进 Supabase（除非未来接 CDN）；品牌图走 git 资产 + Vite 打包
- Hero / Lookbook 引用本地 `07-model-cover-front.png` 或 **campaign editorial**（`src/assets/images/models/README.md`）
- 1688 回填脚本：`scripts/backfill-1688-images.mjs`
- CJ 回填：见 `supabase/cj_backfill_images.sql`

---

## 8) 产出物（每次上架必须有）

- [ ] `src/assets/images/products/{slug}/` 七张图
- [ ] 同目录 `README.md`
- [ ] `npm run check:product-images -- {slug}` 通过
- [ ] 运营 Approve 截图或 Notion 勾选
- [ ] 供应商图 migration / backfill 已跑
- [ ] `productCopy.ts` + `CURATED_PRODUCT_SLUGS` 已更新

---

## 9) 关联文档

| 文档 | 用途 |
|------|------|
| `ai_model_prompts.md` | Model A/B/C + negative prompt |
| `product_automation_pipelines.md` | 双通道上架总流水线 |
| `upload_workflow_cj.md` | CJ 手工上货字段 |
| `hybrid_catalog_strategy.md` | Tier1/2/3 货源策略 |
| `ops_checklist.md` | 日常 / 上架总清单 |
