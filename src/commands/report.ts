import type { Command } from "commander";
import { ApiClient } from "../client.js";

interface CarbonReport {
  projectId: string;
  period: string;
  kgCO2e: number;
}

export function registerReport(program: Command): void {
  program
    .command("report")
    .description("Fetch a carbon-emissions report for a project")
    .requiredOption("--project <id>", "project id")
    .option("--period <period>", "reporting period (e.g. 2026-06)", "latest")
    .action(async (opts: { project: string; period: string }) => {
      const client = new ApiClient();
      const r = await client.get<CarbonReport>(
        `/v1/projects/${encodeURIComponent(opts.project)}/report?period=${encodeURIComponent(opts.period)}`,
      );
      console.log(`${r.projectId} ${r.period}: ${r.kgCO2e.toLocaleString()} kg CO2e`);
    });
}
