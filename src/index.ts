#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { registerLogin } from "./commands/login.js";
import { registerWhoami } from "./commands/whoami.js";
import { registerStatus } from "./commands/status.js";
import { registerProjects } from "./commands/projects.js";
import { registerReport } from "./commands/report.js";

const program = new Command();

program
  .name("carbonconsole")
  .description("Official CLI for the CarbonConsole cloud-carbon API")
  .version("0.4.0", "-v, --version", "output the CLI version");

registerLogin(program);
registerWhoami(program);
registerStatus(program);
registerProjects(program);
registerReport(program);

program.parseAsync(process.argv).catch((err) => {
  console.error(pc.red(`error: ${err instanceof Error ? err.message : String(err)}`));
  process.exit(1);
});
