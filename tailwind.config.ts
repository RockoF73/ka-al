import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0e27',
          darker: '#050811',
          light: '#1a1f3a',
          accent: '#00d4ff',
          accentDark: '#0099cc',
          warning: '#ffaa00',
          danger: '#ff4444',
          success: '#00ff88',
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        'space-gradient-radial': 'radial-gradient(circle at center, #1a1f3a 0%, #0a0e27 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

