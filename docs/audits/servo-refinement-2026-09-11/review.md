# Servo ICT refinement review

Date: 11 September 2026  
Surface reviewed: public marketing website  
Primary user goal: decide whether Servo ICT is a credible fit, understand the relevant project type, and start an enquiry  
Accessibility target: WCAG 2.2 AA

## Evidence

- [Before — desktop homepage](./01-before-desktop.png)
- [After — desktop homepage](./02-after-desktop.jpg)
- [After — mobile homepage](./03-after-mobile.jpg)
- Production-target build tested at the deployed GitHub Pages base path: `/servo-ict-website/`
- Automated Lighthouse runs: desktop and mobile
- Semantic browser inspection: headings, landmark labels, form controls, responsive-width overflow, image loading and internal service navigation

## Flow review

1. **Homepage and initial fit assessment — Healthy.** The first screen now identifies the three areas of work, the audience, location and direct relationship with Rowan. The primary call to action and the project-exploration link are visually distinct.
2. **Service exploration — Healthy.** Website, business IT and security cards now lead to focused pages. Each page states the situations that make the work a fit, typical project activities, the delivery process and a consistent next step.
3. **Project enquiry — Healthy with one deployment constraint.** The form is shorter and asks only for information needed to assess the project. The GitHub Pages version opens a prepared email draft because static hosting cannot process the submission itself. This is explained beside the button; the standalone server build retains validated email delivery and spam protection.
4. **Supporting trust and due diligence — Healthy.** Founder ownership, geography, engagement shape, contact details, phone hours, blog content and privacy information are easier to find. The footer now provides complete navigation across the site.

## What changed after the review

- Replaced the broad hero statement with a specific one-person consultancy proposition.
- Added a factual trust strip without inventing customer claims, response times or credentials.
- Reworked services into scannable project types and added three dedicated service pages.
- Clarified the difference between defined project work and optional ongoing care.
- Moved the founder section ahead of the blog so buyers meet the person behind the work sooner.
- Reduced the blog from a large showcase section to one featured article and two supporting links.
- Removed date, time, phone and contact-preference fields from the first enquiry step.
- Added a privacy page, structured service data and a generated sitemap.
- Added a skip link, stronger focus treatment and reduced-motion handling.
- Added 480px and 960px responsive hero images and removed the unused 2.3MB GIF.

## Visual quality

The design still belongs to the original system: warm off-white canvas, deep navy, violet accents, orange highlights, large editorial type and rounded cards. Refinement came from tighter hierarchy and more consistent spacing rather than a wholesale style change.

The desktop hero balances the headline and image without either competing for attention. The mobile version preserves the intended reading order, gives the primary action a full-width target and keeps service cards compact. No horizontal overflow or broken images were found in the inspected homepage state.

## Accessibility and technical checks

| Check | Mobile | Desktop |
| --- | ---: | ---: |
| Lighthouse performance | 98 | 100 |
| Lighthouse accessibility | 100 | 100 |
| Lighthouse best practices | 100 | 100 |
| Lighthouse SEO | 100 | 100 |
| Largest Contentful Paint | 2.3s | 0.5s |
| Cumulative Layout Shift | 0.039 | 0.045 |
| Total Blocking Time | 10ms | 0ms |

The first Lighthouse run identified insufficient contrast on the small service-card labels. Removing the opacity treatment raised the final accessibility score to 100 on both profiles. Automated results do not guarantee full WCAG conformance, but no remaining automated violations were reported.

The static build generated ten pages and a sitemap. All internal links found in the built HTML resolve to generated output. Type checking completed with zero errors, warnings or hints, and all four unit tests passed.

## Remaining evidence gaps and next refinements

- The hero image is still generic. A genuine photograph of Rowan working with a local business would strengthen recognition and trust.
- No client-approved case studies, quantified outcomes or testimonials were available, so none were fabricated. Adding one compact, verifiable proof block would be the highest-value future content improvement.
- The audit did not include analytics, search-query data or moderated user testing. Conversion and comprehension should be checked against real visitor behaviour after enough traffic is available.
- The collaborative preview's screenshot and viewport-resize controls stopped responding during the after-state review. The after-state images therefore come from fresh Lighthouse runs of the production-target build; semantic browser checks were completed separately.

## Overall assessment

The site now reads as a focused boutique technology consultancy rather than a broad list of capabilities. It retains the approachable editorial character of the original while making the offer, owner, engagement model and next step substantially clearer. It is ready for GitHub Pages deployment, with authentic client proof and founder photography deliberately left as future content work rather than approximated.
