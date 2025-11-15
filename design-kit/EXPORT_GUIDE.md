# 📦 RoastArena Design Kit - Export Guide

Kompletní návod jak exportovat design kit pro produkční použití.

## 🎯 Export Formáty

### 1. PNG Screenshots (iPhone 14 - 375x812)

#### Metoda A: Chrome DevTools
```bash
1. Otevřít Chrome (nebo Edge)
2. Navigovat na HTML soubor (např. 01-onboarding.html)
3. Otevřít DevTools (F12 nebo Cmd+Option+I)
4. Toggle Device Toolbar (Cmd+Shift+M nebo Ctrl+Shift+M)
5. Vybrat "iPhone 14 Pro" nebo Custom (375x812)
6. Cmd+Shift+P (Mac) / Ctrl+Shift+P (Windows)
7. Type "Capture screenshot"
8. Vybrat "Capture full size screenshot"
9. Uložit jako PNG
```

#### Metoda B: Puppeteer (Automatizace)
```javascript
// export-screenshots.js
const puppeteer = require('puppeteer');

const screens = [
  '01-onboarding.html',
  '02-login.html',
  '03-home-feed.html',
  '04-roast-creator.html',
  // ... atd
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 812 });

  for (const screen of screens) {
    await page.goto(`file://${__dirname}/screens/${screen}`);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: `exports/png/${screen.replace('.html', '.png')}`,
      fullPage: true
    });
  }

  await browser.close();
})();
```

Spustit:
```bash
npm install puppeteer
node export-screenshots.js
```

### 2. Interactive Prototypes

#### Framer/Figma Import
```bash
1. Otevřít HTML v browseru
2. Use Figma plugin "HTML to Figma"
3. Nebo ručně recreate s design tokens
```

#### HTML Prototyp Package
```bash
# Vytvořit ZIP s interaktivním prototypem
zip -r roast-arena-prototype.zip design-kit/screens design-kit/styles

# Nebo použít tento script:
./create-prototype-package.sh
```

### 3. React Native Components

#### Export jako React Native StyleSheet
```jsx
// GlassCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export const GlassCard = ({ children }) => {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.blur}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
  },
});
```

### 4. Tailwind CSS Integration

#### tailwind.config.js
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A855F7',
        'neon-orange': '#FB923C',
        'neon-pink': '#EC4899',
        'bg-black': '#0F0F0F',
      },
      backdropBlur: {
        '15': '15px',
        '25': '25px',
        '40': '40px',
      },
      boxShadow: {
        'glow-purple': '0 0 60px rgba(168, 85, 247, 0.3)',
        'glow-orange': '0 0 60px rgba(251, 146, 60, 0.3)',
        'depth': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fire-flicker': 'fire-flicker 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'fire-flicker': {
          '0%, 100%': { filter: 'brightness(1) saturate(1)' },
          '50%': { filter: 'brightness(1.2) saturate(1.5)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
```

### 5. Design Tokens (JSON)

#### colors.json
```json
{
  "colors": {
    "primary": {
      "neon-purple": "#A855F7",
      "neon-orange": "#FB923C",
      "neon-pink": "#EC4899"
    },
    "background": {
      "black": "#0F0F0F",
      "dark": "#1A1A1A",
      "darker": "#0A0A0A"
    },
    "glass": {
      "light": "rgba(255, 255, 255, 0.05)",
      "medium": "rgba(255, 255, 255, 0.08)",
      "heavy": "rgba(255, 255, 255, 0.12)"
    }
  },
  "blur": {
    "light": 15,
    "medium": 25,
    "heavy": 40
  },
  "shadows": {
    "depth": "0 8px 32px rgba(0, 0, 0, 0.4)",
    "glow-purple": "0 0 60px rgba(168, 85, 247, 0.3)",
    "glow-orange": "0 0 60px rgba(251, 146, 60, 0.3)"
  },
  "typography": {
    "font-family": "Inter",
    "sizes": {
      "xs": 12,
      "sm": 14,
      "base": 16,
      "lg": 20,
      "xl": 24,
      "2xl": 32,
      "3xl": 48
    },
    "weights": {
      "regular": 400,
      "semibold": 600,
      "bold": 700,
      "black": 900
    }
  }
}
```

## 🎨 Export Workflow

### Pro Designery (Figma/Sketch)

1. **Otevřít HTML v prohlížeči**
   - Prozkoumat všechny obrazovky
   - Poznamenat si animace a interakce

2. **Recreate v Figma**
   ```
   - Vytvořit Auto Layout frames
   - Použít Components pro opakující se prvky
   - Aplikovat effects (blur, shadow, gradient)
   - Export assets jako PNG/SVG
   ```

3. **Design Tokens Plugin**
   - Figma Tokens plugin
   - Import colors.json
   - Automaticky aplikovat na design

### Pro Frontend Developery

1. **Zkopírovat CSS**
   ```bash
   cp design-kit/styles/glassmorphism-2025.css src/styles/
   ```

