import type { Command } from "commander";
import pc from "picocolors";
import { ApiClient } from "../client.js";

interface ServiceStatus {
  status: string;
  region: string;
  version: string;
}

export function registerStatus(program: Command): void {
  program
    .command("status")
    .description("Report CarbonConsole API service status")
    .action(async () => {
      const client = new ApiClient();
      const s = await client.get<ServiceStatus>("/v1/status");
      const dot = s.status === "operational" ? pc.green("●") : pc.yellow("●");
      console.log(`${dot} ${s.status} — ${s.region} (api ${s.version})`);
    });
}
