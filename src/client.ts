import { loadConfig, requireToken, type CliConfig } from "./config.js";

export class ApiClient {
  private config: CliConfig;

  constructor(config: CliConfig = loadConfig()) {
    this.config = config;
  }

  async get<T = unknown>(path: string): Promise<T> {
    const token = requireToken(this.config);
    const res = await fetch(`${this.config.apiBaseUrl}${path}`, {
      headers: {
        authorization: `Bearer ${token}`,
        accept: "application/json",
        "user-agent": "carbonconsole-cli/0.4.1",
      },
    });
    if (!res.ok) {
      throw new Error(`GET ${path} -> HTTP ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as T;
  }

  get baseUrl(): string {
    return this.config.apiBaseUrl;
  }
}
