# AXIS / NEUTRAL 每周找货 SOP（30 分钟版）

> 目的：把「找货很麻烦」收成 **每周一次、30–60 分钟、最多 3 个候选**。  
> 默认市场：Australia · 品牌：**androgynous + alpha female**（见 `BRAND_GUIDELINES.md`）。  
> 货源分层：见 `hybrid_catalog_strategy.md`。

---

## 0) 核心原则（先记住）

- **AI 用在候选之后**，不代替你从 0 逛到 100。  
- **CJ 少铺**（现货 ≤5 款）；**1688 英雄款**走 Wishlist → 预购。  
- **三样齐才进候选**：黑/灰中性色 + 结构廓形 + **不撞**现有 SKU。  
- **没信号不开产**：Wishlist 未满 `wishlist_goal`（默认 40）不下单。

---

## 1) 文档与真源（找货时打开）

| 顺序 | 文件 | 用途 |
|------|------|------|
| 1 | `BRAND_GUIDELINES.md` | 语气、禁用词、人格 |
| 2 | `AXIS_NEUTRAL_product_eval.md` | 打分 ≥75 才继续 |
| 3 | `catalogCuration.ts` + `cj_candidate_shortlist.md` | 撞款 / 已剔除原因 |
| 4 | `hybrid_catalog_strategy.md` | Tier1/2/3 放哪 |
| 5 | `product_automation_pipelines.md` | URL 丢给 AI 后的产出清单 |

---

## 2) 每周日历（建议周二或周三）

| 时间盒 | 动作 | 产出 |
|--------|------|------|
| **5 min** | 定本周 **1 个类目**（二选一，不要两个同时扫） | 写下类目名 |
| **15 min** | 平台浏览，**最多记 3 个链接** | 3 URL 或截图 |
| **10 min** | 快速打分 + 撞款检查 | 保留 **0–1 款** 进入下一步 |
| **5 min** | 更新短名单 / 决定是否开 Wishlist | 1 行记录进 `cj_candidate_shortlist.md` 或 Notion |

**本月类目轮换示例（循环，不必每周换）：**

- Week A：黑西装 /  blazer（Tier1 优先）  
- Week B：黑宽腿裤 / cargo（Tier2 CJ 或 Tier1）  
- Week C：复盘（不下新货，只看 Wishlist 数 / 退货 / 竞品）  

---

## 3) 类目选择规则

本周只扫一类。优先级：

1. **Wishlist 英雄缺口**（例如已有裤、缺一件标志性西装）  
2. **广告落地需要现货**（CJ 补 1 款，能 6–13 天发 AU）  
3. **实验**（Tier3：仅收集邮箱，不进预购）

若胶囊里 **黑西装已有 3 款+**，本周 **禁止**再扫西装，改扫裤或外套差异款。

---

## 4) 15 分钟浏览 — 硬过滤（任一条 = 丢）

在点开详情前，标题/主图先过：

| 检查 | 通过 | 丢 |
|------|------|-----|
| 颜色 | 黑 / 炭灰 / 石板灰（solid） | 咖色、迷彩、格纹、泼墨、粉色 |
| 标签 | 中性风、oversize、西装/宽腿 | Harajuku、韩版爆款、hip-hop 刺绣、显瘦讨好文案 |
| 材质 | 西装料、棉斜、斜纹（可接受） | 假皮草、亮面 PU、廉价反光聚酯（无样衣不赌） |
| 撞款 | 与 `CURATED_PRODUCT_SLUGS` 差异明显 | 又一款「黑西装双排扣」且无差异点 |

**CJ 额外：** 有 `cj_variant_id`、能发 AU、供货价+运费算得过毛利。  
**1688 额外：** 可 1 件起批、能发墨尔本、评价无大面积货不对板。

---

## 5) 10 分钟 — 评分与撞款

对每个保留链接，按 `AXIS_NEUTRAL_product_eval.md` 粗打：

