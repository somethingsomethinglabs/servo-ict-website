# Competitive website review for Servo ICT

Research date: 11 September 2026

## Executive judgement

Servo ICT already looks more considered than the typical regional IT support site. Its strongest qualities are plain language, a distinctive navy, orange and warm-neutral palette, large type, generous spacing, and a clear promise that one person owns the work. The design does not need a new direction.

The weak point is commercial proof. The page explains the offer and process, but it does not show completed projects, client names, testimonials, operating numbers, credentials, or an authentic image of Rowan. Several peers make comparable promises. The best of them immediately support those promises with evidence.

The most useful next move is a refinement pass built around proof and specificity:

1. Add a compact proof section near the top.
2. Show two or three real project examples with outcomes.
3. Make the ideal client and engagement model explicit.
4. Replace generic visual material with an authentic founder or client image.
5. Simplify the first-contact step and make sure it submits without depending on the visitor's email app.

## What kind of site this is

The most accurate label is **soft editorial modernism for a boutique consultancy**.

The current homepage uses a warm off-white canvas, near-black navy, a single bright orange accent, oversized tightly tracked sans-serif headings, numbered modules, generous whitespace, rounded cards, a few strong colour bands, and restrained photography. Those choices borrow from editorial and modernist studio sites. Rounded corners, soft shadows, lavender and warm photography make it friendlier than neo-brutalism. The practical service copy keeps it grounded in a regional small-business market.

This is a useful position. Servo ICT can look technically capable without adopting the predictable MSP mix of blue gradients, shield graphics, server-room stock photos, and dense service menus. The tradeoff is that an editorial design needs strong real-world evidence. Without it, the page can read as a polished concept rather than an established service business.

These observations come from the rendered homepage and its implementation in [`src/components/LandingPage.svelte`](../src/components/LandingPage.svelte) and [`src/pages/index.astro`](../src/pages/index.astro).

## What Servo ICT does well now

### The offer is understandable

The hero identifies both the work and the market: websites and IT for small businesses across Gippsland and Victoria. The three service cards reduce a broad offer to websites, business IT and security. The copy speaks in customer problems instead of product names. That is much clearer than the long platform and capability lists on many MSP sites.

### The personal accountability message is strong

