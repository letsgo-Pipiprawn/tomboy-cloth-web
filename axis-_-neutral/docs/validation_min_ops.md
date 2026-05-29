# 验证期最低运营 SOP（8 单/月）

> 技术栈：Vercel + Stripe + Supabase + **CJ 手动发货** + Gmail  
> 开关：`src/data/site.ts` → `VALIDATION_MODE = true`

---

## 每笔订单你要做什么（约 10 分钟/单）

### 1. 收到通知

- Stripe Dashboard → **Payments** → 新付款  
- 或邮箱：Stripe 付款通知（在 Stripe 设置里打开）

记下：

- 订单号 `AXN-…`（Supabase `orders.order_number` 或 success 页）
- 客户姓名、邮箱、澳洲地址、电话
- 商品 slug、尺码、数量

### 2. 在 CJ 手动下单

1. 登录 [CJ Dropshipping](https://cjdropshipping.com)
2. 找到对应 SKU（`localCatalog.ts` / Supabase `products.cj_product_id`）
3. **Create order** → 填客户收货地址（与 Stripe 一致）
4. 选物流线（澳洲、可追踪）
5. 支付 CJ 侧费用

### 3. 发 tracking 邮件给客户

CJ 出 tracking 后（通常 1–3 天），用 Gmail 发给 checkout 邮箱：

**Subject:** `Your AXIS / NEUTRAL order is on the way — AXN-XXXX`

**Body 模板：**

```
Hi [First name],

Thank you for your order [AXN-XXXX].

Your parcel is on the way. Tracking: [number or link]

Carrier: [Australia Post / 4PX / etc.]
Typical delivery after dispatch: 10–20 business days within Australia.

Questions? Reply to this email or write studio@axisneutral.com.au with your order number.

— AXIS / NEUTRAL
Melbourne / Australia
```

### 4. （可选）更新 Supabase

方便客户用 `/orders/track` 自助查看：

```sql
update orders
set
  status = 'shipped',
  metadata = jsonb_set(
    coalesce(metadata, '{}'::jsonb),
    '{tracking_number}',
    '"YOUR_TRACKING_NUMBER"'
  )
where order_number = 'AXN-XXXX';
```

不更新也可以——验证期以 **邮件为准**。

---

## 客户会看到的流程

| 步骤 | 客户看到什么 |
|------|----------------|
| 付款成功 | Stripe 收据邮件 + 网站 success 页 |
| 1–3 天 | （无自动邮件，正常） |
| CJ 发货后 | **你手动发** tracking 邮件 |
| 之后 | 可选：Supabase 有 tracking → `/orders/track` 可查 |

**没有 Resend 也完全可以跑**——Stripe 收据 + 你一封 tracking 邮件就够。

---

## 每周 15 分钟

- [ ] Stripe：有无退款/争议  
- [ ] Supabase `orders` 条数 = Stripe paid 条数  
- [ ] Gmail：Contact / 客户回复  

---

## 验证期已关闭的功能（避免误导）

- Express 运费（CJ 无法稳定承诺 3–5 天）  
- 精确「预计送达日期」  
- 补货自动邮件（改邮件联系 studio）  
- 账户登录（用 Track order + 邮箱查单）  

上线量起来后：设 `VALIDATION_MODE = false`，再开 Express / Resend / 自动 CJ。

---

## 什么时候升级自动化？

| 信号 | 动作 |
|------|------|
| 月单 > 30 | CJ API `POST /api/fulfillment/cj-dispatch` |
| 月单 > 20 | Resend 自动订单确认 + 发货邮件 |
| 稳定团队 | `VALIDATION_MODE = false` |
