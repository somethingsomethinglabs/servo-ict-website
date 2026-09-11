# Design QA — Hero option 1

## Inputs

- Source visual: `docs/design-options/hero-option-1.png`
- Source dimensions: 1586 × 992 px
- Desktop implementation capture: `docs/design-options/hero-option-1-implementation-desktop.png`
- Normalized desktop capture: `docs/design-options/hero-option-1-implementation-desktop-crop.png`
- Mobile implementation capture: `docs/design-options/hero-option-1-implementation-mobile.png`
- Full comparison: `docs/design-options/hero-option-1-comparison.png` (source left, implementation right)
- Focused comparison: `docs/design-options/hero-option-1-comparison-focus.png` (source left, implementation right)

## Capture conditions

- Page: `/servo-ict-website/`
- Desktop CSS viewport override: 1440 × 900
- Desktop raw capture: 1758 × 1111 px; normalized page crop: 1583 × 992 px
- Mobile CSS viewport override: 390 × 844
- Mobile raw capture: 462 × 1042 px
- Browser capture density: browser-managed high-density output; the desktop crop was normalized against the 1586 × 992 source for visual comparison
- Desktop state: page loaded at the top of the home page
- Mobile state: page loaded at the top; navigation tested both closed and expanded

## Comparison findings and iteration history

1. Initial implementation used the correct service-list concept, but the hero sat too low, the right column overflowed, the swatches were clipped, and the trust strip fell below the opening viewport.
2. The hero width, vertical rhythm, line length, row grid, type scale, and breakpoint were adjusted. Dedicated source-derived swatch assets replaced the temporary solid blocks.
3. The second comparison showed the composition was correct but vertically compressed. The hero height and top spacing were tuned so the eyebrow, service rows, calls to action, and orange trust strip align with the source.
4. Final full-view and focused comparisons show the selected editorial composition, hierarchy, spacing, colour system, swatches, and first-screen cutoff are faithfully represented. Mobile reflows into a readable single-column layout with intact service navigation.

## Functional and quality checks

- Main and hero navigation expose correct accessible names and destinations.
- The mobile menu opens, reports its expanded state, and closes again.
- The Websites hero link navigates to `/servo-ict-website/websites/`.
- Browser console: no errors or warnings.
- `astro check`: 0 errors, 0 warnings, 0 hints.
- Vitest: 4 tests passed.
- Static build: 10 pages built successfully.
- No P0, P1, or P2 visual discrepancies remain.

Final result: passed
