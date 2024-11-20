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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};