# ✦ her space — setup guide

A soft, personal, interactive experience. Built with React + Vite + Framer Motion.

---

## 📁 What's inside

```
her-space/
├── public/
│   ├── images/          ← add your 50+ photos here
│   ├── gifs/
│   │   └── surprise.gif ← add your easter egg GIF here
│   └── audio/           ← optional audio files
├── src/
│   ├── components/
│   │   ├── Hero.jsx          → landing / entry screen
│   │   ├── Nav.jsx           → sticky top navigation
│   │   ├── Gallery.jsx       → 3-row horizontal photo gallery
│   │   ├── Card.jsx          → individual photo card
│   │   ├── Modal.jsx         → fullscreen photo viewer
│   │   ├── Music.jsx         → Spotify embed section
│   │   ├── FloatingPlayer.jsx→ sticky floating music bar
│   │   ├── Messages.jsx      → Google Docs notes embed
│   │   ├── VideoSection.jsx  → YouTube playlist embed
│   │   ├── Interactive.jsx   → playful buttons + drag stickers
│   │   ├── EasterEgg.jsx     → hidden click-to-reveal surprise
│   │   └── Ending.jsx        → calm closing section
│   ├── hooks/
│   │   └── useLocalState.js  → localStorage-backed useState
│   ├── data/
│   │   └── galleryData.js    → your photo list (edit this!)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## 🚀 Setup (Step by Step)

### 1. Install Node.js
Download from https://nodejs.org — install the LTS version.

### 2. Install dependencies
Open a terminal, navigate to this folder, and run:
```bash
npm install
```

### 3. Add your photos
Copy your photos into `public/images/` and name them:
```
photo01.jpg
photo02.jpg
photo03.jpg
...
photo30.jpg  (or more)
```
Or rename them to anything and update `src/data/galleryData.js` accordingly.

### 4. (Optional) Add a surprise GIF
Drop any GIF into `public/gifs/` and name it `surprise.gif`.
It appears when the easter egg is triggered.

### 5. Edit the photo list
Open `src/data/galleryData.js` and:
- Update `src` to match your actual filenames
- Add or remove entries (follow the existing pattern)
- Set optional captions in the `caption` field
- Distribute images across `row: 1`, `row: 2`, `row: 3`
- Set `size: 'sm'` | `'md'` | `'lg'` for card dimensions

### 6. Personalise text (optional)
- Hero rotating lines → `src/components/Hero.jsx`, the `LINES` array at the top
- Interactive button sequences → `src/components/Interactive.jsx`, the `BUTTON_SEQUENCES` object
- Ending message → `src/components/Ending.jsx`

### 7. Update embeds (optional)
All embed URLs are at the top of each file:
- `Music.jsx` → `SPOTIFY_URL`
- `Messages.jsx` → `GDOC_URL`
- `VideoSection.jsx` → `YT_URL`

### 8. Run locally
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 9. Build for production / sharing
```bash
npm run build
```
This creates a `dist/` folder. Upload it to:
- **Netlify** (free) — drag and drop the `dist/` folder at netlify.com
- **Vercel** (free) — run `npx vercel` in this folder
- **GitHub Pages** — push to a repo and enable Pages

---

## 🎨 Customising the Design

All colours are defined as CSS variables in `src/index.css`:
```css
:root {
  --c-amber: #c9884f;       /* main accent colour */
  --c-cream: #e8ddd0;       /* main text colour   */
  --c-base:  #0c0b0a;       /* background         */
  /* ... */
}
```
Change `--c-amber` to any colour to shift the entire accent palette.

---

## 🫣 Easter Egg

Click the divider line between sections **5 times** to reveal the easter egg.
After 2 clicks a faint dot appears as a hint.
The `egg_found` state is saved to localStorage so it remembers.

---

## 💡 Tips

- The gallery cards are **blurred by default** — first tap reveals the photo, second tap opens the fullscreen modal. Double-tap re-blurs.
- "Recently viewed" strip appears automatically after a few photos are revealed.
- The floating music player button appears after 2.5 seconds — clicking it scrolls to the Spotify section.
- Drag the emoji stickers in the interactive section.
- Hold the glow orb in the interactive section to make it expand.
- Hover the center circle on the hero for 3 seconds to see a hidden message.

---

Made with care. ✦
