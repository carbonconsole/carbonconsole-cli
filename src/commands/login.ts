import { mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { Command } from "commander";
import pc from "picocolors";

const CONFIG_DIR = join(homedir(), ".carbonconsole");

export function registerLogin(program: Command): void {
  program
    .command("login")
    .description("Store an API token for the CarbonConsole API")
    .requiredOption("--token <token>", "your CarbonConsole API token")
    .action((opts: { token: string }) => {
      mkdirSync(CONFIG_DIR, { recursive: true });
      const path = join(CONFIG_DIR, "config.json");
      writeFileSync(path, JSON.stringify({ apiToken: opts.token }, null, 2), { mode: 0o600 });
      console.log(pc.green(`saved credentials to ${path}`));
    });
}
