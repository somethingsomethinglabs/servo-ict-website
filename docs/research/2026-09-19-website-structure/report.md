# Website width, depth, typography and spacing

19 September 2026. Research and comparison with the current Servo ICT working tree.

Servo's overall page width and navigation are reasonable. The strongest improvements are to limit long text independently of the page container, stop multi-column layouts becoming cramped at intermediate widths, and combine repeated sections on the service pages. Keep the current visual direction and improve the way it presents the information.

The [source research](source-findings.md) contains the external evidence and its qualifications. This report applies it to Servo. All proposed dimensions below are design starting points unless explicitly identified as an accessibility requirement.

## What the evidence recommends

| Question | Evidence-based direction | Recommendation for Servo |
| --- | --- | --- |
| How wide should a page be? | Use a flexible layout with a maximum width appropriate to the content. Text needs its own narrower measure. [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/) | Keep the existing 1,280px outer cap. Add a shared reading width, initially around 65ch. |
| How large should text be? | USWDS recommends an effective 16px minimum for ordinary body text and comfortable line spacing. This is design guidance, not a WCAG minimum font size. [USWDS typography](https://designsystem.digital.gov/components/typography/) | Keep most body copy at 16–18px. Use approximately 1.5–1.65 line height for ordinary copy. Check decision-critical small print separately. |
| How deep should navigation go? | Category clarity and the effort of each decision matter more than counting clicks. Broad and deep structures each have trade-offs. [NN/g hierarchy guidance](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/) | Keep direct routes to the starter offer, individual services, work, About and Contact. No extra category pages are needed for this catalogue. |
| How long should a page be? | Put important answers early and give each section a distinct user need. There is no supported universal page-height limit. [NN/g scrolling research](https://www.nngroup.com/articles/scrolling-and-attention/), [GOV.UK user needs](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/identify-user-needs/) | Keep a useful homepage overview. Reduce repetition on service pages before reducing text size or hiding content. |
| How should mobile differ? | Let the content determine breakpoints; start with a narrow layout. [web.dev responsive design](https://web.dev/articles/responsive-web-design-basics) | Preserve information and reading order. Stack a component when its text becomes cramped, even if other components still fit side by side. |
| How much spacing? | Use consistent, responsive spacing to express relationships. Exact scale values are design-system choices. [GOV.UK spacing](https://design-system.service.gov.uk/styles/spacing/) | Retain shared spacing tokens, but distinguish a full section from a short reassurance or contact row. |
| What is the accessibility baseline? | WCAG AA includes 320px reflow, 200% text resizing, text-spacing override tolerance, contrast and target-size requirements. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Use the acceptance checks below. This audit is not a conformance certificate. |

## What I checked

I reviewed the audience brief, shared styles, page layouts, navigation, forms and page content. I measured the locally rendered working tree at `http://localhost:4324/`, rather than assuming the deployed website matches it. Existing uncommitted changes were present before this audit.

The [measurement file](../../../audit/website-structure-2026-09-19/measurements.json) contains 50 page/viewport samples across all 15 public content routes. Every route was measured at 320px and 1,600px. Nine representative routes were also measured at 390px. Selected pages were checked at 768px and about 1,025px; the homepage was additionally checked at 1,280px and 1,920px. These are actual CSS viewport widths reported by the browser. Its existing zoom caused requested dimensions to differ, and scrollbars removed another 17px from the content area.

A [separate geometry check](../../../audit/website-structure-2026-09-19/clipping.json) inspected headings, paragraphs, lists, images, links and form controls at 320px. I also checked opening the mobile navigation, keyboard activation of Services, and the two-stage Escape behaviour. [Navigation evidence](../../../audit/website-structure-2026-09-19/navigation.json)

Screenshot capture timed out twice. Current findings therefore use source inspection, live DOM content, computed styles and element geometry. They do not claim fresh visual screenshot verification. Measurements describe default page states, with most disclosures closed. Opening details can increase page height. Real customer behaviour, live production performance, Safari, Firefox, text-only enlargement and spacing overrides were not measured.

## How the current site compares

| Area | Current evidence | Assessment |
| --- | --- | --- |
| Outer width | Shared content caps at 1,280px. At a 1,920px viewport the homepage still measures 1,280px across. | Keep. There is no reason to stretch content across a wide monitor. |
| Narrow-screen layout | All 15 routes had zero document overflow at 320px. Sampled content boxes stayed within the content area, excluding the intentional hidden honeypot. | Good observed baseline. This does not establish every zoom or expanded state. |
| Reading width | A Business IT paragraph spans 1,280px at 16px text. Starter FAQ text can span 960px at 16px. | Fix. Paragraph width should not depend only on the surrounding grid. |
| Intermediate widths | Contact's next-step paragraph narrows to about 122px at a 768px viewport. A Websites process paragraph is about 156px wide at 1,025px. | Fix component breakpoints or column structure. No overflow is needed for a layout to be awkward. |
| Body typography | General inner-page text is 16px with 1.6 line height. Article text is 17.6px on desktop and 16.8px on mobile. | Broadly sensible. Avoid a blanket font-size reduction. |
| Headings | Main inner-page H1s range from 42.4px on narrow screens to 80px on desktop. One H1 was present on every sampled route. | Keep the hierarchy; tune long headings and test enlargement. |
| Controls | Main actions are generally 52–56px high, inputs at least 48px, the mobile toggle 46px, and normal navigation links at least 44px high in source. | Good foundation. Small inline links need their own exception-aware assessment. |
| Navigation | Five top-level header choices, with three services in one disclosure. Service pages also link directly to sibling services. | Appropriate breadth and depth for the current catalogue. |
| Page depth | At 390px, Websites is about 8,618px tall, Business IT 9,345px, and Security 9,583px. | Review repeated sections and spacing. Height alone is not a failure. |
| Colour and motion | Shared colour/focus tokens, forced-colour handling and reduced-motion rules exist. | Useful implementation work to retain. Actual rendered contrast and all states still need validation. |

### 1. Keep the page width; constrain reading text

The shared container is `min(89%, 1280px)`. Inner pages switch to fixed 20px side gutters below 700px. The homepage retains its percentage width, which gives slightly different alignment at narrow sizes. See [pages.css](../../../src/styles/pages.css), [brand.css](../../../src/styles/brand.css) and [LandingPage.svelte](../../../src/components/LandingPage.svelte).

The container itself works. The problem is what fills it. The Business IT experience paragraph uses the entire 1,280px width. The default open answer under the starter page's after-launch section is 960px wide. Neither needs that much horizontal room. In contrast, lead paragraphs already have a separate limit.

Add a shared prose measure, initially `max-inline-size: 65ch`, to long paragraphs, FAQ answers and explanatory lists. Preserve full-width grids and images. A short label or a single sentence does not automatically need the same restriction.

Articles already use a narrower 46rem column, measured at 736px with 17.6px text. Privacy uses up to 760px with 16px text. Review both alongside the new prose rule. These pixel widths identify candidates for review, not proven character counts. Actual characters per line were not measured. `ch` is also a font-relative approximation rather than a literal character count. [MDN length units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)

Unify homepage and inner-page gutters through the same container rule so future spacing changes remain aligned. Keep the current 1,280px cap initially; changing it to a relative unit should be tested under text enlargement rather than treated as an automatic improvement.

### 2. Let individual grids stack sooner

The Contact next-steps row remains in three columns until 700px. Each column also contains a 44px number, gaps, borders and padding. At 768px, the middle explanatory paragraph has about 122px left for text. It is technically contained, but unnecessarily narrow. [Contact implementation](../../../src/pages/contact.astro)

The service process layout has a different nesting problem. It puts the introduction beside a three-step grid. At approximately 1,025px, the final Websites step has only about 156px for its paragraph. At 768px, the introduction has moved above the steps, so that paragraph actually becomes wider, around 198px. The layout does not improve steadily as the viewport grows. [Process layout](../../../src/styles/pages.css)

Treat these as component-level decisions. Try a vertical list for Contact's steps at tablet widths. For service pages, put the process introduction above its steps sooner, or use the homepage's vertical numbered list. Choose the final transition by testing the longest real heading and paragraph. The existing form's container query is already an example of responding to available component width. [Enquiry form](../../../src/components/EnquiryForm.svelte)

### 3. Reduce repeated service-page sections

| Page | Height at 1,600px wide | Height at 390px wide | Height at 320px wide |
| --- | ---: | ---: | ---: |
| Home | 3,310px | 5,272px | 5,606px |
| Starter offer | 5,215px | 7,252px | 7,929px |
| Websites | 6,238px | 8,618px | 9,429px |
| Business IT | 6,737px | 9,345px | 10,345px |
| Account security | 6,998px | 9,583px | 10,495px |
| Contact | 3,020px | 3,887px | 4,200px |
| About | 2,257px | 3,299px | 3,533px |
| Startup advice article | 3,395px | 5,235px | 5,755px |

These are measured document heights, rounded to pixels, not performance scores or target limits. Mobile stacking necessarily makes pages taller.

The service template separately presents outcomes, good fit, pricing, handover, experience, an About strip, a decision strip, an illustrative scope, process, FAQs and the form. Some material answers distinct questions. Other parts repeat ownership, written quotes, handover and the invitation to talk. [ServiceLayout.astro](../../../src/layouts/ServiceLayout.astro)

The About and decision strips are each about 234px high on desktop, nearly 469px together. Each contains a short statement and a link. The shared compact section token supplies up to 72px of padding on both sides, before the inner row's own padding. These strips merit a denser treatment.

Suggested service-page sequence, as a proposal rather than a section quota:

1. Service, intended customer, location, essential limits and a clear enquiry action.
2. Problems handled and the corresponding work. Combine the current outcomes and good-fit material where they overlap.
3. Costs, inclusions, exclusions and responsibilities. Keep decision-critical facts visible.
4. Relevant evidence or a clearly labelled example. Combine experience, the About link and handover context where useful.
5. One process explanation, including what the customer supplies and receives.
6. Remaining optional questions, followed by the enquiry form.

Keep an enquiry action near the beginning and after useful decision content. A visitor should not have to read the whole page to contact Servo; the existing anchor links already support this. If substantial detail remains, add a short contents row such as “Work covered · Costs · Process · Questions”.

Do not shorten the pages by hiding fees or limitations in more accordions. GOV.UK advises keeping universally needed information visible and testing simpler structured content first. [Accordion guidance](https://design-system.service.gov.uk/components/accordion/)

### 4. Bring the homepage's price context forward

At 390px, the primary “See the starter offer” action begins about 479px down the page and ends around 533px. The main action is available early. The hero nevertheless runs from about 88px to 968px, including a 290px-tall illustration area after the actions. The setup price begins around 1,673px down the page. [Position evidence](../../../audit/website-structure-2026-09-19/home-positions.json)

The [audience brief](../../../AUDIENCE.md) says clear, affordable pricing is a leading purchase concern. Consider a brief setup-price and ongoing-cost summary near the opening action, linked to the full scope. Use the existing shared offer data so figures stay consistent. Another option is to shorten the mobile illustration and bring the offer section forward. Test whether visitors can identify the cost and distinguish the starter offer from custom website work.

This recommendation follows the stated audience priority. It is not evidence that the current hero loses enquiries. The published offer figures are also provisional in the repository; this research does not validate or change them. [Offer assumptions](../../starter-offer-assumptions.md)

### 5. Keep the hierarchy and clarify each page's job

The header contains Start a business, Services, Our work, About and Get in touch. Services opens Websites, Business IT and Account security. Home also links directly to those services. This gives shallow access without a crowded catalogue.

Keep the startup offer prominent. Retain “Business IT” unless customer testing supports a better label; “IT support” could imply ongoing or emergency support beyond the current offer. Advice can remain a supporting route, with relevant articles linked from the pages where they help. A permanent header slot for Advice is a business priority decision, not a universal navigation requirement.

The site has 15 public content pages: Home, starter, three services, one case study, About, Contact, Privacy, an advice index and five articles. Development-only routes and the enquiry API are excluded. The shallow URL of an article does not determine its conceptual depth; Advice → article is still a clear content relationship.

Do not add more pages to meet an imagined SEO or click-count rule. Add a page when it answers a distinct question with enough useful content to justify its own destination. Recheck the structure if the service catalogue grows. [NN/g hierarchy guidance](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/)

### 6. Refine the typography and spacing system

Arial is the active global typeface. There is no research reason here to change the font family. Most ordinary body text is already near the proposed range. Keep left alignment and the current semantic heading structure.

The homepage H1 is 44px at narrow widths, while inner-page H1s start at 42.4px. Those sizes are not inherently excessive. Long headlines and section introductions contribute to page depth, so edit the wording and inspect wrapping before reducing all headings. Decorative eyebrow labels are about 12.2px; keep them supplementary and avoid putting essential offer conditions at that size.

The article template uses roughly 1.78–1.8 line height. Try a moderately tighter setting only alongside the new reading width, then compare readability. This is a lower priority than the full-width paragraphs and cramped grids.

Keep the current large-section rhythm as a baseline: inner sections use 56–96px of padding per side, and home sections use 48–72px. Add a smaller token for short bands, initially around 24–32px per side, and avoid stacking full-section and inner-panel padding around one line. The proposed values need inspection with real content; research supports consistency and grouping, not one perfect pixel scale.

## Implementation order

| Priority | Concrete change | Main files | Acceptance evidence |
| --- | --- | --- | --- |
| 1 | Apply separate reading measures to full-width explanations and FAQ answers. | `pages.css`, article template, Privacy, Business IT proof block | Compare real line lengths on desktop; preserve layout at 320px and enlarged text. |
| 1 | Fix cramped Contact and service-process grids. | `contact.astro`, `pages.css`, `ProcessSteps.astro` | Review 700–1,050px and both sides of each new transition. Longest step remains comfortable to read. |
| 1 | Merge repeated service sections and reduce the two short reassurance strips. | `ServiceLayout.astro`, service content | All unique scope, costs and support limits retained; easier route to the relevant answer. |
| 2 | Bring starter price context nearer the homepage opening. | `LandingPage.svelte`, existing shared offer data | Intended customers can find setup price, separate ongoing costs and full scope. |
| 2 | Unify gutters and document full-section versus short-band spacing. | `brand.css`, `pages.css`, homepage styles, style guide | Aligned content edges and consistent spacing across home and inner pages. |
| 2 | Finish accessibility and device validation. | Shared navigation, styles and controls | Record results for the untested states below. |
| 3 | Tune article leading and heading wrapping after structural changes. | Article template and typography rules | Readable comparison at ordinary and enlarged sizes, with no lost content. |
| 3 | Validate with intended customers and production measurements. | Research tasks and analytics setup | Observe task success, hesitation and enquiry completion rather than inferring success from shorter pages. |

## Checks before accepting implementation

The 320px checks passed for the sampled default states. They do not replace 200% text enlargement or spacing-override checks. WCAG requires the latter overrides to work without loss; it does not require authors to use those settings by default. [Resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)

The remaining acceptance work is:

- Recheck narrow, intermediate, desktop and short landscape layouts, including expanded menus, FAQs and form errors.
- Test 200% text resizing and 400% browser zoom from a suitable desktop viewport. Check all four WCAG text-spacing overrides together.
- Check keyboard order, focus visibility, anchors and screen-reader headings/labels across the changed templates.
- Measure text, muted text, controls and focus indicators against the actual textured backgrounds. Token values alone cannot establish contrast for every rendered state.
- Keep primary controls comfortably sized. AA ordinarily requires 24×24px targets with exceptions; 44×44px is the enhanced AAA criterion and a useful design aim. Inline prose links have an exception, so the small Privacy email links are not automatically failures. [Minimum target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Verify reduced motion and forced colours, and check representative pages in Safari and Firefox as well as Chromium. Include touch and software-keyboard behaviour on a real phone when available.
- Assess production loading and layout stability. Existing image dimensions and WebP assets are useful, but local layout checks do not establish Core Web Vitals. Evaluate field LCP, INP and CLS separately for mobile and desktop. [Web Vitals](https://web.dev/articles/vitals)

Use customer tasks tied to the audience brief: find help for a new business, find help for an existing IT problem, identify setup and ongoing costs, understand the service limits, and reach the appropriate enquiry. Record wrong turns and uncertainty. Compare the revised pages against the current baseline without assuming that less scrolling means better comprehension.

Only research documents and audit evidence were added for this task. Website source and published content were not changed.
