# Components and sections

Preview the standards at `/style-guide/#components` and `/style-guide/#sections` in development. These examples use the same components as the website.

## Foundations

Use `brand.css` for materials, colour, texture, focus and control states. Use `pages.css` for content-page typography and layout. Do not copy their values into a new section stylesheet.

- Default to silver. Use charcoal for process and closing sections.
- Keep content within `.container`, which uses the shared `--content-width` and caps at 1280px. The homepage uses the same width token.
- Keep ordinary paragraphs, descriptions and FAQ answers within `--reading-measure`, currently 65ch. Grids, images and short information strips can use the full container.
- Use `.section-space` for full sections, `--section-space-compact` for compact content sections and `--band-space` for short signposts or reassurance rows. Avoid full-section padding around a single sentence.
- Use one H1 per published page, H2 for sections and H3 for items.
- Stack multi-column content on mobile without changing its reading order.
- Use ruled rows for information. Reserve frames for images, prices and grouped choices.
- Primary actions use `.button`; secondary actions use `.text-link`. The guide's outline button remains a proposal.

## Component catalogue

| Component | Standard | Implementation |
| --- | --- | --- |
| Outcome | Icon, H3 and one short explanation | `OutcomeGrid.astro` |
| Expandable answer | Native details/summary, question and plain answer | `FaqList.astro` |
| Action group | One primary button and optional secondary link | `.actions`, `.button`, `.text-link` |
| Image frame | Meaningful alt text, intrinsic dimensions, recessed border | `.photo-frame` |
| Price card | Label, price, scope, recurring costs and terms | Owned by `WebsiteOffer.astro` |
| Form field | Visible label, helper, associated error, focus state | Owned by `EnquiryForm.svelte` |
| Icon | Phosphor regular, current text colour, decorative beside text | `PageIcon.astro` or `Icon.svelte` |

`OutcomeGrid` accepts `items` containing `icon`, `title` and `copy`. Use `variant="grid"` for a two-column task list, `variant="three"` for three short benefits, and `variant="questions"` for checks with an explanation alongside. All variants stack on mobile. Supply recognised PageIcon names.

`FaqList` accepts `items` containing `question` and `answer`. Multiple answers can stay open. Keep essential prices, scope and limitations visible outside the disclosures. Use `.detail-list` markup directly when answers need rich content rather than plain text.

These components use the `.content-page` styles provided by `PageLayout`. They do not create their own section heading or outer container.

## Section catalogue

| Section | Use | Content and variants |
| --- | --- | --- |
| Service hero | Open a service page | `ServiceHero`: eyebrow, H1, intro, action, image; website or IT/security artwork |
| Service chooser | Help visitors choose a path | `ServiceLinks`: heading, copy, service links; optional starter link and frame |
| Outcomes | Explain useful results or typical tasks | Section heading plus `OutcomeGrid` |
| Pricing | Explain an offer and its costs | `WebsiteOffer`: price cards with their disclosures |
| Work example | Show evidence | `WorkExample`: full project or compact preview |
| Process | Explain what happens next | `ProcessSteps`: heading, three ordered steps, optional note |
| FAQ | Answer practical questions before contact | `FaqSection` with its shared `FaqList` |
| Closing enquiry | Offer the next step | `PageClose`: compact signpost, default contact options, or inline form |

A typical service page follows hero → contents links → work covered and fit → pricing → work or an illustrative project → process → FAQ → closing enquiry. Combine related scope, handover and experience material. Keep exclusions and support limits visible. Use only sections that answer a visitor's question.

Process introductions move above the steps below 1200px; steps become a vertical list below 900px. Contact steps stack below 1050px because their numbers and padding leave less room for text. Check both sides of these transitions with real content and enlarged text.

The shared service layout uses `OutcomeGrid` and `FaqSection` for websites, business IT and security. The section templates below add content and theme options while preserving existing defaults. Hero and work-example sections retain fixed anchor IDs, so use each once per page. Hero links require `#consultation-form` and either `#work-example` or `#typical-work` on that page.

Keep form submission, validation, email fallback and tracking inside `EnquiryForm`. Keep pricing disclosures with `WebsiteOffer`. Avoid making generic card or field wrappers that merely forward all their markup and behaviour to callers.

## Call-to-action template

`PageClose` owns the layout, spacing, responsive behaviour and material styling. Pass the content as props, either directly or from a data object:

```astro
---
import PageClose from '../components/PageClose.astro';
import { sitePath } from '../lib/site';

const websiteCta = {
  eyebrow: 'Ready for the next step?',
  title: 'Tell us about your website.',
  copy: 'A rough description is enough to start.',
  action: 'Discuss my website',
  href: sitePath('/contact/'),
  theme: 'light' as const,
};
---
<PageClose {...websiteCta} compact />
```

Move the object to a content module and import it when several pages need the same copy.

| Prop | Purpose | Default |
| --- | --- | --- |
| `eyebrow` | Small text above the heading; empty string hides it | Get in touch |
| `title` | Main H2 heading | Tell us what you need a hand with. |
| `copy` | Supporting description | Existing enquiry invitation |
| `action` | Link button label | Get in touch |
| `href` | Link button destination | Tracked contact URL based on `service` and `source` |
| `theme` | `light` for silver, `dark` for charcoal | dark |
| `compact` | Shorter spacing and a single action | false |
| `note` | Optional small supporting text | none |
| `id` | Stable section anchor; also names its accessible heading | Automatically unique |
| `inlineForm` | Show the enquiry form instead of link actions | false |

