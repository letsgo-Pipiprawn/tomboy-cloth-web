# BRØKEN — Brand & Site Specification

> **统一规范文档** · Tomboy Chic DTC · Australia-first · Next.js Cinematic E-commerce  
> 合并自 `brand-config-tomboy.md`（品牌）与 `site.md`（技术实现）  
> v1.0 · Lance Digital · Melbourne

---

## 文档说明

本文档将 **BRØKEN 品牌配置** 与 **电影感电商站点技术规范** 整合为单一执行参考。品牌定位优先；站点架构、组件与性能规则沿用 cinematic e-commerce 模式，视觉与文案按品牌规范落地。

### 目录

**Part 1 — 品牌身份（Brand Identity）**
1. [品牌名称与定位](#1-品牌名称与定位)
2. [Tagline 与品牌人格](#2-tagline-与品牌人格)
3. [色彩系统](#3-色彩系统)
4. [字体与 Logo](#4-字体与-logo)
5. [系列架构（Collections）](#5-系列架构collections)
6. [Hero 与按钮规范](#6-hero-与按钮规范)
7. [品牌语调（Voice）](#7-品牌语调voice)
8. [TikTok 内容支柱](#8-tiktok-内容支柱)
9. [SEO 目标（Australia）](#9-seo-目标australia)

**Part 2 — 技术实现（Technical Implementation）**
10. [技术栈](#10-技术栈)
11. [核心组件结构](#11-核心组件结构)
12. [页面路线图（MVP vs Phase 2）](#12-页面路线图mvp-vs-phase-2)
13. [性能与 UX 规则](#13-性能与-ux-规则)
14. [开发工作流](#14-开发工作流)

**附录**
- [品牌 vs 技术：张力与决议](#附录-品牌-vs-技术张力与决议)
- [字体对照与生产建议](#附录-字体对照与生产建议)

---

# Part 1 — 品牌身份

## 1. 品牌名称与定位

### Brand Name
**BRØKEN**

- Ø 来自北欧字符，视觉上打破常规，暗示「打破」性别框架
- 发音仍是 /BROKE-en/，英语母语者无障碍阅读
- 双关含义：打破规则 / 打破性别 / 打破审美边界
- 简短、好记、有冲击力，适合 TikTok 和口耳相传
- 域名建议：`brokenstore.com.au` / `shopbroken.com.au` / `wearbroken.com.au`

### Brand Positioning
女性穿男装剪裁的审美赋权品牌。不是「女生版男装」，不是 unisex，是专门为选择这种穿法的女性精选和设计的。

> Tomboy Chic · Women Who Wear Men's Cuts · Australia-first DTC

---

## 2. Tagline 与品牌人格

### Tagline Options
- Wear it their way.
- Borrowed. Owned. Yours.
- Cut for no one. Made for you.

### Brand Personality
- **Archetype:** The Outlaw × The Creator
- **Voice:** Direct. Dry wit. Never tries too hard.
- **Feeling:** She walks into a room and doesn't adjust herself.
- **NOT:** Cute, girly, "flattering", fast fashion narrative

---

## 3. 色彩系统

站点以深色为主；电光黄绿 `#D4FF00` 每屏最多使用一次；浅色区块仅用于 editorial 节奏切换。

```css
:root {
  --color-bg-primary:    #0E0E0C;
  --color-bg-secondary:  #1A1A16;
  --color-bg-light:      #F0EDE6;
  --color-text-primary:  #F0EDE6;
  --color-text-secondary:#7A7870;
  --color-text-dark:     #0E0E0C;
  --color-accent:        #D4FF00;
  --color-accent-warm:   #C8B090;
  --color-border:        rgba(240, 237, 230, 0.1);
  --color-overlay:       rgba(14, 14, 12, 0.55);
}
```

---

## 4. 字体与 Logo

### Typography（品牌标准）

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
```

| Role | Font | Size |
|---|---|---|
| Logo / Hero | Bebas Neue | clamp(72px, 12vw, 160px) |
| Section Title | DM Serif Display italic | clamp(28px, 4vw, 48px) |
| Nav / Labels | DM Mono 400 | 11px, uppercase |
| Body | DM Mono 300 | 14px |
| Price | DM Mono 400 | 13px |
| Buttons | DM Mono 400 | 11px, uppercase |

### Logo
- **Wordmark:** BRØKEN（Bebas Neue, letter-spacing -0.02em）
- **Ø unicode:** `\00D8`
- **On dark:** `#F0EDE6` · **On light:** `#0E0E0C` · **Hero special:** `#D4FF00`

---

## 5. 系列架构（Collections）

| Series | Vibe | Key Pieces |
|---|---|---|
| **THE BORROW** | Oversized blazers, Oxford shirts, wide-leg trousers | Blazer, Oxford, trouser |
| **UTILITY** | Cargo, workwear, technical | Cargo pant, bomber, field jacket |
| **BARE MINIMUM** | Linen, tailored, quiet neutral | Linen shirt, wide shorts, minimal tee |

---

## 6. Hero 与按钮规范

### Hero Section
- Full viewport video，dark overlay 55%（`--color-overlay`）
- Headline: Bebas Neue, `clamp(72px, 13vw, 160px)`, line-height 0.92
- 一个 accent 词使用 `#D4FF00`
- CTA: DM Mono 11px uppercase，border-bottom in lime
- Video: desaturated, high contrast, raw location, model never poses

### Buttons

```css
.btn-primary {
  background: #D4FF00; color: #0E0E0C;
  font-family: 'DM Mono'; font-size: 11px;
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: 14px 36px; border-radius: 0;
}
.btn-ghost {
  background: transparent; color: #F0EDE6;
  border: 1px solid rgba(240, 237, 230, 0.3);
}
.btn-ghost:hover { border-color: #D4FF00; color: #D4FF00; }
```

---

## 7. 品牌语调（Voice）

**DO:** "Wide leg. Worn in. Yours."

**DON'T:** "These flattering trousers are perfect for any occasion!"

- No exclamation marks
- No "flattering" ever
- Size guide uses: chest / shoulder / length

---

## 8. TikTok 内容支柱

| Pillar | Format |
|---|---|
| The Steal | GRWM styling men's cuts |
| The Fit | Slow reveal, no talking |
| The Why | Talking head, dry tone |
| The Drop | 15s product launch |

**Caption style:** "fit. borrowed from the men's section. link in bio."

---

## 9. SEO 目标（Australia）

- tomboy fashion australia
- women's oversized blazer australia
- androgynous women's clothing australia
- gender neutral fashion australia
- women's wide leg trousers australia

---

# Part 2 — 技术实现

> 原项目代号 AXIS / NEUTRAL 指 cinematic e-commerce 站点模式；**生产品牌为 BRØKEN**，见[附录](#附录-品牌-vs-技术张力与决议)。

## 10. 技术栈

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database / Storage | Supabase (PostgreSQL) |
| Payments | Stripe API Integration |
| Deployment | Vercel (Frontend) / Railway (Backend API) |

---

## 11. 核心组件结构

| Component | Spec |
|---|---|
| `Navbar.tsx` | Sticky, minimalist, glassmorphic effect |
| `HeroSection.tsx` | Full-screen auto-playing video — muted / loop / autoplay / playsInline |
| `ProductCarousel.tsx` | Horizontal scroll list of product cards |
| `ProductCard.tsx` | Model image, title, price, hover-zoom, grayscale-to-color transition |
| `StripeButton.tsx` | Triggers Stripe Checkout session |

**品牌落地要点：**
- Navbar / labels 使用 DM Mono uppercase
- Hero 套用 Part 1 色彩、字体与 overlay 规范
- ProductCard hover 过渡配合 dark palette 与 lime accent 克制使用

---

## 12. 页面路线图（MVP vs Phase 2）

### MVP（Launch）

| Route | Purpose |
|---|---|
| `/` (`page.tsx`) | Landing — cinematic video hero + horizontal collections |
| `/shop/[slug]` | PDP — high-res zoomable images + storytelling description |
| `/cart` | Simple side-drawer cart |

**MVP 必须交付：** 上述三页 + 核心五组件 + Stripe Checkout + Supabase 产品数据 + CDN 资产托管。

### Phase 2（Post-Launch）

| Route / Feature | Purpose |
|---|---|
| `/collections/[series]` | THE BORROW / UTILITY / BARE MINIMUM 系列着陆页 |
| Editorial / Lookbook | Light-section 节奏切换，品牌叙事长文 |
| Account & Order history | 客户账户与订单追踪 |
| Search & Filters | 尺码、系列、品类筛选 |
| TikTok / UGC embed | 内容支柱与 PDP 联动 |

---

## 13. 性能与 UX 规则

- 使用 `framer-motion` 实现 smooth layout transitions
- Lazy load images / videos — `next/image` + native `<video>` with poster images
- 所有 assets（images / videos）托管 CDN（Supabase Storage 或 Cloudflare R2）
- 视频 Hero：`muted`, `loop`, `autoplay`, `playsInline` 确保移动端 autoplay 合规
- 每屏 lime accent 最多一次（与品牌规范一致）

---

## 14. 开发工作流

1. Initialize Next.js with Tailwind and TypeScript
2. Setup Supabase client for product data fetching
3. Implement horizontal scroll for collections using `framer-motion`
4. Configure Stripe Checkout session handling
5. Setup deployment pipeline for Vercel
6. Apply BRØKEN design tokens（色彩、字体、按钮）至 Tailwind theme

---

# 附录

## 附录：品牌 vs 技术张力与决议

| 张力 | 来源 | 决议 |
|---|---|---|
| 项目名称 | `site.md` 称 AXIS / NEUTRAL | **生产品牌 = BRØKEN**；AXIS/NEUTRAL 仅作 cinematic site pattern 代号 |
| 字体 | `site.md`: Cormorant Garamond + Inter | **生产采用 brand-config**：Bebas Neue + DM Serif Display + DM Mono |
| 视觉调性 | site 偏 neutral cinematic | 保留 full-screen video、horizontal scroll、glassmorphic nav；**色彩/语调/系列按 tomboy 品牌** |
| Hero 视频 | 技术 spec 要求 autoplay loop | 品牌 spec 要求 desaturated、raw、不摆拍 — **两者同时满足** |

---

## 附录：字体对照与生产建议

| Role | site.md（旧） | brand-config（标准） | **Production Recommendation** |
|---|---|---|---|
| Headers | Cormorant Garamond (serif) | Bebas Neue / DM Serif Display | **Follow brand-config** |
| Body | Inter (sans-serif) | DM Mono 300/400 | **Follow brand-config** |
| Nav / Labels | — | DM Mono 400 uppercase | **Follow brand-config** |
| Buttons | — | DM Mono 400 uppercase | **Follow brand-config** |

> **结论：** DTC tomboy 站点以 `brand-config-tomboy.md` 字体体系为准。`site.md` 中的 Cormorant / Inter 为早期 cinematic template 默认值，不用于 BRØKEN 生产环境。

---

*BRØKEN Brand & Site Spec v1.0 · Lance Digital · Melbourne*
