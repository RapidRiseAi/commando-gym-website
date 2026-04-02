import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (!existsSync("node_modules/@opennextjs/cloudflare")) {
  console.log("[postinstall-open-next] @opennextjs/cloudflare not installed; skipping OpenNext prebuild.");
  process.exit(0);
}

console.log("[postinstall-open-next] Prebuilding OpenNext output...");
const result = spawnSync("npx", ["@opennextjs/cloudflare", "build"], {
  stdio: "inherit",
  shell: false
});

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
