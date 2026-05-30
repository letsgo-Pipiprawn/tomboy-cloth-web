# Black Multi-Pocket Cargo Trouser — Image Set Design

Date: 2026-05-31  
Product slug: `loose-casual-black-multi-pocket-trousers-17638570`  
Product name: `Black Multi-Pocket Cargo Trouser`

## Objective

Create a new standard seven-file local product image set for this SKU. The set should read as premium cool-grey studio e-commerce photography aligned with AXIS / NEUTRAL — utility cargo without techwear cosplay or supplier marketplace styling.

## Why This Work Exists

This SKU is featured in the capsule (`FEATURED_IN_STOCK_SLUG`) but has no committed local image pack yet. PDP still relies on CJ supplier URLs. A local seven-file set unlocks Model B cover usage on cards, lookbook, and hero candidates while keeping supplier URLs canonical on PDP.

## Confirmed Creative Direction

- Overall visual direction: luxury cool-grey concrete studio (same family as blazer refresh).
- Background tone: muted grey studio, not pure marketplace white.
- Product intent: e-commerce first, brand-sensitive second.
- Cover image policy: Model B on `07`.
- Image pack policy: fresh seven-file set from supplier garment truth.

## Deliverables

Output to: `src/assets/images/products/loose-casual-black-multi-pocket-trousers-17638570/`

1. `01-flatlay-white.png`
2. `02-detail-waist-drawstring.png`
3. `03-detail-side-seam.png`
4. `04-detail-cargo-pocket.png`
5. `05-detail-ankle-strap.png`
6. `06-detail-fabric-weave.png`
7. `07-model-cover-front.png`

Filenames stay fixed for `productAssets.ts` glob loading.

## Shot Plan

### 01 `flatlay-white`

- Front-facing trouser hero without model.
- Full garment visible: high-rise elastic waist, drawstring, wide thigh, tapered ankle.
- Cool grey studio backdrop.
- Multi-pocket cargo layout clearly readable.

### 02 `detail-waist-drawstring`

- Macro of elastic waistband, drawstring, and zip fly area.
- Matte black twill/nylon texture visible.

### 03 `detail-side-seam`

- Close-up of side seam and leg panel articulation.
- Clean stitch lines, structured volume through thigh.

### 04 `detail-cargo-pocket` (hero feature)

- Tight close-up of thigh cargo pocket with flap closure.
- **No supplier logo or branding** on pocket surface.
- 3D bellows pocket geometry is the focal point.

### 05 `detail-ankle-strap`

- Close-up of tapered ankle with velcro/tab adjustment strap.
- Stacked fabric at cuff reads intentional, not sloppy.

### 06 `detail-fabric-weave`

- Fabric macro showing matte black weave.
- No label, no branding, no model.

### 07 `model-cover-front`

- Model B (androgynous, auburn-dark low ponytail) wearing the trousers.
- Styled with black structured top or bare tee — no techwear mask, cap, or tactical jacket.
- Cool grey concrete studio, sharp tomboy posture, 4:5 crop.
- Trousers remain hero; wide-leg cargo volume visible.

## Non-Negotiable Product Truth Constraints

Must preserve:

- Solid matte black colour.
- High-rise elastic waist with drawstring.
- Large 3D cargo pockets on thighs with flap closures.
- Relaxed wide thigh tapering to cinched ankle.
- Velcro/tab ankle adjustment.
- Articulated leg panel construction.

Must not introduce:

- Supplier white logo on pockets.
- Camouflage, prints, or colour variants.
- Slim-fit or skinny leg.
- Feminine styling (heels, mini tops, soft poses).
- Extra hardware or pocket count changes.

## Source and Validation

- Hard references: `references/supplier-01.jpg` through `supplier-03.jpg` (CJ).
- PDP gallery stays in `supplierImages.ts` — do not write AI URLs there.
- Validation: `npm run check:product-images -- loose-casual-black-multi-pocket-trousers-17638570`

## Out of Scope

- Changing product copy or pricing.
- Replacing CJ supplier URLs on PDP.
- Adding slots beyond the standard seven-file pack.
