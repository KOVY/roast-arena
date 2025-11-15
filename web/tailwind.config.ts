import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A855F7',
        'neon-orange': '#FB923C',
        'neon-pink': '#EC4899',
        'bg-black': '#0F0F0F',
      },
    },
  },
  plugins: [],
}
export default config
