# Homepage simplification

Implemented after the user approved reducing content before adding spacing.

The homepage opening now has a shorter headline, one supporting sentence, the setup price and ongoing-cost qualification, and one main action. Removed the decorative note image, duplicate enquiry prompts, repeated quote reassurance and overlapping supplier-cost explanations. The offer uses four short inclusion rows and one annual-budget explanation. Online stores and ongoing support are explicitly excluded. Full responsibilities remain on the linked starter-offer page.

Kept the work example and three-step process. Simplified the process numbers and removed their surrounding boxes and rules. Increased offer and proof spacing using the existing section token, and added a boundary between the process and enquiry form. Body text sizes and form behaviour are unchanged.

## Measured result

Main-content word count fell from 476 to 324, including the unchanged form labels and help text, a reduction of 32%.

| Viewport width | Previous page height | Updated page height |
| --- | --- | --- |
| 320px | 6,218px | 5,108px |
| 390px | 5,801px | 4,755px |
| 768px | 4,035px | 3,235px |
| 1440px | 3,709px | 3,103px |

Measurements use the same local browser and email-fallback form mode before and after. Heights can differ with fonts, device settings and form mode.

## Verification

- Astro check: 61 files, zero errors, warnings or hints.
- Server and static builds passed. Static build generated 17 pages.
- All 22 homepage internal links and fragments resolved against the static output.
- No document overflow or sampled text clipping at widths from 320px to 1920px, including the mobile grid breakpoint.
- Inspected saved desktop and mobile screenshots. Price, costs and the primary action remain readable; the mobile offer stacks its inclusions and costs.
- Final wording adjustment, adding “written” to the quote step, was checked in the live browser at 320px, 390px, 768px and 1440px after the builds.
- No form submission or deployment. This was a homepage edit, not a full accessibility audit.

Evidence is saved in `audit/content-density-2026-09-19/`: `before.json`, `after.json`, `final.json`, `after-desktop.png`, `after-mobile.png` and `after-mobile-offer.png`. The offer image is a scrolled viewport, so its heading crosses the top edge. The earlier review's screenshot failure was resolved for this implementation check.

Only `src/components/LandingPage.svelte` changed in the product code. Existing edits elsewhere were preserved.