| 总分 | 本周动作 |
|------|----------|
| ≥85 | Tier1 候选 → 考虑 **Wishlist**（不立即进货） |
| 75–84 | Tier2 CJ 现货 或 Tier3 仅观察 |
| 60–74 | 记入短名单「备选」，本周不做 |
| &lt;60 | 丢弃，不写进文档 |

**撞款表（必查）：**

| 已有 slug | 你若上新，必须能说出差异 |
|-----------|------------------------|
| `black-double-breasted-chain-blazer-6754` | 链饰/双排/长度/肩线至少 1 项不同 |
| `office-ladies-black-formal-blazer-*` | 非同款正式西装 |
| `solid-long-style-black-jacket-*` | 非同款长西装 |
| `black-suit-jacket-sense-of-design-*` | 非同款宽松西装 |
| 9 款 CJ 裤装 | 廓形（宽腿 vs 收口）不重复 |

说不出差异 → **本周不进候选**。

---

## 6) 5 分钟 — 决策树（只选一条路径）

```text
有 85+ 分 1688 款？
  ├─ 是 → Tier1：开/续 Wishlist（不进货）→ 满 40 人再预购
  └─ 否 → 有 75+ 分 CJ 且胶囊 <5 款现货？
        ├─ 是 → Tier2：丢 URL 走 Pipeline B → 你 Approve 后上架
        └─ 否 → 本周 0 上新，只运营现有款
```

---

## 7) 交给 AI 的指令模板（复制即用）

### A) 每周 3 链回复筛（找货阶段）

```text
按 docs/sourcing_weekly_routine.md + AXIS_NEUTRAL_product_eval.md：
本周类目：[黑西装 / 黑宽腿裤]
候选链接：
1) ...
2) ...
3) ...

请输出：
- 每个总分 + 是否撞款（对照 catalogCuration / 6754）
- 只推荐 0–1 个继续
- 建议 Tier1 Wishlist / Tier2 CJ / 丢弃
不要写上架文案，不要超 3 个候选。
```

### B) 确定 1 款后 — Pipeline B（上架包）

```text
上架 1 款：
- URL: ...
- 颜色: Black only
- Tier: [wishlist / in_stock]
- 是否竞选 Hero: 否

按 product_automation_pipelines.md 出：品牌名、文案、SEO、定价建议、模特 prompt。
```

---

## 8) 每周记录模板（贴进短名单或 Notion）

```text
日期：2026-__
本周类目：__
浏览数：3
保留：0–1
slug（若保留）：__
评分：__/100
Tier：1 / 2 / 3
撞款结论：__
下周：继续 Wishlist / 开预购 / 补 CJ 1 款 / 休息一周
```

---

## 9) 故意「不找货」的周（每 4 周至少 1 次）

以下情况 **跳过浏览**，只做运营：

- 当前 Wishlist 未达 40，需要引流而不是加 SKU  
- 上一批预购未发完，避免履约分心  
- 退货/尺码问题未复盘  

动作：发 3 条内容、看 Wishlist 数、回客服，**0 新链接**。

---

## 10) 与混合策略对齐的检查清单

每周结束前勾：

- [ ] 本周是否只扫了 **1 个类目**？  
- [ ] 是否 **≤3 个链接** 进入评分？  
- [ ] CJ 现货总数是否仍 **≤5**（拟上新前数一遍）？  
- [ ] Tier1 是否 **先 Wishlist**，未达标未进货？  
- [ ] 禁用词/讨好词未进对外文案（`content_guidelines.md`）？  

---

## 11) 关联文档

- `hybrid_catalog_strategy.md` — Tier 与闸门  
- `preorder_rules.md` — 满 40 人后预购  
- `upload_workflow_cj.md` — 仅 Tier2 CJ  
- `product_automation_pipelines.md` — URL 自动化  
- `ops_checklist.md` — 日/周运营  

---

*找货麻烦不会消失，但可以被关进「每周 30 分钟 + 最多 1 个决策」的盒子里。*
