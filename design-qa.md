# Slate and signal palette — design QA

## Scope and evidence

The accepted colour mock-up was implemented as a palette change without altering the approved page structure.

- Source visual truth: `/home/rowanp/.codex/generated_images/01a0a09e-12a9-7121-bcbb-9bb07f024620/exec-25e6eedd-7b6d-4857-9a9d-e811f615109e.png` (1383 × 1137).
- Browser-rendered implementation: `audit/slate-signal-theme/homepage-desktop-final-1280x800.png`.
- Full comparison: `audit/slate-signal-theme/source-vs-implementation-desktop-final.png`, with the source on the left and implementation on the right.
- Browser and state: T3 collaborative preview at `http://localhost:4324/`, homepage default state, empty form and collapsed disclosures.
- Capture: the preview was set to 1280 × 800 and the PNG is 1280 × 800 at DPR 1. During initial inspection the preview client reported a 1402 × 876 CSS viewport because of its display scaling. The source was proportionally resized and top-cropped to 1280 × 800 for the comparison.

A separate focused crop was unnecessary: the palette is flat and global, both full views remain legible at original resolution, and the exact computed styles were checked in the browser.

## Result

No actionable P0, P1 or P2 mismatch remains. The implementation uses the selected palette consistently:

| Role | Colour | Use |
| --- | --- | --- |
| Canvas | `#EAEFEF` | Main page background and light text on dark surfaces |
| Support | `#BFC9D1` | Supporting panels, illustration fields and image offsets |
| Slate | `#25343F` | Text, borders, dark sections and footer |
| Signal orange | `#FF9B51` | Primary actions, process emphasis and selected states |

## Fidelity review

| Surface | Assessment |
| --- | --- |
| Fonts and typography | Existing Inter Variable typography, weights, wrapping and hierarchy are unchanged. |
| Spacing and layout | Page order, grids, spacing and responsive rules are unchanged; this implementation is intentionally a colour and illustration treatment only. |
| Colours and tokens | Role-based tokens map exactly to the four supplied hex values. Light canvas, blue-grey support, dark slate and orange emphasis follow the accepted mock-up. |
| Image quality and assets | The storefront photograph and 12Grapes project imagery are unchanged. The handwritten note and illustrative inbox were regenerated in the selected palette and load as optimized WebP assets at their expected natural sizes. |
| Copy and content | No copy, pricing, offer detail or form behaviour changed. |

The form submission confirmation page uses the same four colours; no earlier teal, brass or warm-grey values remain in the application source.

## Accessibility and interaction checks

- Slate on canvas is 11.02:1, slate on support is 7.61:1, and slate on orange is 6.13:1.
- Muted text was raised to an 84% slate mix, giving approximately 4.78:1 on the support colour.
- Form placeholders now use the explicit muted colour at full opacity. Input boundaries and light-surface focus rings use slate.
- Focus rings switch to orange inside dark sections so the indicator stays visible.
- The primary action reaches `#consultation-form`.
- The process disclosure opens and closes normally.
- Both new illustration assets load successfully, and the desktop page has no horizontal overflow.
- The final browser snapshot showed no console or network errors.

## Correction history

The first pass exposed two P2 contrast issues: browser-default placeholder opacity was too weak on the support background, and orange focus outlines were insufficient on pale surfaces. The final pass uses the 84% muted token for placeholders, slate borders and focus rings on light surfaces, and orange focus rings only on dark surfaces. Post-fix screenshots and computed-style checks confirm the correction.

The T3 preview's mobile resize command timed out repeatedly, so a fresh phone screenshot could not be captured in this pass. No breakpoint, spacing, layout or responsive rule changed, and the same branch's earlier responsive QA remains applicable. This is a P3 evidence gap rather than a palette mismatch.

## Engineering checks

- `npm run check`: passed with no errors, warnings or hints.
- `npm test`: 3 files and 17 tests passed.
- `npm run build`: passed; all production routes built successfully.
- `git diff --check`: passed.

final result: passed
