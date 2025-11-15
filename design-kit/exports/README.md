# 🔥 RoastArena Design Kit - Ultra-Premium Glassmorphism 2025

Kompletní UI design kit pro mobilní aplikaci RoastArena s cutting-edge glassmorphism designem.

## 📦 Obsah Balíčku

```
design-kit/
├── screens/                  # HTML prototypy všech obrazovek
│   ├── 01-onboarding.html   # 3-slide carousel (Welcome/Quiz/Style)
│   ├── 02-login.html        # Minimální login/register
│   ├── 03-home-feed.html    # TikTok-style bento grid feed
│   ├── 04-roast-creator.html# Full-screen AI editor
│   ├── 05-echo-chain.html   # Vertical bubble timeline
│   ├── 06-challenges.html   # Tabbed challenges hub
│   ├── 07-profile.html      # 3D avatar + stats
│   └── 08-pizzeria.html     # Map + QR scanner
│
├── styles/
│   └── glassmorphism-2025.css # Kompletní CSS framework
│
├── components/              # Reusable komponenty
│   ├── HaloButton.html
│   ├── GlassCard.html
│   └── Navigation.html
│
├── assets/                  # Design assety
│   ├── colors.json          # Color tokens
│   ├── typography.json      # Font settings
│   └── animations.json      # Animation presets
│
└── prototypes/              # Interaktivní prototypy
    └── full-flow.html       # Kompletní user flow
```

## 🎨 Design System

### Barvy

```css
/* Neon Gradients */
--neon-purple: #A855F7
--neon-orange: #FB923C
--neon-pink: #EC4899

/* Backgrounds */
--bg-black: #0F0F0F
--bg-dark: #1A1A1A

/* Glass */
--glass-light: rgba(255, 255, 255, 0.05)
--glass-medium: rgba(255, 255, 255, 0.08)
--glass-heavy: rgba(255, 255, 255, 0.12)
```

### Typografie

```css
Font: Inter (400, 600, 700, 900)
Sizes: 12px, 14px, 16px, 20px, 24px, 32px, 48px
Line Height: 1.4 - 1.6
Letter Spacing: -0.02em to -0.03em (headlines)
```

### Glassmorphism Efekty

#### 1. Basic Glass Card
```css
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04));
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

#### 2. Neon Halo Glass
```css
.glass-card-neon {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(251, 146, 60, 0.05));
  border-image: linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(251, 146, 60, 0.5)) 1;
  box-shadow:
    0 0 60px rgba(168, 85, 247, 0.3),
    0 0 40px rgba(251, 146, 60, 0.2);
}
```

#### 3. 3D Tilt Effect
```css
.glass-card-tilt:hover {
  transform: rotateX(2deg) rotateY(2deg) scale(1.02);
}
```

## 🎬 Animace

### Pulse Glow (Timer)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
}
```

### Fire Flicker (Streaks)
```css
@keyframes fire-flicker {
  0%, 100% { filter: brightness(1) saturate(1); }
  50% { filter: brightness(1.2) saturate(1.5); }
}
```

### Ripple Effect (Tap)
```css
.ripple-effect:active::after {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.3);
}
```

### Confetti Drop
```css
@keyframes confetti-fall {
  0% { transform: translateY(-100vh) rotateZ(0deg); }
  100% { transform: translateY(100vh) rotateZ(720deg); }
}
```

## 📱 Responsive Breakpoints

```css
Mobile: 375px (iPhone 14)
Tablet: 768px
Desktop: 1024px+
```

## 🌍 Multi-Language Support

### Supported Languages
- 🇨🇿 Czech (cs-CZ) - "Ty vole!" overlays
- 🇬🇧 English (en-US)
- 🇩🇪 German (de-DE)
- 🇷🇺 Russian (ru-RU)

### Currency Support
- CZK (Czech Koruna) - Kč
- EUR (Euro) - €
- USD (US Dollar) - $
- RUB (Russian Ruble) - ₽

## 🎯 Klíčové Vlastnosti

### Micro-Interactions
✅ 3D tilt on hover/swipe
✅ Ripple effect on tap (haptic feedback hint)
✅ Particle explosion on roast generation
✅ Confetti on wins/echoes
✅ Pulse animations on timers
✅ Scale transitions on button press

### Glassmorphism Layers
✅ Dual-layer neon halo glow
✅ Dynamic blur intensity
✅ Adaptive transparency
✅ Realistic lighting shadows (top-left source)
✅ Frosted text overlays

