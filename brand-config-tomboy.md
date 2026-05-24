> Superseded by [brand-and-site-spec.md](./brand-and-site-spec.md)

# Brand Configuration — BRØKEN

> Tomboy Chic · Women Who Wear Men's Cuts · Australia-first DTC
> Generated via Lance Digital brand workshop · v1.0

---

## 1. Brand Identity

### Brand Name
**BRØKEN**

- Ø 来自北欧字符，视觉上打破常规，暗示"打破"性别框架
- 发音仍是 /BROKE-en/，英语母语者无障碍阅读
- 双关含义：打破规则 / 打破性别 / 打破审美边界
- 简短、好记、有冲击力，适合 TikTok 和口耳相传
- 域名建议：brokenstore.com.au / shopbroken.com.au / wearbroken.com.au

### Tagline Options
- Wear it their way.
- Borrowed. Owned. Yours.
- Cut for no one. Made for you.

### Brand Positioning
女性穿男装剪裁的审美赋权品牌。不是"女生版男装"，不是 unisex，是专门为选择这种穿法的女性精选和设计的。

### Brand Personality
- Archetype: The Outlaw x The Creator
- Voice: Direct. Dry wit. Never tries too hard.
- Feeling: She walks into a room and doesn't adjust herself.
- NOT: Cute, girly, "flattering", fast fashion narrative

---

## 2. Color System

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

- Site is predominantly dark
- Electric lime (#D4FF00) used once per screen max
- Light sections for editorial breaks only

---

## 3. Typography

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
```

| Role | Font | Size |
|---|---|---|
| Logo / Hero | Bebas Neue | clamp(72px,12vw,160px) |
| Section Title | DM Serif Display italic | clamp(28px,4vw,48px) |
| Nav / Labels | DM Mono 400 | 11px, uppercase |
| Body | DM Mono 300 | 14px |
| Price | DM Mono 400 | 13px |
| Buttons | DM Mono 400 | 11px, uppercase |

---

## 4. Logo

- Wordmark: BRØKEN (Bebas Neue, letter-spacing -0.02em)
- Ø unicode: \00D8
- On dark: #F0EDE6 / On light: #0E0E0C / Hero special: #D4FF00

---

## 5. Collections Architecture

| Series | Vibe | Key Pieces |
|---|---|---|
| THE BORROW | Oversized blazers, Oxford shirts, wide-leg trousers | Blazer, Oxford, trouser |
| UTILITY | Cargo, workwear, technical | Cargo pant, bomber, field jacket |
| BARE MINIMUM | Linen, tailored, quiet neutral | Linen shirt, wide shorts, minimal tee |

---

## 6. Hero Section

- Full viewport video, dark overlay 55%
- Headline: Bebas Neue, clamp(72px,13vw,160px), line-height 0.92
- One accent word in #D4FF00
- CTA: DM Mono 11px uppercase, border-bottom in lime
- Video: desaturated, high contrast, raw location, model never poses

---

## 7. Buttons

```css
.btn-primary {
  background: #D4FF00; color: #0E0E0C;
  font-family: 'DM Mono'; font-size: 11px;
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: 14px 36px; border-radius: 0;
}
.btn-ghost {
  background: transparent; color: #F0EDE6;
  border: 1px solid rgba(240,237,230,0.3);
}
.btn-ghost:hover { border-color: #D4FF00; color: #D4FF00; }
```

---

## 8. Brand Voice

DO: "Wide leg. Worn in. Yours."
DON'T: "These flattering trousers are perfect for any occasion!"

- No exclamation marks
- No "flattering" ever
- Size guide uses: chest / shoulder / length

---

## 9. TikTok Content Pillars

| Pillar | Format |
|---|---|
| The Steal | GRWM styling men's cuts |
| The Fit | Slow reveal, no talking |
| The Why | Talking head, dry tone |
| The Drop | 15s product launch |

Caption style: "fit. borrowed from the men's section. link in bio."

---

## 10. SEO Targets (Australia)

- tomboy fashion australia
- women's oversized blazer australia
- androgynous women's clothing australia
- gender neutral fashion australia
- women's wide leg trousers australia

---

*BRØKEN Brand Config v1.0 · Lance Digital · Melbourne*
