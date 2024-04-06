import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}', '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] }, fontSize: 16 } },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'dark',
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: '#f4538a' },
            secondary: { DEFAULT: '#59d5e0' },
            success: { DEFAULT: '#39e58c' },
            danger: { DEFAULT: '#ff5962' },
            warning: { DEFAULT: '#ff8e3b' },
            divider: { DEFAULT: '#d7d7d7' },
            foreground: { DEFAULT: '#1c1c1c' },
            background: { DEFAULT: '#fefefe' }
          }
        },
        dark: {
          colors: {
            primary: { DEFAULT: '#fa6b9a' },
            secondary: { DEFAULT: '#68dae5' },
            success: { DEFAULT: '#30d3b0' },
            danger: { DEFAULT: '#e05f65' },
            warning: { DEFAULT: '#f79a57' },
            // divider: { DEFAULT: '#333942' },
            foreground: { DEFAULT: '#f9fafb' },
            background: { DEFAULT: '#1d232a' }
          }
        }
      }
    }),
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        '.flex': { display: 'flex', alignItems: 'center' },
        '.flex-center': { '@apply flex items-center justify-center': {} }
      });
    }
  ]
};
