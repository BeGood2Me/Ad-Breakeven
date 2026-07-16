import fs from "fs";

const SITE_HOST = "adbreakeven.com";
const SITE_URL = `https://${SITE_HOST}`;
const KEY = "07a85be26d4c9f13";

const PATHS = [
  "/",
  "/break-even-roas-calculator",
  "/max-cpa-calculator",
  "/max-cpc-calculator",
  "/ad-profit-calculator",
  "/how-to-calculate-break-even-roas",
  "/what-is-a-good-roas",
  "/max-cpa-guide",
  "/google-ads-break-even",
  "/roas-vs-roi-vs-cpa",
  "/faq",
  "/about",
  "/privacy",
  "/terms",
  "/llms.txt",
  "/llms-full.txt",
];

const contentUrlsPath = new URL("../generated/content-urls.json", import.meta.url);
let contentUrls = [];
try {
  contentUrls = JSON.parse(fs.readFileSync(contentUrlsPath, "utf8"));
} catch {
  console.warn("No generated/content-urls.json — run npm run generate:content first");
}

const allPaths = [...PATHS, ...contentUrls];
const urlList = [...new Set(allPaths)].map((path) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`
);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: SITE_HOST, key: KEY, urlList }),
});

if (response.ok) {
  console.log(`IndexNow: submitted ${urlList.length} URLs (${response.status})`);
} else {
  const text = await response.text();
  console.error(`IndexNow failed (${response.status}): ${text || response.statusText}`);
  process.exit(1);
}
