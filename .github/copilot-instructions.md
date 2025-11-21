# Emoji Swap - Copilot Instructions

## Project Overview

**Emoji Swap** (also called "Griddin") is a tile-matching game inspired by Bejeweled and Candy Crush. It's an Angular web application with Capacitor mobile integration that features algorithm-driven match detection, scoring cascades, and progressive level difficulty.

## Architecture & Data Flow

### Module Structure

- **Lazy-loaded routing** (`app-routing.module.ts`): Intro and Game modules load on-demand
- **Intro Module**: Entry point for game setup
- **Game Module**: Core gameplay with 7 nested services and 5 components
- **Root Module**: Global Material UI, ConfirmNav component

### Game Loop Architecture

The game uses a **state-machine pattern** with observable streams:

1. **GameBoardComponent** (orchestrator): Subscribes to GameLoopService and GameInteractionsService state changes
2. **GameLoopService**: Emits `GameLoopSteps` enum (LockBoard → FindMatches → RemoveMatchSet → UnlockBoard)
3. **GameInteractionsService**: Handles player input, emits `InteractionSteps` enum (LocateAdjacentTile → ApplyDirectionalAnimation → Swap → etc.)
4. **GameService**: Core algorithms for match detection (cardinal + diagonal directions) and potential move suggestions
5. **TileRemoveService**: Cascade removal animation orchestration
6. **ScoringService**: Real-time scoring with time bonuses, cascade multipliers, hints

### Tile Matching Algorithm

- **GameService.FindMatchesAndPotentials()**: Scans board for matches of 3+ consecutive tiles
- Searches in 8 directions: cardinal (N,E,S,W) + diagonal (NE,SE,SW,NW)
- Matches must have identical `code` property (emoji identifier)
- Stores results in `currentMatchSets` and `currentPotentialMatches` arrays
- Minimum length = `MATCH_MINIUM_LENGTH` constant (3)

### Data Models

- **GameTile**: `{ rowInx, colInx, code, html, title }`
- **GameBoard**: `{ grid: GameTile[][] }`
- **PlayerTile**: `{ tile: GameTile, direction: PlayerSwipeDirection }`
- Emoji pooling via **EmojiSequence** from GameTileTextureService (6 random emojis per level)

## Development Workflows

### Build & Test Commands

```bash
npm start           # ng serve - Development server (http://localhost:4200)
npm build          # Angular production build → dist/emoji-swap
npm test           # Karma + Jasmine headless tests (Chrome)
npm watch          # ng build --watch (dev configuration)
```

### Testing Patterns

- Use **TestBed** for service/component testing (`game.service.spec.ts` as reference)
- Test helper: `demoralizeGameBoard()` standardizes tile data for board testing
- Services injected via `TestBed.inject()`, not constructor
- Component tests mock Material modules (MatDialogModule, MatToolbarModule, etc.)
- Tests target specific features: match detection (3+ length), directional swipes, scoring logic

## Project Conventions

### Naming & Structure

- **Prefix**: `ejw-` for custom Angular components (selector standard)
- **Pattern**: `[feature].service.ts`, `[component].component.ts`, `[model].ts`
- **Styling**: SCSS only (`inlineStyleLanguage: "scss"` in angular.json)
- **Shared style values**: `style-values.scss` for breakpoints and dimensions
- `$tile-scale: 6.5em` (emoji tile sizing), `$default-app-width: 600px` (mobile target)

### RxJS Subscription Management

- Use **takeUntil(Subject)** pattern in components for cleanup
- Example: `pipe(takeUntil(this.subscription))` in ngOnInit, unsubscribe in ngOnDestroy
- Services provide observables via getters: `gameLoopState$ = service.asObservable()`

### Angular Module Patterns

- Services: `providedIn: 'root'` (tree-shakeable singleton)
- Components: `standalone: false` (declared in feature modules)
- Material imports: Only include needed modules (e.g., MatButtonModule, not MatModule)

### State Enums

- **GameLoopSteps**: LockBoard, FindMatches, RemoveMatchSet, CompleteLoop, UnlockBoard
- **InteractionSteps**: LocateAdjacentTile, ApplyDirectionalAnimation, Swap, SwapBack, Shutter, ShowHint
- **PlayerSwipeDirection**: Up, Down, Left, Right
- **AudioType**: Match, Cascade, Success, Error, Hint, Swap, Failed, UI
- State transitions via `.DoStep(step)` → `.next(step)` → subscribers react

## Key Integration Points

### Audio Engine (Howler.js)

- Lazy-loaded Howl instances with caching (`target.howl`)
- Dynamic note shifting: NOTE_MIN=48, NOTE_MAX=71 (musical scale)
- `AudioService.PlayAudio(type, useNote)`: Pitch-shifted cascade sounds increase melodically
- Audio loads async, triggers `playLoadedAudio()` on load event

### Scoring System

- **Base**: Match size multiplier (3 tiles = 30 pts, scales up)
- **Cascade**: Each removed set in same "fall" adds CASCADE_BONUS (10 pts)
- **Time Bonus**: Decrements from TIME_BONUS_CAP (4000) or TIME_SUPER_BONUS_CAP (1500) based on time remaining
- **Hint Cost**: -25 points (HINT_REDUCTION)
- **Level Progression**: 8 match sets (MATCH_SET_COUNT_NEXT_LEVEL) advance to next level, max 5 authored levels

### Mobile (Capacitor)

- Android & iOS support via Capacitor v4.8.2
- Touch swipe detection in GameBoardComponent (handleTouchStart/End)
- Device detection via @capacitor/device plugin

## Error Handling & Constraints

### Immutability & Copies

- Board swaps use `Object.assign()` for shallow copies (see game.service.spec.ts)
- Tile texture codes ("CODE00", "CODE01") used in tests—emoji `html`/`title` replaced during demoralizing

### Boundaries

- Max 7 rows × 5 columns (DEFAULT_GAME_BOARD_ROW_COUNT/COLUMNS_COUNT)
- Production bundle budget: 500KB initial (1MB error limit), 2KB component styles (4KB error)
- Tile scale: 6.5em responsive, adapts to $default-app-width

### Performance Patterns

- **Delay operator**: `delay(50)` in game loop subscriptions prevents rapid state transitions
- **Match batching**: FindMatches runs once per user action (inside LockBoard step)
- **No ngFor trackBy**: Component templates iterate `gameBoard.grid` without trackBy functions

## File Organization Reference

```
src/app/
├── game/                    # Game module (lazy-loaded)
│   ├── services/            # 8 injectable services (GameService, GameLoopService, etc.)
│   ├── models/              # GameBoard, GameTile, Score interfaces
│   ├── components/          # GameContainer, GameBoard, GameBoardTile, etc.
│   └── emoji-data.ts        # Emoji set definitions
├── intro/                   # Intro module (lazy-loaded)
├── services/                # Root-level services (AudioService, etc.)
├── components/              # ConfirmNavComponent
└── constants.ts             # Game parameters & limits
```

## Quick References

- **Emoji Codes**: GameTileTextureService randomizes 6-emoji subset per level
- **Board Representation**: 2D array `GameBoard.grid[row][col]`
- **Move Validation**: Adjacent tiles must share edge (not diagonal)
- **Test Database**: mockBoard uses "CODE" + coordinates for predictable testing
