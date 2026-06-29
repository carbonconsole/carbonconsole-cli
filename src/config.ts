import "dotenv/config";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export interface CliConfig {
  apiBaseUrl: string;
  apiToken: string | undefined;
}

const CONFIG_PATH = join(homedir(), ".carbonconsole", "config.json");

/**
 * Resolve configuration from (in order): the CARBONCONSOLE_API_TOKEN env var,
 * then ~/.carbonconsole/config.json written by `carbonconsole login`.
 *
 * Tokens are NEVER hard-coded in source or committed. See .env.example.
 */
export function loadConfig(): CliConfig {
  let fileToken: string | undefined;
  try {
    const raw = readFileSync(CONFIG_PATH, "utf8");
    fileToken = JSON.parse(raw).apiToken;
  } catch {
    // No config file yet — that's fine; fall back to the environment.
  }

  return {
    apiBaseUrl: process.env.CARBONCONSOLE_API_URL ?? "https://api.carbonconsole.com",
    apiToken: process.env.CARBONCONSOLE_API_TOKEN ?? fileToken,
  };
}

export function requireToken(config: CliConfig): string {
  if (!config.apiToken) {
    throw new Error(
      "not authenticated — run `carbonconsole login` or set CARBONCONSOLE_API_TOKEN",
    );
  }
  return config.apiToken;
}
