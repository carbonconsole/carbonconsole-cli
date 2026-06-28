# carbonconsole-cli

[![npm version](https://img.shields.io/npm/v/carbonconsole-cli.svg)](https://www.npmjs.com/package/carbonconsole-cli)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Official command-line interface for the [CarbonConsole](https://carbonconsole.com)
cloud-carbon API. Query projects, pull emissions reports, and check service
status from your terminal or CI.

## Install

```bash
npm install -g carbonconsole-cli
```

## Authenticate

Grab a token from the CarbonConsole dashboard (Settings → API tokens), then:

```bash
carbonconsole login --token <your-token>
# or, for CI:
export CARBONCONSOLE_API_TOKEN=<your-token>
```

> Tokens are stored in `~/.carbonconsole/config.json` (mode `600`). They are
> never read from or written to the project directory — keep them out of source
> control.

## Usage

```bash
carbonconsole whoami                       # show the current account
carbonconsole status                       # API service status
carbonconsole projects list                # list your projects
carbonconsole report --project p_123 \
  --period 2026-06                          # emissions report for a project
```

## Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `CARBONCONSOLE_API_TOKEN` | — | API token (overrides the stored config file) |
| `CARBONCONSOLE_API_URL` | `https://api.carbonconsole.com` | API base URL |

See `.env.example` for a local template.

## Development

```bash
npm install
npm run dev -- status     # run against src with tsx
npm run build             # compile to dist/
npm test                  # vitest
```

## Contributing

PRs welcome. Please run `npm run lint && npm test` before pushing, and never
commit credentials, `.env` files, or editor/AI tool configs (see `.gitignore`).

## License

MIT © CarbonConsole
