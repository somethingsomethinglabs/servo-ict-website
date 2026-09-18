# Style guide

Run `npm run dev -- --background`, then open `/style-guide/` on the address printed by Astro. Use `npm run dev -- status`, `npm run dev -- logs`, and `npm run dev -- stop` to manage the server.

The guide shows typography, silver and charcoal materials, buttons, links, images, icons, expandable details, the work example and the enquiry form. It imports the existing styles and components. The outline button is a proposed variant scoped to the guide.

The enquiry form is rendered without hydration. Its controls remain disabled until the guide script removes the submission endpoint and installs a local demo handler. It does not send enquiries.

`astro.config.mjs` injects `src/dev/StyleGuide.astro` only for the `dev` command. Production server builds and static builds exclude the route. The page also has a `noindex, nofollow` directive.

To remove it, delete `src/dev/StyleGuide.astro`, remove the `styleGuide` integration from `astro.config.mjs`, and delete this document.

The component and section library follows the element samples. It includes usage rules, live section previews and comparisons of outcome layouts. See [component standards](component-standards.md) for the catalogue and implementation conventions. The guide-only examples live in `src/dev/SectionLibrary.astro`; delete that file too when removing the guide.

Article and project examples are available at `/style-guide/article/` and `/style-guide/case-study/`. Their source files are in `src/dev`, and their routes are also injected only for development. Removing the guide means deleting the whole `src/dev` directory and removing the `styleGuide` integration; keep the reusable production components and layouts.
