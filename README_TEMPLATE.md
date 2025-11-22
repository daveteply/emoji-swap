# 🎮 Emoji Swap

Welcome to **Emoji Swap** — a playful experiment in building a tile-swapping and matching game inspired by classics like **Candy Crush** and **Bejeweled**. Instead of shiny gems or candies, this game uses something we all know and love: **emojis**! 😎✨

---

## 🕹️ Gameplay

- Swap adjacent tiles by swiping **up, down, left, or right**.
- Match **3 or more identical emojis** in a row (horizontal or vertical).
- Matches clear tiles and make room for new ones.
- If no moves remain, the game will end with a **Game Over** screen.
- Added a **Hint button** to help players who get stuck.

---

## 🎉 Try It Out

### Play Emoji Swap now!

[Demo](https://daveteply.github.io/emoji-swap/VERSION-HERE/)

### Clone the repo and run locally:

```bash
git clone https://github.com/daveteply/emoji-swap.git
cd emoji-swap
npm i
npm start
```

## 🎨 Why Emojis?

Since drawing and pixel art isn’t my strong suit, I turned to emojis as the game’s artwork. This turned out to be a **bountiful fountain of creativity**:

- Emojis are instantly recognizable and fun.
- Thanks to the **Zero Width Joiner (ZWJ)**, emojis can be combined into endless variations:
  - 👨 + 🦰 → 👨‍🦰 (Man with red hair)
  - 👨 + 🏿 + 🎤 → 👨🏿‍🎤 (Dark-skinned man singer)
- Different platforms render emojis differently:
  - Apple 🍎 vs Android 🤖 vs Windows 💻
  - Everyone gets a unique visual experience!

---

## 🔀 Randomization & Replayability

To keep things fresh:

- Used **Fisher-Yates shuffle** to scramble tiles.
- Categorized emojis so randomness still makes sense (no endless chaos, just fun chaos 😂).
- Added sound effects with **[Howler.js](https://howlerjs.com/)** for extra delight 🎶.

---

## 📱 Mobile Support (Historical Note)

At one point, this project experimented with **[Capacitor.js](https://capacitorjs.com/)** to package the game as a native-like app:

- Runs inside a WebView but installs like a native app.
- Access to device features via [Capacitor plugins](https://capacitorjs.com/docs/apis).
- The `ios` and `android` folders are remnants of those builds.

⚠️ **Note:** These apps are no longer maintained and have been removed from the app stores as I had to prioritize other things in life.

---

## 🚀 Tech Highlights

- **JavaScript/HTML/CSS** for core gameplay.
- **Emojis** as dynamic art assets.
- **Zero Width Joiner (ZWJ)** for advanced emoji rendering.
- **Fisher-Yates shuffle** for randomized boards.
- **Howler.js** for audio effects.
- **Capacitor.js** (historical) for mobile deployment.

---

## 🤔 Lessons Learned

- Detecting valid matches is trickier than it looks — but essential to avoid leaving players stuck.
- Emojis are surprisingly versatile as game art.
- Randomness needs structure to feel fun, not frustrating.
- Cross-platform emoji rendering adds unexpected charm.

---

## 📚 Learn More

Curious about the matching algorithm and how potential matches are detected?  
👉 Check out the [GitHub Wiki](https://github.com/daveteply/emoji-swap/wiki) for a deeper dive.

---
