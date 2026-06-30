import type { Command } from "commander";
import { ApiClient } from "../client.js";

interface Account {
  id: string;
  email: string;
  org: string;
}

export function registerWhoami(program: Command): void {
  program
    .command("whoami")
    .description("Show the account associated with the current token")
    .action(async () => {
      const client = new ApiClient();
      const me = await client.get<Account>("/v1/account");
      console.log(`${me.email} (org: ${me.org}, id: ${me.id})`);
    });
}
