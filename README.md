# 🎮 Emoji Swap

Welcome to **Emoji Swap** — a playful tile-swapping and matching game inspired by classics like **Candy Crush** and **Bejeweled**. Instead of shiny gems or candies, this game uses something we all know and love: **emojis**! 😎✨

---

## 🕹️ Gameplay

- Swap adjacent tiles by swiping **up, down, left, or right** (touch or mouse drag).
- Match **3 or more identical emojis** in a row (horizontal or vertical).
- Matches clear tiles, trigger melodic cascade bonuses, and make room for new ones.
- Use the **Hint button** if you get stuck (at a small point deduction).
- If no moves remain, the game ends with a **Game Over** dialog.

---

## 🎉 Try It Out

### Clone the repo and run locally

You can open the repository directly inside its **VS Code DevContainer** (recommended, pre-configured with Node 22, Angular CLI 22, and headless browser dependencies) or run locally with Node `>=22.22.3`:

```bash
git clone https://github.com/daveteply/emoji-swap.git
cd emoji-swap
npm install
npm start
```

Then open `http://localhost:4200` in your browser.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server (`http://localhost:4200`) |
| `npm run build` | Build the production bundle to `dist/browser` |
| `npm test` | Run unit tests via Vitest (`@angular/build:unit-test`) |
| `npm run test:coverage` | Run unit tests once with V8 coverage reporting |
| `npm run emoji:update` | Regenerate `src/assets/emoji-data.json` & `src/app/game/emoji-data.ts` from Unicode `emoji-test.txt` |

---

## 🎨 Why Emojis?

Emojis are an expressive, built-in fountain of artwork across every modern device:

- **Unicode 15.1 Dataset**: Generated from the official Unicode `emoji-test.txt` specification (`3,483` emojis across 8 major groups and 98 subgroups), filtering out skin-tone modifiers for visual distinction.
- **Device-Aware Emoji Profiling**: Uses a 2D canvas canary renderer (`emoji-support.ts`) to detect the host OS/browser's maximum supported Unicode Emoji version (`E1.0` through `E16.0`), preventing unsupported `.notdef` tofu boxes and unjoined ZWJ sequences from appearing on older devices.
- **Cross-Platform Color Emoji Font Stack**: Uses `'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` so every platform renders vibrant native glyphs.

---

## 🔀 Randomization & Replayability

- **5-Subgroup Level Pooling**: Each level selects a random Emoji group, samples up to 5 distinct subgroups, and shuffles a 6-emoji pool using **Fisher-Yates shuffle** so boards stay visually distinct while remaining cohesive.
- **Web Audio & Howler.js**: Dynamic pitch-shifted note scales (`NOTE_MIN=48` to `NOTE_MAX=71`) reward consecutive tile removals and cascades with ascending melodies.

---

## 🚀 Tech Stack

- **Angular 22** (`@angular/build:application`, standalone components, Angular Material 22)
- **TypeScript 6**
- **Vitest 4 + JSDOM** (`@angular/build:unit-test` with V8 coverage)
- **Howler.js** for audio synthesis and sound effects
- **VS Code DevContainers** for reproducible containerized development
- **Vercel** for zero-cost static SPA hosting (`vercel.json`)
- **GitHub Actions** for automated pull request builds and unit test verification (`.github/workflows/pr-build.yml`)

---

## 📚 Learn More

Curious about the matching algorithm and how potential matches are detected?
👉 Check out the [GitHub Wiki](https://github.com/daveteply/emoji-swap/wiki) for a deeper dive.
