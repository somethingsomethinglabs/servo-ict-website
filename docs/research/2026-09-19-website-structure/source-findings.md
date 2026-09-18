# Research evidence for website structure and layout

Research date: 19 September 2026. Prepared for the Servo ICT website audit.

This document gathers the external evidence. The companion audit compares it with the repository and rendered website. Recommendations here are proposed design choices, not a claim that the current site already satisfies them.

## How to read the evidence

The sources have different authority. WCAG 2.2 success criteria are accessibility requirements at their stated conformance level. W3C's Understanding pages explain those requirements; they are informative, and the [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) is the normative text. Government design systems document tested practice for their own services. Their exact dimensions are useful examples, not universal rules for commercial websites. Google's web.dev explains browser behaviour and performance measures. Nielsen Norman Group supplies its own usability research and design guidance, with dates and study limits noted where relevant.

The useful answer to "how wide and how deep?" has three parts: the page's layout width, the width of its text, and how visitors reach increasingly detailed information. Those should be decided separately. The sources reviewed do not establish one optimum website width, number of home-page sections, page height, or menu depth.

## Layout width and modern devices

### Use a flexible outer layout and a separate reading width

GOV.UK starts with a single column on small screens. Its default maximum page width is 1,020px, with wider layouts allowed when content needs them. It recommends text columns that ordinarily stay within 75 characters per line. This is evidence for separating the overall grid from the reading column, rather than stretching paragraphs across the whole page. [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/)

