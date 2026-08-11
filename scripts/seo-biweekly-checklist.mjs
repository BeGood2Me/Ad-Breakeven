import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baselinePath = path.join(__dirname, "seo-impression-baseline.json");
const data = JSON.parse(fs.readFileSync(baselinePath, "utf8"));

const today = new Date().toISOString().slice(0, 10);

console.log(`\nGSC impression checklist — ${today}`);
console.log(`Property: ${data.property}`);
console.log(`Baseline (${data.capturedAt}, ${data.window}):`);
console.log(
  `  Impressions ${data.baseline.impressions} | Clicks ${data.baseline.clicks} | Avg pos ${data.baseline.avgPosition}`
);
console.log(`  Daily recovering: ${data.baseline.dailyRecovering}`);
console.log("\nWeekly:");
console.log(`  - ${data.cadence.weekly}`);
console.log("\nBiweekly (key query positions):");
for (const q of data.keyQueries) {
  console.log(
    `  - "${q.query}" → ${q.page} (baseline pos ~${q.baselinePosition}; target: ${q.targetPosition})`
  );
}
console.log("\nTargets:");
console.log(`  30 days: ${data.targets["30Days"]}`);
console.log(`  90 days: ${data.targets["90Days"]}`);
console.log("\nNotes:");
for (const note of data.cadence.notes) {
  console.log(`  - ${note}`);
}
console.log(
  `\nTo log a checkpoint, append to scripts/seo-impression-baseline.json → checkpoints[]:`
);
console.log(
  `  { "date": "${today}", "impressions7d": 0, "avgPosition7d": 0, "queries": { "max cpa": 0, "max cpc": 0, "break even roas calculator": 0 } }\n`
);
