# 🚀 RoastArena Design Kit - Quick Start

## 📦 Okamžité Použití

### 1. Otevřít HTML Prototypy (Lokálně)

```bash
# Spustit jednoduchý server
cd /home/user/roast-arena/design-kit
python3 -m http.server 8000

# Nebo Node.js
npx serve .

# Otevřít v browseru:
http://localhost:8000/screens/01-onboarding.html
```

### 2. Prohlédnout Všechny Obrazovky

**Funkční prototypy s interakcemi:**

1. **Onboarding** - `screens/01-onboarding.html`
   - 3-slide carousel (swipe/click)
   - Quiz selection s animations
   - Style picker s 3D tilt
   - Confetti effects

2. **Login** - `screens/02-login.html`
   - Social login buttons
   - Glass input fields s focus glow
   - Floating particles background
   - Kinetic text headlines

3. **Home Feed** - `screens/03-home-feed.html`
   - Bento grid layout
   - Daily challenge timer (countdown)
   - Roast cards s likes/echoes
   - Bottom navigation
   - "TY VOLE!" overlays

4. **Roast Creator** - `screens/04-roast-creator.html`
   - AR camera preview hint
   - Style picker (flipping cards)
   - Character counter
   - Explosion effect on generate
   - Result preview s save/regenerate

### 3. Test na Mobilu

**QR Code pro rychlý přístup:**

```bash
# Deploy na Netlify/Vercel:
netlify deploy --dir=design-kit/screens --prod

# Nebo GitHub Pages:
# Push to GitHub → Settings → Pages → Enable
# URL: https://username.github.io/roast-arena/design-kit/screens/
```

Vygenerovat QR code:
```bash
# npm install -g qrcode
qrcode "http://localhost:8000/screens/01-onboarding.html" -o qr.png
```

### 4. Export PNG Screenshots

**Chrome DevTools metoda:**

```
1. Otevřít Chrome
2. F12 (DevTools)
3. Cmd+Shift+M (Device Toolbar)
4. Vybrat "iPhone 14 Pro" (375x812)
5. Cmd+Shift+P → "Capture screenshot"
6. "Capture full size screenshot"
```

### 5. Integrovat do Projektu

**Copy CSS do Next.js:**
```bash
cp design-kit/styles/glassmorphism-2025.css web/styles/
```

**Import v layout.tsx:**
```tsx
import '../styles/glassmorphism-2025.css';
```

**Použít třídy:**
```tsx
<div className="glass-card-neon">
  <h1 className="kinetic-text">RoastArena</h1>
  <button className="halo-button">ROAST!</button>
</div>
```

**React Native komponenty:**
```bash
cp design-kit/components/*.tsx mobile/components/design-kit/
```

```tsx
import { GlassCard, HaloButton } from '@/components/design-kit';

<GlassCard variant="neon">
  <Text>Content</Text>
  <HaloButton onPress={handlePress}>ROAST!</HaloButton>
</GlassCard>
```

---

## 🎨 Rychlé CSS Snippety

### Basic Glass Card
```html
<div class="glass-card">
  <p>Your content here</p>
</div>
```

### Neon Halo Card
```html
<div class="glass-card-neon">
  <h2 class="kinetic-text" data-text="RoastArena">RoastArena</h2>
</div>
```

### Halo Button
```html
<button class="halo-button ripple-effect">
  ROAST! 🔥
</button>
```

### Czech Overlay
```html
<div class="czech-overlay" data-text="TY VOLE!">
  TY VOLE!
</div>
```

---

## 🔥 Klíčové Features

✅ **Glassmorphism 2025**
- Frosted glass s blur(25px)
- Dual-layer neon halo glow
- 3D tilt effects
- Realistic lighting shadows

✅ **Micro-Interactions**
- Ripple effect on tap
- Particle explosions
- Confetti celebrations
- Fire animations
- Pulse timers

✅ **Mobile-First**
- iPhone 14 (375x812)
- Touch-friendly
- Haptic feedback hints
- Pull-to-refresh ready

✅ **Multi-Language**
- Czech ("Ty vole!" overlays)
- English, German, Russian
- Multi-currency (CZK, EUR, USD, RUB)

---

## 📱 Device Testing

### Doporučené Rozlišení

**Mobile:**
- iPhone 14/15: 375x812
- iPhone 14 Pro Max: 430x932
- Pixel 7: 412x915

**Tablet:**
- iPad Pro: 1024x1366

**Desktop:**
- PWA: 1920x1080

### Browser Testing

✅ Chrome (latest) - Full support
✅ Safari iOS 15+ - Full support
✅ Firefox - Full support
✅ Edge - Full support
⚠️ IE11 - Not supported (modern CSS)

---

## 🎯 Co Dál?

### Pro Designery:
1. Review všechny 4 implementované obrazovky
2. Test interakce na mobilu
3. Export PNG screenshots
4. Feedback na animace a efekty

### Pro Developery:
1. Integrovat CSS do projektu
2. Copy React Native komponenty
3. Implementovat zbývající 4 obrazovky:
   - Echo Chain (bubble timeline)
   - Challenges Hub (tabbed view)
   - Profile (3D avatar + stats)
   - Pizzeria (map + QR scanner)
4. Connect k real API/data

### Pro Product:
1. Test user flow (4 screens)
2. Approve design direction
3. Plan remaining screens
4. Schedule implementation

---

## 🆘 Quick Help

**CSS nefunguje:**
- Check import path
- Clear browser cache
- Check console for errors

**Animace lagují:**
- Add GPU acceleration: `transform: translateZ(0)`
- Use `will-change` property
- Reduce particle count

**Blur efekty nejsou vidět:**
- iOS: Add `-webkit-backdrop-filter`
- Android: Fallback to solid background

**Haptic feedback nefunguje:**
- iOS only: `navigator.vibrate()`
- Check HTTPS (required)

---

## 📦 Export Package

**Vytvořit ZIP:**
```bash
cd design-kit
./create-export-package.sh
```

**Output:**
- `roast-arena-design-kit.zip` (27KB)
- Contains: HTML, CSS, tokens, docs

---

## 🔗 Useful Links

- [Full README](./README.md) - Complete documentation
- [Export Guide](./EXPORT_GUIDE.md) - Detailed export instructions
- [Design Summary](./DESIGN_SUMMARY.md) - Overview

---

## 💡 Pro Tips

1. **Always use localhost server** - Nevyužívat `file://` (CORS issues)
2. **Test on real device** - Emulátory nemají haptic feedback
3. **Use Chrome DevTools** - Best for responsive testing
4. **Export early** - PNG screenshots for stakeholders
5. **Keep it simple** - Glassmorphism je o subtilitě, ne clutteru

---

**Ready to roast! 🔥**

*Questions? Check README.md nebo contact design@roastarena.com*
