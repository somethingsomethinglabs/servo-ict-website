# Concept 3 implementation and colour system review

The owner selected the restyled Concept 3 after reviewing the published Concept 1. The homepage follows that image's storefront hero, connected website and email example, compact pricing, project proof strip, dark process section and open enquiry area.

## Result

No actionable P0, P1 or P2 finding remains in the implemented homepage scope. An independent Sol review checked audience fit, the code changes, desktop captures and seven phone-width captures. Its earlier wording finding and the visual issues found during implementation were corrected. This is an expert and simulated-audience review, not customer testing.

## Source and capture evidence

Source visual truth: `docs/design/customer-journey-2026-09-14/merged-style-e0c09cc/concepts/concept-3.png`, 887 x 1774 pixels. This is an image mock-up of a desktop page, with no separate mobile reference.

Implementation: `http://localhost:4321/servo-ict-website/`, empty form and collapsed disclosures for the final design captures.

- Full journey comparison: `audit/concept-3-build/comparison-final.png`. Source is on the left, implementation on the right.
- Final desktop composite: `audit/concept-3-build/desktop-final.png`.
- Focused same-region comparisons: `comparison-hero-final.png`, `comparison-connected-final.png` and `comparison-process-final.png` in the same directory. These were opened together with the full comparison to check text, image treatment, spacing and controls.
- Mobile evidence: `mobile-journey-final.png`, with individual `mobile-390-hero.png`, `mobile-390-included.png`, `mobile-390-email.png`, `mobile-390-costs.png`, `mobile-390-work.png`, `mobile-390-process-final.png` and `mobile-390-form.png`.
- Independent findings and resolution: `docs/design/concept-3-build/review.md`.

The desktop browser viewport measured 1574 x 852 CSS pixels. Five normal viewport captures measured 1557 x 843 pixels. They were placed at their measured scroll positions, with overlap and without redrawing page content, producing a 1540 x 3435 image after removing the scrollbar. Comparison copies normalize the page width to 887 pixels, preserving height. The implementation is 1978 pixels high at that scale. Capture measurements and the scale are in `desktop-capture-manifest.json` and `normalization.json`. The reference is treated as a desktop composition; the implementation caps content width on wide screens.

Chrome's full-page and resized-window screenshots repeatedly timed out. Final desktop evidence therefore uses overlapping ordinary captures. Phone evidence uses the actual page inside a same-origin 390 x 770 CSS-pixel iframe, captured in Chrome at normal window size. The iframe is cropped from the raw screenshot at its measured bounds. These are real responsive renders, not image mock-ups or a CSS recreation of the mobile page. The temporary review wrapper was removed before the final builds. Separate browser viewport checks measured 320, 390 and 768 CSS pixels and verified layout bounds and interactions. A physical handset and mobile browser chrome were not tested.

## Comparison and correction history

1. The independent review found a P2 audience issue in the setup row and quote disclosure. The phrases about accounts and devices were unclear. Setup now says "Website and business email setup, help with the wording, and a short walkthrough." The quote explains who needs access and where email will be used. The reviewer verified the resolution in the source and desktop pricing capture.
2. The first desktop process heading left "next." on an extra line. `comparison-process-before.png` contains the source and that capture. Adjusted its column proportions and type scale. `comparison-process-final.png` shows the corrected two-line heading on desktop.
3. The first phone process capture exposed missing spaces where desktop line breaks were hidden. Added actual spaces around those breaks. `mobile-390-process-final.png` shows the corrected headings, and the independent reviewer confirmed the fix.
4. The final full comparison and focused comparisons show no remaining actionable P0/P1/P2 difference. The phone review confirms the reading order, visible ownership statement, card fit, readable copy, form labels and touch targets.

## Required fidelity surfaces

| Surface | Assessment |
| --- | --- |
| Fonts and typography | Existing Inter Variable and heavy, tight editorial headings retained. The hero uses the selected three-line composition on desktop. Section labels, ordinary body copy and form text keep distinct sizes. Form inputs are 16px. Process heading wrapping and mobile word spacing were corrected. |
| Spacing and layout | The selected page order, asymmetric hero, side-by-side example, teal ownership strip, row-based pricing and three-column process are implemented. Phone layouts stack without requiring a horizontal swipe. Full-width colour bands and flat shadows retain the reference's structure. |
| Colours and tokens | Uses Ink Black, Dust Grey, a lighter Dust-derived canvas, Air Force Blue, Dark Teal and Soft Brass. The flat role-based colour system replaces the earlier pink and mint treatment. Contrast and visible focus treatments remain in place. |
| Image quality and assets | Storefront, handwritten annotation and email illustration were generated from the selected reference, inspected and delivered as optimized WebP assets. They total about 200 KB. The real 12Grapes screenshot supplies both the website example and client proof. Matching Phosphor icons provide the controls and supporting symbols. No custom icon drawings or image placeholders were introduced. |
| Copy and content | The combined website, email and account setup offer stays focused on a new business owner. Costs remain quote-based; no price, duration, account quantity or guarantee was invented. Ownership, quote approval, later changes, phone hours and the reply target remain available. |

