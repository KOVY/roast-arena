import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A855F7',
        'neon-orange': '#FB923C',
        'neon-pink': '#EC4899',
        'bg-black': '#0F0F0F',
        'primary': '#af25f4',
        'vibrant-blue': '#00a2ff',
        'background-light': '#f7f5f8',
        'background-dark': '#100c14',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'var(--font-sans)'],
      },
      boxShadow: {
        'primary-glow': '0 0 15px 5px rgba(175, 37, 244, 0.4)',
        'primary-glow-subtle': '0 0 10px 2px rgba(175, 37, 244, 0.5)',
        'blue-glow': '0 0 15px 5px rgba(0, 162, 255, 0.4)',
      },
      animation: {
        'pulse-glow-blue': 'pulse-glow-blue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow-primary': 'pulse-glow-primary 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow-blue': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 10px 2px rgba(0, 162, 255, 0.5)'
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 20px 8px rgba(0, 162, 255, 0.5)'
          },
        },
        'pulse-glow-primary': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 10px 2px rgba(175, 37, 244, 0.5)'
          },
          '50%': {
            opacity: '0.9',
            boxShadow: '0 0 20px 8px rgba(175, 37, 244, 0.5)'
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
