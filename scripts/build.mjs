import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tsc = join(root, "node_modules", "typescript", "bin", "tsc");
const astro = join(root, "node_modules", "astro", "astro.js");

const tasks = [
  {
    name: "@tianma/scraper-utils",
    command: process.execPath,
    args: [tsc, "-p", "packages/scraper-utils/tsconfig.json"],
    cwd: root
  },
  ...["site-zh-ai", "site-zh-it", "site-en-acg", "site-en-china"].map((site) => ({
    name: `@tianma/${site}`,
    command: process.execPath,
    args: [astro, "build"],
    cwd: join(root, "apps", site)
  }))
];

if (!existsSync(astro) || !existsSync(tsc)) {
  console.error("Missing local dependencies. Run pnpm install first.");
  process.exit(1);
}

for (const task of tasks) {
  console.log(`\n> ${task.name}: ${task.command} ${task.args.join(" ")}`);
  const result = spawnSync(task.command, task.args, {
    cwd: task.cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: "1"
    }
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
