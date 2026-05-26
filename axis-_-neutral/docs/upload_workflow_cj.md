# AXIS / NEUTRAL 上货流程（CJ + Supabase）

> 适用：你负责拍板选品，我负责批量整理并上架。  
> 目标：从“选货”到“可售”1天内完成首批 10-20 款。  
> **双通道自动化蓝图**：见 [`product_automation_pipelines.md`](./product_automation_pipelines.md)（自动找品 / URL 抓取 · 品牌文案 · SEO · 模特图）。  
> **混合货源（1688 预购 + CJ 现货）**：见 [`hybrid_catalog_strategy.md`](./hybrid_catalog_strategy.md)。

## 1) 你提供（最少信息）

每款给我以下字段：

- CJ 商品链接 / `cj_product_id`
- 变体 `vid`（要卖的颜色尺码）
- 成本价（人民币或美金）
- 预计物流方式（如 `CJPacket`）
- 目标售价（AUD，或者给我毛利目标我来算）

## 2) 我来做（可代做）

- 生成商品名（符合 AXIS / NEUTRAL 语气）
- 生成 PDP 描述 / story / details
- 生成尺码字段（`sizes`）与分类字段（`category`）
- 统一 slug 命名
- 处理图片（裁切比例、压缩、首图选择、简单质感统一）
- 写入 Supabase `products` 表

## 3) 必填数据库字段（products）

- `slug`
- `name`
- `price_aud`
- `category`
- `collection_slug`
- `description`
- `story`
- `details` (jsonb array)
- `sizes` (jsonb array)
- `cj_product_id`
- `cj_variant_id`
- `logistic_name`
- `from_country_code`

## 4) 最快上线方式（推荐）

1. 先上 10 款（而不是一次 50 款）  
2. 每款至少 3 张图（首图/细节/上身）  
3. 售价先按“毛利安全线”定价  
4. 先跑 3-7 天数据再扩品

## 5) 毛利安全线（简版）

建议先满足：

`售价 >= (货成本 + 物流 + 支付费 + 预估售后缓冲) / (1 - 目标广告占比)`

若广告占比目标 30%-35%，不要为了“低价”牺牲毛利。

## 6) 发单前检查（CJ）

- `cj_variant_id` 是否全部可下单
- `logistic_name` 是否与国家匹配
- `from_country_code` 是否正确
- 首批订单建议 `payType=3` 先创建单，不自动扣款（更稳）

## 7) 执行节奏建议

- Day 1：选 20 款 -> 上架 10 款
- Day 3：下架低点击款，补 5 款
- Day 7：按 ATC/转化率扩到 20-30 款

---

如果你把 CJ 链接或表格给我，我可以直接帮你做首批上货清洗和参数填充。
