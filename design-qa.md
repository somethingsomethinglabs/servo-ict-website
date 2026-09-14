# Homepage style review

Date: 14 September 2026

final result: passed

**Findings**

No actionable P0, P1 or P2 findings remain in the homepage styling pass. The approved direction was to combine Panda CSS's broad colour fields with Kristi Digital's outlines and solid shadows, using Servo's existing content and brand colours. This is an adaptation of those references, rather than a reproduction of either website.

**Source and implementation evidence**

All evidence paths below are relative to `audit/2026-09-14/homepage-style/`.

| Evidence | File |
| --- | --- |
| Source visual truth: Panda CSS, light mode | `reference-panda.jpg` |
| Source visual truth: Kristi Digital | `reference-kristi.jpg` |
| Rendered desktop homepage | `desktop-hero.jpg` |
| Rendered desktop service cards | `services-desktop.jpg` |
| Full-view comparison, both references and implementation together | `comparison-full.jpg` |
| Focused comparison, reference and implementation buttons together | `comparison-details.jpg` |
| Reopenable comparison board | `comparison.html` |
| Phone homepage, menu and cards | `mobile-hero.jpg`, `mobile-menu-open.jpg`, `mobile-services.jpg` |
| Small phone and tablet | `phone-320.jpg`, `tablet-768.jpg` |

The source websites are [Panda CSS](https://panda-css.com/) and [Kristi Digital](https://kristi.digital/). Their screenshots were captured during the preceding mood-board research. Implementation URL: `http://localhost:4321/servo-ict-website/`.

**Viewport, state and normalization**

The implementation was inspected in Chrome with the existing 90% browser zoom. The reported device pixel ratio was approximately 0.9. The viewport capability was adjusted to obtain the CSS sizes below; reported CSS dimensions were verified from the rendered page.

| State | CSS viewport | Screenshot pixels |
| --- | --- | --- |
| Desktop homepage and service cards | 1440 × 900 | 1581 × 1000 |
| Phone homepage and menu | 390 × 845 | 414 × 938 |
| Small phone homepage | 320 × 800 | 337 × 889 |
| Tablet homepage | 768 × 900 | 834 × 1000 |
| Comparison board | 1440 × 1000 | 1581 × 1111 |

Both reference images are 1401 × 759 pixels. Their original CSS viewport and density were not recorded. Their layouts, content and subject matter differ deliberately from Servo's. Pixel-perfect alignment and typeface identity are therefore not acceptance criteria.

The browser's captures contain blank padding at the right and bottom. The comparison board clips that padding and scales the remaining regions proportionally. It uses a 1423 × 882 visible region for the desktop hero and 1423 × 750 for the service section, with both references shown at their original aspect ratio. The focused comparison uses actual screenshot regions around each main button. Density differences and capture padding were excluded from visual findings.

**Required visual checks**

- Typography: Inter Variable remains the site's typeface. The 800-weight hero heading, close tracking and short line length provide the intended emphasis. Headings and body text wrap without clipping at the tested widths. The longer Servo heading and existing sentence case are intentional differences from the references.
- Spacing and layout: the desktop hero retains two columns, with the project screenshot in a bordered violet panel. At 768px, the hero stacks and the project panel uses a compact horizontal layout. At phone widths, its image and text stack. Service cards retain aligned headings and actions on desktop, with adequate room for the same copy on phones.
- Colours: the amber hero (`#F8A51B`), navy outlines (`#10103F`), vivid violet panels (`#5C5CE0`), lavender (`#DEDCF6`) and off-white (`#F4F2EC`) meet the approved direction. Shadows use solid fills without blur. Calculated contrast is 5.17:1 for white on violet and 8.90:1 for navy on amber. Violet emphasis on amber is 3.50:1 and is confined to the large hero heading.
- Images and assets: the original Servo logo and 12Grapes project screenshot are retained and load successfully. The screenshot keeps its natural aspect ratio. No reference mascots, portraits or substitute artwork were added. The non-compact project component on the websites page retains its previous appearance.
- Copy: all existing homepage wording, service descriptions, destinations and form behaviour are preserved. The approved experiment covers the opening section, trust strip and service cards, with related header and mobile navigation treatments.

**Interaction and implementation checks**

- No horizontal overflow was detected in the main content or header at 320px, 390px, 768px or 1440px.
- The mobile menu opens and closes; Escape closes it and restores focus to its button.
- The project link receives a visible white keyboard focus outline on violet. The hero and service cards use navy focus outlines against their surrounding backgrounds.
- The hero links reach the service section and enquiry form. The form's first field is visible after navigation.
- All three service destinations load their expected headings. The websites page's full project panel was checked for unintended style changes.
- Reduced-motion rules cover the new transitions and movement; these rules were reviewed in source. Reduced-motion emulation and real touch-device testing were not performed.
- Browser console check: no warnings or errors returned for the homepage.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm test`: 2 test files and 5 tests passed.
- `npm run build:static` and `npm run build`: passed.
- `git diff --check`: passed.

**Comparison history**

The first combined comparison passed. Full-view evidence is `comparison-full.jpg`; detail evidence is `comparison-details.jpg`. Earlier individual desktop and mobile captures were used to inspect responsive behaviour. No P0/P1/P2 visual changes were required after the combined comparison.

**Implementation checklist**

- [x] Apply the approved colour, outline and shadow treatment to the homepage pilot.
- [x] Check the required visual surfaces and primary interactions in the browser.
- [x] Compare references and implementation together at full and detail scales.
- [x] Complete diagnostics, existing tests and both production builds.