## Deliberate production adaptations

The real client screenshot replaces the image generator's reconstructed project. Its surrounding captions explain how customers find the business and how enquiries reach the owner. The sample inbox is labelled illustrative and contains no invented customer evidence.

The production page contains more contact and scope information than the mock. That accounts for its extra height, along with supporting service links and owner information in the footer. The selected layout is preserved while the footer remains useful for visitors seeking existing-business help.

The static form retains "Open email draft" and "Copy enquiry instead". It explains that the visitor must send the draft. The owner deferred the direct delivery provider decision until after preview; this design change does not select a provider or alter delivery logic. No actual email was sent in this review.

## Functional checks

- At 320, 390 and 768 CSS pixels, visible homepage content stayed within the viewport. The intentionally hidden honeypot was excluded from the check.
- At 390 pixels, the menu opened; Escape closed it and returned focus to the menu button.
- The primary "Help me get started" action reached `#consultation-form`.
- Quote and booking disclosures opened and closed normally.
- At tablet width, an invalid contact value produced "Enter a valid email address or phone number.", focused the contact field, set its invalid state and retained the other entered values.
- All homepage images loaded. The rebuilt supporting routes remain available. Form inputs retained 16px text.
- Existing reduced-motion rules continue to disable smooth scrolling and button movement. An OS-level reduced-motion or assistive-technology session was not performed.
- No error overlay or visible runtime failure appeared during the final page interactions. A complete browser-console export was not obtained; build and type diagnostics were checked separately.

## Build checks

- `npm run check`: 23 files, no errors, warnings or hints.
- `npm test`: 3 files, 17 passing tests. Delivery logic is unchanged by this redesign.
- `npm run build:static`: passed, 10 pages.
- `npm run build`: passed, Node server build.
- `git diff --check`: passed.

The background preview remains running. Default browser sizing is restored for handoff. The previous Concept 1 QA report is preserved at `docs/design/concept-3-build/previous-concept-1-qa.md`.

## Follow-up polish

No P3 item needs to delay this implementation. Actual customer feedback and the separately deferred direct enquiry setup remain outside this visual change.

Historical Concept 3 result: passed

## Deeper teal refinement, 15 September 2026

The selected visual target was the approved browser trial using `#365C55` for the global feature-colour token. The implementation changes only `--colour-feature`; typography, spacing, imagery, copy and interactions remain unchanged.

- Source visual truth: `audit/colour-style-guide/deeper-teal-trial.png`, 1150 x 945 pixels.
- Browser-rendered implementation: `audit/colour-style-guide/deeper-teal-implemented.png`, 1150 x 945 pixels.
- Full-view comparison: `audit/colour-style-guide/deeper-teal-comparison.png`, with the trial on the left and implementation on the right.
- Viewport and state: 1150 x 945 CSS pixels at 1x density, homepage at `scrollY = 943`, empty form and collapsed disclosures.
- Focused comparison: not needed because the requested change is one global token, the relevant teal regions are legible in the full-view comparison, and the equal-size captures have an absolute pixel error count of zero.

### Comparison result

No P0, P1 or P2 mismatch remains. The implemented feature token computes to `#365C55` on the ownership strip, client-work band and footer. Dust Grey on the deeper teal has a 5.17:1 contrast ratio, improving the earlier 4.52:1 pairing.

| Surface | Assessment |
| --- | --- |
| Fonts and typography | Unchanged from the accepted implementation; weights, wrapping and hierarchy match the trial exactly. |
| Spacing and layout | Unchanged; the equal-size trial and implementation captures align exactly. |
| Colours and tokens | `--colour-feature` matches the selected `#365C55`; all other palette tokens remain unchanged. |
| Image quality and assets | Existing raster artwork, client screenshot, logo and icons are unchanged and remain sharp. |
| Copy and content | No text changed. |

The primary homepage action still reaches `#consultation-form`. The final browser check found no console errors, failed requests, broken images or horizontal overflow. `npm run check`, all 17 tests and the production build passed.

final result: passed
