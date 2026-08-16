import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const extensionDir = path.join(root, "extension");
const outFile = path.join(root, "adbreakeven-chrome-extension.zip");

if (fs.existsSync(outFile)) fs.unlinkSync(outFile);

const result = spawnSync(
  "tar",
  ["-a", "-c", "-f", outFile, "-C", extensionDir, "."],
  { stdio: "inherit" }
);

if (result.status !== 0) {
  console.error("Failed to zip the extension folder");
  process.exit(result.status ?? 1);
}

console.log(`Wrote ${outFile}`);
