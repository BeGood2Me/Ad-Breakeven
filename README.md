# Ad Breakeven (adbreakeven.com)

Free break-even calculators for paid media: ROAS, CPA, CPC, and ad profit. Built with Next.js App Router, statically generated for fast Vercel deployment.

## Features

- **5 calculators** with live results — hub, ROAS, max CPA, max CPC, ad profit
- **Ecommerce + lead gen modes** — toggle business model; lead gen uses customer value × close rate
- **Shareable URLs** — inputs sync to query params; copy results or reset anytime
- **Dark mode** — persisted theme toggle in header
- **SEO-ready** — sitemap, robots, Open Graph image, FAQ/HowTo/SoftwareApplication JSON-LD

## Pages

| URL | Description |
|-----|-------------|
| `/` | Break-even Ads Calculator (main hub) |
| `/break-even-roas-calculator` | Break-even ROAS Calculator |
| `/max-cpa-calculator` | Max CPA Calculator |
| `/max-cpc-calculator` | Max CPC Calculator |
| `/ad-profit-calculator` | Ad Profit Calculator |
| `/how-to-calculate-break-even-roas` | ROAS formula guide |
| `/roas-vs-roi-vs-cpa` | Metric comparison |
| `/faq` | FAQ with JSON-LD structured data |

## Local development

```bash
npm install
npm run dev
npm test
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## Share URL parameters

Calculators persist inputs in the URL and localStorage. Example:

```
https://adbreakeven.com/?model=ecommerce&value=100&margin=50&adSpend=1000&conversionRate=2
```

| Param | Description |
|-------|-------------|
| `model` | `ecommerce` or `leadgen` |
| `value` | AOV (ecommerce) or customer value (lead gen) |
| `margin` | Gross margin % |
| `closeRate` | Close rate % (lead gen only) |
| `adSpend` | Ad spend ($) |
| `conversionRate` | Click conversion rate % |
| `sales` | Conversions (ad profit calculator) |
| `fixedCost` | Optional fixed cost per order/lead |

## Lead gen mode

Switch to **Lead gen** on any calculator to use:

- **Customer value** — revenue per closed customer
- **Close rate** — % of leads that close

Effective value per conversion = customer value × close rate. All break-even math uses that figure.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — Next.js auto-detected.
3. Add custom domain **adbreakeven.com** in Project Settings → Domains.
4. Update DNS with Vercel's records.

**Preview deployments:** Non-production Vercel builds serve `robots.txt` with `Disallow: /` automatically.

## Post-deploy SEO checklist

1. Google Search Console — add `adbreakeven.com`
2. Submit sitemap — `https://adbreakeven.com/sitemap.xml`
3. Rich Results Test — validate FAQ JSON-LD at `/faq`
4. URL Inspection — spot-check calculator pages

## Project structure

```
app/                  # Pages, sitemap, robots, manifest, OG image
components/
  calculators/        # Calculator UIs + shared toolbar/fields
lib/
  calculations.ts     # Break-even math
  business-model.ts   # Ecommerce vs lead gen labels
  calculator-params.ts # URL share + localStorage
  schema.ts           # JSON-LD builders
hooks/                # Calculator persistence
```
