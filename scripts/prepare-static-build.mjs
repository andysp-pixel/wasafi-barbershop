import { existsSync, readFileSync, rmSync, readdirSync, rmdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const legacyRoute = path.join(root, "app/api/media/[key]/route.js");
const expectedHash = "484e19ac44569d1fe046ceaf9bbea9d050cb70f5c07f144a0712ff06814c0106";

// Uploading new files over an old repository does not delete old files.
// Remove only the exact obsolete media proxy from the original supplied website.
// Its images are now local public/media assets, so this route is unused.
if (existsSync(legacyRoute)) {
  const source = readFileSync(legacyRoute, "utf8").replace(/\r\n/g, "\n").trim();
  const hash = createHash("sha256").update(source).digest("hex");
  if (hash !== expectedHash) {
    throw new Error("app/api/media/[key]/route.js differs from the original unused proxy. Remove this server route manually before building the static website; custom code was left untouched.");
  }
  rmSync(legacyRoute);
  for (const directory of ["app/api/media/[key]", "app/api/media", "app/api"]) {
    const target = path.join(root, directory);
    if (existsSync(target) && readdirSync(target).length === 0) rmdirSync(target);
  }
  console.log("Removed obsolete original media proxy; website images are served from public/media.");
}
