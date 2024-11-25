/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2337ff',
        secondary: '#000d8a',
      },
      animation: {
        'spiral': 'spiralAndZoom 4s ease-in-out forwards',
        'fade': 'fadeInBackground 2s ease-in-out forwards',
      },
      maxWidth: {
        '4xl': '56rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      typography: {
        lg: {
          css: {
            maxWidth: '75ch',
            p: {
              maxWidth: '75ch',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};