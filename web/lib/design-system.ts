/**
 * RoastArena Design System
 *
 * "Design is not just what it looks like and feels like.
 *  Design is how it works." - Steve Jobs
 *
 * Every value here has a purpose. Every pixel matters.
 */

// ============================================================================
// COLOR SYSTEM - The soul of the brand
// ============================================================================

export const colors = {
  // Primary - The electric purple that represents confidence and power
  primary: {
    DEFAULT: '#af25f4',
    light: '#c653f7',
    dark: '#8b1ec7',
    glow: 'rgba(175, 37, 244, 0.4)',
  },

  // Accent - The vibrant cyan that represents energy and action
  accent: {
    DEFAULT: '#00a2ff',
    light: '#33b5ff',
    dark: '#0082cc',
    glow: 'rgba(0, 162, 255, 0.4)',
  },

  // Success - For wins, achievements, completed states
  success: {
    DEFAULT: '#39ff14',
    light: '#5eff3d',
    dark: '#2ecc10',
    glow: 'rgba(57, 255, 20, 0.4)',
  },

  // Warning - For alerts, character limits, cautions
  warning: {
    DEFAULT: '#ffb800',
    light: '#ffc933',
    dark: '#cc9300',
  },

  // Error - For destructive actions, errors
  error: {
    DEFAULT: '#ff4757',
    light: '#ff6b7a',
    dark: '#cc3946',
  },

  // Neutral - The foundation
  background: {
    dark: '#100c14',      // Main dark background
    darker: '#0a080c',    // Deeper sections
    card: 'rgba(255, 255, 255, 0.05)', // Glassmorphic cards
  },

  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },

  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    focus: 'rgba(255, 255, 255, 0.2)',
  },
}

// ============================================================================
// SPACING SYSTEM - The rhythm that creates harmony
// ============================================================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
}

// ============================================================================
// TYPOGRAPHY SYSTEM - The voice of the brand
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  // Font sizes with corresponding line heights
  fontSize: {
    xs: { size: '12px', lineHeight: '16px' },
    sm: { size: '14px', lineHeight: '20px' },
    base: { size: '16px', lineHeight: '24px' },
    lg: { size: '18px', lineHeight: '28px' },
    xl: { size: '20px', lineHeight: '28px' },
    '2xl': { size: '24px', lineHeight: '32px' },
    '3xl': { size: '30px', lineHeight: '36px' },
    '4xl': { size: '36px', lineHeight: '40px' },
    '5xl': { size: '48px', lineHeight: '1' },
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  // Letter spacing for different contexts
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
}

// ============================================================================
// ANIMATION SYSTEM - The motion that brings life
// ============================================================================

export const animation = {
  // Durations - Based on material design principles
  duration: {
    instant: '100ms',   // Micro-interactions
    fast: '200ms',      // Hover states, tooltips
    base: '300ms',      // Most transitions
    slow: '500ms',      // Page transitions, modals
    slower: '700ms',    // Complex animations
  },

  // Easing functions - For natural, purposeful motion
  easing: {
    // Default - Smooth in and out
    DEFAULT: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

    // In - Start slow, accelerate
    in: 'cubic-bezier(0.4, 0.0, 1, 1)',

    // Out - Start fast, decelerate
    out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

    // Bouncy - For delightful interactions
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Elastic - For dramatic entrances
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}

// ============================================================================
// EFFECTS SYSTEM - The magic that creates depth
// ============================================================================

export const effects = {
  // Shadows - For elevation and depth
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    // Glow effects - For neon aesthetic
    glow: {
      primary: `0 0 15px ${colors.primary.glow}, 0 0 30px ${colors.primary.glow}`,
      accent: `0 0 15px ${colors.accent.glow}, 0 0 30px ${colors.accent.glow}`,
      success: `0 0 15px ${colors.success.glow}, 0 0 30px ${colors.success.glow}`,
    },
  },

  // Blur - For glassmorphism
  blur: {
    sm: '4px',
    DEFAULT: '12px',
    md: '16px',
    lg: '24px',
    xl: '40px',
  },

  // Border radius - For consistent roundness
  radius: {
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
}

// ============================================================================
// COMPONENT TOKENS - Reusable component styles
// ============================================================================

export const components = {
  // Glassmorphic card
  card: {
    background: colors.background.card,
    backdropBlur: effects.blur.lg,
    border: `1px solid ${colors.border.DEFAULT}`,
    borderRadius: effects.radius.lg,
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },

  // Button variants
  button: {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary.DEFAULT} 0%, ${colors.accent.DEFAULT} 100%)`,
      color: colors.text.primary,
      boxShadow: effects.shadow.glow.primary,
      hoverBoxShadow: `0 0 25px ${colors.primary.glow}, 0 0 50px ${colors.primary.glow}`,
    },

    secondary: {
      background: colors.background.card,
      color: colors.text.primary,
      border: `1px solid ${colors.border.DEFAULT}`,
      hoverBackground: 'rgba(255, 255, 255, 0.1)',
    },

    ghost: {
      background: 'transparent',
      color: colors.text.secondary,
      hoverBackground: 'rgba(255, 255, 255, 0.05)',
    },
  },

  // Input fields
  input: {
    background: colors.background.card,
    border: `1px solid ${colors.border.DEFAULT}`,
    borderRadius: effects.radius.DEFAULT,
    focusBorder: `1px solid ${colors.accent.DEFAULT}`,
    focusBoxShadow: effects.shadow.glow.accent,
  },
}

// ============================================================================
// Z-INDEX SCALE - Layering system
// ============================================================================

export const zIndex = {
  base: 1,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
}

// ============================================================================
// BREAKPOINTS - Responsive design system
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
