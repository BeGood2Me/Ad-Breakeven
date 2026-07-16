# Content workflow

Blog posts and topic pillar pages are stored as JSON. A generator script builds the manifest, cross-links, and URL list for sitemap/IndexNow.

## Add a blog post

1. Create `content/blog/your-slug.json` following `content/schema.json`.
2. Set `"pillar"` to one of: `roas-break-even`, `cpa-acquisition`, `cpc-bidding`, `ad-profitability`.
3. Run `npm run generate:content` (runs automatically on `npm run build`).
4. The post appears at `/blog/your-slug` with SEO metadata, FAQ schema, and auto cross-links to similar posts.

## Add a topic pillar

1. Create `content/pillars/your-slug.json`.
2. Assign blog posts to it via each post's `"pillar"` field.
3. Run `npm run generate:content`.
4. Pillar page appears at `/topics/your-slug` and in the footer topic bar.

## SEO included automatically

- `<title>`, meta description, keywords, canonical
- Open Graph + Twitter cards + dynamic OG images
- JSON-LD: `BlogPosting` / `Article`, `BreadcrumbList`, `FAQPage`
- Sitemap entries with `lastModified`
- llms.txt index entries
- IndexNow URL list (`generated/content-urls.json`)

## E-E-A-T author block

Update the `"author"` object in each JSON (or create a shared template) with your real name, experience, and credentials.
