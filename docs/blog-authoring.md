# Adding a blog post

Blog posts live in `src/content/blog/`. Each Markdown file becomes a page using its filename as the URL.

For example, `back-up-your-business.md` becomes `/back-up-your-business/`.

Start a post with this frontmatter:

```yaml
---
title: "Back up your business"
description: "A short summary used on the blog page and in search results."
publishedAt: 2026-09-10
author: "Rowan Paterson"
featuredImage: "/images/blog/back-up-your-business.webp"
featuredImageAlt: "A useful description of the image"
topic: "Backups"
draft: false
---
```

Write the article in Markdown below the frontmatter. Put its main image in `public/images/blog/`.

Set `draft: true` while a post is unfinished. Drafts do not appear on the site or build a public page.
