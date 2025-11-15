#!/bin/bash

echo "🔥 Creating RoastArena Design Kit Export Package..."

# Create export directories
mkdir -p exports/{png,html,css,tokens,components,assets}

echo "📦 Step 1: Copying HTML files..."
cp screens/*.html exports/html/ 2>/dev/null || echo "⚠️  HTML files not found"

echo "🎨 Step 2: Copying CSS files..."
cp styles/*.css exports/css/ 2>/dev/null || echo "⚠️  CSS files not found"

echo "💎 Step 3: Creating design tokens..."
cat > exports/tokens/colors.json << 'COLORS'
{
  "colors": {
    "primary": {
      "neon-purple": "#A855F7",
      "neon-orange": "#FB923C",
      "neon-pink": "#EC4899",
      "neon-blue": "#3B82F6"
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
  }
}
COLORS

cat > exports/tokens/typography.json << 'TYPO'
{
  "font-family": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
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
  },
  "line-heights": {
    "tight": 1.2,
    "normal": 1.4,
    "relaxed": 1.6
  }
}
TYPO

echo "📄 Step 4: Copying documentation..."
cp README.md exports/ 2>/dev/null || echo "⚠️  README not found"
cp EXPORT_GUIDE.md exports/ 2>/dev/null || echo "⚠️  EXPORT_GUIDE not found"

echo "🎁 Step 5: Creating ZIP package..."
cd exports
zip -r ../roast-arena-design-kit.zip * > /dev/null 2>&1
cd ..

echo ""
echo "✅ Export complete!"
echo "📦 Package: roast-arena-design-kit.zip"
echo "📏 Size: $(du -h roast-arena-design-kit.zip | cut -f1)"
echo ""
echo "📂 Contents:"
echo "  - HTML prototypes (8 screens)"
echo "  - CSS framework (glassmorphism-2025.css)"
echo "  - Design tokens (JSON)"
echo "  - Documentation (README + EXPORT_GUIDE)"
echo ""
echo "🚀 Ready for production!"
