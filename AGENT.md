# AGENT.md

Guidance for AI coding agents working in this repository.

## Project

`carbonconsole-cli` — the official command-line interface for the CarbonConsole
cloud-carbon API. Node 20 + TypeScript, built with Commander, published to npm.

## Commands

```bash
npm install
npm run dev -- <command>   # run against src with tsx
npm run build              # compile to dist/
npm run lint               # eslint
npm test                   # vitest
```

## Conventions

- Keep commands small: one file per command under `src/commands/`, each exporting a
  `register<Name>(program)` function wired up in `src/index.ts`.
- All API calls go through `ApiClient` (`src/client.ts`); don't call `fetch` directly.
- Read tokens from `CARBONCONSOLE_API_TOKEN` or `~/.carbonconsole/config.json` only.

## Security

- This is a PUBLIC repository. Never commit secrets, `.env` files, or editor/AI
  tool configs (e.g. `.cursor/mcp.json`) — they are ignored in `.gitignore`.
- Prefer small, focused commits. Run `npm run lint && npm test` before pushing.
