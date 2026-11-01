# Emoji Swap - Copilot Instructions

## Project Overview

**Emoji Swap** is a tile-matching web game inspired by Bejeweled and Candy Crush. Built with **Angular 22**, **TypeScript 6**, and **Angular Material 22**, it features algorithm-driven match detection, melodic Web Audio / Howler.js scoring cascades, progressive level difficulty, and device-aware Unicode Emoji version profiling.

## Architecture & Data Flow

### Application & Routing Structure

- **Standalone Bootstrap** (`src/main.ts`): Bootstraps `AppComponent` via `bootstrapApplication` with `provideZoneChangeDetection({ eventCoalescing: true })` and `AppRoutingModule`.
- **Lazy-loaded routing** (`app-routing.module.ts`): `IntroModule` (`/`) and `GameModule` (`/game`) load on demand and route to standalone components (`IntroContainerComponent`, `GameContainerComponent`).
- **Standalone Components**: All 8 components (`AppComponent`, `ConfirmNavComponent`, `IntroContainerComponent`, `GameContainerComponent`, `GameBoardComponent`, `GameBoardTileComponent`, `GameBoardSplashComponent`, `GameOverComponent`) are standalone with explicit `imports`.

### Game Loop Architecture

The game uses a **state-machine pattern** with RxJS observable streams:

1. **GameBoardComponent** (orchestrator): Subscribes to `GameLoopService`, `TileRemoveService`, and `GameInteractionsService` state changes.
2. **GameLoopService**: Emits `GameLoopSteps` enum (`LockBoard` → `FindMatches` → `RemoveMatchSet` → `CompleteLoop` → `UnlockBoard`).
3. **GameInteractionsService**: Handles player swipe/drag input via `GameGestureService` and emits `InteractionSteps` (`LocateAdjacentTile` → `ApplyDirectionalAnimation` → `Swap` → `SwapBack` / `Shutter` / `ShowHint`).
4. **GameService**: Core algorithms for match detection (cardinal directions) and potential move suggestions (adjacent, extended, and staggered patterns).
5. **TileRemoveService**: Cascade removal and gravity drop animation orchestration (`TileRemoveSteps`).
6. **ScoringService**: Real-time scoring with match-length bonuses, time/super-time bonuses, cascade multipliers, and hint deductions.

### Emoji Dataset & Device-Aware Support

- **Dataset Generator** (`tools/emoji/update-emoji-data.mjs`): Parses `tools/emoji/emoji-test.txt` (Unicode 15.1) to generate `src/assets/emoji-data.json` and `src/app/game/emoji-data.ts` (`3,483` emojis across 8 groups, excluding skin-tone modifiers and the `Flags` group).
- **Canvas Canary Profiler** (`src/app/game/services/emoji-support.ts`): Renders canary emojis (`E16.0` down to `E1.0`) onto an offscreen 2D `<canvas>` using `EMOJI_FONT_STACK` (`'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif`) to detect missing glyphs (`.notdef` tofu boxes) and unjoined ZWJ sequences, returning the highest supported version on the current device.
- **Level Pooling** (`GameTileTextureService`): Filters `EmojiData` by the device's max supported Emoji version, selects a random group, pools emojis from up to 5 subgroups, and returns 6 shuffled `EmojiSequence` entries per level.

### Tile Matching Algorithm

- **`GameService.FindMatchesAndPotentials()`**: Scans the board for matches of `MATCH_MINIUM_LENGTH` (3+) consecutive tiles with identical `code` values.
- Stores realized matches in `currentMatchSets` and valid single-swap moves in `currentPotentialMatches`.

## Development Workflows

### DevContainer & CLI Commands

All builds, tests, and dev-server commands should be run inside the **VS Code DevContainer** (`.devcontainer/devcontainer.json`, Node 22):

```bash
npm start                # ng serve --host 0.0.0.0 --port 4200
npm run build            # Production build → dist/browser
npm test                 # Run unit tests via Vitest (@angular/build:unit-test)
npm run test:coverage    # Run unit tests once with V8 coverage reporting
npm run emoji:update     # Regenerate emoji-data.json and emoji-data.ts from tools/emoji/emoji-test.txt
```

### Testing Patterns (Vitest + Angular TestBed)

- Unit tests run on **Vitest 4** with `jsdom` via `@angular/build:unit-test`.
- Import `vi`, `describe`, `it`, `expect`, `beforeEach`, `afterEach` from `'vitest'` when using spies or fake timers (`vi.spyOn`, `vi.fn`, `vi.useFakeTimers`).
- All components are standalone and can be imported directly in `TestBed.configureTestingModule({ imports: [...] })`.

## Deployment & CI

- **Vercel Hosting** (`vercel.json`): Configured for zero-cost static SPA deployment (`outputDirectory: "dist/browser"`, SPA rewrite to `/index.html`).
- **GitHub Actions CI** (`.github/workflows/pr-build.yml`): Runs `npm ci`, `npm test -- --watch=false`, and `npm run build` on pull requests targeting `main`/`master`.
