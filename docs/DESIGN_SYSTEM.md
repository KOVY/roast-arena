# RoastArena Design System

## Color Palette

### Primary Colors
- **Halo Orange**: `#ff6b35` - Primary CTA and highlights
- **Halo Gold**: `#f7931e` - Secondary accents
- **Halo Pink**: `#c73866` - Tertiary accents
- **Accent Teal**: `#4ecdc4` - Success states

### Neutral Colors
- **Black**: `#000000` - Primary background
- **Dark Gray**: `#0a0a0a` - Secondary background
- **Medium Gray**: `#1a1a1a` - Card backgrounds
- **Light Gray**: `#333333` - Borders
- **White**: `#ffffff` - Primary text

### Semantic Colors
- **Success**: `#4ecdc4`
- **Warning**: `#f7931e`
- **Error**: `#c73866`
- **Info**: `#ff6b35`

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes
- **Headline**: `text-4xl` (36px)
- **Title**: `text-2xl` (24px)
- **Subtitle**: `text-xl` (20px)
- **Body**: `text-base` (16px)
- **Caption**: `text-sm` (14px)
- **Small**: `text-xs` (12px)

### Font Weights
- **Bold**: `700`
- **Semi-bold**: `600`
- **Medium**: `500`
- **Regular**: `400`

## Components

### Buttons

#### HaloButton
Primary call-to-action button with animated halo effect.

**Variants:**
- Default: Orange gradient with halo animation
- Disabled: Reduced opacity, no interaction

**States:**
- Hover: Scale 1.05, enhanced glow
- Active: Scale 0.95
- Disabled: Opacity 0.5, cursor not-allowed

### Cards

#### RoastCard
Container for displaying roast content.

**Anatomy:**
- Avatar (40px circle with gradient)
- Author name and timestamp
- Roast text (max 280 characters)
- Action buttons (like, echo)

**States:**
- Default: Glass morphism effect
- Hover: Translate Y -5px, orange shadow
- Featured: 2px orange border

#### Glass Cards
Background with blur and transparency.

**Properties:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## Animations

### Transitions
- **Default**: `0.3s ease-out`
- **Fast**: `0.15s ease-out`
- **Slow**: `0.5s ease-out`

### Keyframes

#### slideUp
```css
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
```

#### fadeIn
```css
from { opacity: 0; }
to { opacity: 1; }
```

#### haloGlow
```css
0%, 100% { box-shadow: 0 0 20px orange, 0 0 40px gold; }
50% { box-shadow: 0 0 30px orange, 0 0 60px gold; }
```

## Layout

### Grid System
- **Container**: `max-w-7xl mx-auto`
- **Padding**: `px-4 sm:px-6 lg:px-8`
- **Gaps**: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Spacing Scale
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

## Icons & Emojis

### Primary Icons
- Fire: 🔥 (Roast Arena logo)
- Heart: ❤️ (Likes)
- Speech: 💬 (Echoes)
- Trophy: 🏆 (Challenges)
- Pizza: 🍕 (Pizzeria)
- Sparkles: ✨ (Create)

## Accessibility

### Contrast Ratios
- Text on dark background: Minimum 7:1 (AAA)
- Interactive elements: Minimum 4.5:1 (AA)

### Focus States
- 2px orange outline
- Offset: 2px

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px

## Responsive Design

### Mobile-First Approach
Start with mobile layouts and progressively enhance for larger screens.

### Navigation
- **Mobile**: Bottom navigation bar
- **Desktop**: Top navigation bar

### Card Layouts
- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 3 columns
