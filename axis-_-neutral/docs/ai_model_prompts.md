# AXIS / NEUTRAL AI 模特提示词库（Krea / Kling）

> 目的：统一 AI 模特形象与画面风格，避免每次生成风格漂移。  
> 使用场景：电商图、TikTok/Reel、Instagram Feed/Story。

## 1. 固定模特描述（品牌一致性）

以下为默认“品牌主模特”描述，建议每次都保留 70% 以上：

```text
Female model, 24-30, androgynous tomboy style, sharp jawline, confident neutral expression,
minimal makeup, natural skin texture, dark brown hair (slick back or low bun),
lean athletic build, relaxed posture, non-sexualized styling, editorial fashion energy.
```

## 2. 统一视觉风格参数

```text
muted tones, low saturation, cinematic contrast, urban texture,
clean composition, negative space, natural movement,
street + studio hybrid, modern Australian city atmosphere
```

## 3. 固定负面词（Negative Prompt）

```text
overly feminine pose, kawaii, cute, girly, heavy glam makeup, pink candy palette,
hyper sexualized pose, exaggerated body proportions, glossy fantasy skin,
cartoon style, anime style, low resolution, blurry face, extra fingers
```

---

## 4. Krea 提示词模板

## A) 电商主图（PDP）
```text
[MODEL_BASE]
wearing [PRODUCT_NAME], full body front angle, clean shoulder line visible,
neutral dark background, soft directional light, clear garment texture,
fashion ecommerce lookbook, high detail, realistic fabric folds, 4k

Negative prompt: [NEGATIVE_BASE]
```

## B) TikTok/Reel 竖版（9:16）
```text
[MODEL_BASE]
walking naturally in Melbourne laneway, wearing [PRODUCT_NAME],
camera follows from mid shot to full shot, subtle motion blur, cinematic,
street fashion campaign, vertical frame 9:16, high detail

Negative prompt: [NEGATIVE_BASE]
```

## C) Instagram Feed（4:5）
```text
[MODEL_BASE]
editorial portrait with [PRODUCT_NAME], concrete wall background,
confident eye contact, minimal props, muted palette, premium streetwear campaign,
4:5 composition, magazine-quality lighting

Negative prompt: [NEGATIVE_BASE]
```

---

## 5. Kling 视频提示词模板

## A) 电商视频（细节展示，6-10秒）
```text
Androgynous female model in AXIS / NEUTRAL styling.
Shot sequence: close-up of shoulder seam -> mid shot walking -> wide shot turn.
Mood: calm, confident, city minimal.
Lighting: soft contrast, desaturated tones.
Keep garment structure visible, no exaggerated posing.
```

## B) TikTok 氛围视频（8-15秒）
```text
Model exits a building in Melbourne CBD, wearing oversized blazer and wide-leg trousers.
Natural movement, one continuous shot, subtle handheld feel.
Mood is effortless and self-assured.
End frame holds on silhouette for product CTA overlay.
Vertical 9:16.
```

## C) Instagram Reels（转化向）
```text
Three-scene progression: office hallway -> street crossing -> evening cafe exterior.
Same model, same core outfit, slight styling changes.
Focus on versatility and structure.
No flashy effects, no bright neon colors.
Vertical 9:16, smooth transitions.
```

---

## 6. 变量占位符（复制时替换）

- `[MODEL_BASE]`：固定模特描述
- `[NEGATIVE_BASE]`：固定负面词
- `[PRODUCT_NAME]`：产品名
- 可选追加：
  - `[FABRIC]`（如 wool blend）
  - `[COLOR]`（如 charcoal / slate）
  - `[LOCATION]`（如 Melbourne laneway）

---

## 7. 快速可用组合（直接复制）

## 电商图快速版
```text
Female model, 24-30, androgynous tomboy style, confident neutral expression, minimal makeup,
wearing oversized charcoal blazer, full body front angle, clean shoulder line visible,
muted tones, low saturation, high detail, ecommerce campaign image, 4k.
Negative prompt: overly feminine pose, cute, girly, heavy glam makeup, blurry, low quality.
```

## TikTok快速版
```text
Androgynous female model walking in Melbourne laneway, oversized blazer and wide-leg trousers,
cinematic contrast, desaturated palette, natural movement, confident expression, vertical 9:16.
Negative prompt: kawaii, pink palette, sexualized pose, cartoon style, low resolution.
```

## Instagram快速版
```text
Editorial portrait of androgynous female model in structured utility jacket,
concrete backdrop, clean composition, muted Australian city tones, premium fashion campaign, 4:5.
Negative prompt: girly styling, heavy beauty retouch, neon color explosion, anime.
```
