# AXIS / NEUTRAL — TikTok 内容 & 脚本 Playbook

> **用途**：你问 Cursor 要 TikTok 文案、口播脚本、分镜、或 AI 画面提示词时，Agent 以本文档为主源。  
> **默认市场**：Australia（AU）  
> **品牌人格**：androgynous + alpha female — `tomboy` 仅作 hashtag 长尾，不作 Hero 主词。  
> **配合 Skill**：`.cursor/skills/marketing-social-advisor/SKILL.md`

---

## 0) 怎么用（给你 + 给 Agent）

### 你可以这样问 Cursor

```text
根据 docs/tiktok_playbook.md，为 [产品 slug/名称] 写一条 20 秒 TikTok 口播脚本，类型 Fit Check，场景 office。
```

```text
用 tiktok_playbook 的「选品分析 PROMPT」，分析 Wide-Leg Black Trouser 在 TikTok AU 的差异化角度。
```

```text
按 tiktok_playbook 输出：Hook 类型用场景代入 + 完整分镜 + Kling 视频 prompt。
```

### Agent 收到 TikTok 请求时的读取顺序

| 优先级 | 文件 | 用途 |
|--------|------|------|
| 1 | **本文档** | 脚本结构、PROMPT 模板、Hook 库、输出格式 |
| 2 | `docs/content_guidelines.md` | 禁用词、语气、基础 Caption 规则 |
| 3 | `docs/BRAND_GUIDELINES.md` | Persona、关键词、品牌边界 |
| 4 | `docs/ai_model_prompts.md` | Krea/Kling 画面与模特 prompt |
| 5 | `src/data/productCopy.ts` | 产品事实（有 slug 时必读，禁止编造规格） |

### 最低输入（缺则先问）

```text
- 产品：{slug 或名称}（可选：是否 preorder）
- 目标：口播脚本 / 仅 caption / 分镜表 / 选品分析 / AI 视频 prompt / 全套
- 时长：15s / 20s / 25s / 30s
- 内容类型：穿搭展示 / 版型教育 / Drop / Fit Check / 1 Piece 3 Looks / Detail
- 场景：office / street / drop / laneway / fit-check
- 语言：口播英文（默认）/ 字幕中英 / 全中文说明
```

---

## 1) 核心原则

> **好视频 80% 靠前期**：选对表达角度、写好 Hook 和分镜，才有保存率和 bio 点击。

- **前 1 秒**：轮廓或态度冲突（不是脸、不是滤镜）
- **前 3 秒**：Hook 必须独立成立（静音刷到也能被字幕留住）
- **中段**：至少 1 个具体版型/面料/场景信息（禁止纯氛围）
- **结尾**：单一 CTA（link in bio / save / comment 关键词）
- **语气**：Direct · Calm · Confident — 见 `content_guidelines.md` §1 禁用词

---

## 2) 爆款脚本公式（25 秒标准结构）

```text
Hook 钩子（0–3s）
  → 痛点 / 认知冲突（3–8s）
  → 产品解决方案 + 版型证据（8–18s）
  → 信任背书 + CTA（18–25s）
```

| 段落 | 时长 | 目标 | 镜头建议 |
|------|------|------|----------|
| Hook | 0–3s | 停滑 | 轮廓对比 / 大字幕问句 / 肩线特写 |
| 痛点 | 3–8s | 共鸣 | 快切「普通女装 vs 我们的廓形」 |
| 方案 | 8–18s | 证明 | 全身 walk + 1 个细节 close-up |
| CTA | 18–25s | 转化 | 定帧 silhouette + 字幕 CTA |

**15 秒版**：Hook 2s + 方案 10s + CTA 3s（砍掉痛点或合并进 Hook）  
**30 秒版**：方案段加「1 Piece 2 Looks」或第二场景

---

## 3) Hook 类型速查

Agent 写脚本时**必须标注 Hook 类型**，并从下表选 1 种（可组合，但首句只保留一个主 Hook）。

| 类型 | 符号 | 示例（AXIS 语气） | 适用内容 |
|------|------|-------------------|----------|
| 问句型 | ❓ | 「Why does your blazer still read 'office costume'?」 | 版型教育 |
| 数据/认知冲击 | 😱 | 「Most 'oversized' blazers are just one size up.」 | Fit Check |
| 场景代入 | 🎭 | 「9am meeting. 6pm laneway. Same silhouette.」 | 1 Piece 3 Looks |
| 利益前置 | 🎁 | 「The wide-leg cut we restock every drop — save this fit.」 | Drop / 转化 |
| 轮廓冲突 | ✂️ | 「Not your usual womenswear shoulder line.」 | 穿搭展示 |
| 反常识 | 🔄 | 「Oversized is not the same as sloppy.」 | 版型教育 |

