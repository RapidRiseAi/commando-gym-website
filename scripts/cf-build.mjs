import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const pkgDir = "node_modules/@opennextjs/cloudflare";

function findCliFile(dir, depth = 0) {
  if (depth > 4 || !existsSync(dir)) return null;
  const entries = readdirSync(dir);
  for (const name of entries) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      const nested = findCliFile(fullPath, depth + 1);
      if (nested) return nested;
      continue;
    }

    if (/cli.*\.(mjs|cjs|js)$/.test(name)) return fullPath;
  }
  return null;
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (typeof result.status === "number") process.exit(result.status);
  process.exit(1);
}

const cliFile = findCliFile(pkgDir);

if (cliFile) {
  run("node", [cliFile, "build"]);
}

run("npx", ["@opennextjs/cloudflare", "build"]);
