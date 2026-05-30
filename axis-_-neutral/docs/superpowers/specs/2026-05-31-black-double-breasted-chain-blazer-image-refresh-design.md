# Black Double-Breasted Chain Blazer Image Refresh Design

Date: 2026-05-31
Product slug: `black-double-breasted-chain-blazer-6754`
Product name: `Black Double-Breasted Chain Blazer`

## Objective

Replace the current seven local product images for this SKU with a new, more premium e-commerce image set that still reads as the same physical garment. The new set should feel like luxury grey-studio product photography rather than flat white marketplace imagery, while remaining safe to ship directly through the existing frontend asset pipeline.

## Why This Work Exists

The site already contains a valid seven-file image pack for this SKU, and the frontend now loads local committed product image sets correctly. The remaining gap is visual quality: the current set is serviceable, but the desired direction is a stronger e-commerce presentation with colder, sharper studio styling that better matches the brand tone.

## Confirmed Creative Direction

- Overall visual direction: luxury grey studio photography.
- Background tone: cool grey concrete studio backdrop.
- Product intent: e-commerce first, brand-sensitive second.
- Cover image policy: keep a model-on cover image for `07`.
- Image pack policy: regenerate all seven images as a fresh set, not a light retouch.

## Deliverables

Replace the following files in:
`src/assets/images/products/black-double-breasted-chain-blazer-6754/`

1. `01-flatlay-white.png`
2. `02-detail-chain.png`
3. `03-detail-cuff-buttons.png`
4. `04-detail-lapel-buttons.png`
5. `05-detail-pocket-flap.png`
6. `06-detail-interior-label.png`
7. `07-model-cover-front.png`

The filenames stay unchanged so the frontend continues to render them without any further code changes.

## Shot Plan

### 01 `flatlay-white`

- Front-facing product hero without a model.
- Full garment visible.
- Cool grey studio setting rather than pure marketplace white.
- Composition should clearly show the oversized silhouette, shoulders, lapel shape, double-breasted closure, chain detail, and lower pocket placement.

### 02 `detail-chain`

- Tight close-up of the left chest welt pocket area.
- Chain and clasp must be the clear focal point.
- Metal finish should read clean and silver, not chrome-blue or gunmetal-black.

### 03 `detail-cuff-buttons`

- Tight close-up of one cuff.
- Four cuff buttons must be visible.
- Sleeve fabric should still read matte black and tailored, not glossy.

### 04 `detail-lapel-buttons`

- Close-up of the lapel and double-breasted front structure.
- Button placement and spacing must stay consistent with the source garment.
- The notched lapel shape must remain sharp and slightly oversized.

### 05 `detail-pocket-flap`

- Close-up of the lower flap pocket and nearby fabric surface.
- Focus on tailoring lines, stitch cleanliness, and flap geometry.

### 06 `detail-interior-label`

- Interior/neck label view.
- Do not preserve supplier branding that conflicts with storefront presentation.
- If a label is shown, it should be generic, unobtrusive, and visually plausible.

### 07 `model-cover-front`

- Model-on cover image in the same cool grey concrete studio.
- Styling should use black trousers or similarly neutral dark bottoms.
- Pose should feel sharp, direct, and tomboy; no soft editorial pose, no girly styling.
- The garment remains the hero. Composition should still work as a product card cover and PDP first slide.

## Non-Negotiable Product Truth Constraints

The regenerated set must preserve the garment's factual identity:

- Matte black oversized blazer.
- Double-breasted front.
- Silver chain attached at the left chest pocket area.
- Structured shoulder line.
- Sleeve cuff button count must stay at four.
- Lower flap pocket placement must remain consistent.
- Overall silhouette must remain oversized, not cropped, cinched, slim-fit, or hourglass.

The generation must not introduce:

- Extra embellishments.
- Different hardware placement.
- Different pocket count or geometry.
- Different closure structure.
- Different garment color.
- Feminine styling details that shift the product away from the existing tomboy positioning.

## Source and Validation Strategy

- Use the supplier garment image and the current local seven-image pack as hard references.
- Treat garment structure as locked and style treatment as flexible.
- Compare each regenerated image against the source before replacement.
- Reject any output that looks like a different blazer rather than a better presentation of the same blazer.

## Technical Execution Strategy

- Generate new raster assets with AI image generation.
- Save the final selected images into the existing product asset folder, replacing the current seven files one-for-one.
- Do not change frontend references, slugs, or data wiring.
- Re-run existing verification after replacement:
  - `npm run check:product-images -- black-double-breasted-chain-blazer-6754`
  - `npm run lint`
  - `npm run build`

## Acceptance Criteria

This work is complete when all of the following are true:

- All seven files exist under the current slug directory with the same filenames.
- The set reads as one coherent cool-grey studio image pack.
- `07` is strong enough to function as the card image and PDP cover.
- `01-06` still feel like e-commerce product-detail assets rather than abstract fashion editorial crops.
- The blazer still matches the real product in shape, hardware, and construction.
- Project validation and production build both pass after replacement.

## Out of Scope

- Changing product copy.
- Changing the supplier image URLs in `supplierImages.ts`.
- Adding new image slots beyond the standard seven-file pack.
- Redesigning the PDP layout.