**禁用 Hook 风格**：girl boss、must buy now、last chance、cute/girly、变装幼态、无信息纯 BGM 氛围。

---

## 4) 内容类型模板（6 类）

### A · 穿搭展示（15–25s）

- **Hook 推荐**：轮廓冲突 / 场景代入  
- **必含**：1 个产品名 + 1 个版型点（肩线 / 阔腿 / 衣长）  
- **CTA**：Link in bio / Save this fit

### B · 版型教育（20–30s）

- **Hook 推荐**：问句型 / 反常识  
- **必含**：对比逻辑（wrong vs right fit）+ 具体测量点  
- **CTA**：Save + compare with your blazer

### C · Drop / Preorder（15–20s）

- **Hook 推荐**：利益前置  
- **必含**：Drop 编号或件数 + preorder 状态（若开启）  
- **CTA**：Limited preorder — link in bio

### D · Fit Check（20–25s）

- **Hook 推荐**：数据冲击  
- **必含**：肩宽 / 衣长 / 阔腿比例（口播或字幕）  
- **CTA**：Comment `fit` for size guide

### E · 1 Piece 3 Looks（25–30s）

- **Hook 推荐**：场景代入  
- **必含**：同一单品 + 3 场景（Office / Street / Night）  
- **CTA**：Save the series

### F · Detail Close-up（15–20s）

- **Hook 推荐**：问句型（「See this seam?」）  
- **必含**：面料 / 口袋 / 走线 1–2 点  
- **CTA**：Tap for full PDP

---

## 5) PROMPT · 选品 / 内容角度分析

复制到 Cursor，或让 Agent 按此结构输出（**服装选款硬标准**仍见 `AXIS_NEUTRAL_product_eval.md`）。

```text
PROMPT · TikTok 内容角度分析

我在卖 [品类，如 androgynous womenswear / wide-leg trousers]，
目标客群是 [Persona A/B/C 或自定义，默认 City Alpha 25–36 AU]，
平台：TikTok Australia。

请分析以下 4 点（符合 AXIS / NEUTRAL 品牌边界，禁用 girl-boss / cute / flattering 话术）：

1. 这类产品在 TikTok AU 上近期的热门痛点和需求趋势（3 条，带内容形式建议）
2. 当前同类竞品的常见卖点话术（列出 5 个，标注可学 / 勿抄）
3. 我们可以差异化的 3 个角度（竞争对手没说的，偏轮廓/版型/场景）
4. 推荐 2 个 Hook 类型 + 1 个内容类型（A–F）及理由

产品信息：
- 名称：[产品名]
- Slug / 链接：[可选]
- 核心卖点：[1–3 个]
- 已知事实：[从 productCopy 来，勿编造]
```

---

## 6) PROMPT · 完整带货口播脚本

```text
PROMPT · 完整 TikTok 口播脚本

帮我写一个 [15/20/25/30] 秒的 TikTok 带货口播脚本。

品牌：AXIS / NEUTRAL（androgynous city tailoring，AU 市场）
产品：[产品名]
核心卖点：[1–3 个，必须来自 productCopy]
目标人群：[Persona A/B/C]
内容类型：[A–F 选一]
场景：[office / street / laneway / drop / fit-check]
Hook 类型：[从 §3 选]

风格要求：
- 口播语言：英语，口语化、克制、有态度
- 不要书面语、不要折扣尖叫体、不要 girl-boss 叙事
- 遵守 content_guidelines 禁用词

脚本格式（必须全部输出）：
1. Hook 类型标注
2. 分镜表：| 时间 | 镜头 | 画面 | 字幕/on-screen text | 口播 |
3. 完整口播稿（标注总字数，英文）
4. Caption 文案（Hook + Body + CTA，可发帖用）
5. Hashtag 3–5 个（从 §8 池轮换）
6. 可选：Kling 视频 prompt 一段（见 ai_model_prompts.md §5B）

约束：
- 开头 3 秒必须有强力 Hook
- 至少 1 个具体版型/细节点
- 结尾单一明确 CTA
- 总口播字数：15s≈40词 / 20s≈55词 / 25s≈70词 / 30s≈85词（英文）
```