USWDS gives a wider acceptable range of roughly 45 to 90 characters per line and suggests 66 for sustained reading. Its body-text guidance starts at an effective 16px, uses at least 1.5 line height for longer passages, and favours left alignment. Short labels, captions, and headings need different treatment. [USWDS typography](https://designsystem.digital.gov/components/typography/)

For Servo ICT, a reasonable starting point is a shared outer container around 72 to 80rem, with ordinary prose limited to roughly 60 to 70ch. This range is a project recommendation, not a value prescribed by those sources. Cards, service comparisons, imagery, and split heroes may use the wider container. Long explanations should use the narrower measure. A 1,200px page can therefore be entirely appropriate while a 1,200px paragraph is uncomfortable.

Measure actual rendered lines before accepting the result. CSS `ch` measures the advance width of the zero glyph, so `65ch` does not guarantee exactly 65 letters and spaces in a proportional font. Relative `rem` units follow the root font size. [MDN length units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)

### Let content determine breakpoints

Start with the narrow layout, then widen it until the content needs a change. Add a breakpoint when the navigation no longer fits comfortably, a card becomes too narrow, or lines become too long. Avoid choosing breakpoints purely because a named device has that screen size. Do not remove useful information solely to make the mobile layout shorter. [web.dev responsive design basics](https://web.dev/articles/responsive-web-design-basics), [web.dev media queries](https://web.dev/learn/design/media-queries)

Servo proposal: retain a single column for service descriptions on narrow screens. Introduce two columns when both cards retain readable copy and adequate targets; use three only when real text fits. Use fluid side gutters, initially around 1rem on narrow screens and 1.5 to 2rem on larger screens. These gutter values and column counts are starting choices to validate, not standards.

The relevant dimensions are CSS viewport dimensions, including split windows and zoom, rather than physical screen pixels. WCAG AA requires ordinary vertically scrolling content to work at a width equivalent to 320 CSS pixels without loss of content or functionality and without two-dimensional scrolling. Content that genuinely needs two dimensions, such as a map or data table, has exceptions. A 1,280px viewport at 400% zoom is one way to exercise the 320px condition. [W3C reflow, SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

Proposal for validation: test 320, 360 or 390, 768, 1,024, 1,280 or 1,440, and 1,920 CSS pixels, plus widths immediately beside the site's breakpoints. These are a practical test sample, not a census of current devices. Test short landscape windows too. A huge monitor does not require wider prose; spare outer margins are acceptable.

## Typography and spacing

### Set a readable body style before tuning the hero

For Servo, start body copy at 1 to 1.125rem with a unitless line height around 1.5 to 1.65. Keep small supporting labels brief. Do not use tiny text for content someone needs to choose a service or understand an offer. The chosen range adapts the USWDS guidance above; it is not a WCAG minimum font size.

Use a small, deliberate type scale. Fluid `clamp()` headings can avoid abrupt jumps, but a viewport-only font size can frustrate text enlargement. Combine relative font units with viewport units and test the actual result under zoom. A `rem` term alone is not proof that every fluid type formula permits sufficient enlargement. [web.dev typography](https://web.dev/learn/design/typography)

Text must be resizable to 200% without lost content or functionality under WCAG AA, apart from the criterion's exceptions for captions and images of text. Check navigation, buttons, cards, and forms as well as paragraphs. Fixed-height boxes and clipped overflow deserve particular attention. [W3C resize text, SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)

### Use spacing to show relationships

GOV.UK uses explicit spacing scales. Larger spaces reduce on small screens while its smallest units stay consistent. This supports responsive spacing tokens rather than unrelated margins scattered through components. It does not establish an eight-pixel grid as a universal requirement. [GOV.UK spacing](https://design-system.service.gov.uk/styles/spacing/)

Servo proposal: retain a compact token set such as 4, 8, 12, 16, 24, 32, 48, 64, and 80px equivalents in relative units. Start section padding around 40 to 56px on phones and 64 to 88px on wider screens. Adjust by the amount and relationship of the content. These values express a design direction, not research-derived optimums.

Put related content close together and leave a larger break before the next subject. A heading should clearly belong to the paragraph or card below it. NN/g's eye-tracking examples show readers using distinctive, descriptive subheadings to choose which sections to read; inconsistent grouping can cause backtracking. Its recommendation is to distinguish sections consistently and make headings explain their content. [NN/g layer-cake scanning research](https://www.nngroup.com/articles/layer-cake-pattern-scanning/)

For this site, repeated tall bands containing little information should be reviewed for unnecessary scrolling. Reducing whitespace is justified when it separates related ideas or delays a useful next step, not merely because the page is long.

### Distinguish default styling from accessibility override tests

WCAG AA text-spacing compliance means the page must tolerate all of these overrides together without losing content or functionality: line height 1.5 times font size, paragraph spacing twice font size, letter spacing 0.12 times font size, and word spacing 0.16 times font size. Authors do not have to use those values by default. Test this explicitly, especially where narrow cards and buttons wrap. [W3C text spacing, SC 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)

The often-repeated "80 characters maximum" comes from a Level AAA visual-presentation criterion, which requires a mechanism for users to achieve specified presentation options. It is not an AA limit on every line in every default layout. That criterion also covers justification, line and paragraph spacing, colour choice, and text resizing. [W3C visual presentation, SC 1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html)

### Contrast is part of typography

AA text contrast is at least 4.5:1 for ordinary text and 3:1 for large text. Large text means at least 18pt regular or 14pt bold, approximately 24px or 18.67px respectively. Logos and incidental text have exceptions. Muted copy and placeholder text are not automatically exempt. Assess the actual foreground and background pair, including image overlays and hover states. [W3C contrast minimum, SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Visual information needed to identify controls, their states, and relevant graphical objects generally needs 3:1 against adjacent colours under AA. This does not mean every decorative divider needs 3:1. Test meaningful control boundaries and indicators separately from ordinary text. [W3C non-text contrast, SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

## Page depth and the first screen

People do scroll, but early content attracts more attention. NN/g's 2018 eye-tracking study analysed 120 participants on 1,920 by 1,080 screens. It found 57% of viewing time above the fold and 74% within the first two screenfuls. These are observations from that desktop study, not a forecast for Servo's visitors or a rule that a page should stop after two screens. They justify putting the main answer early. [NN/g scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/)

Servo proposal: the opening should make the service, intended customer, service area, and next action understandable without deciphering a slogan. The main services or a clear route to them should follow promptly. Avoid making a near-empty full-screen hero the price of reaching the useful information. The exact hero height should follow its real content and the tested viewport, not a fixed percentage rule.

Longer pages are warranted when they help a visitor decide. Give each section a job: clarify the offer, explain an important constraint, provide evidence, answer a decision question, or support contact. GOV.UK's current content guidance requires a valid user need and recommends using existing enquiries, analytics, and research to establish it. This is a useful editorial test for whether Servo needs another section or another page. [GOV.UK identify user needs](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/identify-user-needs/)

Do not hide essential information inside accordions simply to reduce visible height. GOV.UK recommends testing plain, well-structured content first, keeping universally needed information visible, and considering anchor links for long pages. Accordions can suit optional related details when users benefit from selecting which to reveal. Nested accordions make material harder to find. [GOV.UK accordion guidance](https://design-system.service.gov.uk/components/accordion/)

Servo proposal: make the home page a useful overview with clear routes to service detail. Use service pages for scope, exclusions, process, and evidence that differ between offerings. Keep short FAQs only when they answer real enquiries. Add a contents list to unusually long service pages when it helps people jump to the question they came to answer.

## Navigation breadth and information depth

### Prefer clear categories over counting clicks

NN/g's guidance describes the trade-off: deeper hierarchies hide specific content behind more intermediate decisions, while excessively broad hierarchies create long menus and overlapping categories. Flat structures work well with recognisable, distinct categories. Deeper structures can help when visitors need context first. Card sorting and tree testing can establish whether people understand the grouping. [NN/g flat versus deep hierarchies](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/)

A strict three-click maximum is not a sound design objective. NN/g recommends judging the meaning and effort of each decision instead of treating every click alike. Its article synthesises other research, so this report uses its first-party design recommendation rather than presenting the cited experiments as research independently reviewed here. [NN/g three-click rule guidance](https://www.nngroup.com/articles/3-click-rule/)

Servo proposal: use recognisable service names, such as IT support, websites, and security, wherever those match the actual offer. A direct home-page or navigation link to each major service is preferable to a chain of vague labels such as Solutions, Capabilities, and Expertise. Keep contact readily available. Do not manufacture intermediate category pages for a small catalogue.

A practical initial hierarchy is home, service overview or direct service links, and individual service detail, with company and contact pages beside them. This is a starting structure for a small business, not a maximum permitted number of levels. Specialist subpages should be added only where the separate subject helps users make a decision.

### Keep navigation visible and predictable

NN/g recommends showing navigation on larger screens where there is space, placing menus where people expect them, indicating current location, and using clear labels. Hiding everything behind a hamburger on a roomy desktop can remove useful clues about the site's scope. Its checklist is design guidance, not a mandatory five- or seven-item rule. [NN/g menu design checklist](https://www.nngroup.com/articles/menu-design/)

Use semantic navigation and expose the current page. Menus must work with keyboard input as well as a pointer. W3C's menu tutorial also recommends adequate hit areas and sufficient tolerance when moving between a trigger and submenu. For deeper pages, breadcrumbs can expose the path through the hierarchy. [W3C menus tutorial](https://www.w3.org/WAI/tutorials/menus/)

Content hierarchy should be real HTML structure. Use a clear page heading, section headings, and subordinate headings according to the relationships between content. W3C recommends avoiding skipped heading levels when opening subsections. CSS can change their appearance without changing their semantic rank. [W3C headings tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/)

## Touch, keyboard, motion, and persistent controls

AA pointer targets must ordinarily be at least 24 by 24 CSS pixels. Smaller targets may qualify through spacing, an equivalent control, inline text, browser-controlled presentation, or an essential exception. The spacing test uses 24px-diameter circles centred on undersized targets; it is not a blanket 24px gap requirement. [W3C target size minimum, SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

The enhanced AAA criterion uses 44 by 44 CSS pixels with its own exceptions. For Servo's primary buttons, menu toggle, and form submit, aim for at least this comfortable size even if only AA is the acceptance baseline. This is about the clickable area, not the visible icon alone. [W3C target size enhanced, SC 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)

Do not infer input method from screen width. A large device can have touch, and a small device can use a keyboard. Google's interaction guide explains `pointer` and `hover` queries and recommends against hiding essential information behind hover. Show a visible keyboard focus state and keep important actions available without hover. [web.dev interaction](https://web.dev/learn/design/interaction/)

Additional content shown on hover or focus normally needs to be dismissible, hoverable, and persistent under AA, with specified exceptions. This matters if the site uses dropdown navigation or tooltips. [W3C content on hover or focus, SC 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)

Sticky headers and contact bars must not completely hide the focused component under WCAG AA. Keeping it fully visible is the better design target; the corresponding enhanced requirement is AAA. Test anchors and Tab navigation with a short viewport and zoom, not just the desktop screenshot. [W3C focus not obscured minimum, SC 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

Respect `prefers-reduced-motion` by removing nonessential animation for users who request it. For this site, that includes decorative reveal movement and animated scrolling. Content should remain visible and usable when the animation is disabled. [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion)

Contact forms need labels that identify each control and are programmatically associated with it. A visual arrangement alone does not convey that association to assistive technology. Use actual labels alongside the site's spacing and type rules. [W3C labelling controls](https://www.w3.org/WAI/tutorials/forms/labels/)

## Loading and layout stability

The current Core Web Vitals good thresholds are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. Evaluate the 75th percentile of real visits, separated by mobile and desktop. A local browser trace or Lighthouse run can diagnose a problem, but it does not establish those field results. [web.dev Web Vitals](https://web.dev/articles/vitals)

Reserve space for images and embeds with dimensions or aspect ratios. Otherwise content may move as they load. Font swaps can also cause layout shifts. This matters when a visitor is reading or about to select a contact link. [web.dev optimise CLS](https://web.dev/articles/optimize-cls)

Do not lazy-load the image that supplies Largest Contentful Paint. Let the browser discover important visual content early and use resource priority deliberately. Confirm the actual LCP element before optimising a guessed hero image. [web.dev optimise LCP](https://web.dev/articles/optimize-lcp)

## Recommended acceptance checks for implementation

The following combines the sourced requirements above with proposed Servo-specific checks. Passing these checks is not a full WCAG conformance assessment.

| Area | Proposed acceptance check |
| --- | --- |
| Width | Shared outer alignment; body paragraphs use a separate readable measure; no accidental full-width prose on a wide monitor. |
| Responsive layout | Ordinary content works at 320 CSS px; no clipping or lost actions beside each breakpoint; landscape remains usable. |
| Typography | Body text is comfortable at ordinary size; actual line lengths are inspected; 200% text enlargement works. |
| Spacing | A documented token scale governs section and component spacing; related items stay grouped; all four WCAG spacing overrides work together. |
| Navigation | Service labels predict the destination; contact is easy to locate; menu and current location work with keyboard and touch. |
| Page depth | Each home-page section answers a distinct decision question; detailed material has a clear route; no arbitrary height or section quota. |
| Targets and focus | Measure clickable bounds and exceptions; primary controls aim for 44px; sticky elements do not obscure keyboard navigation. |
| Contrast | Measure body, muted, button, link, form, and focus states against their actual backgrounds. |
| Motion | Reduced-motion mode leaves every section visible and every action usable. |
| Performance | Check image space reservation, font changes, and hero loading; assess production field data when available. |
| User validation | Ask intended customers to find the right service, determine whether their location is covered, understand the next step, and make an enquiry. Record hesitation and wrong turns. |

Prioritise missing content, unusable navigation, overflow, contrast failures, and blocked contact actions before fine adjustments to whitespace. Then tune width, typography, and section density as one system. Exact values should follow the rendered content and testing, not a catalogue of fashionable measurements.
