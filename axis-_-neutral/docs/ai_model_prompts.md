# AXIS / NEUTRAL AI 模特提示词库（Krea / Kling / Cursor）

> 目的：统一 AI 模特形象与画面风格，避免每次生成风格漂移。  
> 使用场景：电商图、TikTok/Reel、Instagram Feed/Story。  
> 品牌人格：**androgynous（轮廓）+ alpha female（态度）** — 非 tomboy 主叙事。

## 0) 品牌模特资产（Canonical Reference）

三张定稿参考图已保存在：

| ID | Persona | 参考图 | 默认用量 |
|---|---|---|---|
| **Model A** | City Alpha | `src/assets/images/models/model-a-city-tomboy.png` | 25% |
| **Model B** | Androgynous Switcher | `src/assets/images/models/model-b-style-switcher.png` | **50%（主模特）** |
| **Model C** | Structured Minimal | `src/assets/images/models/model-c-minimal-tailoring.png` | 25% |

> 文件名含 `tomboy` 为历史命名，Persona 以本表为准。

**主模特：Model B（Androgynous Switcher）** — 品牌默认脸，Hero / Drop / 社交优先使用。

生成新产品图时：上传对应参考图 + 使用下方 `[MODEL_*]` prompt 块，保持 70% 以上不变。

---

## 1) 三位固定模特描述

### Model A — City Alpha

```text
Female model, 26-30, androgynous alpha-energy style, sharp jawline, confident neutral expression,
minimal makeup, natural skin texture, dark brown hair slicked back,
lean athletic build, upright posture, non-sexualized styling, editorial fashion energy,
Melbourne urban street atmosphere, dominant silhouette not playful tomboy energy.
```

### Model B — Androgynous Switcher（主模特）

```text
Female model, 22-27, androgynous with soft experimental energy, auburn-dark medium length hair
in low ponytail, minimal makeup, natural skin, slim build, confident calm expression,
feminine-masc style blend, gallery or cafe urban setting, soft natural daylight.
```

### Model C — Structured Minimal

```text
Female model, 30-38, quiet confident presence, clean bone structure, black hair in low sleek bun,
minimal makeup, tailored posture, refined androgynous elegance,
structured studio lighting, premium tailoring aesthetic, alpha-minimal not corporate boss.
```

---

## 2) 统一视觉风格参数

```text
muted tones, low saturation, cinematic contrast, urban texture,
clean composition, negative space, natural movement,
street + studio hybrid, modern Australian city atmosphere
```

色彩参考：`#0E0E0C` / `#F0EDE6` / `#C8B090` — 不用高饱和荧光色。

---

## 3) 固定负面词（Negative Prompt）

```text
overly feminine pose, kawaii, cute, girly, heavy glam makeup, pink candy palette,
hyper sexualized pose, exaggerated body proportions, glossy fantasy skin,
cartoon style, anime style, low resolution, blurry face, extra fingers,
girl boss aesthetic, hustle bro energy, playful tomboy childlike styling
```

---

## 4) Krea 提示词模板

### A) 电商主图（PDP）

```text
[MODEL_BASE]
wearing [PRODUCT_NAME], full body front angle, clean shoulder line visible,
neutral dark background, soft directional light, clear garment texture,
fashion ecommerce lookbook, high detail, realistic fabric folds, 4k

Negative prompt: [NEGATIVE_BASE]
```

### B) TikTok/Reel 竖版（9:16）

```text
[MODEL_BASE]
walking naturally in Melbourne laneway, wearing [PRODUCT_NAME],
camera follows from mid shot to full shot, subtle motion blur, cinematic,
street fashion campaign, vertical frame 9:16, high detail

Negative prompt: [NEGATIVE_BASE]
```

### C) Instagram Feed（4:5）

```text
[MODEL_BASE]
editorial portrait with [PRODUCT_NAME], concrete wall background,
confident eye contact, minimal props, muted palette, premium streetwear campaign,
4:5 composition, magazine-quality lighting

Negative prompt: [NEGATIVE_BASE]
```

---

## 5) Kling 视频提示词模板

### A) 电商视频（细节展示，6-10秒）

```text
Androgynous female model in AXIS / NEUTRAL styling.
Shot sequence: close-up of shoulder seam -> mid shot walking -> wide shot turn.
Mood: calm, confident, city minimal, alpha-assured not aggressive.
Lighting: soft contrast, desaturated tones.
Keep garment structure visible, no exaggerated posing.
```

### B) TikTok 氛围视频（8-15秒）

```text
Model exits a building in Melbourne CBD, wearing oversized blazer and wide-leg trousers.
Natural movement, one continuous shot, subtle handheld feel.
Mood is effortless and self-assured.
End frame holds on silhouette for product CTA overlay.
Vertical 9:16.
```

### C) Instagram Reels（转化向）

```text
Three-scene progression: office hallway -> street crossing -> evening cafe exterior.
Same model, same core outfit, slight styling changes.
Focus on versatility and structure.
No flashy effects, no bright neon colors.
Vertical 9:16, smooth transitions.
```

---

## 6) 变量占位符（复制时替换）

- `[MODEL_BASE]`：从上方 Model A / B / C 选一段；**默认用 Model B**
- `[NEGATIVE_BASE]`：固定负面词
- `[PRODUCT_NAME]`：产品名
- 可选追加：
  - `[FABRIC]`（如 wool blend）
  - `[COLOR]`（如 charcoal / slate）
  - `[LOCATION]`（如 Melbourne laneway）

---

## 7) 快速可用组合（直接复制）

### 电商图 — Model B 主模特（默认）

```text
Female model, 22-27, androgynous with soft experimental energy, auburn-dark medium length hair
in low ponytail, minimal makeup, confident calm expression,
wearing [PRODUCT_NAME], full body front angle, clean shoulder line visible,
muted tones, low saturation, high detail, ecommerce campaign image, 4k.
Negative prompt: overly feminine pose, cute, girly, heavy glam makeup, blurry, low quality.
```

### TikTok — Model B

```text
Androgynous female model with auburn-dark low ponytail walking in Melbourne laneway,
wearing [PRODUCT_NAME], cinematic contrast, desaturated palette, natural movement,
confident expression, vertical 9:16.
Negative prompt: kawaii, pink palette, sexualized pose, cartoon style, low resolution.
```

### Instagram — Model B

```text
Editorial portrait of androgynous female model, auburn-dark low ponytail,
wearing [PRODUCT_NAME], concrete or gallery backdrop, clean composition,
muted Australian city tones, premium fashion campaign, 4:5.
Negative prompt: girly styling, heavy beauty retouch, neon color explosion, anime.
```

---

## 8) 上架图片建议（每 SKU）

1. CJ 原图 × 2（颜色 / 细节真实）
2. **Model B 全身 front**（品牌主视觉，默认）
3. Model A 或 C 场景图 × 1（系列多样性）
4. 细节 close-up × 1（CJ 原图或 flat lay）

PDP 必须保留 supplier 图；AI 图用于 Hero、社交、Lookbook。