"Useful technology. One person accountable" and "You deal with the person doing the work" are credible differentiators for a solo consultancy. [IT For All](https://www.itforall.com.au/) and [Gippsland Web Design](https://www.gippslandwebdesign.com.au/) use almost the same commercial advantage, which confirms that it matters to buyers who dislike call centres and supplier handoffs. Servo states it more economically than either peer.

### The visual identity is recognisable

Orange against deep navy is more memorable than the category-standard blue. The large headings, numbered cards and alternating page bands make the page easy to scan. Rounded panels and the warm background keep the stronger colours from feeling cold or corporate.

### The tone fits a small-business audience

Phrases such as "A rough description is plenty" lower the pressure on a visitor who cannot write a technical brief. [Hoban Digital](https://www.hobandigital.com/) uses the same useful device at the end of its enquiry form. Servo also avoids fear-led cyber-security copy.

### The process and contact details are concrete

The three-step process sets expectations in plain English. The page gives an email address, phone number, phone hours and a real 30-minute consultation proposition. That is better than a vague "get in touch" endpoint.

### The blog builds subject-matter depth

The security articles show how Servo explains technical issues and give search engines more specific material than a one-page brochure alone. The blog is a real asset, especially for a consultancy selling judgement.

## Where the site is currently underpowered

### There is almost no proof of delivered work

The homepage has no portfolio, named client, case study, testimonial, review score, partner credential, project count or measurable outcome. This is the largest gap. A website service is judged partly by visible website work. An IT and security service is judged by trust and evidence. Servo asks the visitor to accept both on copy alone.

### The ideal client is too broad

"Small business" could mean a sole trader or a 100-person employer. The page does not say whether Servo takes one-off fixes, defined projects, ongoing managed support, website care plans, or all of them. The headline CTA says "Start a project", while "looks after" in the hero implies ongoing service. A short qualifier would help visitors decide whether they fit.

### The main promise is generic

"Technology that just works" is clean, but it is common category language. [IT For All](https://www.itforall.com.au/) and [Key IT](https://keyit.com.au/) use the same "just works" idea. Servo's more defensible promise appears lower on the page: one accountable person who handles websites and business systems together.

### The hero image cannot carry the trust burden

The image illustrates a small-business setting, but it does not prove who the client or provider is. An authentic photograph of Rowan, a real client environment, or a finished website in use would do more commercial work.

### The service cards stop too early

They explain each category but do not link to deeper service detail. Visitors cannot inspect typical jobs, deliverables, examples, limitations, support arrangements or common questions. This also restricts the site's search footprint.

### Commercial boundaries are missing

The site does not indicate a typical project size, starting price, response expectation, ownership policy or the difference between a project and ongoing care. Prices do not have to appear on the homepage, but buyers need some sense of how an engagement works. [Secure Nerds](https://securenerds.com/) gives a package price and inclusions, while [Onside IT](https://www.onsideit.com.au/) separates project, managed-service and strategic engagements. Servo can be much shorter while still removing the ambiguity.

### The form asks for a lot before trust is established

The consultation form requests identity, organisation, phone, service, contact preference, dates, times, a project description and consent. That may suit a committed lead, but the page has not yet supplied the proof that usually earns that commitment. The form also asks the visitor to coordinate a time that Servo still needs to confirm.

The current static build ends this long interaction with "Open email draft". It depends on a configured mail app and still requires the visitor to send the message. That is a fragile finish after asking for so much information. Either deploy the working server endpoint or reduce the static version to a short, honest email action.

### The homepage gives more space to articles than to proof

Three large article cards appear before the founder and contact sections. Educational content is useful, but buyers closer to a decision need project work, reviews and the person behind the service first.

### The typography is clean but not yet ownable

Using Inter throughout makes the interface coherent and readable. It also makes the type system less distinctive than peers using Bricolage Grotesque, Space Grotesk, Onest or Manrope. Servo does not need a decorative font. A more recognisable result could come from a deliberate display weight, tighter line-break control, more contrast between display and body sizes, and fewer repeated small uppercase labels.

## Visual refinement review

The desktop composition is strong. The hero has a clear left-to-right reading order, the orange statement band creates a memorable break, and the dark process section resets the page before the article material. The page also holds together at a 412px mobile viewport without horizontal overflow.

The remaining visual issues are mostly about pacing and authenticity:

- The three service cards work as a desktop row, but their fixed 20rem minimum height creates long, mostly empty slabs on mobile. Compact the mobile cards or give the space a useful proof object.
- The blog artwork mixes a typographic illustration, a laptop photograph and a blue-screen image. The cards share a layout but not an art direction, so this section looks less refined than the surrounding shell.
- The large navy panel in the about section repeats the accountability claim already made in the orange band. A real portrait, workbench image, client setting or credentials would use that space better.
- The homepage gives the blog three large cards and substantial vertical padding before it gives Rowan or completed work any visual evidence. At 412px wide, the page is roughly 7,979px tall. Much of that length asks the visitor to keep reading without adding trust.
- The hero photograph fits the intended customer, but it reads as a generic campaign image. It cannot tell the visitor whether the people, place or laptop project are real Servo work.
- The contact panel is visually polished, but the form turns it into the longest and densest section. The visual weight is out of proportion to a first conversation.
- The footer is too sparse for the finish of an otherwise considered site. Add practical navigation, a privacy link, business identity details that Servo is comfortable publishing, and a clear response expectation.

The key aesthetic recommendation is restraint. Keep the colour palette and large type. Remove one or two repeated colour panels, tighten the mobile rhythm, and let real work supply the visual interest now provided by empty card space.

## Technical and UX health check

The implementation is in good shape. `astro check` returned no diagnostics, all five automated tests passed, and the static build completed successfully on 11 September 2026.

A single Lighthouse lab run against the production build scored 97 for mobile performance, 96 for accessibility, 100 for best practices and 100 for SEO. Desktop scored 100, 96, 100 and 100. The mobile run reported a 1.5s first contentful paint, 2.6s largest contentful paint, 30ms total blocking time and a 0.001 layout-shift score. These are useful smoke-test results, not field data from real visitors.

The actionable defects from that run and the source review are small but worth fixing:

- Body copy on the orange Security card is `#55556c` on `#f8a51b`, a measured 3.57:1 contrast ratio. Darken that copy to meet 4.5:1.
- Responsive image variants could save about 144KB on the tested mobile viewport. Most of the saving comes from serving a smaller hero image instead of the full 1448 by 1086 asset.
- The required privacy consent has no linked privacy policy. The footer also has no policy link.
- The site has useful titles, descriptions, canonical URLs and social metadata, but no local-business structured data, sitemap or dedicated service pages.
- The full homepage hydrates as one Svelte component for the menu and form. The payload is still modest, so this is cleanup rather than a pressing performance problem.
- `public/images/servo-technology.gif` adds about 2.3MB to the deployed artifact but is not referenced by the current site. Remove it if it is genuinely obsolete.

Do not spend the next round chasing a perfect automated score. Fix the contrast and image sizing, then put most of the effort into proof, contact reliability and content hierarchy.

## Comparable sites

The set combines direct regional competitors, founder-led businesses with a similar proposition, and design peers with a closely related editorial treatment. All evidence comes from the businesses' official sites. Criticism is an editorial judgement based on the current desktop homepages, not a claim about business quality.

### East Gippsland IT

[Official site](https://egit.com.au/)

Why it is relevant: a direct regional competitor covering managed IT, cyber security, connectivity and web design from Bairnsdale and Sale.

What works:

- The hero immediately says Gippsland, IT, cyber security and connectivity.
- Office addresses, a 1300 number, remote support, 24/7 security operations and service-specific pages make the business feel operationally established.
- The dark interface, large Manrope heading and bright blue calls to action create strong category recognition without relying on a pale corporate-blue template.

What could improve:

- "Your Trusted Technology Partner" is interchangeable with hundreds of MSP headlines.
- The navigation exposes a very large service catalogue. That demonstrates breadth but makes the offer harder to understand at a glance.
- Several trust statements repeat before the site explains a distinctive method or customer outcome.

Take for Servo: visible local proof, clear operating details and deeper service pages.

Leave behind: the sprawling menu and generic partner language.

### Gippsland Web Design

[Official site](https://www.gippslandwebdesign.com.au/)

Why it is relevant: the closest regional web competitor and the closest visual peer. Its current site uses a warm cream background, dark sections, mint accents, large Bricolage Grotesque headings, pill buttons and confident editorial spacing.

What works:

- It places specific trust markers near the top, including 22-plus years, a 5.0 average review, local hosting and a large local client claim.
- Real portfolio links and named Gippsland clients make the service tangible.
- Customer quotes support the plain-language and easy-process claims.
- The writing has a local human voice. "You run your business. We run your website" is simple and memorable.

What could improve:

- The full service and location structure is extensive enough to feel like search inventory.
- The homepage is long and repeats proof, portfolio items and service claims.
- Superlatives such as "the best websites in Gippsland" are less persuasive than the customer work sitting beside them.

Take for Servo: named work, testimonials, local longevity or other verifiable numbers, and proof placed before detailed explanation.

Leave behind: repeated claims, an oversized service list and unsupported superlatives.

### IT For All

[Official site](https://www.itforall.com.au/)

Why it is relevant: a founder-led Melbourne IT and cyber-security service with a very similar personal, no-jargon proposition. Visually it uses cream, deep green, coral, large DM Sans headings, rounded cards and pill calls to action.

What works:

- "No jargon. No call centres. No scare tactics" names the category frustrations directly.
- Problem statements such as unreliable Wi-Fi, compromised email and new-starter devices help visitors recognise their situation.
- A free 15-minute chat is a small first commitment.
- The founder-led explanation connects enterprise experience to small-business needs.

What could improve:

- The audience includes businesses, sole traders, families, home offices and individuals. That breadth blurs the business proposition.
- The homepage tries to answer almost every possible use case, which makes it long and repetitive.
- Unsplash imagery supports the layout but adds little proof.

Take for Servo: a short diagnostic list of common situations, explicit category contrasts and a low-friction first conversation.

Leave behind: the mixed household and business audience, exhaustive homepage copy and stock imagery.

### Secure Nerds

[Official site](https://securenerds.com/)

Why it is relevant: a close commercial-model comparison. It combines IT support, security, Microsoft 365 or Google Workspace, website, domain and basic SEO under one accountable provider. Its content-led design uses near-black and warm paper sections, a strong orange action area, condensed headings, minimal imagery and detailed pricing tools.

What works:

- The starting monthly price, user bands, inclusions, onsite exclusions and contract terms make the offer easy to evaluate.
- It makes a useful ownership promise. Licences, domains and tenancies stay registered to the client.
- Three written commitments explain how accountability and plain-language reporting work in practice.
- The site names what remote and onsite coverage mean in each location.

What could improve:

- The all-in managed package may reject project buyers before they speak to anyone.
- Website work is buried inside a much larger recurring service.
- The pricing calculator and component comparison demand a lot of attention and depend on self-authored market estimates.

Take for Servo: plain service boundaries, a client-ownership promise, and a small set of written commitments.

Leave behind: a mandatory managed package and a long self-authored price comparison.

### Onside IT

[Official site](https://www.onsideit.com.au/)

Why it is relevant: a founder-led Australian IT and cyber-security provider that sells both defined projects and ongoing service. Its lighter corporate design uses soft blue-grey and navy sections, modern sans-serif type, sparse business photography, problem-led cards, proof counters and distinct engagement options.

What works:

- A review score, 15-plus years of experience and a weekday response expectation appear beside the opening proposition.
- "Sound familiar?" describes business symptoms before listing technology services.
- The founder-led promise is concrete: the person who reviews the environment also writes the proposal, does the work and answers afterward.
- Project, managed IT and technology-partnership options explain three different ways to buy.

What could improve:

- Seven core services, industry sections, fractional CTO work, engagement models, a public Tech Radar and a long FAQ make the homepage heavy.
- Much of the offer suits organisations with 10 to 250 staff, so some language is too enterprise-oriented for Servo.
- Repeated statements about plain English, ownership and founder access could be consolidated.

Take for Servo: proof beside the hero, a short symptom-led section, response expectations and a simple distinction between project work and ongoing care.

Leave behind: enterprise categories and trying to answer the whole sales conversation on one page.

### Black Lantern

[Official site](https://blacklantern.au/)

Why it is relevant: a polished Melbourne MSP aimed at businesses with 5 to 250 staff. Its black, white and yellow visual system uses Space Grotesk, large headlines, sharp rectangular cards and dense proof blocks.

What works:

- The ideal customer is specific. Team size, location, coverage and the per-user pricing model all appear early.
- Numbers such as years of experience, endpoints under management, response time and uptime turn broad capability into something buyers can compare.
- The site explains inclusions, industry fit and a four-step path from discovery to live service.
- A named director, team imagery and verified review content humanise a larger operation.

What could improve:

- The homepage is dense and repeats the same 24/7, no lock-in and enterprise-grade claims many times.
- The black and yellow treatment is effective but forceful. It suits an always-on MSP more than a calm solo adviser.
- A comparison table against unnamed "other MSPs" reads as sales copy rather than neutral evidence.

Take for Servo: a precise ideal-client statement, real numbers, clearly described deliverables and a concrete start-to-finish path.

Leave behind: repeated urgency, competitive scorecards and the aggressive visual tone.

### Key IT

[Official site](https://keyit.com.au/)

Why it is relevant: a mature Melbourne IT and cyber-security provider whose offer overlaps with Servo's IT and security work. Its navy and white design uses large Onest headings, restrained rounding, pill calls to action, proof counters and long structured sections.

What works:

- A security-first position runs through the hero, services and operating model.
- The site backs its positioning with an in-house team, project numbers, client counts, industries and an Essential Eight section.
- Service pages and industry pages let a buyer move from a broad promise to relevant detail.
- "Free IT & Cyber Security Review" is a more defined first step than a generic consultation.

What could improve:

- The number of services and industry pages produces a lot of navigation and homepage content.
- The site is built around an ongoing managed-service model. Copying that structure would overstate Servo's scale unless Servo intends to sell the same service.
- The visual language is credible but close to conventional corporate IT.

Take for Servo: one evidence-backed point of view on security, a named first-step offer, and service detail matched to real client types.

Leave behind: enterprise-scale claims and the full MSP information architecture.

### Hoban Digital

[Official site](https://www.hobandigital.com/)

Why it is relevant: the closest proposition and structural style peer. It is a Melbourne consultancy connecting websites, automation and business systems through one experienced partner. Its site uses black, warm cream, lime, oversized Manrope type, numbered sections and minimal rounding.

What works:

- It frames services as situations that need to work better, then states what it assesses, what it can deliver and a sensible first step.
- The numbered editorial structure makes a broad cross-disciplinary offer feel deliberate.
- Client logos and 20-plus years of experience appear before the enquiry.
- The form asks for only a website, name, email, company and rough description.

What could improve:

- The very large typography and repeated black sections feel more severe than Servo's regional, approachable position.
- The page is long, and the five problem scenarios contain a lot of detail for a homepage.
- Client logos establish familiarity, but short project outcomes would provide stronger evidence.

Take for Servo: the assess, deliver and first-step pattern, a compact enquiry form, and proof from recognisable client work.

Leave behind: extreme headline scale and a long diagnostic catalogue.

### Pixelhatch

[Official site](https://pixelhatch.com.au/)

Why it is relevant: a strong stylistic peer for an expert-led digital studio. The site uses black, white and teal, custom neo-grotesk typography, large editorial line breaks, a few rounded glass-like panels and alternating light and dark sections.

What works:

- "What do you need fixed or built?" organises the offer around jobs rather than internal capabilities.
- Its "unclear to clear" and "slow to fast" sequence compresses outcomes into a scannable device.
- It supplies a concrete proof object with published PageSpeed scores and links to live work.
- "Diagnose, Build, Prove" is short, specific and easy to remember.

What could improve:

- Terms such as "Signal Repair", "Agentic Branding", AEO, GEO and LEO require explanation. The positioning is distinctive but cognitively expensive.
- Technical performance scores prove web craft, but they do not replace client business outcomes.
- The sharper studio tone is less personal than Servo's founder-led promise.

Take for Servo: one visible proof object, live work, a memorable method and concise outcome contrasts.

Leave behind: invented category jargon and a positioning statement that needs a glossary.

## Compare and contrast

| Decision factor | Servo ICT now | Best peer pattern | Recommended direction |
| --- | --- | --- | --- |
| Positioning | Websites, IT and security for small business | Hoban Digital connects broad capabilities through one-partner delivery | Lead with one accountable partner, then name the three work types |
| Regional trust | Gippsland and Victoria stated in copy | East Gippsland IT shows offices; Gippsland Web Design shows named local clients | Add real local work, service area and authentic people |
| Proof | Blog articles only | Gippsland Web Design shows work and reviews; Black Lantern and Key IT show operating numbers | Use two or three proof types that Servo can substantiate |
| Ideal client | "Small business" | Black Lantern gives team size and engagement model | State typical client, project type and whether ongoing care is available |
| Process | Three clear but generic steps | Hoban says what it assesses and delivers; Black Lantern sets a timeline | Add outputs, typical timing and the decision at each step |
| Contact | Detailed consultation and proposed times | IT For All offers a 15-minute chat; Hoban asks for a rough brief | Make the first form short, arrange timing after qualification |
| Engagement model | Project language mixed with ongoing-care language | Onside IT separates projects from ongoing service; Secure Nerds publishes package boundaries | State how clients can engage and what remains theirs |
| Visual style | Warm editorial, rounded, navy and orange | Gippsland Web Design and Hoban use stronger type signatures and proof-led pacing | Keep the palette and structure, refine typography and replace generic imagery |
| Content depth | One landing page plus blog | Most peers link services, industries, work and FAQs | Add a small number of useful service and case-study pages, not a giant SEO menu |

## Recommended synthesis

### First priority: make trust visible

Add a proof block directly after the hero or statement band. Use only facts Servo can substantiate. The strongest version would combine:

- two or three named project examples;
- one short client quote with name, business and permission;
- a founder image and concise experience statement;
- relevant qualifications, platforms or security practices;
- one or two honest operating facts, such as projects delivered or years of experience.

If client names cannot yet be published, use anonymised but concrete work: business type, problem, work completed and result. "Migrated eight staff to Microsoft 365 with MFA and documented recovery" is more persuasive than "secure cloud solutions."

### Second priority: sharpen the commercial boundary

Add one sentence near the hero that describes the usual customer and engagement. For example:

> Best suited to Gippsland businesses that need a website or defined technology project completed properly, with ongoing care available afterward.

Adjust that sentence to match the real offer. Do not imply a 24/7 helpdesk, managed security operation or large team unless those exist.

### Third priority: show the work

Replace or follow the current service cards with two or three compact case-study cards. Each should contain the client's situation, the intervention, the visible result and a real image. Website projects should link to the live site where permitted. IT projects can use diagrams, before-and-after process snapshots or a short redacted checklist instead of generic device photography.

### Fourth priority: lower the first-contact cost

The first enquiry needs only name, email, organisation and a rough description. Ask service preference if it helps routing. Arrange the date, time and contact method after Rowan has confirmed fit. Keep the current detailed scheduler as an optional second step if it already saves meaningful admin.

### Fifth priority: refine, do not restyle

Keep the current palette, generous spacing, strong section bands and largely square-free icon approach. Refine the system through:

- deliberate headline line breaks at common desktop widths;
- slightly fewer large rounded containers;
- one consistent radius scale for cards and panels;
- one button shape and one text-link treatment;
- tighter vertical pacing once proof replaces some blog space;
- authentic images with consistent colour treatment;
- a display treatment that is recognisable without sacrificing readability.

### Sixth priority: add only useful depth

Create a concise page for each core service and a work index. Each service page should answer typical jobs, who it suits, what is included, what is not, the process, proof and the next step. Add an FAQ only for real pre-sale questions. Avoid the enormous service and location menus used by larger competitors.

## Patterns to adopt

- Problem-led navigation: "What needs to work better?"
- A low-pressure first step with a defined duration or output.
- Real client work before educational content.
- Specific local evidence instead of repeated claims of being local.
- A founder face and name attached to the accountability promise.
- Verifiable numbers with enough context to mean something.
- A method that names both the activity and the output.
- A plain promise that client domains, accounts, licences and documentation remain client-owned.
- An honest response expectation and a clear distinction between one-off work and ongoing care.
- Service detail deep enough for evaluation, kept out of the main navigation until it earns its place.

## Patterns to avoid

- Generic "trusted technology partner" copy.
- Claims of enterprise-grade service without evidence or a precise meaning.
- Huge lists of platforms, services, locations and industries.
- Stock server rooms, locks, shields and anonymous laptop scenes.
- Repeating "no jargon", "no lock-in" or "24/7" in every section.
- Comparison tables against an undefined average competitor.
- Trend terms that need several paragraphs of explanation.
- Invented scale. A solo specialist should look intentionally expert, not like a small firm pretending to be a large MSP.

## Suggested homepage order

1. Header with one clear primary action.
2. Specific hero with authentic founder or client image.
3. Compact proof strip.
4. Three problem-led service entries.
5. Two or three selected projects.
6. Short process with outputs and timing.
7. Founder section with experience and working style.
8. One featured article and links to the rest.
9. Short enquiry form.
10. Footer with practical business and policy links.

This order keeps the existing design idea but moves evidence closer to the buying decision.

## Prioritised refinement roadmap

| Order | Change | Why now | Dependency | Done when |
| --- | --- | --- | --- | --- |
| 1 | Define the real ideal client and engagement model | This decision controls the hero, service copy, proof and contact path | Rowan confirms the work Servo wants more of | A visitor can tell in one sentence whether Servo is a fit |
| 2 | Gather proof assets | Proof is the main competitive gap and cannot be designed into existence | Client permission, project facts, authentic images and any valid credentials | At least two projects and one customer or operating proof point are publishable |
| 3 | Rewrite the hero and add an early proof strip | The current hero is attractive but generic | Orders 1 and 2 | The first screen states the audience, work, differentiator and a verifiable trust signal |
| 4 | Add selected work before the blog | Website and IT buyers need evidence before educational content | Project material from order 2 | Two or three concise examples state the problem, work and result |
| 5 | Shorten the first enquiry and make submission reliable | The current form demands commitment before enough trust has formed, then the static build opens an email draft | Decide whether scheduling is essential at first contact and whether the site will use a server endpoint | The initial form asks only for information Rowan needs to judge fit, and a successful action sends it without relying on the visitor's mail app |
| 6 | Deepen the three service paths | Buyers need more detail, and the site needs useful search depth | Real service boundaries and typical deliverables | Each service has one focused page with fit, jobs, inclusions, process, proof and next step |
| 7 | Polish the visual system in context | Type, radius and spacing decisions are easier once the new content is real | New homepage content is in place | Headline wrapping, radii, buttons, links, image treatment and spacing follow a small consistent system |
| 8 | Measure and iterate | Refinement should respond to visitor behaviour, not taste alone | A deployed baseline and privacy-appropriate analytics | Enquiry starts, completed enquiries and key page visits can be compared over time |

Orders 1 to 5 should precede decorative work. A new font, animation or card treatment will not solve the absence of evidence. Once proof and positioning are in place, the current visual direction is strong enough to carry them.

## Source notes

Official sites reviewed on 11 September 2026:

- [East Gippsland IT](https://egit.com.au/)
- [Gippsland Web Design](https://www.gippslandwebdesign.com.au/)
- [IT For All](https://www.itforall.com.au/)
- [Secure Nerds](https://securenerds.com/)
- [Onside IT](https://www.onsideit.com.au/)
- [Black Lantern](https://blacklantern.au/)
- [Key IT](https://keyit.com.au/)
- [Hoban Digital](https://www.hobandigital.com/)
- [Pixelhatch](https://pixelhatch.com.au/)

Rendered visual notes refer to the desktop homepages as they appeared on the research date. Websites change. Statements about services, customers, locations, proof and process come from each business's own site. Comments on clarity, hierarchy, tone and usefulness are editorial analysis.