2. **Zkopírovat HTML komponenty**
   ```bash
   # Convert HTML to React/Vue components
   # Použít tool jako https://transform.tools/html-to-jsx
   ```

3. **Implementovat animace**
   ```javascript
   // Use Framer Motion for React
   import { motion } from 'framer-motion';

   <motion.div
     whileHover={{ scale: 1.02 }}
     whileTap={{ scale: 0.98 }}
     className="glass-card"
   >
     {children}
   </motion.div>
   ```

### Pro React Native

1. **Install dependencies**
   ```bash
   expo install expo-linear-gradient expo-blur
   ```

2. **Použít prepared components**
   ```jsx
   import { GlassCard } from './components/GlassCard';
   import { HaloButton } from './components/HaloButton';

   <GlassCard>
     <Text>Content</Text>
     <HaloButton onPress={() => {}}>
       ROAST!
     </HaloButton>
   </GlassCard>
   ```

## 📦 Complete Export Package

### Vytvoření ZIP balíčku

```bash
# Run tento script
./create-export-package.sh
```

#### create-export-package.sh
```bash
#!/bin/bash

# Create export directory
mkdir -p exports/{png,html,css,tokens,components}

# Copy all files
cp design-kit/screens/*.html exports/html/
cp design-kit/styles/*.css exports/css/
cp design-kit/assets/*.json exports/tokens/

# Create PNG exports (requires Puppeteer)
node export-screenshots.js

# Create ZIP
zip -r roast-arena-design-kit.zip exports/

echo "✅ Export complete: roast-arena-design-kit.zip"
```

### Struktura ZIP
```
roast-arena-design-kit.zip
├── png/
│   ├── 01-onboarding.png
│   ├── 02-login.png
│   └── ...
├── html/
│   ├── 01-onboarding.html
│   ├── 02-login.html
│   └── ...
├── css/
│   └── glassmorphism-2025.css
├── tokens/
│   ├── colors.json
│   ├── typography.json
│   └── animations.json
├── components/
│   ├── GlassCard.tsx (React Native)
│   ├── HaloButton.tsx
│   └── ...
└── README.md
```

## 🚀 Deploy Interactive Prototype

### GitHub Pages
```bash
# Push to GitHub
git add design-kit/
git commit -m "Add design kit"
git push

# Enable GitHub Pages
# Settings → Pages → Source: main/design-kit/screens
# URL: https://yourusername.github.io/roast-arena/design-kit/screens/01-onboarding.html
```

### Netlify
```bash
# netlify.toml
[build]
  publish = "design-kit/screens"

[[redirects]]
  from = "/*"
  to = "/01-onboarding.html"
  status = 200
```

Deploy:
```bash
netlify deploy --prod
```

## 🎬 Video Walkthrough Export

### Screen Recording
```bash
# macOS
Cmd+Shift+5 → Record Selected Portion

# Windows
Win+G → Record

# Export as MP4
# Duration: 2-3 min per screen
# Resolution: 1080p (scale from 375x812)
```

### Loom/Vimeo
- Record interakce
- Vysvětlit features
- Sdílet link s teamem

## 📱 Mobile Preview QR Code

### Generate QR code for prototype
```javascript
// qr-generator.js
const QRCode = require('qrcode');

const url = 'https://roast-arena.netlify.app/01-onboarding.html';

QRCode.toFile('qr-code.png', url, {
  width: 512,
  margin: 2,
  color: {
    dark: '#A855F7',
    light: '#0F0F0F'
  }
});
```

Print QR code → Scan s mobilem → Instant preview!

## ✅ Export Checklist

### Pre-Export
- [ ] Zkontrolovat všechny obrazovky fungují
- [ ] Otestovat v Chrome, Safari, Firefox
- [ ] Otestovat na fyzickém mobilu
- [ ] Zkontrolovat animace jsou smooth
- [ ] Zkontrolovat haptic feedback hints

### Export Assets
- [ ] PNG screenshots (375x812)
- [ ] Desktop screenshots (1920x1080)
- [ ] HTML prototypy
- [ ] CSS soubory
- [ ] Design tokens (JSON)
- [ ] React Native komponenty

### Documentation
- [ ] README.md kompletní
- [ ] EXPORT_GUIDE.md aktuální
- [ ] Code comments čitelné
- [ ] Design decisions zdokumentované

### Share
- [ ] ZIP package vytvořený
- [ ] Uploaded to cloud (Drive/Dropbox)
- [ ] Team notifikován
- [ ] Presentation slides ready

## 🆘 Troubleshooting

### Issue: Blur efekty nefungují na iOS
```css
/* Fix: Add -webkit prefix */
-webkit-backdrop-filter: blur(25px);
backdrop-filter: blur(25px);
```

### Issue: Animace lagují na mobilu
```css
/* Fix: Add GPU acceleration */
transform: translateZ(0);
will-change: transform;
```

### Issue: Font není načten
```html
<!-- Fix: Preload font -->
<link rel="preload" href="fonts/Inter-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

---

**Happy Exporting! 🔥**

*Pro otázky kontaktujte: design@roastarena.com*