### Mobile-First Features
✅ Touch-friendly tap targets (min 44x44px)
✅ Smooth scroll snap
✅ Pull-to-refresh
✅ Bottom navigation (sticky)
✅ Swipe gestures
✅ Haptic feedback integration

## 🚀 Jak Použít

### 1. Otevřít HTML Prototypy
```bash
# Lokální server
python -m http.server 8000
# nebo
npx serve design-kit/

# Otevřít v prohlížeči
http://localhost:8000/screens/01-onboarding.html
```

### 2. Integrovat do React Native
```jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
  }
});
```

### 3. Integrovat do Next.js
```tsx
// Použít Tailwind classes
<div className="glass-card">
  <div className="kinetic-text">RoastArena</div>
</div>
```

## 📸 Export PNG Screenshots

### iPhone 14 Resolution (375x812)
```bash
# Použít browser DevTools
1. Otevřít Chrome DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Vybrat iPhone 14 (375x812)
4. Screenshot (Cmd+Shift+P → "Capture screenshot")
```

### Desktop PWA (1920x1080)
```bash
# Desktop view
1. Otevřít v fullscreen
2. Screenshot whole page
```

## 🎨 Figma/Sketch Export

### CSS to Figma
1. Použít **HTML to Figma** plugin
2. Importovat HTML soubory
3. Automaticky vytvoří komponenty

### Design Tokens
```json
{
  "colors": {
    "neon-purple": "#A855F7",
    "neon-orange": "#FB923C",
    "bg-black": "#0F0F0F"
  },
  "blur": {
    "light": 15,
    "medium": 25,
    "heavy": 40
  },
  "shadows": {
    "glow-purple": "0 0 60px rgba(168, 85, 247, 0.3)",
    "depth": "0 8px 32px rgba(0, 0, 0, 0.4)"
  }
}
```

## 🔥 Speciální Efekty

### Czech Mode "Ty Vole!" Overlay
```html
<div class="czech-overlay" data-text="TY VOLE!">TY VOLE!</div>
```

### Haptic Feedback
```javascript
if ('vibrate' in navigator) {
  navigator.vibrate(10); // Short tap
  navigator.vibrate([50, 50, 50]); // Pattern
}
```

### Confetti on Success
```javascript
function createConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    document.body.appendChild(confetti);
  }
}
```

## 📦 Připraveno pro Production

### Optimalizace
✅ CSS minifikovaný (gzip < 50KB)
✅ Lazy loading obrázků
✅ Preload kritických fontů
✅ Service Worker ready (PWA)
✅ Dark mode only (menší bundle)

### Performance
✅ 60fps animace (GPU-accelerated)
✅ Debounced scroll handlers
✅ Passive event listeners
✅ Will-change hints

### Accessibility
✅ ARIA labels
✅ Touch targets 44x44px+
✅ Color contrast AA+ (7:1)
✅ Focus indicators
✅ Screen reader support

## 🎯 User Flow

```
1. Onboarding (3 slides)
   ↓
2. Login/Register
   ↓
3. Home Feed (Bento Grid)
   ↓
4. Roast Creator (AI Editor)
   ↓
5. Echo Chain (Detail)
   ↓
6. Challenges Hub
   ↓
7. Profile
   ↓
8. Pizzeria Partners
```

## 💡 Tips & Tricks

### 1. Glass Layers
Stack multiple glass cards for depth:
```html
<div class="glass-card">
  <div class="glass-card-neon">
    <div class="content">...</div>
  </div>
</div>
```

### 2. Lighting Consistency
Always use top-left light source:
```css
box-shadow:
  8px 8px 24px rgba(0, 0, 0, 0.4),  /* Main shadow */
  inset 0 1px 0 rgba(255, 255, 255, 0.15); /* Top highlight */
```

### 3. Adaptive Transparency
Change glass opacity based on content:
```css
/* Light background */
.glass-adaptive-light { background: rgba(255, 255, 255, 0.15); }
/* Dark background */
.glass-adaptive-dark { background: rgba(0, 0, 0, 0.3); }
```

## 🆘 Support

- 📧 Email: design@roastarena.com
- 💬 Discord: [RoastArena Designers]
- 📚 Docs: https://docs.roastarena.com/design

## 📄 Licence

© 2025 RoastArena. All rights reserved.
Proprietary design kit - Internal use only.

---

**Made with 🔥 and glassmorphism magic**

*Design kit version: 2025.1.0*
*Last updated: 2025-01-15*
