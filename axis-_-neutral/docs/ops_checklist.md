# AXIS / NEUTRAL 运营总清单（Ops Checklist）

> 目标：把品牌、内容、预购、客服、供应商这 5 套规则串成可执行 SOP。  
> 适用角色：运营、内容、客服、采购/供应链。

## 0. 关联文档（先看这 6 份）

- `docs/product_automation_pipelines.md`（自动找品 / URL 上架流水线）
- `docs/sourcing_weekly_routine.md`（每周 30 分钟找货 SOP）
- `docs/content_guidelines.md`
- `docs/ai_model_prompts.md`
- `docs/product_image_set_workflow.md`（**每 SKU 7 张图包 · 上架闸门**）
- `src/assets/images/models/README.md`（首页 Lookbook editorial + Model A/B/C）
- `docs/preorder_rules.md`
- `docs/customer_service.md`
- `docs/supplier_comms.md`

---

## Launch 待办（未完成 · 2026-05-26 记下）

> 网站功能已写好；以下上线配置**还没做**，投广告前再补即可。

### Analytics（Vercel 环境变量）

- [ ] **`VITE_GA4_MEASUREMENT_ID`** — Google Analytics 4，格式 `G-XXXXXXXX`  
  获取： [Google Analytics](https://analytics.google.com) → Admin → Data Streams → 选网站流 → Measurement ID
- [ ] **`VITE_META_PIXEL_ID`** — Meta（Facebook / Instagram）Pixel，纯数字  
  获取： [Meta Events Manager](https://business.facebook.com/events_manager) → 数据源 → Pixel ID
- [ ] 两个变量加到 **Vercel → Project → Settings → Environment Variables**（Production + Preview）
- [ ] 加完后 **Redeploy** 一次，否则前端读不到新变量

说明：不填 ID 时追踪脚本**不会加载**，不影响正常购物；只有开始投 Meta / Google 广告、需要看漏斗时再配。

---

## 1. 每日清单（Daily）

## A. 内容发布（Content）
- [ ] 当日内容是否符合 `content_guidelines.md`（语气/禁用词/CTA 结构）
- [ ] 每条 caption 是否包含：Hook + Product + Context + CTA
- [ ] 发布前是否过“禁用词”检查（cute/girly/flattering 等）
- [ ] TikTok/IG 各至少 1 条内容完成发布或排程

## B. AI 素材生产（Creative）
- [ ] 生成图/视频是否使用固定模特描述（`ai_model_prompts.md`）
- [ ] 是否加入统一 negative prompt（防风格漂移）
- [ ] 当日素材是否覆盖至少 1 个场景（电商图/TikTok/Instagram）
- [ ] **新品上架**：是否完成 7 张图包 + `npm run check:product-images -- {slug}`（见 `product_image_set_workflow.md`）

## C. 客服处理（CS）
- [ ] 24 小时内消息是否全部首响
- [ ] 订单/物流问题是否优先处理
- [ ] 投诉是否按 SOP 记录（问题-原因-方案-结果）

## D. 预购 / Wishlist（混合货源）
- [ ] Wishlist 款：邮箱收集是否正常（`/api/wishlist/signup`）
- [ ] 是否记录意向数 vs `wishlist_goal`（40 默认）
- [ ] **自动闸门**：达标后系统会将 `fulfillment_type` 改为 `preorder` 并 queue 邮件（无需手动改库）
- [ ] 若未配 `RESEND_API_KEY`：检查 `email_outbox` 表并 cron `POST /api/email/process-outbox`
- [ ] 预购页信息是否完整（折扣、发货时间、退款规则）
- [ ] 是否发布进度更新（至少每 48 小时）
- [ ] 延迟订单是否主动沟通（含选项方案）

---

## 2. 每周清单（Weekly）

## A. 增长与内容复盘
- [ ] 本周高表现内容 Top 5（按播放/互动/收藏）
- [ ] 低表现内容原因分析（hook、镜头、CTA、发布时间）
- [ ] 下周内容方向与脚本池更新

## B. 找货（每周一次 · 见 sourcing_weekly_routine.md）
- [ ] 本周只扫 1 个类目，最多 3 个链接
- [ ] 评分 + 撞款后是否 0–1 款进入 Wishlist / CJ
- [ ] CJ 现货总数仍 ≤5

## C. 转化漏斗复盘
- [ ] 流量 -> PDP -> ATC -> Checkout -> Paid 各环节数据
- [ ] 高跳出页面（首页/PDP）是否有明确优化动作
- [ ] FAQ/Policy 是否需补充（依据客服高频问题）

## D. 客服与体验复盘
- [ ] 平均首次响应时长
- [ ] 退款率与主因（尺码/延迟/质量）
- [ ] 投诉工单闭环率

## E. 供应链复盘
- [ ] 打样进度、改版状态、问题项
- [ ] 当前供应商评分（质量/交期/响应）
- [ ] 下周补单与交期风险预警

---

## 3. 每月清单（Monthly）

## A. 品牌一致性审计
- [ ] 网站、社媒、客服话术是否统一
- [ ] 是否出现偏离品牌语气内容（过甜、过促销、过噪音）
- [ ] `BRAND_GUIDELINES.md` 是否需更新版本

## B. 商品与供应链策略
- [ ] 哪些款值得复投（销量 + 退货率 + 毛利）
- [ ] 哪些款需淘汰或改版
- [ ] 供应商分层管理（保留/观察/替换）

## C. 财务与预购策略
- [ ] 预购批次履约是否稳定（承诺 vs 实际）
- [ ] 退款成本与补偿成本是否可控
- [ ] 下月预购机制是否需要调整（折扣、周期、沟通频次）

---

## 4. 预购期专项节奏（T-7 到发货）

## T-7 ~ T-1（预热）
- [ ] 预购页上线并完成政策检查
- [ ] 发布 3-5 条预热内容（穿搭/细节/版型）
- [ ] 客服 FAQ 准备完毕

## T0 ~ T+3（开售）
- [ ] 每日检查订单与支付异常
- [ ] 社媒评论/私信集中答疑
- [ ] 日终同步销售与热门尺码

## T+4 ~ 发货前（生产期）
- [ ] 每 48 小时一次进度更新
- [ ] 延迟风险提前通知
- [ ] 客户地址与尺码修改窗口管理

## 发货周
- [ ] 批量发货通知 + tracking
- [ ] 延迟订单单独沟通
- [ ] 售后入口显著展示

---

## 5. 角色分工建议（简版）

- 内容运营：脚本、发布、素材排程、数据复盘
- 客服：工单处理、投诉升级、FAQ 更新
- 供应链：工厂沟通、打样、大货、质检
- 负责人：周复盘会 + 决策（款式、预算、节奏）

---

## 6. 关键 KPI 看板（建议）

## 内容 KPI
- 周发布数
- 平均互动率
- 高表现内容占比

## 转化 KPI
- ATC 率
- 结账启动率
- 订单转化率

## 客服 KPI
- 首响时长
- 投诉闭环率
- 退款处理时长

## 供应链 KPI
- 打样一次通过率
- 准时交付率
- 质检通过率

---

## 7. 一句话执行原则

先统一口径，再放大流量；先保证履约，再放大预购。
