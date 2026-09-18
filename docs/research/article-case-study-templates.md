# Article and case study templates

Reviewed 19 September 2026. This research compares the content structure of first-party pages. It is not a screenshot-based visual audit. The template proposals below are recommendations for Servo ICT, not claims that these sites use the same implementation.

## Examples worth borrowing from

| Example | Observed structure | Useful for Servo ICT |
| --- | --- | --- |
| [web.dev, Web Vitals](https://web.dev/articles/vitals) | Title, named author, published and updated dates, opening explanation, nested headings, diagrams, lists, tables, code and links to further guidance. | An article should identify its author and freshness, then let the body use the elements needed to explain the subject. |
| [GOV.UK, Set up a business](https://www.gov.uk/set-up-business) | Direct title and introduction, headings for distinct choices, a comparison table and links to the next relevant task. | Keep advice practical. Let a reader find an answer or choose a next step without a large promotional introduction. This reference is for structure, not Australian business advice. |
| [Clearleft, Cranstoun WiSE website](https://clearleft.com/work/building-at-speed-without-sacrificing-quality) | Project title and summary, client/sector/duration/services, a project image, context, results, a longer project narrative, attributed quotes, captioned images, more work and a contact invitation. | Use a small project-facts block and substantial examples of the work. Results can describe delivered capabilities when that is what the evidence supports. |
| [Vercel, Code and Theory customer story](https://vercel.com/customers/how-code-and-theory-cut-time-to-prototype-75-with-v0) | Outcome-led title, author, date, watch duration, a short results list, customer context and a closing action. | A short case study can work. Give a result prominence only when Servo has evidence for it. Vercel's reported figures belong to that customer story and should not become sample Servo claims. |

## Recommended article template

Start with a topic label, one H1 and a short summary. Follow with the author and publication date, plus an updated date when the content changed. Use a restrained reading column, around 65 characters wide, and let useful images extend beyond it. This width is a proposed design standard, not a measured property of the examples.

The body should accept Markdown or an Astro slot. A page author can then use H2/H3 headings, lists, a comparison table, figures with captions and occasional callouts without adding a prop for every paragraph. Add a contents list for long articles only. Finish with relevant advice or one contextual CTA using `PageClose`.

| Field | Requirement |
| --- | --- |
| `title`, `description`, `topic` | Required. Description doubles as the short standfirst. |
| `author`, `publishedAt` | Required metadata. |
| `updatedAt` | Optional; use the actual content review date. |
| `featuredImage`, `featuredImageAlt` | Preserve the existing blog schema. An informative image needs descriptive alternative text. |
| Body | Required Markdown content or default slot. |
| Contents, related links, closing CTA | Optional template additions. |

The current [blog schema](../../src/content.config.ts) already has these metadata fields, including optional `updatedAt`. Keep that authoring format and extract the shared rendering into an article component. Avoid requiring a content migration just to standardise the layout.

## Recommended project template

Use one project template for both showcases and case studies. A showcase explains the brief and what was built. A case study adds evidence about what happened after delivery. Make results optional so an otherwise useful project does not need invented numbers.

Suggested order: project label and title, summary, project facts, main screenshot, brief, approach, delivered work, optional results or quote, related work and a relevant contact action. On mobile, put the facts before the story and stack images in reading order.

| Field | Requirement |
| --- | --- |
| `title`, `summary`, `client` | Required; use a descriptive title rather than only the client's name. |
| `services` | Required list describing Servo's contribution. |
| `sector`, `location`, `year`, `duration` | Optional facts. Omit unknown values. |
| Main image | Source, alternative text and optional caption. Keep screenshots legible rather than cropping away the work being discussed. |
| Brief and delivered work | Required body content or named slots. |
| Approach and gallery | Optional longer explanation and captioned figures. |
| Results | Optional evidence with measurement context, period and source where relevant. Qualitative delivery facts are valid. |
| Quote | Optional actual quote with name, role and approval to publish. |
| Live project link and closing CTA | Optional descriptive links. |

For the first real example, reuse the existing 12Grapes material: vineyard services, an interactive estimator and the path to contacting the operator. The existing [work example](../../src/components/WorkExample.svelte) documents those capabilities. It does not establish increased enquiries, conversion rates or time savings, so leave those claims out. Label any additional invented example as a development demo.

## Section composition

Keep layout and content separate. A service chooser can own its heading, introduction, theme and grid, while each service link owns its destination, title, description and icon. Support an array of link data for ordinary pages and a slot for explicit composition. The same approach suits process steps and FAQs. Reuse the established fonts, spacing and light/dark themes across these sections and both page templates.