`action` and `href` configure the link variant. With `inlineForm`, the existing enquiry component controls its submit label and destination. Use at most one inline enquiry form per page because its fields have fixed IDs. Link-only CTA sections can appear more than once; give them explicit IDs when linking to them.

Existing callers retain their dark appearance and contact destinations. Preview both themes at `/style-guide/#closing-preview`.

## Service chooser composition

Use the namespaced exports for custom content. `Root` owns the heading, layout and theme. `Link` owns its row, optional description and arrow. Neither needs client-side JavaScript.

```astro
---
import * as ServiceChooser from '../components/service-chooser';
import { sitePath } from '../lib/site';
const links = [
  { label: 'Website help', description: 'New sites and improvements.', href: sitePath('/websites/') },
  { label: 'Business IT', href: sitePath('/business-it/') },
];
---
<ServiceChooser.Root
  eyebrow="How can we help?"
  title="Choose your next step."
  copy="Start with the work you need done."
  theme="light"
  framed
>
  {links.map(link => <ServiceChooser.Link {...link} />)}
</ServiceChooser.Root>
```

Explicit `<ServiceChooser.Link ... />` children work in the same slot. Use `external` on a Link for the outward arrow; it still navigates in the same tab. Root accepts `id` and `navigationLabel` when you need a stable anchor or a distinct navigation label. Generated IDs are unique by default.

Root fits within its parent's content width. Use `.container` around it for a full-page section. `framed` adds inset spacing and horizontal borders. `theme` defaults to `light`. `ServiceLinks` is the existing site-services preset built from these components, with its original `includeStarter` option.

## More section templates

| Template | Content | Options and slots |
| --- | --- | --- |
| `ProcessSteps` | `title`, `steps: [{title, copy}]` | `eyebrow`, `note`, `theme`, `id`. Numbers are automatic. Up to three columns, then additional rows. Use a distinct `id` for each instance; the default remains `process`. |
| `FaqSection` | `title`, `items: [{question, answer}]` | `eyebrow`, `copy`, `theme`, `id`. Default slot adds content after the answers. |
| `ProjectSection` | `title`, optional `eyebrow` and `copy` | `theme`, `id`, optional `image: {src, alt, width, height, caption}`. Default slot holds text, lists or evidence beside the heading. |

These three templates own their outer section spacing and inner container. Do not add another `.container` around them. Process defaults to dark; FAQ and project sections default to light. All use the existing materials and typography.

```astro
<FaqSection
  eyebrow="Before we start"
  title="Your questions, answered."
  theme="light"
  items={questions}
/>
<ProjectSection
  eyebrow="The brief"
  title="Make the next step clear."
  copy="Explain the services and help customers enquire."
  theme="dark"
>
  <h3>What we built</h3>
  <p>Service pages, contact routes and a project-specific estimator.</p>
</ProjectSection>
```

## Article and project page templates

Research and references: [article and case-study template research](research/article-case-study-templates.md).

`ArticleLayout.astro` wraps the page shell and renders an article header, metadata, optional contents navigation and the reading column. Pass `title` for the browser/SEO title, `headline` for H1, `description`, `canonicalPath`, `topic`, `author`, `publishedAt`, `readingTime`, `image` and `imageAlt`. Optional inputs are `updatedAt`, `headings: [{slug, text}]`, `helpLink: {href, label}` and `enquiryTopic`.

- Default slot: article body, including rendered Markdown.
- `after-content`: a contextual help block within the reading column.
- `after-article`: related articles and the final CTA.
- `head`: additional metadata, used for noindex on development examples.

All existing Markdown advice pages use this layout through `[slug].astro`; their content schema stays unchanged. The page supplies headings from the Markdown renderer. Omit `headings` for short content and the sidebar disappears. In manually authored content, heading IDs must match the supplied slugs. An `updatedAt` date is shown when provided.

`CaseStudyLayout.astro` is shared by showcases and longer case studies. Pass `title`, `description`, `canonicalPath`, `headline`, `client`, `intro`, `facts: [{label, value, icon?}]`, and `hero: {src, alt, width, height, caption?}`. Optional inputs are `eyebrow`, `theme`, `projectLink: {href, label}` and `backLink: {href, label}`. Local image sources are site-relative; link destinations should be resolved with `sitePath` when needed.

- Default slot: the project story, composed from `ProjectSection` or custom sections.
- `closing`: a contextual CTA outside the project article.
- `head`: additional metadata.

Use a short showcase for the brief and delivered work. Add approach, evidenced results, measurement context and approved quotes for a longer case study. No metrics or testimonials are required by the template. The existing 12Grapes page now uses the layout.

Runnable examples, including their data objects and slots:

- `src/dev/ArticleExample.astro` at `/style-guide/article/`
- `src/dev/CaseStudyExample.astro` at `/style-guide/case-study/`

Both are injected only for development and excluded from production output. The guide links to the references and provides a copyable chooser example.