---

## 7) PROMPT · 仅要分镜 / 仅要 AI 视频

### 分镜表（无口播）

```text
PROMPT · TikTok 分镜表

产品：[名称]
时长：[秒]
类型：[A–F]
比例：9:16

输出 Markdown 表格：
| Sec | Visual | Camera | On-screen text | Audio/Music mood |

要求：首帧轮廓冲突；Muted tones；Melbourne urban；Model B 默认。
负面词见 ai_model_prompts.md §3。
```

### Kling / Krea 视频 prompt

```text
PROMPT · TikTok AI 视频

基于 docs/ai_model_prompts.md：
- 模特：Model B（默认）
- 产品：[PRODUCT_NAME]
- 场景：[Melbourne laneway / office hallway / etc.]
- 时长：8–15s，9:16，一条 continuous shot 或 3-scene progression

输出：
1. 英文 Kling prompt（可直接复制）
2. Negative prompt
3. 与口播脚本的时间轴对齐说明（若提供了脚本）
```

---

## 8) Hashtag 池（轮换，每条 3–5 个）

**主池**  
`#androgynousstyle` `#australianfashion` `#womenswear` `#streettailoring` `#outfitideas`

**态度 / 长尾（轮换，勿全堆）**  
`#alphafemale` `#tomboyfashion` `#melbournefashion` `#oversizedblazer` `#widelegtrousers`

**规则**：同一条视频不与上一条完全重复；`#tomboyfashion` 每周最多 2 次。

---

## 9) Agent 标准输出格式

用户未指定格式时，Agent **默认按此 Markdown 结构回复**：

```markdown
## TikTok — {产品名} · {内容类型} · {时长}s

**Hook 类型**：{类型}  
**Persona**：{A/B/C}  
**场景**：{场景}

### 分镜表
| 时间 | 镜头 | 画面 | 字幕 | 口播 |
|------|------|------|------|------|
| 0-3s | ... | ... | ... | ... |

### 完整口播（英文，~{N} words）
...

### Caption（发帖用）
Hook: ...
Body: ...
CTA: ...

### Hashtags
...

### AI 视频 prompt（可选）
...

### Pre-publish 检查
- [ ] 无禁用词
- [ ] Hook 在前 3 秒
- [ ] ≥1 版型/细节事实
- [ ] 单一 CTA
- [ ] 产品事实与 productCopy 一致
```

---

## 10) 发布前检查清单（硬规则）

- [ ] 无禁用词：`cute` `girly` `flattering` `boss babe` `girl boss` `dominate` `must buy now` `last chance`
- [ ] 无 unqualified `best` / `premium` / `luxury` / `guaranteed`
- [ ] 首帧 / 前 3 秒有 Hook（静音可读字幕）
- [ ] 至少 1 个可验证版型或产品细节
- [ ] CTA 单一明确
- [ ] `tomboy` 未作 Hero 主标题
- [ ] 有 slug 时已对照 `productCopy.ts`，未编造 SKU 事实

---

## 11) 示例：Agent 生成结果骨架

**用户**：`为 Wide-Leg Black Trouser 写 20s Fit Check，Hook 用反常识`

**Agent 应产出**（节选）：

| 时间 | 镜头 | 口播 |
|------|------|------|
| 0-3s | 腰臀 vs 阔腿对比 | Wide leg isn't wide if it clings at the hip. |
| 3-10s | 侧面 walk | This cut drops clean from the hip — no taper, no fuss. |
| 10-18s | 衣长 + 鞋跟关系 | Length hits mid-shoe. City-ready, not sloppy. |
| 18-20s | 定帧 | Save this. Link in bio. |

---

## 12) 相关文档

| 文档 | 关系 |
|------|------|
| `content_guidelines.md` | 语气 + 禁用词 + 简版 TikTok 模板 |
| `social_seo_playbook.md` | 发帖频率、KPI、TikTok vs IG 分工 |
| `ai_model_prompts.md` | 模特与 Kling/Krea 画面 prompt |
| `AXIS_NEUTRAL_product_eval.md` | 选款打分（供应链），非 TikTok 趋势分析 |
| `product_automation_pipelines.md` | 上货流程 §8 社媒分工 |

---

*更新：新建 TikTok 专用 playbook — 脚本 PROMPT、Hook 库、Agent 输出格式。*
