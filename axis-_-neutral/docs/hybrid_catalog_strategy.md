# AXIS / NEUTRAL 混合货源策略（Hybrid Catalog）

> **Tier 1** 国内高质量 → Wishlist → 预购 · **Tier 2** CJ 少量现货 · **Tier 3** 实验款仅 Wishlist  
> 默认市场：Australia · 关联：`preorder_rules.md` · `product_automation_pipelines.md`

---

## 1) 三层货品结构

| Tier | 货源 | 站内状态 | 数量建议 | 作用 |
|------|------|----------|----------|------|
| **1 英雄款** | 1688 / 工厂 | `wishlist` → `preorder` | 3–6 SKU/季 | 毛利、品牌差异、叙事 |
| **2 现货层** | CJ dropship | `in_stock` | 4–5 SKU 常驻 | 立即可买、广告落地、凑单 |
| **3 实验款** | 1688 看图 / 社媒测反应 | `wishlist` only | 不限 | MOQ 前需求投票 |

对外一句话：

> **Core pieces are made to order in small runs. Essentials ship now.**

---

## 2) Wishlist → 预购 闸门（默认参数）

| 阶段 | 时长 | 动作 |
|------|------|------|
| Wishlist | 7–14 天 | 收集邮箱 + 尺码意向；页显进度 `X / 40` |
| 达标 | ≥ **40** 意向（可调） | 运营开预购 |
| 预购 | 7–10 天 · **30% OFF** | `Ships in ~4 weeks` · 见 `preorder_rules.md` |
| 截单 | — | 1688/工厂下单 → AU 直发或入仓 |
| 复购 | 卖动后 | 小批现货或第二批预购 |

未达标：**不开预购**，不压货。

---

## 3) 数据库字段（`products`）

| 列 | 值 | 说明 |
|----|-----|------|
| `fulfillment_type` | `in_stock` \| `preorder` \| `wishlist` | 决定 PDP 按钮 |
| `supply_source` | `cj` \| `domestic_1688` \| `odm` | 履约路径 |
| `compare_at_price_aud` | 可选 | 预购划线价 |
| `preorder_discount_percent` | 默认 30 | 预购折扣 |
| `ships_in_weeks` | 默认 4 | 发货承诺 |
| `wishlist_goal` | 默认 40 | 开预购阈值 |
| `wishlist_opens_at` | timestamptz | 可选倒计时 |

`wishlist_signups` 表：邮箱、slug、尺码、UTM、时间。

---

## 4) 站内展示规则

| 类型 | 标签 | 主按钮 | 结账 |
|------|------|--------|------|
| `in_stock` | IN STOCK · Ships in 6–13 days | Add to Bag | ✅ |
| `preorder` | PREORDER · Ships in ~4 weeks | Reserve now | ✅ 预购价 |
| `wishlist` | COMING SOON | Join waitlist | ❌ |

---

## 5) CJ 少铺原则（Tier 2）

同时满足才保留：

- 通过 `catalogCuration.ts`
- 与 Tier1 **不撞款**
- AU 运费可接受
- 现货毛利过关

目标：胶囊 **≤5 款 CJ**，其余让位给国内英雄款。

---

## 6) 当前落地款（真源：`catalogCuration.ts`）

| slug | Tier | 状态 |
|------|------|------|
| `black-double-breasted-chain-blazer-6754` | 1 | `wishlist`（[1688 1031360516910](https://detail.1688.com/offer/1031360516910.html) · 款号 6754） |
| `black-double-breasted-trench-coat-14565116` | 3 | `wishlist`（CJ 测款 · Black S–L · pid `1456511646217408512`） |
| `loose-casual-black-multi-pocket-trousers-17638570` | 2 | `in_stock` |
| `cargo-trousers-with-three-disional-pockets-solid-col-16866555` | 2 | `in_stock` |
| `neploe-new-arrival-high-waist-black-pants-solid-colo-13858804` | 2 | `in_stock` |
| `straight-suit-pants-spring-and-summer-korean-style-h-13854743` | 2 | `in_stock` |
| `summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd` | 2 | `in_stock` |

**已下架（2026-05-26）**：4 款 CJ 黑西装/仿皮草外套 — 与 Tier1 英雄款重复，见 `CATALOG_REMOVALS`。

---

## 7) 运营节奏（首月）

- **Week 1**：上线 1 款 Wishlist（黑双排扣西装）+ 社媒引流  
- **Week 2**：达 40 意向 → 开 7 天预购  
- **Week 3–4**：截单、采购、进度邮件每 48h  
- **并行**：CJ 现货维持 4–5 款，不扩到 20+

---

## 8) 关联文档

- `sourcing_weekly_routine.md` — **每周 30 分钟找货 SOP**（减噪、少撞款）  
- `preorder_rules.md` — 预购文案、退款、邮件  
- `upload_workflow_cj.md` / `product_automation_pipelines.md` — 上货与品牌层  
- `cj_candidate_shortlist.md` — CJ 候选  
- `supabase/migrations/20260526120000_hybrid_fulfillment.sql` —  schema
