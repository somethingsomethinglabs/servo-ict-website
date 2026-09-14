# Homepage revision design QA

Date: 14 September 2026

**Findings**

No actionable P0, P1 or P2 findings remain. The revised homepage follows the requested reference direction: a warm neutral reading surface, a single strong colour panel, dark outlines, solid shadows and fewer competing choices. It adapts that system to Servo ICT's content rather than reproducing the reference page.

**Source and implementation evidence**

- Source visual truth: `audit/2026-09-14/persona-interviews/06-kristi-reference-current.png`
- Earlier Servo state: `audit/2026-09-14/persona-interviews/01-current-home-desktop.png` through `05-current-menu-mobile.png`
- Rendered implementation: `audit/2026-09-14/persona-interviews/07-updated-home-desktop.png` through `11-updated-menu-mobile.png`
- Full-view comparison containing source and implementation together: `audit/2026-09-14/persona-interviews/12-design-comparison-desktop.png`
- Focused hero-copy comparison: `audit/2026-09-14/persona-interviews/13-design-comparison-hero-copy.png`
- Focused colour-panel comparison: `audit/2026-09-14/persona-interviews/14-design-comparison-color-panel.png`
- Implementation route: `http://localhost:4321/servo-ict-website/`

**Viewport, state and normalization**

- Desktop source and implementation files are both 1280 × 800 pixels in light mode at the top of the homepage. The collaborative preview setting was 1280 × 800. Its runtime content area measured 1402 × 876 CSS pixels and the preview normalized the implementation capture to 1280 × 800 pixels.
- The source site's original browser density was not exposed. It was captured at the same 1280 × 800 output size. Its content and product purpose differ, so exact pixel positions and text wrapping are not acceptance criteria.
- Mobile was rendered inside a same-origin iframe with `innerWidth` 390 CSS pixels and a 375-pixel content width after the vertical scrollbar. The preview stage normalized 1402 × 876 CSS pixels to 1280 × 800 output pixels. A 356 × 731 pixel region was cropped and normalized to 390 × 800 for `10-updated-home-mobile.png` and `11-updated-menu-mobile.png`.
- Desktop state: homepage top, no hover, no focused control. Mobile states: homepage top and menu open.

**Full-view comparison**

The combined file `12-design-comparison-desktop.png` shows the reference and Servo implementation in one image. Both use a quiet off-white field, a dominant dark headline, one vivid pink region, sparse navigation and hard outlined controls. Servo's right panel contains a practical starter checklist instead of the reference portrait. That is an intentional content decision: the panel answers what a low-confidence business owner can buy without introducing a decorative asset.

**Focused comparisons**

- `13-design-comparison-hero-copy.png` confirms similar headline weight, short line lengths, open surrounding space and one clear primary action. Servo's longer service promise wraps to three lines by design.
- `14-design-comparison-color-panel.png` confirms the accent is confined to the right side and uses the same dark-border and hard-shadow language. The checklist replaces the reference illustration while retaining the panel's visual weight.

**Required fidelity surfaces**

- Fonts and typography: Servo retains Inter Variable with system fallbacks. The hero uses an 820 optical weight, tight tracking and a 0.97 line height; body copy uses a quieter weight and 1.65 line height. Desktop and 390px captures show no clipping, truncation or accidental orphaned controls. The reference uses a different display face, but matching its font was not requested and would weaken Servo's existing consistency.
- Spacing and layout rhythm: the desktop hero is a balanced two-column composition with generous outer space. Mobile stacks message, actions and starter panel in that order. Cards use equal padding, 2px outlines and consistent solid shadows. No horizontal overflow was detected at desktop or 390px.
- Colours and visual tokens: the page uses ink `#242126`, cream `#F7F3EC`, off-white `#FFFDFA`, coral `#F27AB5` and mint `#C5EDDC`. Coral marks starter choices and selected work; mint marks reassurance, handover and contact. The rejected mustard, blue and violet tokens are absent from the revised components. Contrast checks returned 14.38:1 for ink on cream, 6.23:1 for ink on coral, 12.51:1 for ink on mint, 15.66:1 for off-white on ink and 6.14:1 for the dark magenta kicker on cream.
- Image quality and asset fidelity: the Servo logo and real 12Grapes screenshot remain source assets. The logo is rendered in monochrome to keep the new palette coherent. The project screenshot retains its natural aspect ratio, border and sharp rectangular crop. No reference artwork, generated substitute, emoji or CSS-drawn asset was introduced.
- Copy and content: the first screen names the starter offer, the next section presents three familiar problems, and framework and supplier terms were removed from the homepage proof. The project moved below service choices, the homepage blog section was removed, and the email handoff now states what the primary button does in one sentence.

**Interaction and implementation checks**

- The header enquiry action reached the form and placed it at the top of the viewport.
- Name, email and message fields accepted input; the service select accepted the website choice.
- `Copy instead` produced the successful `Enquiry copied` state without sending anything externally.
- The 390px menu opened with three large destinations. The existing Escape handler and focus return remain in the component.
- Desktop and mobile document widths matched their content widths, with no horizontal overflow.
- The browser console was checked on the correct route. No application-origin error appeared. The preview retained its own Electron sandbox messages and one 404 from an earlier deliberate navigation to the unbased root path; neither came from the rendered application route.
- `npm run check`: 0 errors, 0 warnings and 0 hints.
- `npm test`: 2 files and 5 tests passed.
- `npm run build:static` and `npm run build`: passed.
- `git diff --check`: passed.

**Comparison history**

1. Initial review found three blocking design issues: strong colour filled both hero columns, the website case study appeared before visitors could identify their need, and navigation and form language demanded too much interpretation. Evidence: `01-current-home-desktop.png` through `05-current-menu-mobile.png`.
2. The implementation moved strong coral to one side, made cream the reading field, placed plain service choices first, reduced the menu to three destinations, moved proof down and simplified the enquiry instructions. Post-fix evidence: `07-updated-home-desktop.png` through `11-updated-menu-mobile.png`.
3. The combined full and focused comparisons found no remaining P0, P1 or P2 visual difference against the requested reference direction. Evidence: `12-design-comparison-desktop.png` through `14-design-comparison-color-panel.png`.

**Open questions**

- The only supplied customer example is a website project. A real business-IT or account-security outcome would strengthen trust when one becomes available; inventing one would be misleading.

**Implementation checklist**

- [x] Confine vivid colour to purposeful panels.
- [x] Put familiar service choices before portfolio proof.
- [x] Reduce navigation and remove the homepage blog section.
- [x] Simplify process and enquiry language.
- [x] Verify desktop, mobile, menu, form and copy-fallback states.
- [x] Compare reference and implementation in combined full and focused images.

**Follow-up polish**

- Add one verified business-IT result when a suitable customer story and approved wording exist.

final result: passed
