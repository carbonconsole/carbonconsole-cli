import type { Command } from "commander";
import { ApiClient } from "../client.js";

interface Project {
  id: string;
  name: string;
  region: string;
}

export function registerProjects(program: Command): void {
  const projects = program.command("projects").description("Manage CarbonConsole projects");

  projects
    .command("list")
    .description("List projects visible to the current token")
    .action(async () => {
      const client = new ApiClient();
      const items = await client.get<Project[]>("/v1/projects");
      if (items.length === 0) {
        console.log("no projects");
        return;
      }
      for (const p of items) {
        console.log(`${p.id}\t${p.name}\t${p.region}`);
      }
    });
}
