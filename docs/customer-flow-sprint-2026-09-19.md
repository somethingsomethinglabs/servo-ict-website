# Customer flow implementation sprint

The owner approved parallel implementation on 19 September 2026, using Sol with low reasoning and provisional starter-offer decisions. No issue tracker is required.

## Sprint objective

Visitors can identify the right offer, understand the work and costs, inspect relevant evidence and send an enquiry without losing their context.

## Workstreams

| Owner | Backlog items | File ownership |
| --- | --- | --- |
| Enquiry agent | 1. Reliable enquiries; 2. Consistent short forms; 12. Measurement | Form, Contact, submission and email logic, event adapter and related tests |
| Startup agent | 3. Startup offer; 6. Homepage | Home, startup page, shared starter offer data and assumptions |
| Service agent | 7. Websites; 8. IT; 9. Security; 10. Project proof | Service layout, service pages, case study and their components |
| Coordinator | 4. About; 5. Navigation; 11. Startup advice; integration | Shared header and page layout, About, advice routes, source links and combined verification |

All agents share the working tree. They must preserve others' edits and coordinate before changing files outside their ownership. Existing unrelated files are left in place.

## Dependencies and working agreements

- Keep form props backward compatible so commercial pages can proceed alongside form improvements.
- Startup content uses one shared offer definition. Record provisional commercial assumptions separately for owner review.
- Navigation targets the startup and About routes delivered in this sprint.
- Source and service context pass through existing enquiry routes without changing established public article URLs.
- No fabricated client outcomes, credentials or production delivery claims.
- Keep the existing visual direction. New pages use existing layouts, components and styles.

## Definition of done

Each journey has a useful entry point, clear next step, preserved service context and honest completion behavior. Relevant automated checks pass. The combined site builds in server and static modes, and navigation, mobile layout and form interaction receive browser checks where tooling permits.

Production inbox delivery and analytics activation depend on deployment configuration and are reported separately from local verification. Assumed offer values are listed in the starter offer assumptions document for later revision.

## Sprint outcome

All four workstreams delivered their implementation. The three sub-agents used `gpt-5.6-sol` with low reasoning. The coordinator integrated the changes and resolved cross-page context, navigation, source attribution and privacy-copy consistency.

| Backlog | Outcome |
| --- | --- |
| 1 | Delivery configuration is validated before offering direct submission; endpoint behavior tested. Production receipt remains unverified. |
| 2 | Short consistent forms, editable topic, retained source context, error recovery and clearer Contact layout implemented. |
| 3 and 6 | Dedicated startup offer and shorter Home implemented using shared provisional offer data. |
| 4 and 5 | About page and shared navigation implemented; legacy homepage anchors retained. |
| 7, 8 and 9 | Service journeys updated, essential fit and limits visible, website form embedded, nested FAQ disclosure removed. |
| 10 | Case study provides separate starter and website enquiry paths; legacy About anchor retained. |
| 11 | Three startup advice articles cover preparation, annual running costs and starting before content is ready, with matching enquiry destinations. |
| 12 | First-party aggregate measurement storage and private report implemented and tested locally. Production storage configuration and a real traffic baseline remain external work. |

## Verification

- 43 automated tests pass, including endpoint delivery behavior, draft construction, request validation, measurement sanitization and server readiness.
- Astro check reports zero errors, warnings or hints.
- Server and static production builds pass.
- Final static build contains 17 pages. All 477 checked internal links and anchors resolve. Evidence: `audit/completion-2026-09-19/static-links.json`.
- Browser checks covered shared mobile navigation, Escape behavior, startup offer anchors, About, startup advice filtering, article-to-contact handoff and editable service selection.
- A local copied draft retained `Source: start_business` after moving from the starter page to Contact and changing the topic to unsure. A website draft retained website context. No test enquiry was sent externally.
- Invalid contact details produced an inline error and preserved typed information.
- Narrow IT and security pages had one form each, no nested details and no horizontal document overflow at the measured 339 CSS-pixel width. Home and Contact also had no document overflow at the measured 416 CSS-pixel width. Requested viewport overrides differed from reported browser dimensions, so these are the actual measurements.
- Desktop Contact and mobile Home were visually inspected. No full accessibility audit or real customer usability study was performed.

The site has not been deployed. Review the [starter assumptions](starter-offer-assumptions.md) before publishing the offer. Configure production delivery and persistent aggregate measurement storage according to [enquiry setup](enquiry-setup.md), then verify inbox receipt and establish a real enquiry baseline.

## Completion follow-up

The remaining page-level gaps are closed: essential exclusions and website terms stay visible, the annual budget is labelled as provisional, proof and article links preserve enquiry context, and privacy opens without losing the draft. See [the recommendation comparison and updated diagrams](customer-flow-completion-2026-09-19.md) and [final local verification](../audit/completion-2026-09-19/README.md).
